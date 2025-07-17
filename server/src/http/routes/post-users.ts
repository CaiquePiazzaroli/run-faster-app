import bcrypt from "bcrypt";
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
					name: z.string().min(6).default("unknow"),
					email: z.string().default("email@email.com"),
					password: z.string().default("1234"),
					longest_race: z.float32().min(0.0).default(0.0),
				}),
			},
		},
		async (request, reply) => {
			const userData = {
				name: request.body.name,
				email: request.body.email,
				password: bcrypt.hashSync(request.body.password, 10),
				longest_race: request.body.longest_race,
			};

			const result = await db
				.insert(schema.users)
				.values(userData)
				.returning({ insertedId: schema.users.id });

			const insertedUser = result[0];

			if (!insertedUser) {
				throw new Error("Failed to create new user.");
			}
			return reply.status(201).send({ userId: insertedUser.insertedId });
		}
	);
};
