import { sequelize } from "../config/database.js";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));

const run = async () => {
  try {
    await sequelize.authenticate();

    const files = (await readdir(currentDir))
      .filter((file) => /^\d{8}-.*\.js$/.test(file))
      .sort();

    const [tableStatus] = await sequelize.query(`
      SELECT to_regclass('public.schema_migrations') AS migration_table;
    `);

    if (process.argv.includes("--status")) {
      if (!tableStatus[0].migration_table) {
        console.log("Migration history table does not exist yet.");
        console.table(files.map((name) => ({
          migration: name,
          status: "PENDING",
        })));
        return;
      }

      const [applied] = await sequelize.query(`
        SELECT name, "executedAt"
        FROM public.schema_migrations
        ORDER BY name;
      `);

      const appliedNames = new Set(applied.map((item) => item.name));

      console.table(files.map((name) => ({
        migration: name,
        status: appliedNames.has(name) ? "APPLIED" : "PENDING",
      })));

      return;
    }

    await sequelize.transaction(async (transaction) => {
      await sequelize.query(
        "SELECT pg_advisory_xact_lock(73194201);",
        { transaction }
      );

      await sequelize.query(`
        CREATE TABLE IF NOT EXISTS public.schema_migrations (
          name VARCHAR(255) PRIMARY KEY,
          "executedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `, { transaction });

      const [applied] = await sequelize.query(`
        SELECT name FROM public.schema_migrations;
      `, { transaction });

      const appliedNames = new Set(applied.map((item) => item.name));

      for (const name of files) {
        if (appliedNames.has(name)) {
          console.log(`SKIPPED: ${name}`);
          continue;
        }

        console.log(`RUNNING: ${name}`);

        const migration = await import(
          pathToFileURL(path.join(currentDir, name)).href
        );

        if (typeof migration.up !== "function") {
          throw new Error(`Migration ${name} has no up() function.`);
        }

        await migration.up({ sequelize, transaction });

        await sequelize.query(`
          INSERT INTO public.schema_migrations (name)
          VALUES (:name);
        `, {
          replacements: { name },
          transaction,
        });

        console.log(`APPLIED: ${name}`);
      }
    });

    console.log("Migration process completed.");
  } catch (error) {
    console.error("Migration process failed:", error.message);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
};

await run();
