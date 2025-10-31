/*
  Warnings:

  - A unique constraint covering the columns `[serviceId]` on the table `ProviderService` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ProviderService" ADD COLUMN     "serviceId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ProviderService_serviceId_key" ON "ProviderService"("serviceId");

-- AddForeignKey
ALTER TABLE "ProviderService" ADD CONSTRAINT "ProviderService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;
