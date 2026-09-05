import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_name" varchar DEFAULT 'Dev Studio' NOT NULL,
  	"contact_email" varchar NOT NULL,
  	"phone" varchar,
  	"seo_share_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"navigation_solutions" varchar DEFAULT 'Solutions' NOT NULL,
  	"navigation_projects" varchar DEFAULT 'Projects' NOT NULL,
  	"navigation_capabilities" varchar DEFAULT 'Capabilities' NOT NULL,
  	"navigation_about" varchar DEFAULT 'About' NOT NULL,
  	"navigation_stories" varchar DEFAULT 'Stories' NOT NULL,
  	"navigation_resources" varchar DEFAULT 'Resources' NOT NULL,
  	"navigation_contact" varchar DEFAULT 'Contact' NOT NULL,
  	"navigation_start_a_project" varchar DEFAULT 'Start a Project' NOT NULL,
  	"location" varchar,
  	"seo_title" varchar NOT NULL,
  	"seo_description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_what_we_build_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "homepage_what_we_build_categories_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_process_steps_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_hero_media_id" integer,
  	"hero_video_file_id" integer,
  	"hero_video_url" varchar,
  	"hero_video_poster_id" integer,
  	"made_here_media_id" integer,
  	"own_products_media_id" integer,
  	"final_cta_media_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_locales" (
  	"hero_eyebrow" varchar,
  	"hero_headline" varchar,
  	"hero_supporting_line" varchar,
  	"hero_subtext" varchar,
  	"hero_primary_cta_label" varchar,
  	"hero_secondary_cta_label" varchar,
  	"hero_video_caption" varchar,
  	"positioning_headline" varchar,
  	"positioning_supporting_text" varchar,
  	"selected_work_headline" varchar,
  	"selected_work_intro" varchar,
  	"what_we_build_headline" varchar,
  	"process_opening" varchar,
  	"process_headline" varchar,
  	"process_closing" varchar,
  	"why_dev_studio_headline" varchar,
  	"why_dev_studio_body" varchar,
  	"made_here_headline" varchar,
  	"made_here_body" varchar,
  	"made_here_location" varchar,
  	"own_products_headline" varchar,
  	"own_products_body" varchar,
  	"latest_from_the_studio_headline" varchar,
  	"latest_from_the_studio_intro" varchar,
  	"final_cta_headline" varchar,
  	"final_cta_body" varchar,
  	"final_cta_button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer,
  	"stories_id" integer
  );
  
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_seo_share_image_id_media_id_fk" FOREIGN KEY ("seo_share_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_what_we_build_categories" ADD CONSTRAINT "homepage_what_we_build_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_what_we_build_categories_locales" ADD CONSTRAINT "homepage_what_we_build_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_what_we_build_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_process_steps" ADD CONSTRAINT "homepage_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_process_steps_locales" ADD CONSTRAINT "homepage_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_hero_media_id_media_id_fk" FOREIGN KEY ("hero_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_video_file_id_media_id_fk" FOREIGN KEY ("hero_video_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_video_poster_id_media_id_fk" FOREIGN KEY ("hero_video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_made_here_media_id_media_id_fk" FOREIGN KEY ("made_here_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_own_products_media_id_media_id_fk" FOREIGN KEY ("own_products_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_final_cta_media_id_media_id_fk" FOREIGN KEY ("final_cta_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_locales" ADD CONSTRAINT "homepage_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_seo_seo_share_image_idx" ON "site_settings" USING btree ("seo_share_image_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_what_we_build_categories_order_idx" ON "homepage_what_we_build_categories" USING btree ("_order");
  CREATE INDEX "homepage_what_we_build_categories_parent_id_idx" ON "homepage_what_we_build_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_what_we_build_categories_locales_locale_parent_id_u" ON "homepage_what_we_build_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_process_steps_order_idx" ON "homepage_process_steps" USING btree ("_order");
  CREATE INDEX "homepage_process_steps_parent_id_idx" ON "homepage_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_process_steps_locales_locale_parent_id_unique" ON "homepage_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_hero_hero_hero_media_idx" ON "homepage" USING btree ("hero_hero_media_id");
  CREATE INDEX "homepage_hero_video_hero_video_file_idx" ON "homepage" USING btree ("hero_video_file_id");
  CREATE INDEX "homepage_hero_video_hero_video_poster_idx" ON "homepage" USING btree ("hero_video_poster_id");
  CREATE INDEX "homepage_made_here_made_here_media_idx" ON "homepage" USING btree ("made_here_media_id");
  CREATE INDEX "homepage_own_products_own_products_media_idx" ON "homepage" USING btree ("own_products_media_id");
  CREATE INDEX "homepage_final_cta_final_cta_media_idx" ON "homepage" USING btree ("final_cta_media_id");
  CREATE UNIQUE INDEX "homepage_locales_locale_parent_id_unique" ON "homepage_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_rels_order_idx" ON "homepage_rels" USING btree ("order");
  CREATE INDEX "homepage_rels_parent_idx" ON "homepage_rels" USING btree ("parent_id");
  CREATE INDEX "homepage_rels_path_idx" ON "homepage_rels" USING btree ("path");
  CREATE INDEX "homepage_rels_projects_id_idx" ON "homepage_rels" USING btree ("projects_id");
  CREATE INDEX "homepage_rels_stories_id_idx" ON "homepage_rels" USING btree ("stories_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "homepage_what_we_build_categories" CASCADE;
  DROP TABLE "homepage_what_we_build_categories_locales" CASCADE;
  DROP TABLE "homepage_process_steps" CASCADE;
  DROP TABLE "homepage_process_steps_locales" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "homepage_locales" CASCADE;
  DROP TABLE "homepage_rels" CASCADE;`)
}
