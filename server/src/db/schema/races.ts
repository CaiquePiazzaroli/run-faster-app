import {
	doublePrecision,
	interval,
	pgTable,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { users } from "./users.ts";

export const races = pgTable("races", {
	id: uuid().primaryKey().defaultRandom(),
	user_id: uuid()
		.references(() => users.id)
		.notNull(),
	race_time: interval().notNull(),
	distance: doublePrecision().notNull(),
	date: timestamp().defaultNow().notNull(),
});
