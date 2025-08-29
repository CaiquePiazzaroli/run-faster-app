import bcrypt from "bcrypt";
import { reset, seed } from "drizzle-seed";
import { db, sql } from "./connection.ts";
import { schema } from "./schema/index.ts";

await reset(db, schema);

await sql`INSERT INTO users (name, email, password,longest_race) VALUES('admin','admin@email.com', ${bcrypt.hashSync("standard4499", 10)}, 87.14)`;

await seed(db, schema).refine((f) => {
	return {
		users: {
			count: 15,
			columns: {
				name: f.firstName(),
				email: f.email(),
				password: f.string(),
				longest_race: f.number({ minValue: 1, maxValue: 100 }),
				created_at: f.timestamp(),
			},
		},
		races: {
			count: 15,
			columns: {
				distance: f.number({ minValue: 0, maxValue: 40 }),
			},
		},
	};
});

await sql.end();

// biome-ignore lint/suspicious/noConsole: Just in prod!
console.log("Database SEEDED!");
