import { Prisma, Org } from "@prisma/client";
import { OrgRepository } from "../orgs-repository";
import { randomUUID } from "node:crypto";

export class InMemoryOrgRepository implements OrgRepository {

    public orgs:Org[] = [];

    async create(data: Prisma.OrgCreateInput){
        const org:Org = {
            id: randomUUID(),
            created_at: new Date(),
            address: data.address,
            description: data.description ?? null,
            name: data.name,
            phone: data.phone,
            role: data.role ?? 'NOAUTHORIZED'
        } 

        this.orgs.push(org)

        return org;
    }
}