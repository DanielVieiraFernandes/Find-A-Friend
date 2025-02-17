import { FastifyReply, FastifyRequest } from "fastify";
import { PetNotExistsError } from "src/use-cases/errors/pet-not-exists-error";
import { MakePetsSearchByIdUseCase } from "src/use-cases/factories/MakePetsSearchByIdUseCase";
import { z } from "zod";

export async function searchPet(req: FastifyRequest, res: FastifyReply) {

    const searchPetsParamsSchema = z.object({
        id: z.string().uuid()
    })

    const { id } = searchPetsParamsSchema.parse(req.params)

    try {
        const sut = MakePetsSearchByIdUseCase();

        const { pet } = await sut.execute({ id });

        res.status(200).send({
            pet
        })

    } catch (error) {
        if (error instanceof PetNotExistsError) {
            return res.status(409).send({
                message: error.message
            })
        }

        throw error;
    }

}