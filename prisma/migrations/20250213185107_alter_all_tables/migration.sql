/*
  Warnings:

  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_cityId_fkey";

-- DropForeignKey
ALTER TABLE "locations" DROP CONSTRAINT "locations_cityId_fkey";

-- DropTable
DROP TABLE "City";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "citys_and_states" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "citys_and_states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "sex" "Sex",
    "address" TEXT,
    "city" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "cityId" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "citys_and_states_name_key" ON "citys_and_states"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "citys_and_states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "citys_and_states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
