import { PrismaUserRepository } from "../../repositories/prisma/prisma-users-repository";
import { AuthenticateUserUseCase } from "../authenticate-user";

export function MakeUserAuthenticateUseCase(){
    const userRepository = new PrismaUserRepository();
    const sut = new AuthenticateUserUseCase(userRepository);

    return sut;
}