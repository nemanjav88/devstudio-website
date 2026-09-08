# Dev Studio catalog content review


Status: REVIEW PACKAGE ONLY. No database import, global update, publication or deployment performed.
Source: `content-source/dev-studio-katalog-2026.pdf`; physical PDF pages 1–21. All pages reviewed as rendered pages and extracted text.
Source SHA-256: `0ae6a548e4601867dbbfe3fa7d69fd6b4b0ca32e436dbf46ae8e32333d8531c2`

## Asset accounting

141 embedded occurrences; 61 unique original streams; 51 useful selected assets; 51 unique Media files in the revised import plan. There are 53 Solution media references because two real product images are reused across related Solutions. Reuse never creates a second upload.
Classification describes the asset, not proof of a client relationship. Uncertain photo/render/AI provenance is explicitly qualified. Logos, QR code, cover-page miniatures and two inferior near-duplicate shelf variants are retained in the audit only. Useful standalone shelves and the alternate Kids Play photograph are selected independently of obsolete hidden text.

| Classification | All unique files | Selected uploads |
|---|---:|---:|
| real_photo | 2 | 2 |
| real_product | 18 | 18 |
| product_render | 12 | 12 |
| ai_concept | 18 | 18 |
| diagram | 1 | 1 |
| icon | 0 | 0 |
| logo | 3 | 0 |
| decorative | 4 | 0 |
| unsuitable | 3 | 0 |

## The 13 Solutions


Website grouping follows the user instruction, not the catalog table-of-contents grouping. All content is prepared in BHS and English with real localized slugs and Lexical rich text. Full bilingual copy follows below. Hero and gallery selections below are actual import references, not held recommendations.

| # | BHS / English | Group | Pages | Hero | Gallery | Media count |
|---|---|---|---|---|---|---:|
| 1 | Interaktivni ekrani i nadogradnja opreme / Interactive Screens / Retrofit | digital-retail | [3] | p03-01 | p03-02, p03-03 | 3 |
| 2 | Multimedijalni ekrani / Multimedia Screens | digital-retail | [4] | p04-02 | p04-03, p04-01 | 3 |
| 3 | Retail Media ekrani / Retail Media Screens | digital-retail | [5] | Missing: concepts only | p05-01, p05-04, p05-02 | 3 |
| 4 | Pametna POS polica / Smart POS Shelf | digital-retail | [6] | p06-05 | p06-02, p06-06 | 3 |
| 5 | Brend aktivacije / Brand Activations | brand-experiences | [12] | p12-01 | p12-03, p12-04, p12-02, p12-05 | 5 |
| 6 | 360 Video platforme / 360 Video Platforms | brand-experiences | [14, 15, 16] | p14-01 | p14-02, p15-01, p15-04, p15-02, p16-01, p16-02 | 7 |
| 7 | Interaktivne promotivne igre / Interactive Promotional Games | entertainment | [13] | p13-03 | p13-01, p13-02 | 3 |
| 8 | Kids Play / Kids Play | entertainment | [13, 17] | p17-01 | p13-03, p17-03 | 3 |
| 9 | Pametne interaktivne makete / Smart Interactive Models | custom-engineering | [10, 11, 13] | p10-03 | p13-01, p11-03, p11-02, p11-01 | 5 |
| 10 | Projekti i interaktivni sistemi po narudžbi / Custom Projects / Custom Interactive Systems | custom-engineering | [18] | p18-03 | p18-02, p18-01 | 3 |
| 11 | Impresivne police po mjeri / Impressive Custom Shelves | production | [7, 8, 9] | p09-03 | p09-01, p09-02, p07-02, p07-01, p07-03, p08-03, p08-02, p08-01 | 9 |
| 12 | Mobilijar i oprema po mjeri / Custom Furniture & Equipment | production | [19] | p19-02 | p19-04, p19-03 | 3 |
| 13 | Proizvodnja po narudžbi / Custom Manufacturing | production | [20] | p20-02 | p20-03, p20-04 | 3 |

Retail Media Screens is the only Solution without a suitable non-concept hero. The other 12 have selected photo/product/render heroes; some are modest-resolution catalog cutouts and should eventually be replaced by supplied original photography. Existing manually assigned heroes are preserved by the importer. Every Solution references the BHS catalog. All Project relationships remain review-only because Solutions.relatedProjects is a reverse join.

## AI / concept controls

Explicit AI: pages 7–8 (six branded shelf concepts), 11 (three smart models), 15–16 (five Sky concepts). These 14 visuals are never project evidence. Page 5 and the page 18 projection scene add four conservatively inferred AI concepts. Page 12 marks Giant Pong and Cornhole as concepts without specifying AI authorship: classified product_render with conceptual=true. Page 14 Sky drawing is a disclosed diagram, not real event photography.
All 18 AI concepts and both explicitly labelled product concepts are enabled only for relevant Solution galleries. Their BHS/EN alt text, Media captions and gallery captions carry “Konceptualni vizual” / “Conceptual visualization”; explicitly AI-labelled pages also retain AI attribution. Concepts cannot be selected as heroes or Project candidates. Other renders/diagrams are disclosed as visualizations and photographs with unconfirmed commissions as catalog product examples. No brand image generates a Client record or a completed-project claim.
The importer preserves existing human gallery captions and appends required disclosure if missing. Public Solution galleries already render gallery captions; this package does not alter frontend code. Media/Downloads have no draft status, so all enabled uploads become public only if a later reviewed write is authorized.

## Resolved user overrides

Smart POS Shelf: obsolete tier classification is absent from BHS/EN copy, manifest and import fields. Capabilities, technical detail and collaboration models are preserved. The unchanged source PDF and raw extraction are archival evidence and are not used to generate import payloads.
Kids Play: original Dev Studio product, Made in BiH, ages 3–11, 24-inch touchscreen, around 30 educational/entertainment games, offline without external online content, optional payment and shopping-center/playroom/family-zone placement. Final visible facts and explicit user confirmation take precedence over older hidden text. The alternate photograph is used solely as valid product imagery.

## Project candidates (review only)


### Kids Play - originalni Dev Studio proizvod (high)

Pages: [13, 17]; related Solution: `kids-play`; images: p17-01, p13-03.
Possible brand/client: Not specified; do not invent.
p17 explicitly states original Dev Studio and shows cabinets in a real indoor location. It supports an own-product project, not a named client case study.
Review: Confirm project narrative and year. Do not infer venue, number of installations or revenue.

### Interaktivne figure po mjeri (high)

Pages: [10, 13]; related Solution: `smart-interactive-models`; images: p10-03, p13-01.
Possible brand/client: Not specified; do not invent.
p10 explicitly labels the two figures STVARNE DEV STUDIO IZVEDBE. The touchscreen figure reappears individually on p13.
Review: Determine whether two separate projects; confirm commissioning party, dates and actual functions for each. No personal identity inferred.

### Carroten promotivna polica (medium)

Pages: [9]; related Solution: `impressive-custom-shelves`; images: p09-03.
Possible brand/client: Carroten (brand named on p9; commissioning client unconfirmed)
Product appears photographed and p9 labels CARROTEN in custom production section; lacks explicit realization statement.
Review: Confirm Dev Studio fabrication and permission/attribution before any Project record.

### Brendirani stoni fudbal i punjač za telefone (medium)

Pages: [12]; related Solution: `brand-activations`; images: p12-01, p12-04.
Possible brand/client: Jelen (visible branding only)
Photographic-looking products in event equipment offer, no KONCEPT badge on these two items.
Review: Confirm fabrication, venue, actual commissioning client and dates.

### Velika brendirana igra 4 in a Row (medium)

Pages: [12]; related Solution: `brand-activations`; images: p12-03.
Possible brand/client: Madri (visible branding only)
Photographic-looking physical game, unlike explicitly marked concept games on same page.
Review: Confirm realization and client attribution.

