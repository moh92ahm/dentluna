import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

const localeTables = [
  'treatments_locales',
  '_treatments_v_locales',
  'doctors_locales',
  '_doctors_v_locales',
  'posts_locales',
  '_posts_v_locales',
  'categories_locales',
  'gallery_locales',
  'gallery_category_locales',
  'faqs_locales',
  'faq_categories_locales',
] as const

const publishedLocaleTables = ['_treatments_v', '_doctors_v', '_posts_v'] as const

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TYPE "public"."_locales" ADD VALUE IF NOT EXISTS 'tr';
    ALTER TYPE "public"."_locales" ADD VALUE IF NOT EXISTS 'ro';
    ALTER TYPE "public"."_locales" ADD VALUE IF NOT EXISTS 'ru';
    ALTER TYPE "public"."_locales" ADD VALUE IF NOT EXISTS 'uk';
    ALTER TYPE "public"."_locales" ADD VALUE IF NOT EXISTS 'pl';

    ALTER TYPE "public"."enum__treatments_v_published_locale" ADD VALUE IF NOT EXISTS 'tr';
    ALTER TYPE "public"."enum__treatments_v_published_locale" ADD VALUE IF NOT EXISTS 'ro';
    ALTER TYPE "public"."enum__treatments_v_published_locale" ADD VALUE IF NOT EXISTS 'ru';
    ALTER TYPE "public"."enum__treatments_v_published_locale" ADD VALUE IF NOT EXISTS 'uk';
    ALTER TYPE "public"."enum__treatments_v_published_locale" ADD VALUE IF NOT EXISTS 'pl';

    ALTER TYPE "public"."enum__doctors_v_published_locale" ADD VALUE IF NOT EXISTS 'tr';
    ALTER TYPE "public"."enum__doctors_v_published_locale" ADD VALUE IF NOT EXISTS 'ro';
    ALTER TYPE "public"."enum__doctors_v_published_locale" ADD VALUE IF NOT EXISTS 'ru';
    ALTER TYPE "public"."enum__doctors_v_published_locale" ADD VALUE IF NOT EXISTS 'uk';
    ALTER TYPE "public"."enum__doctors_v_published_locale" ADD VALUE IF NOT EXISTS 'pl';

    ALTER TYPE "public"."enum__posts_v_published_locale" ADD VALUE IF NOT EXISTS 'tr';
    ALTER TYPE "public"."enum__posts_v_published_locale" ADD VALUE IF NOT EXISTS 'ro';
    ALTER TYPE "public"."enum__posts_v_published_locale" ADD VALUE IF NOT EXISTS 'ru';
    ALTER TYPE "public"."enum__posts_v_published_locale" ADD VALUE IF NOT EXISTS 'uk';
    ALTER TYPE "public"."enum__posts_v_published_locale" ADD VALUE IF NOT EXISTS 'pl';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  const localeTableStatements = localeTables
    .map(
      (table) =>
        sql.raw(
          `ALTER TABLE "public"."${table}" ALTER COLUMN "_locale" TYPE "public"."_locales" USING "_locale"::text::"public"."_locales";`,
        ),
    )

  const publishedLocaleStatements = publishedLocaleTables.map((table) =>
    sql.raw(
      `ALTER TABLE "public"."${table}" ALTER COLUMN "published_locale" TYPE "public"."enum__${table.slice(1)}_published_locale" USING "published_locale"::text::"public"."enum__${table.slice(1)}_published_locale";`,
    ),
  )

  await db.execute(sql`
    ALTER TYPE "public"."_locales" RENAME TO "_locales_old";
    CREATE TYPE "public"."_locales" AS ENUM('en', 'de', 'fr');
  `)

  for (const statement of localeTableStatements) {
    await db.execute(statement)
  }

  await db.execute(sql`
    DROP TYPE "public"."_locales_old";

    ALTER TYPE "public"."enum__treatments_v_published_locale" RENAME TO "enum__treatments_v_published_locale_old";
    CREATE TYPE "public"."enum__treatments_v_published_locale" AS ENUM('en', 'de', 'fr');

    ALTER TYPE "public"."enum__doctors_v_published_locale" RENAME TO "enum__doctors_v_published_locale_old";
    CREATE TYPE "public"."enum__doctors_v_published_locale" AS ENUM('en', 'de', 'fr');

    ALTER TYPE "public"."enum__posts_v_published_locale" RENAME TO "enum__posts_v_published_locale_old";
    CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'de', 'fr');
  `)

  for (const statement of publishedLocaleStatements) {
    await db.execute(statement)
  }

  await db.execute(sql`
    DROP TYPE "public"."enum__treatments_v_published_locale_old";
    DROP TYPE "public"."enum__doctors_v_published_locale_old";
    DROP TYPE "public"."enum__posts_v_published_locale_old";
  `)
}
