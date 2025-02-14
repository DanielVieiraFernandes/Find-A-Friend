import { FetchPetsByCityUseCase } from "../fetch-pets-by-city";
import { PrismaPetsRepository } from "src/repositories/prisma/prisma-pets-repository";

export function makePetsSearchUseCase(){
    const petsRepository = new PrismaPetsRepository();
    const sut = new FetchPetsByCityUseCase(petsRepository);

    return sut;
}
