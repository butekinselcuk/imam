-- AlterTable
ALTER TABLE "Provider" ADD COLUMN     "gender" TEXT,
ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "methods" TEXT[],
ADD COLUMN     "qualifications" TEXT[],
ADD COLUMN     "reviewLevel" TEXT,
ADD COLUMN     "servicesYear" TEXT,
ADD COLUMN     "target" TEXT[];
