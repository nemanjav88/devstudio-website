# Dev Studio catalog review package

Start with [the full content review](reports/catalog-content-review.md). It contains all 13 bilingual Solutions, actual planned Hero/Gallery references and counts, classifications, seven review-only Project candidates, Download handling, Homepage recommendations and page-by-page exclusions. The package incorporates the owner's content and media-selection overrides.

- [Exact CMS field/relationship audit](reports/cms-schema-review.md)
- [Safe import instructions and limitations](reports/import-guide.md)
- [Executable content manifest](manifest/catalog-content.json)
- [Machine-readable schema snapshot](manifest/cms-schema.json)
- [Complete source text and links, all 21 pages](manifest/source-pages.json)
- [Every embedded image occurrence, original names, dimensions and extraction method](manifest/extracted-images.json)
- [Validation results](reports/validation.md)

`media/originals` contains 61 unique original extractions. `media/selected` contains byte-identical copies of **51 useful assets**, all enabled in the revised plan with descriptive fingerprinted filenames. The 53 Solution references reuse two real product images without duplicate uploads. The selection includes 18 AI/inferred concepts and two labelled product concepts, used only in galleries with bilingual disclosures. Twelve Solutions have selected heroes; Retail Media Screens has conceptual gallery imagery only. `reports/pages` contains 21 PDF page renders. `reports/pages-review-*.jpg` and `reports/assets-review-*.jpg` are labelled contact sheets, not website media. `downloads` contains the unchanged BHS catalog copy.

Smart POS Shelf uses capability-led content without the obsolete tier classification. Kids Play uses final visible product facts and the owner's confirmation, including Made in BiH. Raw extracted PDF text is archival evidence only; the importer consumes the reviewed content manifest, not old PDF text layers.

Run the offline validator from the repository root:

```powershell
node scripts/import-catalog-content.ts
```

No import, publication, Homepage update or production data change has been executed. The supplied source PDF and PROJECT_BRIEF.md are unchanged. The package is uncommitted.

The raw `content-source/dev-studio-katalog-2026.pdf` file is local provenance and is intentionally not part of the deployment package. The importer uses the byte-verified copy in `content-import/downloads/` and committed media under `content-import/media/`. When the raw source is present locally it is checked as an optional provenance verification; a deployed environment without `content-source/` continues normally.
