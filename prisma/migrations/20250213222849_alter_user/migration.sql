-- AlterTable
ALTER TABLE "orgs" ALTER COLUMN "role" SET DEFAULT 'ADMIN';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
