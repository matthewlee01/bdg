-- CreateTable
CREATE TABLE "Quest" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "participants" INTEGER,
    "points" INTEGER NOT NULL,
    "demerits" INTEGER NOT NULL,
    "location" TEXT,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestAssignment" (
    "questId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "duration" INTEGER,
    "startTime" TIMESTAMP(3),

    CONSTRAINT "QuestAssignment_pkey" PRIMARY KEY ("questId","groupId")
);

-- AddForeignKey
ALTER TABLE "QuestAssignment" ADD CONSTRAINT "QuestAssignment_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestAssignment" ADD CONSTRAINT "QuestAssignment_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
