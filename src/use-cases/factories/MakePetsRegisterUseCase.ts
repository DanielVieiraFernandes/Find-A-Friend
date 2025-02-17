import { PrismaPetsRepository } from "src/repositories/prisma/prisma-pets-repository";
import { RegisterPetUseCase } from "../register-pet";

export function makePetsRegisterUseCase(){
    const petsRepository = new PrismaPetsRepository();
    const sut = new RegisterPetUseCase(petsRepository);

    return sut;
}
