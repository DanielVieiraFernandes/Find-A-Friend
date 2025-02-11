import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "node:crypto";

export class InMemoryPetRepository implements PetsRepository {

    public pets: Pet[] = [];

    async create(data:Prisma.PetCreateInput, orgId: string){

       const pet:Pet = {
        id: randomUUID(),
        created_at: new Date(),
        breed: data.breed,
        description: data.description,
        name: data.name,
        org_id: orgId,
        specie: data.specie
       }

       this.pets.push(pet);

       return pet;
    }
}