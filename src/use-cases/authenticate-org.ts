import { OrgRepository } from "../repositories/orgs-repository";
import { Org } from "@prisma/client";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateOrgUseCaseRequest {
    orgId: string;
}

interface AuthenticateOrgUseCaseResponse {
    org: Org;
}

export class AuthenticateOrgUseCase {

    constructor(private orgRepository: OrgRepository) { }

    async execute({ orgId }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
        const org = await this.orgRepository.findById(orgId)

        if(!org){
            throw new InvalidCredentialsError();
        }

        return {
            org
        }
    }

}