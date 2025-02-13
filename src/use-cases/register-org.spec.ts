import { InMemoryOrgRepository } from "../repositories/in-memory/in-memory-org-repository";
import { it, describe, expect, beforeEach } from "vitest";
import { RegisterOrgUseCase } from "./register-org";
import { OrgHaveExistsError } from "./errors/org-have-exists-error";

let orgRepository: InMemoryOrgRepository;
let sut: RegisterOrgUseCase;

describe('Register Org Test', () => {

    beforeEach(() => {
        orgRepository = new InMemoryOrgRepository();
        sut = new RegisterOrgUseCase(orgRepository);
    });

    it('Should be able register Org', async () => {

        const { org } = await sut.execute({
            email: 'Daniel@gmail.com',
            description: 'Tanto faz',
            name: 'Daniel',
            phone: '1988947829384',
            password: '123456',
            address: 'Rua nnfjsndfjnsdjf',
            city: 'Hortolândia'
        })


        expect(org.id).toEqual(expect.any(String));
    })

    it('Should be able register twice phones of Org', async () => {

        await sut.execute({
            description: 'Tanto faz',
            name: 'Daniel',
            phone: '1988947829384',
            password: '123456',
            email: 'Daniel@gmail.com',
            address: 'Rua nnfjsndfjnsdjf',
            city: 'Hortolândia'
        })


        await expect(() => sut.execute({
            email: 'Daniel21@gmail.com',
            description: 'Tanto faz',
            name: 'Daniel',
            phone: '1988947829384',
            password: '123456',
            address: 'Rua nnfjsndfjnsdjf',
            city: 'Hortolândia'
        })).rejects.toBeInstanceOf(OrgHaveExistsError);
    })


    it('Should be able register twice emails of Org', async () => {

        await sut.execute({
            description: 'Tanto faz',
            name: 'Daniel',
            phone: '1988947829374',
            password: '123456',
            email: 'Daniel@gmail.com',
            address: 'Rua nnfjsndfjnsdjf',
            city: 'Hortolândia'
        })


        await expect(() => sut.execute({
            email: 'Daniel@gmail.com',
            description: 'Tanto faz',
            name: 'Daniel',
            phone: '1988947829384',
            password: '123456',
            address: 'Rua nnfjsndfjnsdjf',
            city: 'Hortolândia'
        })).rejects.toBeInstanceOf(OrgHaveExistsError);
    })
}
)
