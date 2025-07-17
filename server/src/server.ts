import cors from "@fastify/cors";
import Fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { env } from "./env.ts";
import { getUsers } from "./http/routes/get-users.ts";
import { login } from "./http/routes/login.ts";
import { createUsersRoute } from "./http/routes/post-users.ts";

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

fastify.register(login);
fastify.register(getUsers);
fastify.register(createUsersRoute);

fastify.listen({ port: env.PORT });
