import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
    create(data: Prisma.PetCreateInput, org_id: string): Promise<Pet>;
}