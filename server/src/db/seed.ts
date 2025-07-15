import { reset, seed } from "drizzle-seed";
import { db, sql } from "./connection.ts";
import { schema } from "./schema/index.ts";

await reset(db, schema);

await seed(db, schema).refine((f) => {
	return {
		users: {
			count: 20,
			columns: {
				name: f.firstName(),
				longest_race: f.number({ minValue: 1, maxValue: 100 }),
				created_at: f.timestamp(),
			},
		},
	};
});

await sql.end();

// biome-ignore lint/suspicious/noConsole: Just in prod!
console.log("Database SEEDED!");
