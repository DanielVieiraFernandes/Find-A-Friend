import "@fastify/jwt"

declare module "@fastify/jwt" {
    export interface FastifyJWT {
        org: {
            sub: string;
            role: 'NOAUTHORIZED' | 'ADMIN'

        },
    }
}