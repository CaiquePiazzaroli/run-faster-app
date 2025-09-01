import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import type { JwtPayload } from "jsonwebtoken";
import z from "zod";
import { verifyToken } from "../../../auth/authentication.ts";
import { db } from "../../../db/connection.ts";
import { schema } from "../../../db/schema/index.ts";

export const createPostsRoute: FastifyPluginCallbackZod = (fastify) => {
	fastify.post(
		"/races",
		{
			schema: {
				headers: z.object({
					authorization: z.string(),
				}),
				body: z.object({
					race_time: z.string(),
					distance: z.number(),
					date: z.string(),
				}),
			},
		},
		async (request, reply) => {
			const splitAuthArray = request.headers.authorization.split(" ");
			const token = splitAuthArray[1];
			try {
				const decodedToken = verifyToken(token) as JwtPayload;

				const raceData = {
					user_id: decodedToken.idUser,
					race_time: request.body.race_time,
					distance: request.body.distance,
					date: new Date(request.body.date),
				};

				const result = await db
					.insert(schema.races)
					.values(raceData)
					.returning({ userId: schema.users.id });

				return reply.status(200).send(result);
			} catch (err) {
				return err;
			}
		}
	);
};
