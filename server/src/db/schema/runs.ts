import {
	doublePrecision,
	pgTable,
	time,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { users } from "./users.ts";

export const runs = pgTable("runs", {
	id: uuid().primaryKey(),
	user_id: uuid()
		.references(() => users.id)
		.notNull(),
	start_time: time({ withTimezone: false }),
	end_time: time({ withTimezone: false }),
	date: timestamp().defaultNow().notNull(),
	distance: doublePrecision(),
});
