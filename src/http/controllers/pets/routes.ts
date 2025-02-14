import { FastifyInstance } from "fastify";
import { jwtVerify } from "src/middlewares/jwt-verify";
import { searchPets } from "./search-pets";

export async function petsRoutes(app: FastifyInstance) {
    app.post('/pets', { onRequest: [jwtVerify] }, searchPets);
}