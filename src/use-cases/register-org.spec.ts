import { InMemoryOrgRepository } from "../repositories/in-memory/in-memory-org-repository";
import {it, describe, expect, beforeEach} from "vitest";
import { RegisterOrgUseCase } from "./register-org";

let orgRepository:InMemoryOrgRepository;
let sut:RegisterOrgUseCase;

describe('Register Org Test', () => {

    beforeEach(() => {
        orgRepository = new InMemoryOrgRepository();
        sut = new RegisterOrgUseCase(orgRepository);
    });

    it('Should be able register Org', async () => {

        const {org} = await sut.execute({
            address: 'Rua',
            description: 'Tanto faz',
            name: 'Daniel',
            phone: '1988947829384'
        })

        console.log(org);

        expect(org.id).toEqual(expect.any(String));
    })
}
)
   