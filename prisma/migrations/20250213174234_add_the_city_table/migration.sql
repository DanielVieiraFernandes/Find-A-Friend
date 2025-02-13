/*
  Warnings:

  - You are about to drop the column `city` on the `locations` table. All the data in the column will be lost.
  - Added the required column `cityId` to the `locations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cityId" TEXT;

-- AlterTable
ALTER TABLE "locations" DROP COLUMN "city",
ADD COLUMN     "cityId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
