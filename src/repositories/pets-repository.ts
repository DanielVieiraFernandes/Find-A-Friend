import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
    create(data: Prisma.PetCreateInput, orgId: string): Promise<Pet>;
}