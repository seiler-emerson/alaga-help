-- AlterTable
ALTER TABLE "FloodingNotification" ALTER COLUMN "limitLatEnd" DROP NOT NULL,
ALTER COLUMN "limitLatStart" DROP NOT NULL,
ALTER COLUMN "limitLonEnd" DROP NOT NULL,
ALTER COLUMN "limitLonStart" DROP NOT NULL;
