"""Review thumbnails only; originals remain unchanged."""
import json
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw

root = Path(__file__).resolve().parents[1] / 'content-import'
pages = sorted((root / 'reports/pages').glob('page-*.png'))
for start in range(0, len(pages), 3):
    sheet = Image.new('RGB', (1500, 760), 'white')
    draw = ImageDraw.Draw(sheet)
    for i, path in enumerate(pages[start:start + 3]):
        img = Image.open(path).convert('RGB')
        img.thumbnail((496, 725))
        sheet.paste(img, (i * 500, 28))
        draw.text((i * 500 + 10, 8), path.stem, fill='black')
    sheet.save(root / f'reports/pages-review-{start + 1:02d}.jpg', quality=95)

assets = json.loads((root / 'manifest/extracted-images.json').read_text(encoding='utf8'))
unique = [a for a in assets if not a['duplicateOf']]
for start in range(0, len(unique), 12):
    sheet = Image.new('RGB', (1400, 1050), '#eeeeee')
    draw = ImageDraw.Draw(sheet)
    for i, asset in enumerate(unique[start:start+12]):
        img = Image.open(root / asset['file']).convert('RGBA')
        bg = Image.new('RGBA', img.size, 'white'); bg.alpha_composite(img)
        thumb = ImageOps.contain(bg.convert('RGB'), (340, 300))
        x, y = (i % 4) * 350, (i // 4) * 350
        sheet.paste(thumb, (x, y+32))
        draw.text((x+5, y+5), f"{asset['id']} {asset['width']}x{asset['height']}", fill='black')
    sheet.save(root / f'reports/assets-review-{start+1:02d}.jpg', quality=95)
