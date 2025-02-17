import { Org, Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
    findByCity(city: string, page: number, age?: number | null, specie?: 'CAT' | 'DOG' | null): Promise<Pet[] | null>;
    findById(id: string): Promise<Pet & { org: Org } | null>;
}
