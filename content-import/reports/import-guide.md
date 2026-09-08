# Catalog import guide

## Current status

Prepared only. No Payload database connection or live import was executed. No credentials are needed for the default dry run. The package approval is pending human review. No application code, schema, original catalog or Homepage data is changed.

## Review order

1. Read `catalog-content-review.md`, including the resolved Smart POS Shelf override, final Kids Play content and every concept classification.
2. Compare `reports/pages/page-01.png` through `page-21.png` with the unchanged source PDF. Contact sheets summarize all pages and every unique embedded image.
3. Review `manifest/catalog-content.json`: full BHS/EN copy, native asset dimensions, exact original filenames, hashes, classifications, actual media coverage, project candidates and relationship plan. **51 useful assets have `importEnabled: true`**, covering 12 heroes and 41 gallery references across 13 Solutions. Two reused assets account for the difference between 53 references and 51 uploads. Retail Media Screens lacks a suitable non-concept hero; its three conceptual images are gallery-only.
4. Review `cms-schema-review.md` and `manifest/cms-schema.json`. The latter is generated from actual collection/global declarations and hashes their source files. Schema drift aborts validation.
5. Review the script and validate against an isolated PostgreSQL copy before authorizing a live write. This package does not authorize any production import.

## Offline validation (safe, no DB connection)

Run from the repository root on the installed Node 24 runtime:

```powershell
node scripts/import-catalog-content.ts
node scripts/import-catalog-content.ts --dry-run
node --test tests/catalog-import.test.mjs
npm.cmd run typecheck
npm.cmd run lint
```

Node 24 strips TypeScript natively. For older Node versions, the repository also has the `tsx` loader: `node --import tsx scripts/import-catalog-content.ts`. That loader may need normal OS user-directory access on Windows. No package installation or package-lock change was necessary.

Dry run reads local files, verifies source/media hashes, classifications, all 13 groups, reference integrity, bilingual slugs and rich text/copy parity. It rejects decorative/duplicate uploads, orphaned media, conceptual heroes, missing bilingual disclosures and obsolete Smart POS tier copy. Rich-text headings are kept separate from their following paragraphs. It prints per-Solution media counts and the manifest SHA-256. It **does not load Payload configuration**, query existing rows, check target database availability or predict actual CREATE vs UPDATE counts. The test explicitly supplies unusable DB configuration to prove this offline boundary.

The importer uses `manifest/catalog-content.json` as its input. The extraction and preparation scripts are reproducibility tools, not part of a normal import. After manual manifest edits, keep the displayed `body` and Lexical `content` in sync; validation rejects differences. Rerunning `prepare-catalog-package.py` rebuilds the review copy from its curated source definitions, so preserve editorial changes there if rebuilding.

## Future explicit write invocation (NOT EXECUTED)

Only after reviewing the complete plan and testing against an isolated DB copy, load the intended existing credentials into the process environment. The script does not load `.env` automatically or print secrets. Use the repository's existing TypeScript loader because Payload config has extensionless TypeScript imports:

```powershell
$env:NODE_ENV = 'production'
node --import tsx scripts/import-catalog-content.ts --write --reviewed-manifest=<exact-hash-from-dry-run> --database-target=<host:port/database>
```

`NODE_ENV=production` is a schema-safety guard, not a request to target the production database. The explicit database target must match the configured DATABASE_URL host, port and database. Missing credentials, wrong target, stale review hash, destructive `PAYLOAD_DROP_DATABASE=true`, enabled production migrations or DB extensions abort the run. The runtime adapter disables development schema push and automatic database creation. There is no migration command and no schema change.

## Write order and safeguards

