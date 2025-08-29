import type { FastifyPluginCallback } from "fastify";
import z from "zod";
import { verifyToken } from "../../../auth/authentication.ts";
import { db } from "../../../db/connection.ts";
import { schema } from "../../../db/schema/index.ts";

//SELECT * FROM races
export const getRaces: FastifyPluginCallback = (fastify) => {
	fastify.get(
		"/races",
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
				verifyToken(token); //const decodedToken = verifytoken(token) for get iduser
				const result = await db.select().from(schema.races);
				return result;
			} catch (err) {
				return reply.status(401).send(err);
			}
		}
	);
};
