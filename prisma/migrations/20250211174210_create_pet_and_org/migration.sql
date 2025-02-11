-- CreateEnum
CREATE TYPE "Specie" AS ENUM ('CAT', 'DOG');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('NOAUTHORIZED', 'ADMIN');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "specie" "Specie" NOT NULL,
    "breed" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Org" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "description" TEXT,
    "role" "Role" NOT NULL DEFAULT 'NOAUTHORIZED',

    CONSTRAINT "Org_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
