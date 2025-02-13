import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUserUseCase } from "../register-user";

export function MakeUserRegisterUseCase(){
    const userRepository = new PrismaUserRepository();
    const sut = new RegisterUserUseCase(userRepository);

    return sut;
}