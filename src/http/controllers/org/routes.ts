import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";

export async function orgRoutes(app: FastifyInstance) {
    app.post('/org', register);
    app.post('/org/sessions', authenticate);
}