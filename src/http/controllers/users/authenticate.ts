import { FastifyReply, FastifyRequest } from "fastify";
import { InvalidCredentialsError } from "src/use-cases/errors/invalid-credentials-error";
import { MakeUserAuthenticateUseCase } from "src/use-cases/factories/MakeUserAuthenticateUseCase";
import { z } from "zod";

export async function authenticate(req: FastifyRequest, res: FastifyReply) {

    const authenticateUserBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6, 'invalid password'),
    });

    const { email, password } = authenticateUserBodySchema.parse(req.body);

    try {
        const sut = MakeUserAuthenticateUseCase();

        const { user } = await sut.execute({ email, password });

        const token = await res.jwtSign({
            role: user.role
        }, {
            sign: {
                sub: user.id,
            }
        });

        const refreshToken = await res.jwtSign({
            role: user.role
        }, {
            sign: {
                sub: user.id,
                expiresIn: '7d'
            }
        });

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
        if (error instanceof InvalidCredentialsError) {
            res.status(409).send({
                message: error.message
            })
        }

        throw error;
    }

}