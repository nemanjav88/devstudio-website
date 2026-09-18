import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "solutions_locales" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "solutions_locales" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "_solutions_v_locales" ADD COLUMN "version_seo_title" varchar;
  ALTER TABLE "_solutions_v_locales" ADD COLUMN "version_seo_description" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "solutions_locales" DROP COLUMN "seo_title";
  ALTER TABLE "solutions_locales" DROP COLUMN "seo_description";
  ALTER TABLE "_solutions_v_locales" DROP COLUMN "version_seo_title";
  ALTER TABLE "_solutions_v_locales" DROP COLUMN "version_seo_description";`)
}
