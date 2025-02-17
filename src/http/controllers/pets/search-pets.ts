import { FastifyReply, FastifyRequest } from "fastify";
import { PetNotExistsError } from "src/use-cases/errors/pet-not-exists-error";
import { makePetsSearchUseCase } from "src/use-cases/factories/MakePetsSearchUseCase";
import { z } from "zod";

export async function searchPets(req: FastifyRequest, res: FastifyReply) {

    const searchPetsParamSchema = z.object({
        city: z.string().min(3, 'City not exists').transform(value => value.toLowerCase()),
    })

    const searchPetsQuerySchema = z.object({
        page: z.coerce.number().default(1),
        specie: z.enum(['CAT', 'DOG']).nullable().default(null),
        age: z.coerce.number().nullable().default(null),
    })

    const { city } = searchPetsParamSchema.parse(req.params);
    const { page, age, specie } = searchPetsQuerySchema.parse(req.query);

    try {
        const sut = makePetsSearchUseCase();

        const { pets } = await sut.execute({ city, page, age, specie});

        res.status(201).send({
            content: pets,
            page,
        });

    } catch (error) {
        if (error instanceof PetNotExistsError) {
            return res.status(409).send({
                message: error.message
            })
        }

        throw error;
    }

}