### Ormarići za punjenje telefona (medium)

Pages: [19]; related Solution: `custom-furniture-equipment`; images: p19-02.
Possible brand/client: Imperial (visible label, not proven client)
Physical equipment photograph in custom furniture section.
Review: Confirm manufacturer/commission and whether brand may be named.

### Dekorativna vrata i metalni stolić (medium)

Pages: [20]; related Solution: `custom-manufacturing`; images: p20-02, p20-03.
Possible brand/client: Not specified; do not invent.
Product cutouts illustrate CNC/manufacturing capabilities; no named installation.
Review: Confirm which objects are real studio work and whether they belong to separate projects.

No final Project records are in the write plan, including high-confidence candidates: this task prepares them for review. No low-confidence or AI item is promoted to a Project. Unsupported low-confidence ideas (retrofit branded devices, multimedia screens, retail-media scenes, Bavaria shelves, Domaćica mascot, 360 events, projector installations and furniture visualizations) are intentionally not proposed as realizations.

## Download

`catalog-2026-bhs`: Dev Studio - Katalog proizvoda i rješenja 2026 / Dev Studio - Products & Solutions Catalog 2026 (BHS). Category `catalog`, year 2026, language `bhs`. Byte-identical copy at `downloads/dev-studio-katalog-2026-bhs.pdf`. No English file is fabricated.
Downloads has localized titles but a single actual language per file. A future English PDF requires a separate Download record. All 13 Solutions.downloads can reference this record; singular Downloads.relatedSolution stays empty. Cover recommendation: original page 1 render, reviewed before upload; no invented cover.

## Homepage relationship recommendations

- **selectedWork.projects**: After project review, consider kids-play-original-product and interactive-figures (max 4). No automatic mutation.
- **whatWeBuild.categories**: Not a relationship field: localized name array. Recommend the five required website groups only as a manual future editorial change; preserve existing entries now.
- **ownProducts.products**: Relationship to Projects, not Solutions. After approval create own-product Kids Play Project and link its ID. Do not put a Solution ID here.
- **ownProducts.media**: Recommend p17-01 after manual approval. Preserve existing headline/body/media now.
- **latestFromTheStudio.stories**: No dated reporting or final Story records supported. Consider future Behind the Build after interviewing the team; max 3. Preserve existing relationships.

## Ambiguities requiring review

- Resolved by user override: Smart POS Shelf uses capability-led copy without obsolete tier classification in either locale. Source PDF and raw extraction remain untouched archival evidence, never importer content inputs.
- Resolved Kids Play text layers using final visible facts and user-confirmed Made in BiH, age 3–11, 24-inch touchscreen, around 30 games, offline use, optional payment and placement in malls/playrooms/family zones. Alternate p17 photograph contributes imagery only, not older copy.
- 51 useful assets are selected for Solution illustration, including disclosed concepts. Product appearance or visible branding does not establish a Dev Studio client commission. All seven Project candidates remain review-only.
- p5 and p18 projection look synthetic but lack explicit AI wording. Classification is conservative inference requiring human provenance review.
- p12 Giant Pong/Cornhole marked concept, AI origin unspecified. p9 Bavaria and p13 Domaćica also require provenance review.
- p14 Sky is a diagram/visualization. 5m / around 20 people are catalog specifications, not completed implementation evidence or occupancy certification.
- Media and Downloads have public read access and no drafts. --write uploads become accessible; Solutions remain drafts. Review before any write.
- No English PDF supplied. Existing resources frontend filters by actual PDF language; BHS catalog will not appear as an English download.
- p21 named contacts and commercial p5 50/50 advertising-space split are source facts; do not auto-copy into Site Settings; confirm currency before publication.
- Some images are only 173-671px wide. Extraction preserves native resolution; request original photography later for cinematic heroes.
- Retail Media Screens has three useful conceptual gallery images but no suitable non-concept Hero Media. Leave hero empty until authentic media is supplied.

## Page-by-page coverage and exclusions

- p1: cover, 2026 edition, integrated engineering promise; miniature brochure images excluded as decoration.
- p2: complete development cycle and 13 catalog areas; no superlative marketing claims copied as measurable achievements.
- p3–6: retrofit, multimedia, retail media and smart POS specifications, processes and CTAs retained.
- p7–8: six AI shelf concepts selected for the custom-shelves gallery with bilingual conceptual/AI disclosures.
- p9: custom shelf materials/processes retained; branded example attribution held.
- p10: smart-model technical details and explicitly real examples retained.
- p11: three AI models selected after real examples in the smart-models gallery, with bilingual conceptual/AI disclosures.
- p12: activation service, real-looking equipment and two labelled concepts separated.
- p13: promotional games and Scan & Play preserved; dm is only an example of a target retailer. Hidden duplicate text removed from proposed copy.
- p14: both 360 formats and catalog dimensions/capacities preserved; Sky realization unconfirmed.
- p15–16: five Sky AI concepts, including Addiko; no actual event/client claimed.
- p17: final visible Kids Play facts take precedence over superseded text; both useful photographs are selected without importing older text.
- p18: custom interactive systems retained as capability, not unnamed completed projects.
- p19: furniture and charging equipment offer retained, no load ratings invented.
- p20: manufacturing processes/materials retained; award object is not a company accolade.
- p21: integrated process and contact CTA captured in source text; named contacts retained for manual review only; QR excluded.
- No independent video files or standalone vector technical diagrams were embedded for website use. The useful Sky diagram is within a raster composite. Page furniture and process-layout arrows stay in rendered page evidence.

## Complete asset audit


Original filenames, every occurrence, native dimensions, hashes and repeat references are in `manifest/catalog-content.json` and `manifest/extracted-images.json`. The following lists every unique asset.

