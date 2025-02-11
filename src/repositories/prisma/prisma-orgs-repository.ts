import { prisma } from "@/lib/prisma";
import { OrgRepository } from "../orgs-repository";
import { Prisma, Org } from "@prisma/client";

export class PrismaOrgsRepository implements OrgRepository {
    async create(data: Prisma.OrgCreateInput) {
        const org = await prisma.org.create({data});

        return org;
    }
}