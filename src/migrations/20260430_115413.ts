import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "treatments_locales" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "_treatments_v_locales" ADD COLUMN "version_excerpt" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "treatments_locales" DROP COLUMN "excerpt";
  ALTER TABLE "_treatments_v_locales" DROP COLUMN "version_excerpt";`)
}
