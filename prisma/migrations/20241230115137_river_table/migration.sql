/*
  Warnings:

  - You are about to drop the column `createdAt` on the `River` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `River` table. All the data in the column will be lost.
  - You are about to drop the `LevelRiver` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LevelRiver" DROP CONSTRAINT "LevelRiver_riverId_fkey";

-- AlterTable
ALTER TABLE "River" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "LevelRiver";

-- CreateTable
CREATE TABLE "RiverLevel" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "riverId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "level" DOUBLE PRECISION NOT NULL,
    "observation" DOUBLE PRECISION NOT NULL,
    "attention" DOUBLE PRECISION NOT NULL,
    "alert" DOUBLE PRECISION NOT NULL,
    "emergency" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "RiverLevel_pkey" PRIMARY KEY ("id")
);
