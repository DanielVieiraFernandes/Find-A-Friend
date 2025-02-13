import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface RegisterPetUseCaseRequest {
  name: string;
  specie: "CAT" | "DOG";
  breed: string;
  description: string;
  orgId: string;
  age: number;
}

interface RegisterPetUseCaseResponse {
  pet: Pet;
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}
  async execute({
    orgId,
    breed,
    description,
    name,
    specie,
    age
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    try {
      const pet = await this.petsRepository.create(
        {specie,breed,description,name, org_id: orgId,age,}
      );
      return {
        pet,
      };
    } catch (error) {
      throw error;
    }
  }
}
