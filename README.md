# Dev Studio website foundation

Read [PROJECT_BRIEF.md](PROJECT_BRIEF.md) before making product or design decisions. This setup provides Next.js, TypeScript, Payload CMS, PostgreSQL, and Tailwind CSS in one application. The core CMS content model supports BHS and English. The homepage is an English visual prototype using local content; frontend localization and CMS content integration are future work.

## Homepage prototype

`src/components/home/HomePrototype.tsx` contains all ten homepage sections, navigation, project and Story previews, Resources information, and the project-enquiry preview. `src/app/(frontend)/globals.css` provides the responsive design and locally rendered abstract industrial form studies. These are visual placeholders, not photographs or final product representations; no clients, results, or metrics are invented.

GSAP animates the hero and scroll-driven process with cleanup and a reduced-motion fallback. Native anchors and dialogs provide keyboard-accessible navigation and previews. Project CTAs open an informational panel linking to the current official website; no enquiry data is collected or submitted. The homepage does not query Payload. CMS routes and styles remain separate, and no CMS schema changes are included. The temporary wordmarks and visual studies should be replaced with approved branding and photography during final content implementation.

## Local setup

1. Use Node.js 22 or newer and npm.
2. Install dependencies with `npm ci` (the lockfile records exact versions).
3. Provide a running PostgreSQL database dedicated to this application.
4. Copy `.env.example` to `.env` and replace both placeholders. Use a strong random `PAYLOAD_SECRET` of at least 32 characters and a valid `DATABASE_URL`. Generate a secret locally with `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`.
5. Run `npm run dev`.
6. Open `http://localhost:3000` for the placeholder and `http://localhost:3000/admin` to create the first CMS administrator.

Environment files are ignored by Git except `.env.example`. Never put real credentials in the example or in source code. Both variables are server-only and must also be provided for builds and Payload CLI commands. Missing or unchanged placeholder values cause an explicit configuration error. No database or administrator credentials are seeded.

## Structure

- `src/app/(frontend)`: public App Router layout, placeholder, and Tailwind stylesheet.
- `src/app/(payload)`: Payload admin UI, server functions, REST API, and GraphQL API. Payload styling is separate from the frontend Tailwind import.
- `src/payload.config.ts`: shared CMS configuration, PostgreSQL adapter, and environment validation.
- `src/collections/Users.ts`: authenticated CMS administrators. All accounts have admin privileges at this stage; public user registration is denied after first-user setup.
- `src/payload-types.ts`: generated CMS TypeScript types.
- `src/collections`: Users plus Projects, Stories, Solutions, Downloads, Clients, and Media.
- `src/access/content.ts`: authenticated writes, public asset reads, and published-only editorial reads.
- `src/fields/content.ts`: reusable content fields and slug, URL, and year validation.
- `src/migrations`: generated initial and core-content PostgreSQL migrations and schema snapshots.

## Core CMS content model

| Collection | Content |
| --- | --- |
| Projects | Localized title, slug, industry, services, short description and rich content; client, year, technologies, gallery, uploaded/external video, related solution, downloads, featured flag, and draft/published status. |
| Stories | Localized title, slug, excerpt and rich content; six story types, cover image, gallery, uploaded/external video, related projects and solutions, downloads, featured flag, and draft/published status. |
| Solutions | Localized title, slug, short description and rich content; five solution groups, image/video hero, gallery, reverse project/story relationships, downloads, and draft/published status. |
| Downloads | PDF upload with localized title, category (catalog, product/flyer, thematic brochure), file language, thumbnail, year, related solution, and featured flag. Create one record per file language. |
| Clients | Name, image logo, HTTP(S) website, localized industry, and featured flag. |
| Media | JPEG, PNG, WebP, AVIF, GIF, MP4, WebM, or QuickTime upload with localized accessible description and caption. |

Content locales are `bhs` (default) and `en`, with automatic fallback disabled. Titles, slugs, editorial text, and captions are translated; identifiers, technical facts, and relationships are shared. Slugs are entered explicitly and must be unique per collection/locale. CMS content localization does not yet create localized frontend routes.

Projects, Stories, and Solutions use Payload drafts and retain up to 50 versions per document. Publication status is shared across languages; independent per-language publishing is not enabled. Review translations before publishing. Anonymous API reads are restricted to published editorial records, and version history and all writes require an authenticated administrator. Payload Local API calls bypass access by default; use `overrideAccess: false` when serving public content.

Solutions' related projects and stories are reverse joins: edit `Projects.relatedSolution` or `Stories.relatedSolutions` to maintain those links. Other relationships are explicitly curated. Media selectors restrict image-only uses such as logos and galleries; video fields support a media upload and/or an HTTP(S) URL.

Lexical provides rich-text editing. Sharp handles image processing. Uploaded files live in ignored `media/assets` and `media/downloads` folders. Mount the repository's `media` directory on persistent storage when deploying and include it in backups. Media and Downloads are public assets without drafts; do not upload confidential files. No sample content is seeded.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start local Next.js and Payload together. |
| `npm run build` | Create a production build. |
| `npm start` | Run the production build locally. |
| `npm run lint` | Run ESLint. |
| `npm run typecheck` | Check TypeScript. |
| `npm run generate:types` | Regenerate CMS types after schema changes. |
| `npm run generate:importmap` | Regenerate the admin component import map. |
| `npm run migrate:create` | Create a database migration for review. |
| `npm run migrate` | Apply pending migrations. |

Payload's PostgreSQL adapter uses schema push in development. Use a dedicated development database, not production. The initial and core-content migrations are generated but have not been applied here. Review and apply migrations as part of the release process. Do not mix development schema push with production migration history.

## Hosting preparation

Next.js standalone output is enabled for future self-hosting through Coolify. No deployment, domain changes, or Coolify configuration is included. The planned development domain is `https://new.devstudio.biz`; production will later use `https://devstudio.biz`. The placeholder is marked noindex; revisit this when launching the actual website. Supply environment variables through the hosting platform and provision PostgreSQL before running the CMS.

## Foundation verification

The initial setup passed Payload type generation, admin import-map generation, ESLint, TypeScript checking, and the Next.js production build. The build was checked with a temporary process-only secret and a dummy database URL; no real credentials were written to disk. PostgreSQL was not available locally, so database connectivity, schema creation, and the first-admin/login flow still require a real database and environment values.

After adding Lexical and Sharp, installation reports 13 dependency findings (1 low, 12 moderate; no high or critical). The existing findings involve Payload account-unlock access, DOMPurify through Monaco, and an older esbuild through Drizzle tooling. A non-breaking `npm audit fix` during foundation setup did not clear them. Recheck upstream fixes before deployment; do not use the suggested force fix, which downgrades the PostgreSQL adapter incompatibly. This foundation has only trusted administrator accounts and explicitly defines unlock access.

Core content validation passed type generation, import-map generation, migration generation, TypeScript, and the production build. Lint has no errors and eight unused-parameter warnings in CLI-generated migrations. Payload also warns that no email adapter is configured. Live database migration, CRUD, upload, and publishing checks require a running PostgreSQL database and have not been performed here.

ESLint 9 is pinned because plugins in the current Next.js ESLint configuration do not yet declare ESLint 10 compatibility. npm reports its deprecation, plus deprecated transitive esbuild-kit packages and pending optional install-script approvals. The listed code-generation and build checks succeed without approving those scripts.

## Integration references

- [Payload installation](https://payloadcms.com/docs/getting-started/installation)
- [Payload PostgreSQL adapter](https://payloadcms.com/docs/database/postgres)
- [Tailwind with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
