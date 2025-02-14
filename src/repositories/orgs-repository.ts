import { Org, Prisma } from "@prisma/client";

export interface OrgRepository {
    create(data: Prisma.OrgCreateInput): Promise<Org>;
    findById(orgId: string): Promise<Org | null>;
    findByPhone(phone: string): Promise<Org | null>;
    findByEmail(email: string): Promise<Org | null>;
    save(org: Partial<Org>): Promise<Org | null>;
}