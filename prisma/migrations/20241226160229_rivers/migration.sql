/*
  Warnings:

  - You are about to drop the column `location` on the `River` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `LevelRiver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `River` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `River` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "River_name_key";

-- AlterTable
ALTER TABLE "LevelRiver" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "River" DROP COLUMN "location",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
