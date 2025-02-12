import {it, describe, expect, beforeEach} from "vitest";
import { InMemoryPetRepository } from "../repositories/in-memory/in-memory-pet-repository";
import { RegisterPetUseCase } from "./register-pet";
import { InMemoryOrgRepository } from "../repositories/in-memory/in-memory-org-repository";

let petRepository:InMemoryPetRepository;
let sut: RegisterPetUseCase;
let orgRepository:InMemoryOrgRepository;

describe('Register Pet Test', () => {

    beforeEach(() => {
        petRepository = new InMemoryPetRepository();
        sut = new RegisterPetUseCase(petRepository);
        orgRepository  = new InMemoryOrgRepository();
    });

    it('Should be able register Org', async () => {

        const {id} = await orgRepository.create({
            address: 'nfioan',
            name: 'Org',
            phone: '19989993437',
        })

        const {pet} = await sut.execute({
            description: 'Tanto faz',
            name: 'Daniel',
            breed: "Golden",
            specie: "DOG",
            orgId: id 
        })

        console.log(pet);
        
        expect(pet.id).toEqual(expect.any(String));
        expect(pet).toEqual(expect.objectContaining({
            name: 'Daniel'
        }))
    })
}
)
   