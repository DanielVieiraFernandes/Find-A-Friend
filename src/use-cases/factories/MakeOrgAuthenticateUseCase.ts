import { PrismaOrgsRepository } from "../../repositories/prisma/prisma-orgs-repository";
import { AuthenticateOrgUseCase } from "../authenticate-org";

export function MakeOrgAuthenticateUseCase() {
    const prismaOrgRepository = new PrismaOrgsRepository();
    const orgUseCase = new AuthenticateOrgUseCase(prismaOrgRepository);

    return orgUseCase;
}