| ID / page | Clean filename | Class | Safe as realization | Import | Related Solution / usage and notes |
|---|---|---|---|---|---|
| p01-01 / 1 | catalog-2026-p01-01-excluded-ea38d38eb85e.jpg | decorative | False | False | None: Brochure mini-page used in cover montage; not gallery media. |
| p01-02 / 1 | catalog-2026-p01-02-excluded-d34431b4d733.jpg | decorative | False | False | None: Brochure mini-page used in cover montage; not gallery media. |
| p01-03 / 1 | catalog-2026-p01-03-excluded-7ee38a2a6e4e.jpg | decorative | False | False | None: Brochure mini-page used in cover montage; not gallery media. |
| p01-04 / 1 | catalog-2026-p01-04-excluded-dadb7728a89e.jpg | decorative | False | False | None: Brochure mini-page used in cover montage; not gallery media. |
| p01-05 / 1 | catalog-2026-p01-05-excluded-ee0a1d582e57.png | logo | False | False | None: Repeated or older Dev Studio logo; existing site identity is preserved. |
| p03-01 / 3 | catalog-2026-retrofit-retail-shelf-08e6d67cfaef.jpg | real_product | False | True | interactive-screens-retrofit: Photographic product cutout; execution and brand relationship unverified. |
| p03-02 / 3 | catalog-2026-retrofit-refrigerator-4680349c001b.jpg | real_product | False | True | interactive-screens-retrofit: Product illustration; screen retrofit may be composited. Not client evidence. |
| p03-03 / 3 | catalog-2026-retrofit-vending-machine-eae88b451c17.jpg | product_render | False | True | interactive-screens-retrofit: Illustrative device with screen; rendering/compositing inferred, provenance unconfirmed. |
| p04-01 / 4 | catalog-2026-multimedia-retail-display-f632ddde66f3.jpg | real_product | False | True | multimedia-screens: Product cutout, small native width; attribution unconfirmed. |
| p04-02 / 4 | catalog-2026-multimedia-tourism-totem-cb6a2fe76cc1.jpg | real_product | False | True | multimedia-screens: Product cutout; image does not prove an installed location. |
| p04-03 / 4 | catalog-2026-multimedia-dual-screen-58883a22ce54.jpg | real_product | False | True | multimedia-screens: Product cutout; commission unconfirmed. |
| p05-01 / 5 | catalog-2026-retail-media-entrance-concept-3df1305bd70f.jpg | ai_concept | False | True | retail-media-screens: Synthetic-looking scene; AI classification is conservative visual inference, not explicit PDF disclosure. |
| p05-02 / 5 | catalog-2026-retail-media-refrigeration-concept-4d6937d159b2.jpg | ai_concept | False | True | retail-media-screens: Generic Brand Store scene with synthetic features; provenance review required. |
| p05-04 / 5 | catalog-2026-retail-media-checkout-concept-7184fb383ccb.jpg | ai_concept | False | True | retail-media-screens: Synthetic-looking Brand Store checkout; no verified location/client. |
| p06-02 / 6 | catalog-2026-smart-pos-yellow-shelf-visualization-cb340a24d085.jpg | product_render | False | True | smart-pos-shelf: Standalone yellow shelf matches the visible final composite. Image only; obsolete underlying text and tier labels are excluded. |
| p06-03 / 6 | catalog-2026-p06-03-excluded-a2908dd2ad49.jpg | unsuitable | False | False | None: Near-identical red shelf variant with inferior background; clean p06-05 is selected. Archive only. |
| p06-04 / 6 | catalog-2026-p06-04-excluded-2ccbdd5d8472.jpg | unsuitable | False | False | None: Near-identical red shelf variant with inferior background; clean p06-05 is selected. Archive only. |
| p06-05 / 6 | catalog-2026-smart-pos-red-product-shelf-ae8a4bac0d59.jpg | real_product | False | True | smart-pos-shelf: Clean photographic red shelf cutout, also visible in the final composite. Product example, not proof of a commissioned client project. |
| p06-06 / 6 | catalog-2026-smart-pos-shelf-configurations-7c5cebc70947.jpg | product_render | False | True | smart-pos-shelf: Visible final composite combines a rendered-looking yellow shelf and photographic red shelf. Treat composite as illustration. |
| p07-01 / 7 | catalog-2026-plazma-shelf-ai-concept-0719417ca209.jpg | ai_concept | False | True | impressive-custom-shelves: Explicit AI disclosure on p7; brand is not a client. |
| p07-02 / 7 | catalog-2026-einhell-shelf-ai-concept-4e4432873c6a.jpg | ai_concept | False | True | impressive-custom-shelves: Explicit AI disclosure on p7; brand is not a client. |
| p07-03 / 7 | catalog-2026-hell-shelf-ai-concept-71b7f149f449.jpg | ai_concept | False | True | impressive-custom-shelves: Explicit AI disclosure on p7; brand is not a client. |
| p07-04 / 7 | catalog-2026-p07-04-excluded-1a71b92206ab.jpg | logo | False | False | None: Repeated or older Dev Studio logo; existing site identity is preserved. |
| p08-01 / 8 | catalog-2026-tikves-shelf-ai-concept-c6adf560cf7f.jpg | ai_concept | False | True | impressive-custom-shelves: Explicit AI disclosure on p8; brand is not a client. |
| p08-02 / 8 | catalog-2026-patelina-shelf-ai-concept-5a0887622269.jpg | ai_concept | False | True | impressive-custom-shelves: Explicit AI disclosure on p8; brand is not a client. |
| p08-03 / 8 | catalog-2026-bajadera-shelf-ai-concept-38ee9341f69f.jpg | ai_concept | False | True | impressive-custom-shelves: Explicit AI disclosure on p8; brand is not a client. |
| p09-01 / 9 | catalog-2026-bavaria-shelf-empty-visualization-05c90ab4ff0f.jpg | product_render | False | True | impressive-custom-shelves: Render-like empty shelf; p9 has no explicit AI note. Do not assume realization. |
| p09-02 / 9 | catalog-2026-bavaria-shelf-stocked-visualization-ce9e20f0dcd1.jpg | product_render | False | True | impressive-custom-shelves: Render-like stocked variant; not proof of client work. |
| p09-03 / 9 | catalog-2026-carroten-promotional-shelf-89c34a040348.jpg | real_product | False | True | impressive-custom-shelves: Photographic shelf likely physical; production attribution/client status requires confirmation. |
| p10-02 / 10 | catalog-2026-p10-02-excluded-be0f395617a4.jpg | logo | False | False | None: Repeated or older Dev Studio logo; existing site identity is preserved. |
| p10-03 / 10 | catalog-2026-dev-studio-interactive-models-ad50957b725f.jpg | real_product | True | True | smart-interactive-models: p10 explicitly labels these STVARNE DEV STUDIO IZVEDBE. Composite of two real examples; no client or personal identity inferred. |
| p11-01 / 11 | catalog-2026-barni-mascot-ai-concept-cbdf843aeddb.jpg | ai_concept | False | True | smart-interactive-models: Explicit AI disclosure on p11; not a Barni client project. |
| p11-02 / 11 | catalog-2026-waiter-menu-ai-concept-9145167a16f7.jpg | ai_concept | False | True | smart-interactive-models: Explicit AI disclosure on p11. |
| p11-03 / 11 | catalog-2026-chef-model-ai-concept-cf1b25213c63.jpg | ai_concept | False | True | smart-interactive-models: Explicit AI disclosure on p11. |
| p12-01 / 12 | catalog-2026-jelen-table-football-e2a01ad49b4d.jpg | real_product | False | True | brand-activations: Physical product photo; no explicit commission or venue proof. |
| p12-02 / 12 | catalog-2026-cornhole-concept-b6ed5c7873d3.jpg | product_render | False | True | brand-activations: Explicit KONCEPT label; AI authorship not specified. Disclosure mandatory. |
| p12-03 / 12 | catalog-2026-madri-four-in-a-row-dfe05a44f41b.jpg | real_product | False | True | brand-activations: Photographic product; no explicit client attribution. |
| p12-04 / 12 | catalog-2026-jelen-phone-charging-station-d67572defc92.jpg | real_product | False | True | brand-activations: Only 173px wide; unsuitable as large hero. Attribution requires review. |
| p12-05 / 12 | catalog-2026-giant-pong-concept-dd0224501292.jpg | product_render | False | True | brand-activations: Explicit KONCEPT label; AI authorship not specified. Disclosure mandatory. |
| p13-01 / 13 | catalog-2026-interactive-figure-touchscreen-a6847fc59444.jpg | real_product | True | True | smart-interactive-models: Same figure identified as real Dev Studio execution on p10; p13 provides separate cutout. |
| p13-02 / 13 | catalog-2026-domacica-mascot-illustration-ab0e65b6af89.jpg | product_render | False | True | interactive-promotional-games: Highly rendered-looking branded mascot; unlabelled provenance. Not a verified Kraš commission. |
| p13-03 / 13 | catalog-2026-kids-play-duo-cabinets-e8f6b63eca73.jpg | real_product | True | True | kids-play: Own product cross-supported by visible p17 on-location photo and original Dev Studio statement. |
| p14-01 / 14 | catalog-2026-360-video-platform-f9c79af292fe.jpg | real_product | False | True | 360-video-platforms: Product photograph/cutout; event deployment or manufacturer not explicitly proven. |
| p14-02 / 14 | catalog-2026-360-sky-structure-visualization-6fa1934ea1f3.jpg | diagram | False | True | 360-video-platforms: Composite scene visualization and open truss drawing; not an event photograph. |
| p15-01 / 15 | catalog-2026-360-sky-elegant-ai-concept-e6558c0687ce.jpg | ai_concept | False | True | 360-video-platforms: Explicit AI disclosure on p15. |
| p15-02 / 15 | catalog-2026-360-sky-birthday-ai-concept-eed8f82004f6.jpg | ai_concept | False | True | 360-video-platforms: Explicit AI disclosure on p15. |
| p15-04 / 15 | catalog-2026-360-sky-wedding-ai-concept-6defbeac8128.jpg | ai_concept | False | True | 360-video-platforms: Explicit AI disclosure on p15. |
| p16-01 / 16 | catalog-2026-360-sky-corporate-ai-concept-7433df9edbc0.jpg | ai_concept | False | True | 360-video-platforms: Explicit AI disclosure on p16. |
| p16-02 / 16 | catalog-2026-360-sky-addiko-ai-concept-0efd49f316b5.jpg | ai_concept | False | True | 360-video-platforms: Explicit AI disclosure on p16; Addiko Bank is not a supported client relationship. |
| p17-01 / 17 | catalog-2026-kids-play-indoor-zone-9f820587072d.jpg | real_photo | True | True | kids-play: Visible final p17 photograph; location name and installation date not stated. |
| p17-03 / 17 | catalog-2026-kids-play-indoor-zone-alternate-73a95c8f8124.jpg | real_photo | True | True | kids-play: Useful alternate photograph of the same Kids Play product. Image remains valid independently of older hidden text. No location, date or installation count inferred. |
| p18-01 / 18 | catalog-2026-interactive-projection-illustration-2bbe1b2a6e90.jpg | ai_concept | False | True | custom-interactive-systems: Synthetic-looking illustrative scene; origin not explicitly disclosed. Not installation evidence. |
| p18-02 / 18 | catalog-2026-custom-tic-tac-toe-01aaecadc93e.jpg | product_render | False | True | custom-interactive-systems: Product visualization; not evidence of a completed installation. |
| p18-03 / 18 | catalog-2026-custom-four-in-a-row-10a8f4f5fd95.jpg | product_render | False | True | custom-interactive-systems: Product visualization; not evidence of a completed installation. |
| p19-02 / 19 | catalog-2026-phone-charging-lockers-41160cbdc0d8.jpg | real_product | False | True | custom-furniture-equipment: Photographic equipment with Imperial branding; direct commission not stated. |
| p19-03 / 19 | catalog-2026-planted-shelving-visualization-3491c857d483.jpg | product_render | False | True | custom-furniture-equipment: Illustrative furniture with no realized location or provenance. |
| p19-04 / 19 | catalog-2026-metal-wood-table-chairs-c9b488b975ee.jpg | real_product | False | True | custom-furniture-equipment: Product photograph/cutout; maker and commission unconfirmed. |
| p20-02 / 20 | catalog-2026-decorative-partition-doors-ce05413b8c3c.jpg | real_product | False | True | custom-manufacturing: Product cutout in service portfolio; verify fabrication attribution. |
| p20-03 / 20 | catalog-2026-decorative-metal-table-b6e8edb908ef.jpg | real_product | False | True | custom-manufacturing: Product cutout in service portfolio; verify fabrication attribution. |
| p20-04 / 20 | catalog-2026-custom-award-object-dac49c12c24d.jpg | product_render | False | True | custom-manufacturing: Object illustration; never an award received by the company. |
| p21-01 / 21 | catalog-2026-p21-01-excluded-4d79db02822f.png | unsuitable | False | False | None: QR code/page furniture; excluded from gallery and CMS uploads. |

