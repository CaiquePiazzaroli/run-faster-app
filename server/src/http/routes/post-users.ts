import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";

export const createUsersRoute: FastifyPluginCallbackZod = (fastify) => {
	fastify.post(
		"/users",
		{
			schema: {
				body: z.object({
					name: z.string().min(6),
					longest_race: z.float32().min(0.0).default(0.0),
				}),
			},
		},
		async (request, reply) => {
			const result = await db
				.insert(schema.users)
				.values(request.body)
				.returning({ insertedId: schema.users.id });

			const insertedUser = result[0];

			if (!insertedUser) {
				throw new Error("Failed to create new user.");
			}
			return reply.status(201).send({ userId: insertedUser.insertedId });
		}
	);
};
