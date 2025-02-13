/*
  Warnings:

  - The values [NOAUTHORIZED] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('USER', 'ADMIN');
ALTER TABLE "orgs" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "orgs" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "orgs" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- AlterTable
ALTER TABLE "orgs" ALTER COLUMN "role" SET DEFAULT 'USER';

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "sex" "Sex",
    "address" TEXT,
    "city" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
