import { UsersRepository } from "../repositories/users-repository";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserHaveExistsError } from "./errors/user-have-exists-error";

export enum Sex {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
}

interface RegisterUserUseCaseRequest {
    name: string;
    age: string;
    email: string;
    password: string;
    address: string;
    city: string;
    sex: "MALE" | "FEMALE" | "OTHER" | null
}

interface RegisterUserUseCaseResponse {
    user: User;
}

export class RegisterUserUseCase {
    constructor(private usersRepository: UsersRepository) { }
    async execute({
        age,
        email,
        name,
        password,
        sex,
        address,
        city
    }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {

        const existUserWithThisEmail = await this.usersRepository.findByEmail(email);

        if (existUserWithThisEmail) {
            throw new UserHaveExistsError();
        }


        const password_hash = await hash(password, 6);

        const user = await this.usersRepository.create({
            age,
            email,
            name,
            password_hash,
            sex: sex ?? null,
            address,
            city,
        })

        return {
            user,
        }

    }
}
