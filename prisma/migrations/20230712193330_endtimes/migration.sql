/*
  Warnings:

  - You are about to drop the column `duration` on the `QuestAssignment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QuestAssignment" DROP COLUMN "duration",
ADD COLUMN     "endTime" TIMESTAMP(3);
