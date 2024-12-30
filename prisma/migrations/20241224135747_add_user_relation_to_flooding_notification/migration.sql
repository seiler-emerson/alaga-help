/*
  Warnings:

  - Added the required column `limitLatEnd` to the `FloodingNotification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `limitLatStart` to the `FloodingNotification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `limitLonEnd` to the `FloodingNotification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `limitLonStart` to the `FloodingNotification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FloodingNotification" ADD COLUMN     "limitLatEnd" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "limitLatStart" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "limitLonEnd" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "limitLonStart" DOUBLE PRECISION NOT NULL;
