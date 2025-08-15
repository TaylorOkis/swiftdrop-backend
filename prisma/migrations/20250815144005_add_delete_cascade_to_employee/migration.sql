-- DropForeignKey
ALTER TABLE "public"."Employee" DROP CONSTRAINT "Employee_company_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."Employee" ADD CONSTRAINT "Employee_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
