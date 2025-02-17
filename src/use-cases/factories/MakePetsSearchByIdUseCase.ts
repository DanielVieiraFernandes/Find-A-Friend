import { PrismaPetsRepository } from "src/repositories/prisma/prisma-pets-repository";
import { FetchPetByIdUseCase } from "../fetch-pet-by-id";

export function MakePetsSearchByIdUseCase(){
    const petsRepository = new PrismaPetsRepository();
    const sut = new FetchPetByIdUseCase(petsRepository);

    return sut;
}
