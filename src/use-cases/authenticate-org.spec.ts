import { InMemoryOrgRepository } from "../repositories/in-memory/in-memory-org-repository";
import { it, describe, expect, beforeEach } from "vitest";
import { AuthenticateOrgUseCase } from "./authenticate-org";
import { randomUUID } from "node:crypto";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let orgRepository: InMemoryOrgRepository;
let sut: AuthenticateOrgUseCase;

describe('Authenticate Org Test', () => {

    beforeEach(() => {
        orgRepository = new InMemoryOrgRepository();
        sut = new AuthenticateOrgUseCase(orgRepository);
    });

    it('Should be able authemticate Org', async () => {

        const org = await orgRepository.create({
            description: 'Tanto faz',
            name: 'Org-01',
            phone: '19989993437',
            password_hash: '123456',
            created_at: new Date(),
            id: randomUUID(),
            email: 'daniel@gmail.com',
            address: 'Rua São Paulo',
            city: 'Hortolândia'
        })

        const response = await sut.execute({
            email: org.email
        })


        expect(response.updateOrg).toEqual(expect.objectContaining({
            description: 'Tanto faz',
            name: 'Org-01',
            phone: '19989993437',
            password_hash: '123456',
        }))

    })

    it('Should be able error in authenticate Org', async () => {

        await expect(() => sut.execute({
            email: 'noexistemail@gmail.com'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)

    })
}
)
