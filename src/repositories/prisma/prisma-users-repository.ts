import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { prisma } from "../../lib/prisma";

export class PrismaUserRepository implements UsersRepository {
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data,
        })

        return user;
    }
    async findByEmail(email: string) {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                email: email
            }
        })


        return user
    }
    async findById(userId: string) {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: userId
            }
        })

        return user;

    }
}