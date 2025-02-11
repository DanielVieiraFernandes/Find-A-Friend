import { MakeOrgRegisterUseCase } from "@/use-cases/factories/MakeOrgRegisterUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(req:FastifyRequest, res: FastifyReply) {

    const createOrgBodySchema = z.object({
        name: z.string(),
        address: z.string(),
        phone: z.string(),
        description: z.string().nullable().default(null)
    })

    const {address,name,phone,description} = createOrgBodySchema.parse(req.body);

    try {
        
        const orgRegisterUseCase = MakeOrgRegisterUseCase();

        const org = await orgRegisterUseCase.execute({address,name,phone,description});

        return res.status(201).send({
            org,
        })

    } catch (error) {
        throw error;
    }

}