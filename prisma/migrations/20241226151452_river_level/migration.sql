-- CreateTable
CREATE TABLE "River" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" TIMESTAMP(3) NOT NULL,
    "level" INTEGER,

    CONSTRAINT "River_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LevelRiver" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "level" DOUBLE PRECISION NOT NULL,
    "riverId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LevelRiver_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LevelRiver_riverId_date_idx" ON "LevelRiver"("riverId", "date");
