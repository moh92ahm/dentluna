import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'de', 'fr');
  CREATE TYPE "public"."enum__treatments_v_published_locale" AS ENUM('en', 'de', 'fr');
  CREATE TYPE "public"."enum__doctors_v_published_locale" AS ENUM('en', 'de', 'fr');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'de', 'fr');
  CREATE TABLE "treatments_locales" (
  	"title" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_treatments_v_locales" (
  	"version_title" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "doctors_locales" (
  	"name" varchar,
  	"specialty" varchar,
  	"biography" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_doctors_v_locales" (
  	"version_name" varchar,
  	"version_specialty" varchar,
  	"version_biography" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts_locales" (
  	"title" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_locales" (
  	"version_title" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "categories_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "gallery_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "gallery_category_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "faqs_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "faq_categories_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "treatments" DROP CONSTRAINT "treatments_meta_image_id_media_id_fk";
  
  ALTER TABLE "_treatments_v" DROP CONSTRAINT "_treatments_v_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "posts" DROP CONSTRAINT "posts_meta_image_id_media_id_fk";
  
  ALTER TABLE "_posts_v" DROP CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk";
  
  DROP INDEX "treatments_meta_meta_image_idx";
  DROP INDEX "_treatments_v_version_meta_version_meta_image_idx";
  DROP INDEX "posts_meta_meta_image_idx";
  DROP INDEX "_posts_v_version_meta_version_meta_image_idx";
  ALTER TABLE "_treatments_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_treatments_v" ADD COLUMN "published_locale" "enum__treatments_v_published_locale";
  ALTER TABLE "_posts_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_posts_v" ADD COLUMN "published_locale" "enum__posts_v_published_locale";
  ALTER TABLE "_doctors_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_doctors_v" ADD COLUMN "published_locale" "enum__doctors_v_published_locale";
  ALTER TABLE "treatments_locales" ADD CONSTRAINT "treatments_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "treatments_locales" ADD CONSTRAINT "treatments_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treatments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_treatments_v_locales" ADD CONSTRAINT "_treatments_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_treatments_v_locales" ADD CONSTRAINT "_treatments_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_treatments_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "doctors_locales" ADD CONSTRAINT "doctors_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."doctors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_doctors_v_locales" ADD CONSTRAINT "_doctors_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_doctors_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_locales" ADD CONSTRAINT "gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_category_locales" ADD CONSTRAINT "gallery_category_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_category"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_locales" ADD CONSTRAINT "faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_categories_locales" ADD CONSTRAINT "faq_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq_categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "treatments_meta_meta_image_idx" ON "treatments_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "treatments_locales_locale_parent_id_unique" ON "treatments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_treatments_v_version_meta_version_meta_image_idx" ON "_treatments_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_treatments_v_locales_locale_parent_id_unique" ON "_treatments_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "doctors_locales_locale_parent_id_unique" ON "doctors_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_doctors_v_locales_locale_parent_id_unique" ON "_doctors_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "gallery_locales_locale_parent_id_unique" ON "gallery_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "gallery_category_locales_locale_parent_id_unique" ON "gallery_category_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "faqs_locales_locale_parent_id_unique" ON "faqs_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "faq_categories_locales_locale_parent_id_unique" ON "faq_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_treatments_v_snapshot_idx" ON "_treatments_v" USING btree ("snapshot");
  CREATE INDEX "_treatments_v_published_locale_idx" ON "_treatments_v" USING btree ("published_locale");
  CREATE INDEX "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX "_doctors_v_snapshot_idx" ON "_doctors_v" USING btree ("snapshot");
  CREATE INDEX "_doctors_v_published_locale_idx" ON "_doctors_v" USING btree ("published_locale");
  ALTER TABLE "treatments" DROP COLUMN "title";
  ALTER TABLE "treatments" DROP COLUMN "content";
  ALTER TABLE "treatments" DROP COLUMN "meta_title";
  ALTER TABLE "treatments" DROP COLUMN "meta_image_id";
  ALTER TABLE "treatments" DROP COLUMN "meta_description";
  ALTER TABLE "_treatments_v" DROP COLUMN "version_title";
  ALTER TABLE "_treatments_v" DROP COLUMN "version_content";
  ALTER TABLE "_treatments_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_treatments_v" DROP COLUMN "version_meta_image_id";
  ALTER TABLE "_treatments_v" DROP COLUMN "version_meta_description";
  ALTER TABLE "posts" DROP COLUMN "title";
  ALTER TABLE "posts" DROP COLUMN "content";
  ALTER TABLE "posts" DROP COLUMN "meta_title";
  ALTER TABLE "posts" DROP COLUMN "meta_image_id";
  ALTER TABLE "posts" DROP COLUMN "meta_description";
  ALTER TABLE "_posts_v" DROP COLUMN "version_title";
  ALTER TABLE "_posts_v" DROP COLUMN "version_content";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_image_id";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_description";
  ALTER TABLE "doctors" DROP COLUMN "name";
  ALTER TABLE "doctors" DROP COLUMN "specialty";
  ALTER TABLE "doctors" DROP COLUMN "biography";
  ALTER TABLE "_doctors_v" DROP COLUMN "version_name";
  ALTER TABLE "_doctors_v" DROP COLUMN "version_specialty";
  ALTER TABLE "_doctors_v" DROP COLUMN "version_biography";
  ALTER TABLE "categories" DROP COLUMN "title";
  ALTER TABLE "gallery" DROP COLUMN "title";
  ALTER TABLE "gallery_category" DROP COLUMN "title";
  ALTER TABLE "faqs" DROP COLUMN "question";
  ALTER TABLE "faqs" DROP COLUMN "answer";
  ALTER TABLE "faq_categories" DROP COLUMN "title";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "treatments_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_treatments_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "doctors_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_doctors_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categories_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_category_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faqs_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faq_categories_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "treatments_locales" CASCADE;
  DROP TABLE "_treatments_v_locales" CASCADE;
  DROP TABLE "doctors_locales" CASCADE;
  DROP TABLE "_doctors_v_locales" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "_posts_v_locales" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  DROP TABLE "gallery_locales" CASCADE;
  DROP TABLE "gallery_category_locales" CASCADE;
  DROP TABLE "faqs_locales" CASCADE;
  DROP TABLE "faq_categories_locales" CASCADE;
  DROP INDEX "_treatments_v_snapshot_idx";
  DROP INDEX "_treatments_v_published_locale_idx";
  DROP INDEX "_doctors_v_snapshot_idx";
  DROP INDEX "_doctors_v_published_locale_idx";
  DROP INDEX "_posts_v_snapshot_idx";
  DROP INDEX "_posts_v_published_locale_idx";
  ALTER TABLE "treatments" ADD COLUMN "title" varchar;
  ALTER TABLE "treatments" ADD COLUMN "content" jsonb;
  ALTER TABLE "treatments" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "treatments" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "treatments" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "_treatments_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_treatments_v" ADD COLUMN "version_content" jsonb;
  ALTER TABLE "_treatments_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_treatments_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "_treatments_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "doctors" ADD COLUMN "name" varchar;
  ALTER TABLE "doctors" ADD COLUMN "specialty" varchar;
  ALTER TABLE "doctors" ADD COLUMN "biography" jsonb;
  ALTER TABLE "_doctors_v" ADD COLUMN "version_name" varchar;
  ALTER TABLE "_doctors_v" ADD COLUMN "version_specialty" varchar;
  ALTER TABLE "_doctors_v" ADD COLUMN "version_biography" jsonb;
  ALTER TABLE "posts" ADD COLUMN "title" varchar;
  ALTER TABLE "posts" ADD COLUMN "content" jsonb;
  ALTER TABLE "posts" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "posts" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "posts" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_content" jsonb;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "categories" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "gallery" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "gallery_category" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "faqs" ADD COLUMN "question" varchar NOT NULL;
  ALTER TABLE "faqs" ADD COLUMN "answer" varchar NOT NULL;
  ALTER TABLE "faq_categories" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "treatments" ADD CONSTRAINT "treatments_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_treatments_v" ADD CONSTRAINT "_treatments_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "treatments_meta_meta_image_idx" ON "treatments" USING btree ("meta_image_id");
  CREATE INDEX "_treatments_v_version_meta_version_meta_image_idx" ON "_treatments_v" USING btree ("version_meta_image_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  ALTER TABLE "_treatments_v" DROP COLUMN "snapshot";
  ALTER TABLE "_treatments_v" DROP COLUMN "published_locale";
  ALTER TABLE "_doctors_v" DROP COLUMN "snapshot";
  ALTER TABLE "_doctors_v" DROP COLUMN "published_locale";
  ALTER TABLE "_posts_v" DROP COLUMN "snapshot";
  ALTER TABLE "_posts_v" DROP COLUMN "published_locale";
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum__treatments_v_published_locale";
  DROP TYPE "public"."enum__doctors_v_published_locale";
  DROP TYPE "public"."enum__posts_v_published_locale";`)
}
