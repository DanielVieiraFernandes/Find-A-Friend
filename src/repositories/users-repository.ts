import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<Omit<User, 'password_hash' | 'updated_at' | 'created_at' >>;
    findByEmail(email: string): Promise<User | null>;
    findById(userId: string): Promise<User | null>;
}