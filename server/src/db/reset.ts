import { reset } from "drizzle-seed";
import { db, sql } from "./connection.ts";
import { schema } from "./schema/index.ts";

await reset(db, schema);

await sql.end();

// biome-ignore lint/suspicious/noConsole: Just in prod!
console.log("Database Clear!");
