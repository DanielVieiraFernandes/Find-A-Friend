import { Prisma, Org } from "@prisma/client";
import { OrgRepository } from "../orgs-repository";
import { randomUUID } from "node:crypto";

export class InMemoryOrgRepository implements OrgRepository {

    public orgs: Org[] = [];

    async create(data: Prisma.OrgCreateInput) {
        const org: Org = {
            id: randomUUID(),
            email: data.email,
            created_at: new Date(),
            description: data.description ?? null,
            name: data.name,
            phone: data.phone,
            role: data.role ?? 'ADMIN',
            password_hash: '123456',
            address: data.address,
            city: data.address,
        }

        this.orgs.push(org);

        return org;
    }

    async findById(orgId: string) {
        const org = this.orgs.find(org => org.id === orgId);

        if (!org) {
            return null;
        }

        return org;
    }

    async findByPhone(phone: string) {
        const org = this.orgs.find(org => org.phone === phone)

        if (!org) {
            return null
        }

        return org;
    }

    async findByEmail(email: string) {
        const org = this.orgs.find(org => org.email === email)

        if (!org) {
            return null
        }

        return org;
    }

    async save(updateOrg: Partial<Org>) {

        this.orgs = this.orgs.map(org =>
            org.id === updateOrg.id ? { ...org, ...updateOrg } : org
        );

        const orgUpdated = this.orgs.find(org => org.role === "ADMIN" && org.id === updateOrg.id);

        if (!orgUpdated) return null;

        return orgUpdated;
    }
}