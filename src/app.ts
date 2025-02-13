import fastify from "fastify";
import { orgRoutes } from "./http/controllers/org/routes";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import { ZodError } from "zod";

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false,
    },
    sign: {
        expiresIn: '1d'
    }
})
app.register(fastifyCookie);
app.register(orgRoutes);
app.setErrorHandler((error, _, res) => {
    if (error instanceof ZodError) {
        return res.status(400).send({
            message: 'validation error',
            issues: error.format()
        })
    }

    return res.status(500).send({
        message: 'Internal server error'
    })
})