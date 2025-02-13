import { MakeOrgRegisterUseCase } from "../../../use-cases/factories/MakeOrgRegisterUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(req: FastifyRequest, res: FastifyReply) {

    const createOrgBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        city: z.string(),
        address: z.string(),
        phone: z.string(),
        password: z.string(),
        description: z.string().nullable().default(null)
    })

    const { address, name, phone, description, city, email, password } = createOrgBodySchema.parse(req.body);

    try {

        const orgRegisterUseCase = MakeOrgRegisterUseCase();

        const { org } = await orgRegisterUseCase.execute({ address, name, phone, description, city, email, password });

        const token = await res.jwtSign({
            role: org.role
        }, {
            sign: {
                sub: org.id,
            }
        })

        const refreshToken = await res.jwtSign({
            role: org.role
        }, {
            sign: {
                sub: org.id,
                expiresIn: '7d',
            }
        })

        return res.status(201).setCookie('refreshToken', refreshToken, {
            path: '/',
            secure: true,
            sameSite: true,
            httpOnly: true,
        }).send({
            org,
            token,
        })

    } catch (error) {
        throw error;
    }

}