import { prisma } from "@/lib/prisma";
import { OrgRepository } from "../orgs-repository";
import { Prisma, Org } from "@prisma/client";

export class PrismaOrgsRepository implements OrgRepository {
    async create(data: Prisma.OrgCreateInput) {
        const org = await prisma.org.create({
            data: {
                ...data,
                location: {
                    create: {
                        address: 'Rua Jerônimo Batista Fabiano, 613',
                        city: 'Hortolândia'
                    }
                },

            },
        });


        return org;
    }
}