/*
  Warnings:

  - Changed the type of `riverId` on the `RiverLevel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "RiverLevel" DROP COLUMN "riverId",
ADD COLUMN     "riverId" UUID NOT NULL;

-- CreateIndex
CREATE INDEX "RiverLevel_riverId_idx" ON "RiverLevel"("riverId");

-- AddForeignKey
ALTER TABLE "RiverLevel" ADD CONSTRAINT "RiverLevel_riverId_fkey" FOREIGN KEY ("riverId") REFERENCES "River"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
