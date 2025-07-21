import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod";
import { verifyToken } from "../../../auth/authentication.ts";
import { db } from "../../../db/connection.ts";
import { schema } from "../../../db/schema/index.ts";

export const getUsers: FastifyPluginCallbackZod = (fastify) => {
	fastify.get(
		"/users",
		{
			schema: {
				headers: z.object({
					authorization: z.string(),
				}),
			},
		},
		async (request, reply) => {
			const authHeader = request.headers.authorization;
			if (!authHeader?.startsWith("token ")) {
				return reply.status(401).send({ message: "Missing or invalid token" });
			}
			const token = authHeader.split(" ")[1];

			try {
				verifyToken(token);

				const result = await db
					.select({
						id: schema.users.id,
						name: schema.users.name,
						email: schema.users.email,
					})
					.from(schema.users);

				return result;
			} catch (err) {
				return reply.status(401).send(err);
			}
		}
	);
};
