/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `River` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "River_name_key" ON "River"("name");
