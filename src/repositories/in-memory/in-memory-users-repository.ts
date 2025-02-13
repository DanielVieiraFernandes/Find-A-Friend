import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository {

    public users: User[] = [];

    async create(data: Prisma.UserCreateInput) {

        const user: User = {
            id: randomUUID(),
            name: data.name,
            address: data.address ?? null,
            age: data.age,
            city: data.city ?? null,
            created_at: new Date(),
            email: data.email,
            password_hash: data.password_hash,
            sex: data.sex ?? null,
            updated_at: null,
        }

        this.users.push(user);

        return user;
    }

    async findByEmail(email: string) {
        const user = this.users.find(user => user.email === email)

        if (!user) {
            return null;
        }

        return user;

    }

    async findById(userId: string) {
        const user = this.users.find(user => user.id === userId);

        if (!user) {
            return null;
        }

        return user;
    }


}