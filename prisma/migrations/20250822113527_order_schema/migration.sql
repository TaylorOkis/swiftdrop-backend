-- CreateEnum
CREATE TYPE "public"."TripStatus" AS ENUM ('AVAILABLE', 'ON_TRIP', 'OFFLINE');

-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('PENDING', 'ASSIGNED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED');

-- CreateTable
CREATE TABLE "public"."Driver" (
    "id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "plate_number" TEXT NOT NULL,
    "guarantor_name" TEXT NOT NULL,
    "guarantor_phone_number" TEXT NOT NULL,
    "guarantor_address" TEXT NOT NULL,
    "trip_status" "public"."TripStatus" NOT NULL DEFAULT 'AVAILABLE',

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" TEXT NOT NULL,
    "sender_name" TEXT NOT NULL,
    "sender_address" TEXT NOT NULL,
    "sender_phone_number" TEXT NOT NULL,
    "receiver_name" TEXT NOT NULL,
    "receiver_address" TEXT NOT NULL,
    "receiver_phone_number" TEXT NOT NULL,
    "delivery_class" TEXT NOT NULL,
    "item_class" TEXT NOT NULL,
    "driver_note" TEXT,
    "status" "public"."OrderStatus" NOT NULL DEFAULT 'PENDING',
    "driver_id" TEXT,
    "created_by" TEXT,
    "company_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Driver_employee_id_key" ON "public"."Driver"("employee_id");

-- CreateIndex
CREATE INDEX "Order_company_id_idx" ON "public"."Order"("company_id");

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "public"."Order"("status");

-- CreateIndex
CREATE INDEX "Employee_company_id_idx" ON "public"."Employee"("company_id");

-- AddForeignKey
ALTER TABLE "public"."Driver" ADD CONSTRAINT "Driver_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "public"."Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
