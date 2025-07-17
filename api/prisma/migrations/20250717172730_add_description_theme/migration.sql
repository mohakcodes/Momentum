-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "description" TEXT,
ADD COLUMN     "theme" TEXT NOT NULL DEFAULT 'green-dark';
