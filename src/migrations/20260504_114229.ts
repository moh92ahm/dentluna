import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."_locales" ADD VALUE 'tr';
  ALTER TYPE "public"."enum__treatments_v_published_locale" ADD VALUE 'tr';
  ALTER TYPE "public"."enum__doctors_v_published_locale" ADD VALUE 'tr';
  ALTER TYPE "public"."enum__posts_v_published_locale" ADD VALUE 'tr';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "treatments_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_treatments_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "doctors_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_doctors_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "posts_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_posts_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "categories_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "gallery_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "gallery_category_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "faqs_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "faq_categories_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "footer_settings_link_sections_links_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "footer_settings_link_sections_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "footer_settings_legal_links_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "footer_settings_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "header_settings_nav_links_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  DROP TYPE "public"."_locales";
  CREATE TYPE "public"."_locales" AS ENUM('en', 'de', 'fr', 'ro', 'ru', 'uk', 'pl');
  ALTER TABLE "treatments_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_treatments_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "doctors_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_doctors_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "posts_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_posts_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "categories_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "gallery_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "gallery_category_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "faqs_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "faq_categories_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "footer_settings_link_sections_links_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "footer_settings_link_sections_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "footer_settings_legal_links_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "footer_settings_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "header_settings_nav_links_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_treatments_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__treatments_v_published_locale";
  CREATE TYPE "public"."enum__treatments_v_published_locale" AS ENUM('en', 'de', 'fr', 'ro', 'ru', 'uk', 'pl');
  ALTER TABLE "_treatments_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__treatments_v_published_locale" USING "published_locale"::"public"."enum__treatments_v_published_locale";
  ALTER TABLE "_doctors_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__doctors_v_published_locale";
  CREATE TYPE "public"."enum__doctors_v_published_locale" AS ENUM('en', 'de', 'fr', 'ro', 'ru', 'uk', 'pl');
  ALTER TABLE "_doctors_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__doctors_v_published_locale" USING "published_locale"::"public"."enum__doctors_v_published_locale";
  ALTER TABLE "_posts_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__posts_v_published_locale";
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'de', 'fr', 'ro', 'ru', 'uk', 'pl');
  ALTER TABLE "_posts_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__posts_v_published_locale" USING "published_locale"::"public"."enum__posts_v_published_locale";`)
}
