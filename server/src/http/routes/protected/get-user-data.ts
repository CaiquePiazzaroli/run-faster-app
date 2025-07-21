import { eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod";
import { verifyToken } from "../../../auth/authentication.ts";
import { db } from "../../../db/connection.ts";
import { schema } from "../../../db/schema/index.ts";

export const getUserData: FastifyPluginCallbackZod = (fastify) => {
	fastify.get(
		"/users/:id",
		{
			schema: {
				headers: z.object({
					authorization: z.string(),
				}),
				params: z.object({
					id: z.string(),
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
				const decodedSchema = z.object({
					idUser: z.uuid(),
					iat: z.number(),
					exp: z.number(),
				});
				const decoded = decodedSchema.parse(verifyToken(token));

				const paramsSchema = z.object({ id: z.uuid() });
				const { id } = paramsSchema.parse(request.params);

				if (decoded.idUser !== id) {
					throw new Error("Access Denied!");
				}

				const result = await db
					.select({
						id: schema.users.id,
						name: schema.users.name,
						email: schema.users.email,
					})
					.from(schema.users)
					.where(eq(schema.users.id, id));

				if (result.length === 0) {
					return reply.status(404).send({
						statusCode: 404,
						message: "User not found!",
					});
				}

				return reply.status(200).send(result);
			} catch (err) {
				if (err instanceof z.ZodError) {
					return reply.status(400).send({ message: "Invalid id" });
				}
				return reply.status(401).send(err);
			}
		}
	);
};
