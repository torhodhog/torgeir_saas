/*
  Warnings:

  - You are about to drop the column `monitoredSites` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "monitoredSites";

-- CreateTable
CREATE TABLE "MonitoredSite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MonitoredSite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MonitoredSite" ADD CONSTRAINT "MonitoredSite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
