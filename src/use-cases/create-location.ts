import { LocationRepository } from "@/repositories/location-repository";
import { Location } from "@prisma/client";

interface CreateLocationUseCaseRequest {
    address: string;
    city: string;
    org_id: string;
}

interface CreateLocationUseCaseResponse {
    location: Location
}

export class CreateLocationUseCase {

    constructor(private locationRepository: LocationRepository){}

    async execute({address,city,org_id}:CreateLocationUseCaseRequest): Promise<CreateLocationUseCaseResponse>{
        const location = await this.locationRepository.create({address,city,org_id});
        
        return {
            location,
        }
    }

}