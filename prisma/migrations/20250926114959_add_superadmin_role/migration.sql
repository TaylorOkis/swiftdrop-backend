-- AlterEnum
ALTER TYPE "public"."Role" ADD VALUE 'SUPERADMIN';

-- AlterTable
ALTER TABLE "public"."Employee" ALTER COLUMN "status" DROP DEFAULT;