## Full bilingual proposed content


### 1. Interactive Screens / Retrofit

Source pages: [3]. Notes: p3 illustrations do not identify a commissioned client implementation; visible brands are not client records.

#### BHS: Interaktivni ekrani i nadogradnja opreme

Slug: `interaktivni-ekrani-retrofit`
Postojeće police, vending aparate, frižidere i druge uređaje nadograđujemo ekranima i interaktivnim funkcijama.
Postojeća oprema. Potpuno novo iskustvo. Bez zamjene osnovne opreme stvaramo novu komunikacijsku i prodajnu platformu.

##### Integracija prema uređaju
Ugradnju prilagođavamo konstrukciji, prostoru i napajanju. Ekran, nosači, elektronika, interfejs i sadržaj razvijaju se prema potrebama projekta.

##### Sadržaj i interakcija
Video, animacije, meniji, uputstva i promotivne poruke mogu raditi samostalno ili kroz namjenski interaktivni softver. Touch ekran, senzor ili taster mogu pokretati video, audio, LED i mehaničke efekte. Sadržaj se ažurira lokalno ili daljinski, uz opcionu osnovnu analitiku.

##### Od procjene do ugrađenog sistema
Proces počinje pregledom mjera, fotografija, konstrukcije i mogućnosti integracije. Slijede razvoj hardvera i softvera, transport, montaža, testiranje i korisnička obuka.

##### Zatražite procjenu i ponudu
Pošaljite fotografije opreme, mjere i željene funkcije.

#### EN: Interactive Screens / Retrofit

Slug: `interactive-screens-retrofit`
Add screens and interactive functions to existing shelves, vending machines, refrigerators and other equipment.
Existing equipment. A new experience. We turn equipment already in use into a communication and sales platform without replacing its core structure.

##### Integration around the equipment
Installation is adapted to the construction, available space and power supply. Screens, mounts, electronics, interfaces and content are developed around the project.

##### Content and interaction
Video, animation, menus, instructions and promotional messages can run independently or through custom interactive software. Touch, sensors or buttons can trigger video, audio, LED lighting and mechanical effects. Content can be updated locally or remotely, with optional basic analytics.

##### From assessment to installation
We begin with dimensions, photographs, construction details and integration options. Hardware and software development is followed by transport, installation, testing and user training.

##### Request an assessment and quote
Send photographs of the equipment, dimensions and the functions you need.

### 2. Multimedia Screens

Source pages: [4]. Notes: No measured business outcomes or named client implementations on p4.

#### BHS: Multimedijalni ekrani

Slug: `multimedijalni-ekrani`
Ekran, kućište i namjenska aplikacija povezani u kompletan sistem za informisanje, interakciju i prikupljanje podataka.
Ekran je tek početak. Razvijamo kompletne sisteme u kojima su ekran, kućište i aplikacija prilagođeni stvarnoj namjeni: od prezentacije proizvoda i digitalnih vodiča do UX anketa, nagradnih igara i namjenskih sistema.

##### Aplikacije i podaci
Ankete i ocjene obuhvataju uslugu, proizvod i ukupno korisničko iskustvo. Aplikacije mogu prikupljati podatke o interesovanju i potrošnji različitih proizvoda. Kvizovi, prijave, kuponi i interaktivne kampanje dopunjuju promotivnu primjenu.

##### Primjene
Digitalni vodiči povezuju smještaj, gastronomiju, prevoz, mape i gradske sadržaje. Retail sistemi prikazuju kataloge, preporuke, upite i sadržaj prilagođen kupcu. Razvijamo i redomate, parking sisteme, info kioske i druga rješenja po mjeri.

##### Jedan tim za cijelo rješenje
Projektujemo kućište, biramo ekran, razvijamo UX aplikaciju, povezujemo sisteme i pripremamo sadržaj. Proces obuhvata namjenu, dizajn, razvoj, montažu, testiranje, obuku i podršku, uz mogućnost daljih nadogradnji.

##### Zatražite koncept rješenja
Uređaj, funkcije i izgled prilagođavamo projektu.

#### EN: Multimedia Screens

Slug: `multimedia-screens`
Screens, enclosures and custom applications brought together for information, interaction and data collection.
The screen is only the beginning. We develop complete systems with screens, enclosures and applications tailored to their purpose, from product presentations and digital guides to customer experience surveys, promotional games and dedicated systems.

