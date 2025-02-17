import { MakeUserRegisterUseCase } from "../../../use-cases/factories/MakeUserRegisterUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserHaveExistsError } from "src/use-cases/errors/user-have-exists-error";
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

    const { age, city, email, name, password, sex, address } = registerUserBodySchema.parse(req.body);

    const registerUser = MakeUserRegisterUseCase();

    try {
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

        res.status(200).setCookie('refreshToken', refreshToken, {
            path: '/',
            secure: true,
            sameSite: true,
            httpOnly: true,
        }).send({
            user,
            token,
            refreshToken,
        });
        
    } catch (error) {

        if (error instanceof UserHaveExistsError) {
            res.status(409).send({
                message: error.message
            })
        }

        throw error;

    }

}