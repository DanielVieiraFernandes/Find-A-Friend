import { FastifyReply, FastifyRequest } from "fastify";

export async function jwtVerify(req:FastifyRequest,res:FastifyReply){
    try {        
        req.jwtVerify();
    } catch (error) {
        return res.status(401).send({
            message: 'Unauthorized'
        })
    }
}