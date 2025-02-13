import { MakeUserRegisterUseCase } from "../../../use-cases/factories/MakeUserRegisterUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
export async function register(req: FastifyRequest, res: FastifyReply) {


    const registerUserBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        age: z.string(),
        password: z.string(),
        sex: z.enum(["FEMALE", "MALE", "OTHER"]).nullable(),
        address: z.string(),
        city: z.string(),
    })

    const { age, city, email, name, password, sex, address } = registerUserBodySchema.parse(req.body)

    const registerUser = MakeUserRegisterUseCase();

    const { user } = await registerUser.execute({
        age, email, name, password, sex, city, address,
    })

    const token = await res.jwtSign({
        role: user.role
    }, {
        sign: {
            sub: user.id,
        }
    })

    const refreshToken = await res.jwtSign({
        role: user.role
    }, {
        sign: {
            sub: user.id,
            expiresIn: '1d'
        }
    })

    res.status(200).send({
        user,
        token,
        refreshToken,
    })

}