##### Applications and data
Surveys and ratings cover service, products and the overall customer experience. Applications can collect information on product interest and consumption. Quizzes, registrations, coupons and interactive campaigns support promotional use.

##### Applications in context
Digital guides bring together accommodation, dining, transport, maps and city information. Retail systems present catalogs, recommendations, enquiries and relevant content. We also develop queue management systems, parking systems, information kiosks and other custom solutions.

##### One team for the complete system
We design the enclosure, select the screen, develop the application, connect systems and prepare content. The process covers purpose, design, development, installation, testing, training and support, with room for future upgrades.

##### Request a solution concept
The device, functions and appearance are adapted to your project.

### 3. Retail Media Screens

Source pages: [5]. Notes: 50/50 refers to advertising SPACE, not revenue, profit or ROI. Confirm current commercial terms before publication. p5 visuals look synthetic; gallery concepts only, no suitable non-concept hero available.

#### BHS: Retail Media ekrani

Slug: `retail-media-ekrani`
Povezani LED ekrani i centralizovano upravljanje kampanjama duž kupčevog puta kroz prodajni prostor.
Prodajni prostor postaje digitalni medij. Postavljamo i povezujemo LED ekrane od ulaza i kasa do akcijskih zona i rashladnih vitrina. Centralizovano upravljanje omogućava izmjenu internih i partnerskih kampanja, a oglasni prostor može biti dodatna poslovna mogućnost.

##### Tri modela saradnje
Prodaja obuhvata kupovinu opreme uz instalaciju, povezivanje i podršku. Rentanje obuhvata mjesečni najam ekrana, upravljanja i tehničke podrške. Katalog opisuje i partnerski model: Dev Studio obezbjeđuje opremu, a reklamni prostor dijeli se 50/50. Konkretan model dogovara se za lokaciju i obim mreže.

##### Od pilot lokacije do aktivne mreže
Definišemo pozicije, obim i testni period, zatim montiramo i povezujemo opremu. Pripremaju se sadržaj, termini i oglasni paketi, uz evidenciju emitovanja i optimizaciju.

##### Ekrani, sadržaj i podrška
Usluga može obuhvatiti opremu, upravljanje mrežom, kampanje i tehničku podršku, uz moguću integraciju sa POS sistemima, senzorima i analitikom. Pozicije uključuju ulaze, kase, akcijske zone, frižidere, izloge, prolaze, info pultove i parking.

##### Zatražite pilot koncept
Pozicije, model saradnje i obim mreže prilagođavamo klijentu.

#### EN: Retail Media Screens

Slug: `retail-media-screens`
Connected LED screens and centrally managed campaigns along the customer journey through retail spaces.
The retail space becomes a digital medium. We install and connect LED screens from entrances and checkouts to promotional areas and refrigerated displays. Central management supports changing in-house and partner campaigns; advertising space can provide an additional business opportunity.

##### Three ways to work together
Purchase includes equipment, installation, connectivity and support. Rental covers a monthly package of screens, management and technical support. The catalog also describes a partnership in which Dev Studio supplies the equipment and advertising space is split 50/50. The arrangement is agreed for the location and network scope.

##### From pilot location to active network
We define positions, scope and a trial period, then install and connect the equipment. Content, schedules and advertising packages are prepared alongside playback reporting and optimization.

##### Screens, content and support
The service can cover equipment, network management, campaigns and technical support, with possible POS, sensor and analytics integrations. Locations include entrances, checkouts, promotional areas, refrigerators, windows, aisles, information desks and parking areas.

##### Request a pilot concept
Screen positions, the collaboration model and network size are tailored to the client.

### 4. Smart POS Shelf

Source pages: [6]. Notes: User override applied: obsolete tier classification is excluded from both locales and import fields. Capabilities and collaboration models remain. 19-inch base screen versus screen-by-request is preserved as standard versus customization, not contradictory fixed promises. Standalone shelf images match products in the visible final composite; underlying obsolete text is not used.

#### BHS: Pametna POS polica

Slug: `pametna-pos-polica`
Modularna POS polica koja povezuje proizvod, ekran, svjetlo i opcione interaktivne funkcije.
Polica koja ne čeka da bude primijećena. Pokret, svjetlo i sadržaj na ekranu predstavljaju proizvod na prodajnom mjestu. Dizajn, brending i konfiguracija prilagođavaju se proizvodu i prostoru, uz modularnu i višekratnu upotrebu.

##### Osnovna konfiguracija
Samostojeća polica dolazi u maloj izvedbi V 140 × Š 60 × D 40 cm ili standardnoj V 180 × Š 60 × D 40 cm. Tehnička tabela navodi ekran od 19 inča i samostalni reklamni plejer / USB reprodukciju fotografija, videa i animacija. Ekran i konačna konfiguracija mogu se prilagoditi projektu. Broj i raspored polica zavise od proizvoda.

##### Mogućnosti nadogradnje
Osnovu čine modularna konstrukcija, ekran, USB reprodukcija i brending. Opcije uključuju pokret, programirano ponašanje, senzore, naprednu rasvjetu, posebne dimenzije, raspored polica, interaktivni ekran i namjensku elektroniku.

##### Model saradnje
Kupovina je namijenjena stalnim lokacijama. Iznajmljivanje obuhvata fleksibilan period, pripremu i podršku za kampanje. Izrada po narudžbi omogućava novu konstrukciju i funkcije.

##### Zatražite koncept i ponudu
Pošaljite proizvod, cilj kampanje i približne mjere prostora.

#### EN: Smart POS Shelf

Slug: `smart-pos-shelf`
A modular POS shelf combining product presentation, a screen, lighting and optional interactive functions.
A shelf designed to be noticed. Movement, light and on-screen content present the product at the point of sale. Design, branding and configuration are tailored to the product and space, using a modular, reusable structure.

##### Base configuration
The freestanding shelf is offered in a small version, H 140 × W 60 × D 40 cm, and a standard version, H 180 × W 60 × D 40 cm. The specification lists a 19-inch screen and a standalone advertising player / USB playback for photographs, video and animation. The screen and final configuration can be adapted to the project. Shelf quantity and arrangement depend on the product.

##### Upgrade options
The base combines a modular structure, screen, USB playback and branding. Options include movement, programmed behavior, sensors, advanced lighting, custom dimensions and shelf arrangements, an interactive screen and dedicated electronics.

##### Ways to work together
Purchase suits permanent locations. Rental offers a flexible period with preparation and support for campaigns. Custom development can introduce a new structure and functions.

##### Request a concept and quote
Send the product, campaign objective and approximate space dimensions.

### 5. Brand Activations

Source pages: [12]. Notes: Giant Pong and Cornhole are explicitly tagged KONCEPT on p12. AI origin is unspecified; gallery images retain conceptual disclosures. Brand presence does not prove a direct client relationship. The phone charger is only 173px wide: supplementary gallery detail, never hero.

#### BHS: Brend aktivacije

Slug: `brend-aktivacije`
Brendirane igre i funkcionalne zone za festivale, koncerte, sportske događaje i promocije.
Projektujemo, izrađujemo i iznajmljujemo opremu za događaje. Od igre i takmičenja do punjenja telefona, zonu prilagođavamo brendu, prostoru i trajanju kampanje.

##### Igre i korisne zone
Katalog prikazuje veliku igru 4 in a Row, brendirani stoni fudbal i punjače za telefone. Giant Pong i Cornhole prikazani su kao koncepti, a ne kao dokaz realizovanih instalacija.

##### Od ideje do događaja
Koncept i dizajn obuhvataju izbor igre, dimenzije i vizuelni identitet. Izrada i brending povezuju konstrukciju, štampu i završnu obradu. Rental i logistika obuhvataju najam, transport, montažu i preuzimanje.

