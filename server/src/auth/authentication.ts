import jwt from "jsonwebtoken";
import { env } from "../env.ts";

export function signToken(id: string) {
	const payload = {
		idUser: id,
	};
	const tokenUser = jwt.sign(payload, env.SECRET_KEY, { expiresIn: "1h" });
	return { token: tokenUser };
}

export function verifyToken(token: string) {
	try {
		return jwt.verify(token, env.SECRET_KEY);
	} catch (err) {
		if (err instanceof jwt.TokenExpiredError) {
			throw new Error("The token has expired");
		}
		throw new Error("Invalid token");
	}
}
