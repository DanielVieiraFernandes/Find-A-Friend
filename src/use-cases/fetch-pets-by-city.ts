import { Pet } from "@prisma/client";
import { PetsRepository } from "src/repositories/pets-repository";
import { PetNotExistsError } from "./errors/pet-not-exists-error";

interface FetchPetsByCityUseCaseRequest{
    city: string;
    page: number
}

interface FetchPetsByCityUseCaseResponse{
    pets: Pet[];
}

export class FetchPetsByCityUseCase {

    constructor(private PetsRepository: PetsRepository){}

    async execute({city,page}:FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse>{
        const pets = await this.PetsRepository.findByCity(city, page);

        if(!pets){
            throw new PetNotExistsError();
        }

        return {
            pets
        }
    }
}