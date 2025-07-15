import postgres from "postgres";
import { env } from "../../src/env.ts";

const sql = postgres(env.DATABASE_URL);

const result = await sql`SELECT version();`;

// biome-ignore lint/suspicious/noConsole: Just a test file
console.log(result);

sql.end();
