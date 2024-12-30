CREATE EXTENSION IF NOT EXISTS "pgcrypto";
-- CreateTable
CREATE TABLE "FloodingNotification" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" TIMESTAMP(3) NOT NULL,
    "zipcode" INTEGER,
    "street" TEXT NOT NULL,
    "addressNumber" INTEGER,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "complement" TEXT,
    "observation" TEXT,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "FloodingNotification_pkey" PRIMARY KEY ("id")
);
