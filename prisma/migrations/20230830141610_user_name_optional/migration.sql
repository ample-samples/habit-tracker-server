/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `Habits` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Habits_date_key" ON "Habits"("date");
