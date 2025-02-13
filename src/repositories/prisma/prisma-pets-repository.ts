import { prisma } from "@/lib/prisma";
import { Prisma, Pet } from "@prisma/client";
import { PetsRepository } from "../pets-repository";

export class PrismaPetsRepository implements PetsRepository {
    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = await prisma.pet.create({
            data,
        })

        // const pets = await prisma.pet.findMany({
        //     where:{
        //         org:{
        //             location:{
        //                 city:'Hortolândia'
        //             }
        //         }
        //     }
        // })
        // Assim que vou retornar com base na cidade
        
        return pet;
    }
}