import { OrgRepository } from "../repositories/orgs-repository";
import { Prisma, Org } from "@prisma/client";
import { hash } from "bcryptjs";
import { OrgHaveExistsError } from "./errors/org-have-exists-error";

interface RegisterOrgUseCaseRequest {
  name: string;
  email: string;
  phone: string;
  description: string | null;
  password: string;
  address: string;
  city: string;
}

interface RegisterOrgUseCaseResponse {
  org: Org;
}

export class RegisterOrgUseCase {
  constructor(private orgRepository: OrgRepository) { }

  async execute({
    email,
    description,
    name,
    phone,
    password,
    address, 
    city
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    try {

      const existPhone = await this.orgRepository.findByPhone(phone);
      const existEmail = await this.orgRepository.findByEmail(email);

      if (existPhone || existEmail) {
        throw new OrgHaveExistsError();
      }

      const password_hash = await hash(password, 6);

      const org = await this.orgRepository.create({
        name,
        phone,
        description,
        password_hash,
        email,
        address,
        city
      });

      return {
        org,
      };
    } catch (error) {
      throw error;
    }
  }
}
