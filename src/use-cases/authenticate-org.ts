import { OrgRepository } from "../repositories/orgs-repository";
import { Org } from "@prisma/client";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";

interface AuthenticateOrgUseCaseRequest {
    email: string;
    password: string;
}

interface AuthenticateOrgUseCaseResponse {
    org: Omit<Org, 'password_hash' | 'created_at'>;
}

export class AuthenticateOrgUseCase {

    constructor(private orgRepository: OrgRepository) { }

    async execute({ email, password }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
        const findOrg = await this.orgRepository.findByEmail(email);

        if(!findOrg){
            throw new InvalidCredentialsError();
        }

        const doesPasswordMatches = await compare(password, findOrg.password_hash);

        if(!doesPasswordMatches){
            throw new InvalidCredentialsError();
        }

        const updateOrg = await this.orgRepository.save({role: "ADMIN", id: findOrg.id});

        if(!updateOrg){
            throw new Error();
        }

        const {password_hash,created_at, ...org} = updateOrg;

        return {
            org,
        }
    }

}