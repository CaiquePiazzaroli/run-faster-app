import cors from "@fastify/cors";
import Fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { env } from "./env.ts";
import { getRaces } from "./http/routes/protected/get-races.ts";
import { getUserData } from "./http/routes/protected/get-user-data.ts";
import { getUsers } from "./http/routes/protected/get-users.ts";
import { createPostsRoute } from "./http/routes/protected/post-races.ts";
import { createUsersRoute } from "./http/routes/protected/post-users.ts";
import { auth } from "./http/routes/public/auth.ts";

const fastify = Fastify({
	logger: false,
});

await fastify.register(cors, {
	origin: "http://localhost:5173",
});

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

fastify.get("/health", () => {
	return "OK";
});

fastify.register(auth);
fastify.register(getUsers);
fastify.register(getUserData);
fastify.register(createUsersRoute);
fastify.register(getRaces);
fastify.register(createPostsRoute);

fastify.listen({ port: env.PORT });
