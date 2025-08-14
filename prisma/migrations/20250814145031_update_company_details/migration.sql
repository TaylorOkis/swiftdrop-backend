/*
  Warnings:

  - You are about to drop the column `password` on the `Company` table. All the data in the column will be lost.
  - Added the required column `address` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Made the column `companyName` on table `Company` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Company" DROP COLUMN "password",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "color" TEXT[],
ADD COLUMN     "logo" TEXT NOT NULL,
ALTER COLUMN "companyName" SET NOT NULL;
