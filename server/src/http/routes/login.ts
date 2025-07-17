import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod";
import { signToken, verifyToken } from "../../auth/authentication.ts";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";

export const login: FastifyPluginCallbackZod = (fastify) => {
	fastify.post(
		"/login",
		{
			schema: {
				body: z.object({
					email: z.string(),
					password: z.string(),
				}),
			},
		},
		async (request, reply) => {
			try {
				const userData = await db
					.select({ password: schema.users.password, id: schema.users.id })
					.from(schema.users)
					.where(eq(schema.users.email, request.body.email));

				if (userData.length === 0) {
					throw new Error("Email or password incorrect!");
				}

				const hash = userData[0].password;

				if (!bcrypt.compareSync(request.body.password, hash)) {
					throw new Error("Email or password incorrect!");
				}

				const userId = userData[0].id;

				const token = await signToken(userId);

				verifyToken(token.token);

				return reply.send(token);
			} catch (err) {
				return reply.status(400).send(err);
			}
		}
	);
};
