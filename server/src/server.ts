import Fastify from "fastify";
import { env } from "./env.ts";

const fastify = Fastify({
	logger: false,
});

fastify.get("/health", () => {
	return "OK";
});

fastify.listen({ port: env.PORT });
