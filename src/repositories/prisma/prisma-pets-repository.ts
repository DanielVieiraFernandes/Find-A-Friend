import { prisma } from "../../lib/prisma";
import { Prisma, Pet } from "@prisma/client";
import { PetsRepository } from "../pets-repository";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet;
  }
  async findByCity(city: string, page: number, age: number | null, specie: "CAT" | "DOG" | null){
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city,
        },
        ...(age != null ? { age } : {}),
        ...(specie != null ? { specie } : {}),
      },
      take: 20,
      skip: (page - 1) * 20,
    });
  
    return pets;
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: {
        org: true
      }
    })

    return pet;

  }
}