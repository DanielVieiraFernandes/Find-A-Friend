import { Location, Prisma } from "@prisma/client";

export interface LocationRepository {
    create(data: Prisma.LocationUncheckedCreateInput):Promise<Location>;
}