##### Primjena
Zone se mogu prilagoditi festivalima, koncertima, sportu i promocijama u otvorenim i zatvorenim prostorima. Jedan događaj može povezati igru, punjenje uređaja i više brendiranih tačaka kontakta.

##### Zatražite koncept brend aktivacije
Izrada, prodaja ili rental prema projektu.

#### EN: Brand Activations

Slug: `brand-activations`
Branded games and useful event zones for festivals, concerts, sports events and promotions.
We design, build and rent equipment for events. From games and competitions to phone charging, each zone is tailored to the brand, space and campaign duration.

##### Games and useful event zones
The catalog shows a large 4 in a Row game, branded table football and phone charging stations. Giant Pong and Cornhole are presented as concepts, not as evidence of completed installations.

##### From idea to event
Concept and design cover the choice of game, dimensions and visual identity. Production and branding bring together construction, printing and finishing. Rental and logistics include hire, transport, installation and collection.

##### Applications
Zones can be adapted to festivals, concerts, sporting events and promotions, indoors or outdoors. A single event can connect games, device charging and several branded points of interaction.

##### Request a brand activation concept
Custom production, purchase or rental to suit the project.

### 6. 360 Video Platforms

Source pages: [14, 15, 16]. Notes: p14 capacities are catalog specifications, not verified installation counts or certified occupancy. p14 Sky composite is a disclosed visualization/diagram; p15–16 gallery concepts retain explicit AI captions. Addiko is only a concept brand, never a client.

#### BHS: 360 Video platforme

Slug: `360-video-platforme`
Kompaktna 360 video platforma i 360 Sky Studio za događaje, promocije i brend aktivacije.
Od malih grupa do cijele scene. Dvije izvedbe omogućavaju da kamera kruži oko učesnika ili iznad grupe i scene.

##### 360 Video platforma
Kompaktna postavka za do četiri osobe. Kamera kruži oko gostiju na postolju i stvara dinamičan video sa usporenim kadrovima i efektima. Platforma i grafički elementi mogu se brendirati.

##### 360 Sky Studio
Katalog opisuje scenu prečnika 5 m za oko 20 osoba. Kamera kruži iznad grupe, scene ili vozila. Konstrukcija može biti otvorena ili sa panelima i brendiranom pozadinom. Vizuali Sky izvedbi služe za ilustraciju rješenja; stranice 15 i 16 izričito su AI-generisani konceptualni prijedlozi, a ne završeni događaji ili klijentski projekti.

##### Model saradnje
Iznajmljivanje i realizacija mogu obuhvatiti transport, montažu, tehničku pripremu, brendirane elemente i scenu prilagođenu prostoru. Primjene uključuju proslave, promocije, sajmove, korporativne događaje, grupe, proizvode i automobile. Konačna izvedba zavisi od prostora i tehničkih mogućnosti.

##### Zatražite termin i ponudu
Pošaljite datum, lokaciju i tip događaja.

#### EN: 360 Video Platforms

Slug: `360-video-platforms`
A compact 360 video platform and 360 Sky Studio for events, promotions and brand activations.
From small groups to an entire scene. Two formats allow the camera to move around participants or above a group and its surroundings.

##### 360 Video platform
A compact setup for up to four people. The camera circles guests on a platform to create dynamic video with slow-motion footage and effects. The platform and graphic elements can be branded.

##### 360 Sky Studio
The catalog describes a 5 m diameter scene for around 20 people. The camera moves above a group, scene or vehicle. The structure can be open or fitted with panels and a branded backdrop. Sky visuals illustrate the proposed format; pages 15 and 16 are explicitly AI-generated conceptual proposals, not completed events or client projects.

##### Collaboration model
Rental and delivery can cover transport, installation, technical preparation, branded elements and a scene adapted to the space. Applications include celebrations, promotions, fairs, corporate events, groups, products and cars. The final setup depends on the space and technical feasibility.

##### Request availability and a quote
Send the date, location and type of event.

### 7. Interactive Promotional Games

Source pages: [13]. Notes: dm is only an example of a suitable retail chain, not an identified client. Kraš/Domaćica lion p13-02 is a disclosed visualization, not a verified commission. Duplicate underlying paragraph on p13 is not repeated.

#### BHS: Interaktivne promotivne igre

Slug: `interaktivne-promotivne-igre`
Igre i uređaji za stalne lokacije, događaje i retail kampanje, sa aktivacijom prilagođenom namjeni.
Razvijamo i proizvodimo igre čiji se uređaj, brending, sadržaj i način aktivacije prilagođavaju cilju. Moguća je slobodna igra ili pokretanje skeniranjem računa, QR koda ili bona.

##### Prodaja, izrada po narudžbi i rental
Za stalne lokacije nudimo gotov uređaj ili kompletno rješenje. Izrada po narudžbi obuhvata kućište, elektroniku, senzore i softver. Najam za kampanje povezuje brending, postavljanje i podršku. Primjeri primjene obuhvataju Kids Play, tematska kućišta i retail aktivaciju.

##### Scan & Play
Kupac dobija kod nakon kupovine. Uređaj očitava QR kod ili barkod i pokreće igru prema definisanim pravilima. Rezultat može biti prikaz bodova, poruka ili kupon kampanje. Nagradne igre realizuju se prema dogovoru.

##### Primjena
Izgled, sadržaj, trajanje i aktivaciju prilagođavamo brendu i lokaciji: drogerijama i retail lancima, tržnim centrima, sajmovima, promocijama i brend aktivacijama.

##### Zatražite koncept promotivne igre
Prodaja, izrada po narudžbi ili rental.

#### EN: Interactive Promotional Games

Slug: `interactive-promotional-games`
Games and devices for permanent locations, events and retail campaigns, with activation tailored to their purpose.
We develop and manufacture games with devices, branding, content and activation tailored to the objective. They can offer free play or start when a receipt, QR code or voucher is scanned.

##### Purchase, custom development and rental
Permanent locations can use a ready-made device or a complete system. Custom development covers enclosures, electronics, sensors and software. Campaign rental combines branding, installation and support. Applications include Kids Play, themed enclosures and retail activations.

##### Scan & Play
The customer receives a code after a purchase. The device reads a QR code or barcode and starts the game according to defined rules. The result can be a score, message or campaign coupon. Prize games are developed by agreement.

##### Applications
Appearance, content, duration and activation are adapted to the brand and location: drugstores and retail chains, shopping centers, fairs, promotions and brand activations.

##### Request a promotional game concept
Purchase, custom development or rental.

### 8. Kids Play

Source pages: [13, 17]. Notes: Final visible product information and explicit user-confirmed facts take precedence over older hidden text. p17-03 is a usable alternate photograph of the same product, independent of obsolete text layers; no venue or installation count inferred. No revenue, network size, safety certification or quantified impact resistance is claimed.

#### BHS: Kids Play

Slug: `kids-play`
Originalni Dev Studio arcade sistem za djecu od 3 do 11 godina, sa oko 30 edukativnih i zabavnih igrica i offline radom.
Domaća arkadna igra, original Dev Studio. Proizvedeno u Bosni i Hercegovini (Made in BiH). Kids Play je interaktivni arcade sistem za djecu od 3 do 11 godina. Oko 30 edukativnih i zabavnih igrica dostupno je u kontrolisanom digitalnom okruženju.

##### Osnovne karakteristike
Samostojeći dječiji arcade cabinet koristi 24-inčni ekran na dodir, otporan na udarce. Radi potpuno samostalno bez internet veze i bez pristupa vanjskim online sadržajima. Može se koristiti sa sistemom za naplatu ili bez njega. Predviđen je za unutrašnje porodične prostore, tržne centre i igraonice. Sjedalice i uređenje mini zone dostupni su po zahtjevu.

