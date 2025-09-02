import { eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import type { JwtPayload } from "jsonwebtoken";
import z from "zod";
import { verifyToken } from "../../../auth/authentication.ts";
import { db } from "../../../db/connection.ts";
import { schema } from "../../../db/schema/index.ts";

export const getUserRacesRoute: FastifyPluginCallbackZod = (fastify) => {
	fastify.get(
		"/user/races",
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
				const decodedToken = verifyToken(token) as JwtPayload;
				const result = await db
					.select()
					.from(schema.races)
					.where(eq(schema.races.user_id, decodedToken.idUser));
				return reply.status(200).send(result);
			} catch (err) {
				return reply.status(401).send(err);
			}
		}
	);
};
