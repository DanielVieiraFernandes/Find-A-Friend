import { Pet } from "@prisma/client";
import { PetsRepository } from "src/repositories/pets-repository";
import { PetNotExistsError } from "./errors/pet-not-exists-error";


interface FetchPetByIdUseCaseRequest {
    id: string;
}

interface FetchPetByIdUseCaseResponse {
    pet: Pet;
}

export class FetchPetByIdUseCase {

    constructor(private petsRepository: PetsRepository) { }

    async execute({ id }: FetchPetByIdUseCaseRequest): Promise<FetchPetByIdUseCaseResponse> {

        const findPet = await this.petsRepository.findById(id);

        if (!findPet) {
            throw new PetNotExistsError();
        }

        return {
            pet: findPet
        }

    }

}