# CMS schema audit

Source of truth: existing TypeScript declarations, expanded by `scripts/inspect-catalog-schema.ts` into `manifest/cms-schema.json`. The snapshot includes validation functions, select values, localization, upload types, relationships, draft settings and SHA-256 hashes of the 12 relevant source files. No Payload instance was initialized for this inspection.

Notation: **L** = localized independently in `bhs` and `en`; **R** = required. All other fields are shared across locales. Payload supplies IDs and timestamps; upload collections also supply `filename`, `url`, `mimeType`, `filesize` and image dimensions. These built-in upload fields are used for lookup, not invented custom fields.

## Shared field definitions

| Field | Type and constraints |
|---|---|
| title | text, L, R |
| slug | text, L, R, unique/indexed; lowercase alphanumerics separated by single hyphens |
| content | Lexical richText, L |
| shortDescription | textarea, L |
| year | integer number, 1900–2200 |
| gallery | shared array of rows: `image` upload to Media, R, image-only; `caption` textarea, L per row |
| video | group: `file` Media upload (video-only), `url` validated HTTP(S), `poster` image-only Media upload, `caption` textarea L |
| downloads | relationship to Downloads, hasMany |
| featured | checkbox, default false, indexed |
| image fields | upload to Media, image-only |

## Collections

| Collection | Exact authored fields | Drafts/access |
|---|---|---|
| solutions | title, slug, solutionGroup, shortDescription, content, heroMedia, gallery, relatedProjects, relatedStories, downloads | drafts enabled; public reads published only |
| projects | title, slug, client, year, industry, services, technologies, shortDescription, content, gallery, video, relatedSolution, downloads, featured | drafts enabled; public reads published only |
| stories | title, slug, type, excerpt, content, coverImage, gallery, video, relatedProjects, relatedSolutions, downloads, featured | drafts enabled; public reads published only |
| downloads | title, category, language, thumbnail, year, relatedSolution, featured; PDF upload | no drafts; public read |
| clients | name, logo, website, industry, featured | no drafts; public read |
| media | alt, caption; image/video upload | no drafts; public read |

### Solutions

- `solutionGroup`: required indexed select with exactly `digital-retail`, `brand-experiences`, `entertainment`, `custom-engineering`, `production`.
- `heroMedia`: shared upload to Media; not localized.
- `relatedProjects`: reverse join to Projects on `relatedSolution`. **Never write this join.** A future approved Project sets its singular `relatedSolution`.
- `relatedStories`: reverse join to Stories on `relatedSolutions`. **Never write this join.** A future Story sets its relationship array.
- `downloads`: shared hasMany relationship; all 13 Solutions can reference the same full catalog.

### Projects

- `client`: optional singular relationship to Clients.
- `industry`: text, L. `services`: localized array with required text `service` per row. `technologies`: shared array with required text `technology` per row.
- `relatedSolution`: optional singular indexed relationship to Solutions. It cannot hold multiple groups or solution IDs.
- There is no dedicated project `heroMedia`; the frontend uses gallery imagery. Candidates remain review records; no Project is created by the importer.

### Stories

- `type`: required indexed select: `project-story`, `video`, `news`, `technology`, `behind-the-build`, `case-study`.
- `excerpt`: textarea L. `coverImage`: Media image upload.
- `relatedProjects`: hasMany Projects. `relatedSolutions`: hasMany Solutions.
- The catalog does not provide dated studio news or a finished case study. No Story records are invented.

### Downloads

- PDF upload only, stored in `media/downloads`.
- `category`: required indexed select `catalog`, `product-flyer`, `thematic-brochure`.
- `language`: required indexed select `bhs` or `en`; describes the actual PDF, **not** the UI locale. Title is localized.
- `thumbnail`: Media image upload. `relatedSolution`: singular Solution relationship. Full catalog keeps it unset instead of picking an arbitrary one of 13 solutions.
- No slug field exists. Import lookup uses the deterministic filename and verifies original file bytes before reuse.
- One BHS PDF is prepared. A future English translation needs its own record/file. The English title explicitly says BHS. The resources frontend defaults to the route language, but its `all` language filter can expose this BHS file to an English visitor. English Solution related-download queries currently filter to English files; no frontend change is made.

### Clients and Media

- Clients: required shared `name`, optional `logo` image, validated HTTP(S) `website`, localized text `industry`, shared `featured`.
- Media: required localized text `alt`, localized textarea `caption`; JPEG, PNG, WebP, AVIF, GIF, MP4, WebM, QuickTime uploads at `media/assets`.
- No custom provenance, source-page, classification or import-key schema fields exist. Those stay in the manifest. Localized captions carry human-readable source notes. Selected filenames include a source-content fingerprint.
- A product image or logo does not establish a direct client relationship. No Clients are in the write plan.

## Homepage global (`homepage`)

| Group | Exact fields |
|---|---|
| hero | eyebrow L, headline L, supportingLine L, subtext L, primaryCtaLabel L, secondaryCtaLabel L, heroMedia upload, video group |
| positioning | headline L, supportingText L |
| selectedWork | headline L, intro L, projects relationship hasMany, max 4 |
| whatWeBuild | headline L, categories array with localized text name per row |
| process | opening L, headline L, steps array exactly 5 rows: number R, title L/R, description L; closing L |
| whyDevStudio | headline L, body L |
| madeHere | headline L, body L, location L, media image |
| ownProducts | headline L, body L, products relationship hasMany to **Projects**, media image |
| latestFromTheStudio | headline L, intro L, stories relationship hasMany to Stories, max 3 |
| finalCta | headline L, body L, buttonLabel L, media image |

Localized long fields (`subtext`, `supportingText`, `intro`, `body`, step description) are textarea; other localized text fields are text. The importer does not call `updateGlobal`. Existing manual content and relationships are preserved. What We Build categories are not Solution relationships. Kids Play needs a separately reviewed own-product Project before it can be assigned to `ownProducts.products`.

## Site Settings global (`site-settings`)

- `companyName`: required shared text, default Dev Studio.
- `navigation`: required localized text labels `solutions`, `projects`, `capabilities`, `about`, `stories`, `resources`, `contact`, `startAProject` (existing English defaults).
- `contactEmail`: required email; `phone`: optional shared text; `location`: localized text.
- `socialLinks`: array of required `platform` text and required HTTP(S) `url`.
- `seo`: required localized `title` text and `description` textarea, optional `shareImage` Media image.

No settings writes are proposed. Page 21 contains Nemanja Vujanić (+387 65 699 790, nemanja.vujanic@devstudio.biz) and Željka Vujanić (+387 65 917 519, zeljka.vujanic@devstudio.biz) as catalog contacts. They remain source facts for review, not automatic replacements for the existing site contact data.

## Locale and routing contract

Payload uses BHS as default and `fallback: false`. Both localized slugs are supported. Existing detail routing resolves the counterpart by the same document ID; the importer creates one bilingual Solution, not two records. BHS remains `/solutions/<bhs-slug>`, English `/en/solutions/<en-slug>`. Drafts will not appear on the public frontend until a separate editorial publication step. Development noindex remains unchanged.
