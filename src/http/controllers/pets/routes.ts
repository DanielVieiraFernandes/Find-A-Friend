import { FastifyInstance } from "fastify";
import { jwtVerify } from "src/middlewares/jwt-verify";
import { searchPets } from "./search-pets";
import { register } from "./register";
import { onlyAdmin } from "src/middlewares/only-admin";

export async function petsRoutes(app: FastifyInstance) {
    app.post('/pets/:cityId', { onRequest: [jwtVerify] }, searchPets);
    app.post('/pets', {onRequest: [jwtVerify, onlyAdmin('ADMIN')]},register);
}