##### Od jednog aparata do Kids Play zone
Standard je kompaktna samostojeća jedinica. Duo zona povezuje dva aparata sa odvojenim ekranima i opcionalnim sjedenjem. Prilagođena izvedba omogućava vizuelno i sadržajno prilagođavanje lokaciji ili partneru.

##### Model saradnje
Kupovinom aparat ostaje u vlasništvu kupca. Mogući su najam ili partnersko postavljanje po dogovoru, kao i prilagođena izvedba, sadržaj ili brendiranje.

##### Zatražite ponudu i prijedlog postavljanja
Za jednu lokaciju ili mrežu objekata.

#### EN: Kids Play

Slug: `kids-play`
An original Dev Studio arcade system for children aged 3–11, with around 30 educational and entertaining games and offline operation.
A locally developed arcade product, original to Dev Studio. Made in Bosnia and Herzegovina (Made in BiH). Kids Play is an interactive arcade system for children aged 3–11. Around 30 educational and entertaining games are available in a controlled digital environment.

##### Core features
The freestanding children's arcade cabinet uses an impact-resistant 24-inch touchscreen. It works independently without an internet connection or access to external online content. It can be supplied with or without a payment system. It is intended for indoor family spaces, shopping centers and play centers. Seating and a small play-zone layout are available on request.

##### From one cabinet to a Kids Play zone
The standard format is a compact freestanding unit. A Duo zone combines two cabinets with separate screens and optional seating. A custom version allows the appearance and content to be adapted to the location or partner.

##### Ways to work together
Purchase gives the buyer ownership of the cabinet. Rental or a partnership placement can be agreed, alongside custom construction, content or branding.

##### Request a quote and placement proposal
For a single location or a network of venues.

### 9. Smart Interactive Models

Source pages: [10, 11, 13]. Notes: p10 explicitly says STVARNE DEV STUDIO IZVEDBE. Real examples lead; p11 concepts follow with explicit AI captions. Do not identify the depicted person or infer a client from likeness/branding. No features assigned to an individual example without confirmation.

#### BHS: Pametne interaktivne makete

Slug: `pametne-interaktivne-makete`
Makete po mjeri koje povezuju oblik, senzore, svjetlo, zvuk i opcione ekrane ili mehanički pokret.
Makete koje objašnjavaju i reaguju. Proizvod, lik, objekat ili proces pretvaramo u aktivnu prezentaciju, uz oblik, dimenzije i brending prema projektu.

##### Tehničke mogućnosti
Konstrukcija može koristiti MDF, PVC/Forex, akril, metal i štampu. Aktivacija je moguća senzorom pokreta, tasterom ili touch ekranom. Reakcije uključuju LED, audio, video i programirane sekvence. Ekran i namjenski softver su opcioni, a mehanički pokreti i fizički efekti razvijaju se po potrebi. Napajanje je 220 V ili baterijsko, zavisno od izvedbe.

##### Nivoi interakcije
Svjetlo i audio mogu se aktivirati senzorom. Interaktivna izvedba povezuje senzor, taster ili ekran sa definisanim sekvencama. Potpuno prilagođena izvedba može uključiti softver, posebnu mehaniku i scenografiju.

##### Model saradnje i primjena
Kupovina odgovara stalnim postavkama, showroomima, muzejima i edukaciji. Najam je moguć za kampanje i sajmove, uz pripremu sadržaja i podršku. Razvoj po narudžbi objedinjuje dizajn, konstrukciju, elektroniku, audio, softver i brending.

##### Stvarne izvedbe i koncepti
Stranica 10 prikazuje stvarne Dev Studio izvedbe. Kuvar, konobar sa digitalnim menijem i Barni maskota sa stranice 11 su AI-generisani konceptualni prijedlozi, a ne realizovani projekti.

##### Zatražite koncept i ponudu
Pošaljite ideju, cilj prezentacije i planirani prostor.

#### EN: Smart Interactive Models

Slug: `smart-interactive-models`
Custom models combining physical form, sensors, lighting, sound and optional screens or mechanical movement.
Models that explain and respond. We turn a product, character, object or process into an active presentation, with form, dimensions and branding developed for the project.

##### Technical possibilities
Construction can use MDF, PVC/Forex, acrylic, metal and printed graphics. Activation can use a motion sensor, button or touchscreen. Responses include LED lighting, audio, video and programmed sequences. Screens and dedicated software are optional; mechanical movements and physical effects can be developed as required. Power is 220 V or battery-based, depending on the design.

##### Levels of interaction
Light and audio can be sensor-activated. An interactive version connects sensors, buttons or a screen with defined sequences. Fully custom development can add software, special mechanisms and scenography.

##### Collaboration and applications
Purchase suits permanent displays, showrooms, museums and educational settings. Rental is possible for campaigns and fairs, with content preparation and support. Custom development combines design, construction, electronics, audio, software and branding.

##### Real implementations and concepts
Page 10 shows real Dev Studio implementations. The chef, digital-menu waiter and Barni mascot on page 11 are AI-generated conceptual proposals, not completed projects.

##### Request a concept and quote
Send your idea, presentation objective and intended space.

### 10. Custom Projects / Custom Interactive Systems

Source pages: [18]. Notes: p18 images are illustrative; origin/realization not verified. Projection image is not evidence of a Dev Studio installation.

#### BHS: Projekti i interaktivni sistemi po narudžbi

Slug: `interaktivni-sistemi-po-narudzbi`
Razvoj pojedinačnih uređaja, projektorskih, touch, senzorskih i mehaničkih igara prilagođenih prostoru.
Razvijamo interaktivnu opremu i igre po mjeri za igraonice i zabavne prostore. Projektorske igre, touch ekrane, senzore i klasične igre u modernoj izvedbi prilagođavamo prostoru, namjeni i vizuelnom identitetu.

##### Igre i sistemi
Interaktivni pod i zid povezuju senzorski sistem i sadržaje za igru. Touch rješenja obuhvataju aplikacije, ekrane i kućišta po mjeri. Mehaničke igre, uključujući 4 in a Row i Tic-Tac-Toe / iks-oks, mogu se izraditi od drveta, metala i pločastih materijala, u zidnoj ili samostojećoj izvedbi prema projektu.

##### Od zahtjeva do instalacije
Definišemo namjenu, prostor i budžet, zatim izgled, dimenzije i način igre. Izrada povezuje mehaniku, elektroniku i softver, uz montažu, testiranje i podršku.

##### Jedan uređaj ili interaktivna zona
Rješenja se prilagođavaju igraonicama, hotelima, restoranima, tržnim centrima, čekaonicama i događajima.

##### Zatražite koncept uređaja
Dimenzije, izgled i funkcije prilagođavamo projektu.

#### EN: Custom Projects / Custom Interactive Systems

Slug: `custom-interactive-systems`
Custom development of devices, projection, touch, sensor-based and mechanical games adapted to the space.
We develop custom interactive equipment and games for play centers and entertainment spaces. Projection games, touchscreens, sensors and contemporary versions of classic games are adapted to the space, purpose and visual identity.

##### Games and systems
Interactive floors and walls combine sensing systems with game content. Touch solutions cover custom applications, screens and enclosures. Mechanical games, including 4 in a Row and Tic-Tac-Toe, can use wood, metal and sheet materials, in wall-mounted or freestanding versions to suit the project.

##### From requirements to installation
We define the purpose, space and budget, then the appearance, dimensions and interaction. Production combines mechanics, electronics and software, followed by installation, testing and support.

##### One device or an interactive zone
Solutions can be adapted to play centers, hotels, restaurants, shopping centers, waiting areas and events.

##### Request a device concept
Dimensions, appearance and functions are tailored to the project.

### 11. Impressive Custom Shelves

