/*
  Warnings:

  - The values [FREE,PRO] on the enum `Plan` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `eventType` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `site` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('DISCOVERY', 'DELETION');

-- AlterEnum
BEGIN;
CREATE TYPE "Plan_new" AS ENUM ('BASIC', 'PREMIUM', 'ELITE');
ALTER TABLE "User" ALTER COLUMN "plan" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "plan" TYPE "Plan_new" USING ("plan"::text::"Plan_new");
ALTER TYPE "Plan" RENAME TO "Plan_old";
ALTER TYPE "Plan_new" RENAME TO "Plan";
DROP TYPE "Plan_old";
ALTER TABLE "User" ALTER COLUMN "plan" SET DEFAULT 'BASIC';
COMMIT;

-- DropIndex
DROP INDEX "User_email_apiKey_idx";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "eventType" "EventType" NOT NULL,
ADD COLUMN     "site" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "monitoredSites" TEXT[],
ALTER COLUMN "plan" SET DEFAULT 'BASIC';
