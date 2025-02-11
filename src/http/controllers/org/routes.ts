import { FastifyInstance } from "fastify";
import { register } from "./register";

export async function orgRoutes(app: FastifyInstance){
    app.post('/org', register);
}