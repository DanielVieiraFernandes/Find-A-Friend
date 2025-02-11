import { OrgRepository } from "@/repositories/orgs-repository";
import { Prisma, Org } from "@prisma/client";

interface RegisterOrgUseCaseRequest {
  name: string;
  address: string;
  phone: string;
  description: string | null;
}

interface RegisterOrgUseCaseResponse {
  org: Org;
}

export class RegisterOrgUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute({
    address,
    description,
    name,
    phone,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    try {
      const org = await this.orgRepository.create({
        address,
        name,
        phone,
        description,
      });

      return {
        org,
      };
    } catch (error) {
      throw error;
    }
  }
}
