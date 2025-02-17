import { FastifyInstance } from "fastify";
import { register } from "./resgister";
import { authenticate } from "./authenticate";

export async function userRoutes(app: FastifyInstance){
    app.post('/users',register);
    app.post('/users/sessions', authenticate);
}