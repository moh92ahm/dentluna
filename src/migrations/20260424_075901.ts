import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_footer_settings_social_links_platform" AS ENUM('instagram', 'facebook', 'linkedin', 'twitter', 'youtube', 'tiktok');
  CREATE TABLE "footer_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_footer_settings_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_settings_link_sections_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_settings_link_sections_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_settings_link_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "footer_settings_link_sections_locales" (
  	"heading" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_settings_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_settings_legal_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_settings_locales" (
  	"description" varchar,
  	"copyright_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "footer_settings_social_links" ADD CONSTRAINT "footer_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_settings_link_sections_links" ADD CONSTRAINT "footer_settings_link_sections_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_settings_link_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_settings_link_sections_links_locales" ADD CONSTRAINT "footer_settings_link_sections_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_settings_link_sections_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_settings_link_sections" ADD CONSTRAINT "footer_settings_link_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_settings_link_sections_locales" ADD CONSTRAINT "footer_settings_link_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_settings_link_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_settings_legal_links" ADD CONSTRAINT "footer_settings_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_settings_legal_links_locales" ADD CONSTRAINT "footer_settings_legal_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_settings_legal_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_settings_locales" ADD CONSTRAINT "footer_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "footer_settings_social_links_order_idx" ON "footer_settings_social_links" USING btree ("_order");
  CREATE INDEX "footer_settings_social_links_parent_id_idx" ON "footer_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "footer_settings_link_sections_links_order_idx" ON "footer_settings_link_sections_links" USING btree ("_order");
  CREATE INDEX "footer_settings_link_sections_links_parent_id_idx" ON "footer_settings_link_sections_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_settings_link_sections_links_locales_locale_parent_id" ON "footer_settings_link_sections_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_settings_link_sections_order_idx" ON "footer_settings_link_sections" USING btree ("_order");
  CREATE INDEX "footer_settings_link_sections_parent_id_idx" ON "footer_settings_link_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_settings_link_sections_locales_locale_parent_id_uniqu" ON "footer_settings_link_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_settings_legal_links_order_idx" ON "footer_settings_legal_links" USING btree ("_order");
  CREATE INDEX "footer_settings_legal_links_parent_id_idx" ON "footer_settings_legal_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_settings_legal_links_locales_locale_parent_id_unique" ON "footer_settings_legal_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_settings_locales_locale_parent_id_unique" ON "footer_settings_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "footer_settings_social_links" CASCADE;
  DROP TABLE "footer_settings_link_sections_links" CASCADE;
  DROP TABLE "footer_settings_link_sections_links_locales" CASCADE;
  DROP TABLE "footer_settings_link_sections" CASCADE;
  DROP TABLE "footer_settings_link_sections_locales" CASCADE;
  DROP TABLE "footer_settings_legal_links" CASCADE;
  DROP TABLE "footer_settings_legal_links_locales" CASCADE;
  DROP TABLE "footer_settings" CASCADE;
  DROP TABLE "footer_settings_locales" CASCADE;
  DROP TYPE "public"."enum_footer_settings_social_links_platform";`)
}
