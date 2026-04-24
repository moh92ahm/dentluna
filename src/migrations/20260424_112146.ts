import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "header_settings_nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "header_settings_nav_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "header_settings_nav_links" ADD CONSTRAINT "header_settings_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_settings_nav_links_locales" ADD CONSTRAINT "header_settings_nav_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_settings_nav_links"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "header_settings_nav_links_order_idx" ON "header_settings_nav_links" USING btree ("_order");
  CREATE INDEX "header_settings_nav_links_parent_id_idx" ON "header_settings_nav_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_settings_nav_links_locales_locale_parent_id_unique" ON "header_settings_nav_links_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "header_settings_nav_links" CASCADE;
  DROP TABLE "header_settings_nav_links_locales" CASCADE;
  DROP TABLE "header_settings" CASCADE;`)
}
