import { FastifyInstance } from "fastify";
import { jwtVerify } from "src/middlewares/jwt-verify";
import { searchPets } from "./search-pets";
import { register } from "./register";
import { onlyAdmin } from "src/middlewares/only-admin";
import { searchPet } from "./search-pet";

export async function petsRoutes(app: FastifyInstance) {
    app.get('/pets/city/:city', { onRequest: [jwtVerify] }, searchPets);
    app.get('/pets/:id', {onRequest: [jwtVerify]}, searchPet);
    app.post('/pets', {onRequest: [jwtVerify, onlyAdmin('ADMIN')]},register);
}