import { Prisma, Location } from "@prisma/client";
import { LocationRepository } from "../location-repository";
import { randomUUID } from "node:crypto";

export class InMemoryLocationRepository implements LocationRepository{

    public locations:Location[] = [];

    async create(data: Prisma.LocationUncheckedCreateInput){
        const location:Location = {
            id: randomUUID(),
            address: data.address,
            city: data.city,
            org_id:  data.org_id,
        }

        this.locations.push(location);

        return location;
    }
}