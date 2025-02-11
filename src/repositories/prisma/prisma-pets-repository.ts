import { prisma } from "@/lib/prisma";
import { Prisma, Pet } from "@prisma/client";
import { PetsRepository } from "../pets-repository";

export class PrismaPetsRepository implements PetsRepository {
    async create(data: Prisma.PetCreateInput, orgId: string) {
        const pet = await prisma.pet.create({data})

        return pet;
    }
}