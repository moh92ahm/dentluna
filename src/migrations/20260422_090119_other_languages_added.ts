import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."_locales" ADD VALUE 'ro';
  ALTER TYPE "public"."_locales" ADD VALUE 'ru';
  ALTER TYPE "public"."_locales" ADD VALUE 'uk';
  ALTER TYPE "public"."_locales" ADD VALUE 'pl';
  ALTER TYPE "public"."enum__treatments_v_published_locale" ADD VALUE 'ro';
  ALTER TYPE "public"."enum__treatments_v_published_locale" ADD VALUE 'ru';
  ALTER TYPE "public"."enum__treatments_v_published_locale" ADD VALUE 'uk';
  ALTER TYPE "public"."enum__treatments_v_published_locale" ADD VALUE 'pl';
  ALTER TYPE "public"."enum__doctors_v_published_locale" ADD VALUE 'ro';
  ALTER TYPE "public"."enum__doctors_v_published_locale" ADD VALUE 'ru';
  ALTER TYPE "public"."enum__doctors_v_published_locale" ADD VALUE 'uk';
  ALTER TYPE "public"."enum__doctors_v_published_locale" ADD VALUE 'pl';
  ALTER TYPE "public"."enum__posts_v_published_locale" ADD VALUE 'ro';
  ALTER TYPE "public"."enum__posts_v_published_locale" ADD VALUE 'ru';
  ALTER TYPE "public"."enum__posts_v_published_locale" ADD VALUE 'uk';
  ALTER TYPE "public"."enum__posts_v_published_locale" ADD VALUE 'pl';
  ALTER TABLE "media" DROP COLUMN "prefix";`)
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
  DROP TYPE "public"."_locales";
  CREATE TYPE "public"."_locales" AS ENUM('en', 'de', 'fr');
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
  ALTER TABLE "_treatments_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__treatments_v_published_locale";
  CREATE TYPE "public"."enum__treatments_v_published_locale" AS ENUM('en', 'de', 'fr');
  ALTER TABLE "_treatments_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__treatments_v_published_locale" USING "published_locale"::"public"."enum__treatments_v_published_locale";
  ALTER TABLE "_doctors_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__doctors_v_published_locale";
  CREATE TYPE "public"."enum__doctors_v_published_locale" AS ENUM('en', 'de', 'fr');
  ALTER TABLE "_doctors_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__doctors_v_published_locale" USING "published_locale"::"public"."enum__doctors_v_published_locale";
  ALTER TABLE "_posts_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__posts_v_published_locale";
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'de', 'fr');
  ALTER TABLE "_posts_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__posts_v_published_locale" USING "published_locale"::"public"."enum__posts_v_published_locale";
  ALTER TABLE "media" ADD COLUMN "prefix" varchar DEFAULT '';`)
}
