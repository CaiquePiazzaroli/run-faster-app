import {
	doublePrecision,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	longest_race: doublePrecision(),
	created_at: timestamp().defaultNow().notNull(),
});
