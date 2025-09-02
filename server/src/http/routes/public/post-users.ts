import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../../db/connection.ts";
import { schema } from "../../../db/schema/index.ts";

export const createUsersRoute: FastifyPluginCallbackZod = (fastify) => {
	fastify.post(
		"/register",
		{
			schema: {
				body: z.object({
					name: z.string().min(6),
					email: z.string(),
					password: z.string(),
					longest_race: z.float32().default(0.0),
				}),
			},
		},
		async (request, reply) => {
			try {
				const fetchUserExistence = await db
					.select({ email: schema.users.email })
					.from(schema.users)
					.where(eq(schema.users.email, request.body.email));

				if (fetchUserExistence.length > 0) {
					return reply.status(400).send({
						statusCode: 400,
						error: "Bad Request",
						message: "User already exists",
					});
				}

				const userData = {
					name: request.body.name,
					email: request.body.email,
					password: bcrypt.hashSync(request.body.password, 10),
					longest_race: request.body.longest_race,
				};

				const result = await db
					.insert(schema.users)
					.values(userData)
					.returning({ userId: schema.users.id });
				const insertedUserId = result[0];
				return reply.status(201).send(insertedUserId);
			} catch (err) {
				return reply.status(401).send(err);
			}
		}
	);
};
