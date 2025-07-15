import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";

export const getUsers: FastifyPluginCallbackZod = (fastify) => {
	fastify.get("/users", async () => {
		const result = await db
			.select({
				id: schema.users.id,
				name: schema.users.name,
			})
			.from(schema.users);

		return result;
	});
};
