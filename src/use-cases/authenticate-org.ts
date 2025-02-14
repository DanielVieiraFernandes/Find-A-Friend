import { OrgRepository } from "../repositories/orgs-repository";
import { Org } from "@prisma/client";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateOrgUseCaseRequest {
    email: string;
}

interface AuthenticateOrgUseCaseResponse {
    updateOrg: Org;
}

export class AuthenticateOrgUseCase {

    constructor(private orgRepository: OrgRepository) { }

    async execute({ email }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
        const org = await this.orgRepository.findByEmail(email)

        if(!org){
            throw new InvalidCredentialsError();
        }

        const updateOrg = await this.orgRepository.save({role: "ADMIN", id: org.id});

        if(!updateOrg){
            throw new Error();
        }

        return {
            updateOrg,
        }
    }

}