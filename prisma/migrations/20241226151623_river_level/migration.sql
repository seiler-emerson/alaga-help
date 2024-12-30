/*
  Warnings:

  - The primary key for the `LevelRiver` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `LevelRiver` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `River` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "LevelRiver" DROP CONSTRAINT "LevelRiver_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "LevelRiver_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "River";
