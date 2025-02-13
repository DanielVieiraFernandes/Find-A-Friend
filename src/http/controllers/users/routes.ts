import { FastifyInstance } from "fastify";
import { register } from "./resgister";

export async function userRoutes(app: FastifyInstance){
    app.post('/users',register)
}