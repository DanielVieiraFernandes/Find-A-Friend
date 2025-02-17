import { Pet } from "@prisma/client";
import { PetsRepository } from "src/repositories/pets-repository";
import { PetNotExistsError } from "./errors/pet-not-exists-error";

interface FetchPetsByCityUseCaseRequest{
    city: string;
    page: number;
    age: number | null;
    specie: "CAT" | "DOG" | null;
}

interface FetchPetsByCityUseCaseResponse{
    pets: Pet[];
}

export class FetchPetsByCityUseCase {

    constructor(private PetsRepository: PetsRepository){}

    async execute({city,page, age, specie}:FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse>{

        const pets = await this.PetsRepository.findByCity(city, page, age, specie);

        if(!pets){
            throw new PetNotExistsError();
        }

        return {
            pets
        }
    }
}