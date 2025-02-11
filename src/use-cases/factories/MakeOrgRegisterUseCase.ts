import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-org-repository";
import { RegisterOrgUseCase } from "../register-org";

export function MakeOrgRegisterUseCase() {
    const inMemoryOrgRepository = new InMemoryOrgRepository();
    const orgUseCase = new RegisterOrgUseCase(inMemoryOrgRepository);

    return orgUseCase;
}