import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage" ADD COLUMN "references_media_id" integer;
  ALTER TABLE "homepage_locales" ADD COLUMN "references_headline" varchar;
  ALTER TABLE "homepage_locales" ADD COLUMN "references_intro" varchar;
  ALTER TABLE "homepage_rels" ADD COLUMN "solutions_id" integer;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_references_media_id_media_id_fk" FOREIGN KEY ("references_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_solutions_fk" FOREIGN KEY ("solutions_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "homepage_references_references_media_idx" ON "homepage" USING btree ("references_media_id");
  CREATE INDEX "homepage_rels_solutions_id_idx" ON "homepage_rels" USING btree ("solutions_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage" DROP CONSTRAINT "homepage_references_media_id_media_id_fk";

  ALTER TABLE "homepage_rels" DROP CONSTRAINT "homepage_rels_solutions_fk";

  DROP INDEX "homepage_references_references_media_idx";
  DROP INDEX "homepage_rels_solutions_id_idx";
  ALTER TABLE "homepage" DROP COLUMN "references_media_id";
  ALTER TABLE "homepage_locales" DROP COLUMN "references_headline";
  ALTER TABLE "homepage_locales" DROP COLUMN "references_intro";
  ALTER TABLE "homepage_rels" DROP COLUMN "solutions_id";`)
}
