import { FastifyReply, FastifyRequest } from "fastify";
import { makePetsRegisterUseCase } from "src/use-cases/factories/MakePetsRegisterUseCase";
import { z } from "zod";

export async function register(req: FastifyRequest, res: FastifyReply) {

    // name: string;
    // specie: "CAT" | "DOG";
    // breed: string;
    // description: string;
    // orgId: string;
    // age: number;

    const registerPetBodySchema = z.object({
        name: z.string(),
        specie: z.enum(['CAT', 'DOG']),
        breed: z.string(),
        description: z.string().default('sem descrição'),
        age: z.coerce.number(),
    })

    const { age, breed, description, name, specie } = registerPetBodySchema.parse(req.body);

    try {

        const sut = makePetsRegisterUseCase();

        const { pet } = await sut.execute({ age, breed, description, name, specie, orgId: req.user.sub });

        res.status(201).send({
            pet,
        })

    } catch (error) {
        throw error;
    }

}