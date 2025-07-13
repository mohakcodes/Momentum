/*
  Warnings:

  - A unique constraint covering the columns `[roomId,date]` on the table `CheckIn` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CheckIn_roomId_date_idx";

-- CreateIndex
CREATE UNIQUE INDEX "CheckIn_roomId_date_key" ON "CheckIn"("roomId", "date");
