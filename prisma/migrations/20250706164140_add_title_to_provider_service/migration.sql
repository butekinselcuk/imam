/*
  Warnings:

  - Added the required column `title` to the `ProviderService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProviderService" ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'Hizmet';