1. Validate the entire local package and expected schema hashes before loading Payload.
2. Initialize the existing Payload Local API only after every write guard passes. Acquire a PostgreSQL advisory lock dedicated to this importer so concurrent copies cannot create duplicates.
3. Resolve each BHS/EN slug pair. If locales resolve to different IDs or multiple rows exist, abort. Refuse any matching published Solution, including published content underneath a newer draft.
4. Preflight all Media/Download filename collisions and local original checksums before the first data mutation. Refuse ambiguous duplicates, different files or unavailable originals.
5. Upload enabled Media first, then fill BHS/EN alt and caption fields. Filenames include content hashes; byte-identical leftovers from an interrupted upload may be reused, never unrelated files.
6. Upsert 13 draft Solutions using stable localized slugs. Set only actual schema fields. Preserve IDs across retries. Equal content is skipped; JSON key ordering and generated gallery row IDs do not cause unnecessary updates.
7. Upload/reuse the original BHS PDF and localize its title. Its actual `language` remains `bhs`. No English PDF is fabricated, and no arbitrary single Solution is assigned to the whole catalog.
8. Add catalog relationships and eligible galleries after all IDs exist. Existing manual gallery rows and Downloads links are merged and retained; a populated hero is not replaced. Empty translated gallery captions are filled separately, using stable row IDs. If an existing caption lacks the required disclosure, append the disclosure while preserving human wording. Repeated runs do not append it again.
9. Release the advisory lock and close Payload connections.

Solutions are saved as drafts. Media and Downloads do **not** support drafts and are publicly readable under current schemas, so a later `--write` makes those asset records accessible even while Solutions remain drafts. The revised selection follows the owner's instruction to include useful Solution illustrations, without equating an enabled upload with a completed project or client relationship.

There are 18 AI concepts (14 explicitly labelled by the PDF and four conservatively inferred) and two product renders explicitly labelled as concepts. Every concept has `conceptual: true`, `safeAsRealization: false` and BHS/EN “Konceptualni vizual” / “Conceptual visualization” labels in its alt text, Media caption and Solution gallery caption. Explicit PDF AI attribution is retained. Concepts are gallery-only and cannot be Project candidates. Other renders/diagrams carry visualization captions; unconfirmed branded product photographs carry catalog-example captions. The existing frontend renders gallery captions. No schema or frontend change is needed.

## Failure and retry behavior

The package is applied incrementally through Local API operations, not as one all-or-nothing filesystem/database transaction. A mid-run error can leave successfully created drafts and uploaded assets. No automatic deletion or destructive rollback is attempted. Re-run the same reviewed package to resume by filename and localized slug. Tests simulate an interruption and verify reuse of existing IDs, then verify that a second complete pass is a no-op.

Existing matching draft copy can be updated from the reviewed manifest. Published matches require a separate manual merge. Media and Download file bytes are verified, not replaced with different data. Changing source imagery requires a new fingerprinted filename and renewed review. A same-name catalog with different bytes aborts rather than replacing the file.

## Explicit non-goals

- No Project, Story, Client, Homepage or Site Settings writes; candidate records are never passed to Payload.
- No publication, deployment, messaging, external research or generated imagery.
- No automatic approval of a product photo as client work. Concepts may illustrate relevant Solution galleries with enforced visible disclosures; no concept becomes a hero, Project or Client record.
- No live database integration test was performed. The Local API simulator validates logic, not real PostgreSQL constraints, uploads, access hooks or version-table behavior. An isolated-database rehearsal remains the next step after approval.

## Extraction provenance

All 21 pages were rendered with local Poppler for inspection. 141 embedded image occurrences resolve to 61 unique assets: 59 original JPEG DCT streams are saved without recompression, and two non-JPEG images are decoded losslessly at native dimensions. All 61 were visually reviewed again for this revision. The 51 useful selections are copied byte-for-byte into `media/selected`; no crops, retouching or upscaling were performed. The other 10 unique objects are three logos, four page miniatures, one QR code and two inferior near-duplicate red-shelf variants. Useful standalone shelf images and the alternate Kids Play photograph are retained independently of obsolete hidden text. Some small catalog cutouts will benefit from future original photography; the 173px-wide charging station is only supplementary gallery detail.

`downloads/dev-studio-katalog-2026-bhs.pdf` is byte-identical to the source (SHA-256 `0ae6a548e4601867dbbfe3fa7d69fd6b4b0ca32e436dbf46ae8e32333d8531c2`). The rendered cover is only a thumbnail recommendation, not an automatically uploaded or redesigned cover. The original PDF was never written to.
