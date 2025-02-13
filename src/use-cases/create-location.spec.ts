import {it, describe, expect, beforeEach} from "vitest";
import { InMemoryLocationRepository } from "../repositories/in-memory/in-memory-location-repository";
import { CreateLocationUseCase } from "./create-location";
import { InMemoryOrgRepository } from "../repositories/in-memory/in-memory-org-repository";

let locationRepository:InMemoryLocationRepository;
let orgRepository: InMemoryOrgRepository;
let sut:CreateLocationUseCase;

describe('Location Test', () => {

    beforeEach(() => {
        locationRepository = new InMemoryLocationRepository();
        orgRepository = new InMemoryOrgRepository();
        sut = new CreateLocationUseCase(locationRepository);
    });

    it('Should be able create a Location', async () => {

        const org = await orgRepository.create({
            name: 'Javascript',
            phone: '19 989993437',
            created_at: new Date(),
            description: 'sem desc',
            id: 'org-id',
            role: 'ADMIN',
            password_hash: '123456'
        })

        const {location} = await sut.execute({
            address: 'Rua do daniel',
            city: 'Hortolândia',
            org_id: org.id
        })

        expect(location).toEqual(expect.objectContaining({
            address: 'Rua do daniel',
            city: 'Hortolândia',
        }))

    })
}
)
   