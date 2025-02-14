import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { prisma } from "../../lib/prisma";

export class PrismaUserRepository implements UsersRepository {
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data,
            omit:{
                password_hash: true,
                created_at: true,
                updated_at: true,
            }
        })

        return user;
    }
    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })


        return user || null;
    }
    async findById(userId: string) {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: userId
            },
        })

        return user;

    }
}