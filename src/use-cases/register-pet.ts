import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface RegisterPetUseCaseRequest {
  name: string;
  specie: "CAT" | "DOG";
  breed: string;
  description: string;
  orgId: string;
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
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    try {
      const pet = await this.petsRepository.create(
        { specie, breed, description, name, org: {} },
        orgId
      );
      return {
        pet,
      };
    } catch (error) {
      throw error;
    }
  }
}
