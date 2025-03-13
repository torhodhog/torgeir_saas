/*
  Warnings:

  - Added the required column `notifications` to the `Watchlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Watchlist" ADD COLUMN     "notifications" TEXT NOT NULL,
ADD COLUMN     "subQueries" JSONB NOT NULL DEFAULT '[]';
