"""Read-only PDF extraction; never modifies the source or contacts Payload.

Requires pypdf and Pillow. Embedded streams are extracted through pypdf; DCT
JPEG streams retain their original encoding. Lossless decoded formats retain
native pixel dimensions. Page renders are review artifacts, never gallery media.
"""
import hashlib
import json
import logging
from pathlib import Path
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'content-source/dev-studio-katalog-2026.pdf'
OUT = ROOT / 'content-import'
for folder in ['manifest', 'media/originals', 'downloads', 'reports/pages']:
    (OUT / folder).mkdir(parents=True, exist_ok=True)

reader = PdfReader(SOURCE)
logging.getLogger('pypdf').setLevel(logging.ERROR)
assert len(reader.pages) == 21
pages, images = [], []
seen = {}
for number, page in enumerate(reader.pages, 1):
    pages.append({'page': number, 'text': page.extract_text(extraction_mode='layout'),
                  'links': [a.get_object().get('/A', {}).get('/URI') for a in page.get('/Annots', [])
                            if a.get_object().get('/A', {}).get('/URI')]})
    for index, img in enumerate(page.images, 1):
        data = img.data
        method = 'Native dimensions, lossless decoded image (including PDF transparency)'
        obj = img.indirect_reference.get_object() if img.indirect_reference else None
        # pypdf ImageFile.data re-saves JPEGs. Use the actual DCT stream instead
        # to avoid even a quality=keep JPEG recompression pass.
        if obj is not None and '/DCTDecode' in str(obj.get('/Filter')) and not obj.get('/SMask') and not obj.get('/Decode'):
            data = obj.get_data()
            assert data.startswith(b'\xff\xd8'), 'Expected original JPEG stream'
            method = 'Original DCT JPEG bytes, no recompression'
        digest = hashlib.sha256(data).hexdigest()
        original = f'p{number:02d}-{index:02d}-{img.name}'
        duplicate = seen.get(digest)
        if not duplicate:
            (OUT / 'media/originals' / original).write_bytes(data)
            seen[digest] = original
        images.append({'id': f'p{number:02d}-{index:02d}', 'sourcePage': number,
                       'pdfImageName': img.name, 'originalExtractedFilename': original,
                       'file': 'media/originals/' + (duplicate or original), 'sha256': digest,
                       'width': img.image.width, 'height': img.image.height,
                       'duplicateOf': duplicate, 'extractionMethod': method})

(OUT / 'manifest/source-pages.json').write_text(json.dumps(pages, ensure_ascii=False, indent=2), encoding='utf-8')
(OUT / 'manifest/extracted-images.json').write_text(json.dumps(images, ensure_ascii=False, indent=2), encoding='utf-8')
(OUT / 'reports/catalog-extracted-text.txt').write_text('\n\n'.join(f'PAGE {p["page"]}\n{p["text"]}' for p in pages), encoding='utf-8')
target = OUT / 'downloads/dev-studio-katalog-2026-bhs.pdf'
target.write_bytes(SOURCE.read_bytes())
print(json.dumps({'pages': len(pages), 'imageOccurrences': len(images), 'uniqueImages': len(seen),
                  'sourceSHA256': hashlib.sha256(SOURCE.read_bytes()).hexdigest()}))