Source pages: [7, 8, 9]. Notes: User grouping Production retained despite catalog grouping. Bavaria is presented as product visualization; the six p7–8 concepts carry explicit AI disclosures. Carroten is a physical product example, not an asserted Dev Studio client commission.

#### BHS: Impresivne police po mjeri

Slug: `impresivne-police-po-mjeri`
Prodajne i promotivne police čiji su oblik, materijali, brending i raspored prilagođeni proizvodu i prostoru.
Proizvod u centru pažnje. Razvijamo police prilagođene brendu, proizvodu i prostoru. Oblik, materijali, dimenzije i završna obrada definišu se za svaki projekat.

##### Konstrukcija i materijali
Samostojeća, zidna, pultna ili modularna izvedba bira se prema proizvodu, kapacitetu i prostoru. Mogu se kombinovati drvo, metal, plastika, pleksiglas, kompozitne ploče i završne obrade usklađene s konceptom.

##### Brending kao dio konstrukcije
Posebni oblici, tematski detalji i raspored polica povezuju se sa bojama, grafikama, 3D elementima, gravurom i štampom. Police mogu služiti trgovinama, sajmovima, kampanjama i brend aktivacijama.

##### Od koncepta do postavljene police
Idejno rješenje polazi od mjera, proizvoda, brenda i namjene. Slijede konstrukcija, obrada i brendiranje, zatim isporuka, montaža i završna provjera.

##### Konceptualni prijedlozi
Primjeri za Einhell, Plazmu, Hell, Kraš Bajaderu, Patelinu i Tikveš na stranicama 7 i 8 su izričito označeni kao AI-generisani konceptualni prijedlozi. Ne predstavljaju završene klijentske projekte. Konačan izgled prilagođava se proizvodu, prostoru, tehničkim mogućnostima i brendu.

##### Zatražite koncept i ponudu
Pošaljite proizvod, mjere prostora i željeni rok.

#### EN: Impressive Custom Shelves

Slug: `impressive-custom-shelves`
Retail and promotional shelves with form, materials, branding and arrangement tailored to the product and space.
The product takes center stage. We develop shelves around the brand, product and space. Form, materials, dimensions and finish are defined for each project.

##### Structure and materials
Freestanding, wall-mounted, countertop or modular designs are selected around the product, capacity and space. Wood, metal, plastic, acrylic, composite boards and finishes can be combined to suit the concept.

##### Branding within the structure
Distinctive shapes, themed details and shelf arrangements work with colors, graphics, three-dimensional elements, engraving and printing. Shelves can serve shops, fairs, campaigns and brand activations.

##### From concept to installed shelf
The concept begins with dimensions, products, brand and purpose. Construction, processing and branding are followed by delivery, installation and final checks.

##### Conceptual proposals
The Einhell, Plazma, Hell, Kraš Bajadera, Patelina and Tikveš examples on pages 7 and 8 are explicitly identified as AI-generated conceptual proposals. They are not completed client projects. The final appearance is adapted to the product, space, technical feasibility and brand.

##### Request a concept and quote
Send the product, space dimensions and target deadline.

### 12. Custom Furniture & Equipment

Source pages: [19]. Notes: Imperial is visible on equipment but no direct client relationship is stated. No numeric load ratings supplied.

#### BHS: Mobilijar i oprema po mjeri

Slug: `mobilijar-i-oprema-po-mjeri`
Mobilijar, dekorativne pregrade i funkcionalna oprema od metala, drveta i kombinovanih materijala.
Projektujemo i izrađujemo klupe, stolice, stolove, ormariće, dekorativne police i pregrade sa zelenilom. Namjena, prostor i vizuelni identitet određuju rješenje.

##### Konstrukcija prema upotrebi
Dimenzije, nosivost, način korištenja i detalji definišu se za svaki proizvod. Materijali i završna obrada prilagođavaju se unutrašnjim ili spoljašnjim uslovima.

##### Mobilijar i posebna oprema
Klupe, stolice i stolovi mogu se koristiti u javnim, poslovnim, ugostiteljskim i privatnim prostorima. Police sa zelenilom namijenjene su kafićima, restoranima, hotelima i kancelarijama. Ormarići i posebni elementi razvijaju se za punjenje telefona, odlaganje i druge namjene.

##### Od skice do završenog proizvoda
Koncept obuhvata namjenu, mjere, materijale i izgled. Izrada povezuje obradu, zavarivanje, sklapanje i završnu obradu. Realizacija uključuje transport, postavljanje i završnu provjeru.

##### Zatražite koncept i ponudu
Pošaljite skicu, mjere prostora i željenu namjenu.

#### EN: Custom Furniture & Equipment

Slug: `custom-furniture-equipment`
Furniture, decorative partitions and functional equipment in metal, wood and combined materials.
We design and build benches, chairs, tables, cabinets, decorative shelves and planted partitions. Purpose, space and visual identity shape the solution.

##### Construction around use
Dimensions, load requirements, use and details are defined for each product. Materials and finishes are selected for indoor or outdoor conditions.

##### Furniture and dedicated equipment
Benches, chairs and tables can serve public, commercial, hospitality and private spaces. Planted shelving suits cafés, restaurants, hotels and offices. Cabinets and special elements are developed for phone charging, storage and other purposes.

##### From sketch to finished product
The concept defines purpose, dimensions, materials and appearance. Production connects machining, welding, assembly and finishing. Delivery includes transport, installation and final checks.

##### Request a concept and quote
Send a sketch, dimensions of the space and intended use.

### 13. Custom Manufacturing

Source pages: [20]. Notes: No machines, tolerances, batch capacities or material thicknesses invented. Bespoke award shown on p20 is a manufactured object, not an award WON by Dev Studio.

#### BHS: Proizvodnja po narudžbi

Slug: `proizvodnja-po-narudzbi`
CNC obrada, lasersko rezanje, zavarivanje, sklapanje i završna obrada za pojedinačne proizvode, prototipe i serije.
Jedan komad, prototip ili serija. Izrađujemo proizvode prema skici, uzorku ili tehničkoj dokumentaciji, povezujući CNC glodalicu, CNC laser, zavarivanje, sklapanje i završnu obradu.

##### Tehnička priprema i obrada
Razrađujemo dimenzije, spojeve i materijale. Rezanje, graviranje, bušenje, oblikovanje, spajanje i sklapanje objedinjeni su u procesu prema projektu.

##### Materijali i završna izrada
Obrađujemo metal, drvo, plastiku i pleksiglas, uključujući MDF, šperploču, kompozite i kombinacije po zahtjevu. Završetak može uključiti zavarivanje, brušenje, farbanje, sklapanje i pripremu za montažu.

##### Od upita do proizvoda
Priprema počinje namjenom, količinom, mjerama i materijalima. Slijede precizna izrada i dorada, zatim kontrola, pakovanje, transport ili montaža.

##### Pošaljite skicu i zatražite ponudu
Navedite količinu, materijal, dimenzije i željeni rok.

#### EN: Custom Manufacturing

Slug: `custom-manufacturing`
CNC machining, laser cutting, welding, assembly and finishing for individual products, prototypes and production runs.
One item, a prototype or a production run. We manufacture from a sketch, sample or technical documentation, bringing together CNC routing, CNC laser cutting, welding, assembly and finishing.

##### Technical preparation and processing
We develop dimensions, joints and material choices. Cutting, engraving, drilling, shaping, joining and assembly are combined around the project.

##### Materials and finishing
Materials include metal, wood, plastics and acrylic, as well as MDF, plywood, composites and combinations specified for the project. Finishing can include welding, sanding, painting, assembly and preparation for installation.

##### From enquiry to finished product
Preparation starts with purpose, quantity, dimensions and materials. Production and refinement are followed by inspection, packing, transport or installation.

##### Send a sketch and request a quote
Include the quantity, material, dimensions and target deadline.
