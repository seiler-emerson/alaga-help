/*
  Warnings:

  - Added the required column `userId` to the `FloodingNotification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FloodingNotification" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "FloodingNotification" ADD CONSTRAINT "FloodingNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
