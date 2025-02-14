import { prisma } from "../../lib/prisma";
import { OrgRepository } from "../orgs-repository";
import { Prisma, Org } from "@prisma/client";

export class PrismaOrgsRepository implements OrgRepository {
    findById(orgId: string): Promise<Org | null> {
        throw new Error("Method not implemented.");
    }
    findByPhone(phone: string): Promise<Org | null> {
        throw new Error("Method not implemented.");
    }
    findByEmail(email: string): Promise<Org | null> {
        throw new Error("Method not implemented.");
    }
    async create(data: Prisma.OrgCreateInput) {
        const org = await prisma.org.create({
            data,
        });


        return org;
    }

    async save(org:Partial<Org>){
        const updateOrg = await prisma.org.update({
            where: {
                id: org.id
            },
            data:{
                ...org
            }
        })


        return updateOrg;
    }
}