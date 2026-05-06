import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "treatment_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "treatment_categories_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "categories" RENAME TO "post_categories";
  ALTER TABLE "categories_locales" RENAME TO "post_categories_locales";
  ALTER TABLE "posts_rels" RENAME COLUMN "categories_id" TO "post_categories_id";
  ALTER TABLE "_posts_v_rels" RENAME COLUMN "categories_id" TO "post_categories_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "categories_id" TO "post_categories_id";
  ALTER TABLE "posts_rels" DROP CONSTRAINT "posts_rels_categories_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_posts_v_rels_categories_fk";
  
  ALTER TABLE "post_categories_locales" DROP CONSTRAINT "categories_locales_parent_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_categories_fk";
  
  DROP INDEX "posts_rels_categories_id_idx";
  DROP INDEX "_posts_v_rels_categories_id_idx";
  DROP INDEX "categories_slug_idx";
  DROP INDEX "categories_updated_at_idx";
  DROP INDEX "categories_created_at_idx";
  DROP INDEX "categories_locales_locale_parent_id_unique";
  DROP INDEX "payload_locked_documents_rels_categories_id_idx";
  ALTER TABLE "treatments_rels" ADD COLUMN "treatment_categories_id" integer;
  ALTER TABLE "_treatments_v_rels" ADD COLUMN "treatment_categories_id" integer;
  ALTER TABLE "doctors" ADD COLUMN "generate_slug" boolean DEFAULT true;
  ALTER TABLE "_doctors_v" ADD COLUMN "version_generate_slug" boolean DEFAULT true;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "treatment_categories_id" integer;
  ALTER TABLE "treatment_categories_locales" ADD CONSTRAINT "treatment_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."treatment_categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "treatment_categories_slug_idx" ON "treatment_categories" USING btree ("slug");
  CREATE INDEX "treatment_categories_updated_at_idx" ON "treatment_categories" USING btree ("updated_at");
  CREATE INDEX "treatment_categories_created_at_idx" ON "treatment_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "treatment_categories_locales_locale_parent_id_unique" ON "treatment_categories_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "treatments_rels" ADD CONSTRAINT "treatments_rels_treatment_categories_fk" FOREIGN KEY ("treatment_categories_id") REFERENCES "public"."treatment_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_treatments_v_rels" ADD CONSTRAINT "_treatments_v_rels_treatment_categories_fk" FOREIGN KEY ("treatment_categories_id") REFERENCES "public"."treatment_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_post_categories_fk" FOREIGN KEY ("post_categories_id") REFERENCES "public"."post_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_post_categories_fk" FOREIGN KEY ("post_categories_id") REFERENCES "public"."post_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "post_categories_locales" ADD CONSTRAINT "post_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."post_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_treatment_categories_fk" FOREIGN KEY ("treatment_categories_id") REFERENCES "public"."treatment_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_post_categories_fk" FOREIGN KEY ("post_categories_id") REFERENCES "public"."post_categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "treatments_rels_treatment_categories_id_idx" ON "treatments_rels" USING btree ("treatment_categories_id");
  CREATE INDEX "_treatments_v_rels_treatment_categories_id_idx" ON "_treatments_v_rels" USING btree ("treatment_categories_id");
  CREATE INDEX "posts_rels_post_categories_id_idx" ON "posts_rels" USING btree ("post_categories_id");
  CREATE INDEX "_posts_v_rels_post_categories_id_idx" ON "_posts_v_rels" USING btree ("post_categories_id");
  CREATE UNIQUE INDEX "post_categories_slug_idx" ON "post_categories" USING btree ("slug");
  CREATE INDEX "post_categories_updated_at_idx" ON "post_categories" USING btree ("updated_at");
  CREATE INDEX "post_categories_created_at_idx" ON "post_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "post_categories_locales_locale_parent_id_unique" ON "post_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "payload_locked_documents_rels_treatment_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("treatment_categories_id");
  CREATE INDEX "payload_locked_documents_rels_post_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("post_categories_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "treatment_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatment_categories_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "post_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "post_categories_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "treatment_categories" CASCADE;
  DROP TABLE "treatment_categories_locales" CASCADE;
  DROP TABLE "post_categories" CASCADE;
  DROP TABLE "post_categories_locales" CASCADE;
  ALTER TABLE "treatments_rels" DROP CONSTRAINT "treatments_rels_treatment_categories_fk";
  
  ALTER TABLE "_treatments_v_rels" DROP CONSTRAINT "_treatments_v_rels_treatment_categories_fk";
  
  ALTER TABLE "posts_rels" DROP CONSTRAINT "posts_rels_post_categories_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_posts_v_rels_post_categories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_treatment_categories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_post_categories_fk";
  
  DROP INDEX "treatments_rels_treatment_categories_id_idx";
  DROP INDEX "_treatments_v_rels_treatment_categories_id_idx";
  DROP INDEX "posts_rels_post_categories_id_idx";
  DROP INDEX "_posts_v_rels_post_categories_id_idx";
  DROP INDEX "payload_locked_documents_rels_treatment_categories_id_idx";
  DROP INDEX "payload_locked_documents_rels_post_categories_id_idx";
  ALTER TABLE "posts_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "_posts_v_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  ALTER TABLE "treatments_rels" DROP COLUMN "treatment_categories_id";
  ALTER TABLE "_treatments_v_rels" DROP COLUMN "treatment_categories_id";
  ALTER TABLE "posts_rels" DROP COLUMN "post_categories_id";
  ALTER TABLE "_posts_v_rels" DROP COLUMN "post_categories_id";
  ALTER TABLE "doctors" DROP COLUMN "generate_slug";
  ALTER TABLE "_doctors_v" DROP COLUMN "version_generate_slug";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "treatment_categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "post_categories_id";`)
}
