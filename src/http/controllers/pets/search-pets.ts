import { FastifyReply, FastifyRequest } from "fastify";
import { makePetsSearchUseCase } from "src/use-cases/factories/MakePetsSearchUseCase";
import { z } from "zod";

export async function searchPets(req: FastifyRequest, res: FastifyReply) {

    const searchPetsQuerySchema = z.object({
        city: z.string().min(3, 'City not exists').transform(value => value.toLowerCase()),
        page: z.number().default(1),
    })

    const {city,page} = searchPetsQuerySchema.parse(req.query);

    const sut = makePetsSearchUseCase();

    const pets = await sut.execute({city,page});

    res.status(201).send({
        pets,
        page,
    })

}