/*
  Warnings:

  - You are about to drop the column `cityId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `citys_and_states` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `locations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Made the column `address` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "locations" DROP CONSTRAINT "locations_cityId_fkey";

-- DropForeignKey
ALTER TABLE "locations" DROP CONSTRAINT "locations_org_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_cityId_fkey";

-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "cityId",
ALTER COLUMN "address" SET NOT NULL;

-- DropTable
DROP TABLE "citys_and_states";

-- DropTable
DROP TABLE "locations";
