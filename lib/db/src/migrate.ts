import path from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import { migrate as drizzleMigrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./index";

/**
 * Run all pending Drizzle migrations against the configured DATABASE_URL.
 *
 * Resolution order for the migrations folder:
 *   1. DRIZZLE_MIGRATIONS_DIR env override
 *   2. <package>/drizzle (when this file is consumed as source TS in dev)
 *   3. <cwd>/lib/db/drizzle (fallback for bundled apps run from monorepo root)
 *
 * Safe to call on every boot — drizzle tracks applied migrations in a
 * dedicated `__drizzle_migrations` table and only runs new ones.
 */
export async function runDbMigrations(): Promise<void> {
  let migrationsFolder = process.env["DRIZZLE_MIGRATIONS_DIR"] ?? "";

  // Walk up from a starting directory looking for `lib/db/drizzle`.
  // This handles being run from the monorepo root, an artifact dir, or a
  // bundled dist/ folder.
  function searchUp(start: string): string | null {
    let cur = start;
    for (let i = 0; i < 10; i++) {
      const candidate = path.resolve(cur, "lib", "db", "drizzle");
      if (existsSync(candidate)) return candidate;
      const parent = path.dirname(cur);
      if (parent === cur) break;
      cur = parent;
    }
    return null;
  }

  if (!migrationsFolder) {
    try {
      const here = path.dirname(fileURLToPath(import.meta.url));
      // If we are inside lib/db itself, sibling "drizzle" folder is one up.
      const sibling = path.resolve(here, "..", "drizzle");
      if (existsSync(sibling)) migrationsFolder = sibling;
      else {
        const found = searchUp(here);
        if (found) migrationsFolder = found;
      }
    } catch {
      // import.meta.url may not be usable in bundled output; fall through.
    }
  }

  if (!migrationsFolder) {
    const found = searchUp(process.cwd());
    if (found) migrationsFolder = found;
  }

  if (!migrationsFolder) {
    throw new Error(
      "Could not locate Drizzle migrations folder. Set DRIZZLE_MIGRATIONS_DIR " +
        "or run from a directory where lib/db/drizzle exists.",
    );
  }

  await drizzleMigrate(db, { migrationsFolder });
}
