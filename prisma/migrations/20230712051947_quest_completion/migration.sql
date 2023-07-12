-- DropForeignKey
ALTER TABLE "QuestAssignment" DROP CONSTRAINT "QuestAssignment_groupId_fkey";

-- DropForeignKey
ALTER TABLE "QuestAssignment" DROP CONSTRAINT "QuestAssignment_questId_fkey";

-- AlterTable
ALTER TABLE "QuestAssignment" ADD COLUMN     "proofLink" TEXT,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "QuestAssignment" ADD CONSTRAINT "QuestAssignment_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestAssignment" ADD CONSTRAINT "QuestAssignment_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
