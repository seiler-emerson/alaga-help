/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `LevelRiver` table. All the data in the column will be lost.
  - Changed the type of `riverId` on the `LevelRiver` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "LevelRiver_riverId_date_idx";

-- AlterTable
ALTER TABLE "LevelRiver" DROP COLUMN "updatedAt",
DROP COLUMN "riverId",
ADD COLUMN     "riverId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "River" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "River_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LevelRiver" ADD CONSTRAINT "LevelRiver_riverId_fkey" FOREIGN KEY ("riverId") REFERENCES "River"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
