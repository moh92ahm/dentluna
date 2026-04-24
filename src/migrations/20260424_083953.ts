import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_footer_settings_link_sections_links_link_type" AS ENUM('custom', 'treatment', 'post');
  ALTER TABLE "footer_settings_link_sections_links" ALTER COLUMN "url" DROP NOT NULL;
  ALTER TABLE "footer_settings_link_sections_links_locales" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "footer_settings_link_sections_links" ADD COLUMN "link_type" "enum_footer_settings_link_sections_links_link_type" DEFAULT 'custom' NOT NULL;
  ALTER TABLE "footer_settings_link_sections_links" ADD COLUMN "treatment_id" integer;
  ALTER TABLE "footer_settings_link_sections_links" ADD COLUMN "post_id" integer;
  ALTER TABLE "footer_settings_link_sections_links" ADD CONSTRAINT "footer_settings_link_sections_links_treatment_id_treatments_id_fk" FOREIGN KEY ("treatment_id") REFERENCES "public"."treatments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_settings_link_sections_links" ADD CONSTRAINT "footer_settings_link_sections_links_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "footer_settings_link_sections_links_treatment_idx" ON "footer_settings_link_sections_links" USING btree ("treatment_id");
  CREATE INDEX "footer_settings_link_sections_links_post_idx" ON "footer_settings_link_sections_links" USING btree ("post_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "footer_settings_link_sections_links" DROP CONSTRAINT "footer_settings_link_sections_links_treatment_id_treatments_id_fk";
  
  ALTER TABLE "footer_settings_link_sections_links" DROP CONSTRAINT "footer_settings_link_sections_links_post_id_posts_id_fk";
  
  DROP INDEX "footer_settings_link_sections_links_treatment_idx";
  DROP INDEX "footer_settings_link_sections_links_post_idx";
  ALTER TABLE "footer_settings_link_sections_links" ALTER COLUMN "url" SET NOT NULL;
  ALTER TABLE "footer_settings_link_sections_links_locales" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "footer_settings_link_sections_links" DROP COLUMN "link_type";
  ALTER TABLE "footer_settings_link_sections_links" DROP COLUMN "treatment_id";
  ALTER TABLE "footer_settings_link_sections_links" DROP COLUMN "post_id";
  DROP TYPE "public"."enum_footer_settings_link_sections_links_link_type";`)
}
