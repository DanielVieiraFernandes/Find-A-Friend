import { RegisterOrgUseCase } from "../register-org";
import { PrismaOrgsRepository } from "../../repositories/prisma/prisma-orgs-repository";

export function MakeOrgRegisterUseCase() {
    const prismaOrgRepository = new PrismaOrgsRepository();
    const orgUseCase = new RegisterOrgUseCase(prismaOrgRepository);

    return orgUseCase;
}