import { FastifyReply, FastifyRequest } from "fastify";
import { InvalidCredentialsError } from "src/use-cases/errors/invalid-credentials-error";
import { MakeOrgAuthenticateUseCase } from "src/use-cases/factories/MakeOrgAuthenticateUseCase";
import { z } from "zod";

export async function authenticate(req:FastifyRequest,res:FastifyReply){
    const authenticateOrgBodySchema = z.object({
        email: z.string().email(),
        password: z.string(),
    })

    const {email,password} = authenticateOrgBodySchema.parse(req.body);

    try {
        
        const sut = MakeOrgAuthenticateUseCase();

        const {org} = await sut.execute({email,password});

        const token = await res.jwtSign({
            role: org.role
        },
        {
            sub: org.id
        });

        const refreshToken = await res.jwtSign({
            role: org.role
        },
        {
            sub: org.id,
            expiresIn: '7d'
        });

        res.status(200).setCookie('refreshToken', refreshToken, {
            secure: true,
            path: '/',
            httpOnly: true,
            sameSite: true,
        }).send({
            org: org,
            token,
            refreshToken,
        })


    } catch (error) {
        if(error instanceof InvalidCredentialsError){
            res.status(409).send({
                message: error.message
            })
        }

        throw error;
    }
}