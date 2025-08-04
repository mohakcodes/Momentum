-- AlterTable
ALTER TABLE "User" ADD COLUMN     "selectedToast" TEXT NOT NULL DEFAULT 'default',
ADD COLUMN     "unlockedToasts" TEXT[] DEFAULT ARRAY['default']::TEXT[];
