import { prisma } from "../../lib/prisma";
import { OrgRepository } from "../orgs-repository";
import { Prisma, Org } from "@prisma/client";

export class PrismaOrgsRepository implements OrgRepository {
    async findById(orgId: string): Promise<Org | null> {
        throw new Error("Method not implemented.");
    }
    async findByPhone(phone: string): Promise<Org | null> {
        const org = await prisma.org.findUnique({
            where:{
                phone,
            }
        })

        return org;
    }
    async findByEmail(email: string): Promise<Org | null> {
        const org = await prisma.org.findUnique({
            where:{
                email,
            }
        })

        return org;
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