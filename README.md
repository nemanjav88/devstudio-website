# Dev Studio website foundation

Read [PROJECT_BRIEF.md](PROJECT_BRIEF.md) before making product or design decisions. This setup provides Next.js, TypeScript, Payload CMS, PostgreSQL, and Tailwind CSS in one application. The public page is only a placeholder; visual design, content collections, localization, and animations are future work.

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
- `src/migrations`: future PostgreSQL migrations.

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

Payload's PostgreSQL adapter uses schema push in development. Use a dedicated development database, not production. Before the first deployment, create and review an initial migration, and apply migrations as part of the release process. Do not mix development schema push with production migration history.

## Hosting preparation

Next.js standalone output is enabled for future self-hosting through Coolify. No deployment, domain changes, or Coolify configuration is included. The planned development domain is `https://new.devstudio.biz`; production will later use `https://devstudio.biz`. The placeholder is marked noindex; revisit this when launching the actual website. Supply environment variables through the hosting platform and provision PostgreSQL before running the CMS.

## Foundation verification

The initial setup passed Payload type generation, admin import-map generation, ESLint, TypeScript checking, and the Next.js production build. The build was checked with a temporary process-only secret and a dummy database URL; no real credentials were written to disk. PostgreSQL was not available locally, so database connectivity, schema creation, and the first-admin/login flow still require a real database and environment values.

The installation audit reports 12 dependency findings (1 low, 11 moderate; no high or critical). They involve Payload account-unlock access, DOMPurify through Monaco, and an older esbuild through Drizzle tooling. A non-breaking `npm audit fix` did not clear them. Recheck upstream fixes before deployment; do not use the suggested force fix, which downgrades the PostgreSQL adapter incompatibly. This foundation has only trusted administrator accounts and explicitly defines unlock access.

ESLint 9 is pinned because plugins in the current Next.js ESLint configuration do not yet declare ESLint 10 compatibility. npm reports its deprecation, plus deprecated transitive esbuild-kit packages and pending optional install-script approvals. The listed code-generation and build checks succeed without approving those scripts.

## Integration references

- [Payload installation](https://payloadcms.com/docs/getting-started/installation)
- [Payload PostgreSQL adapter](https://payloadcms.com/docs/database/postgres)
- [Tailwind with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
