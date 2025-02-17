import { UsersRepository } from "../repositories/users-repository";
import { User } from "@prisma/client";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";

interface AuthenticateUserUseCaseRequest {
    email: string;
    password: string;
}

interface AuthenticateUserUseCaseResponse {
    user: Omit<User, 'password_hash' | 'created_at' | 'updated_at'>;
}

export class AuthenticateUserUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async execute({ email, password }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {

        const findUser = await this.usersRepository.findByEmail(email);

        if (!findUser) {
            throw new InvalidCredentialsError()
        };

        const doesPasswordMatches = await compare(password, findUser.password_hash);

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError();
        };

        const {password_hash,created_at,updated_at, ...user} = findUser;


        return { user };
    }
}