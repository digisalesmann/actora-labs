-- CreateTable
CREATE TABLE "Quest" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "longDescription" TEXT NOT NULL,
    "project" JSONB NOT NULL,
    "category" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "totalXP" INTEGER NOT NULL,
    "tokenReward" JSONB,
    "timeEstimate" TEXT NOT NULL,
    "participants" INTEGER NOT NULL DEFAULT 0,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "requirements" JSONB NOT NULL,
    "eligibility" JSONB NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestStep" (
    "id" TEXT NOT NULL,
    "questId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "verificationType" TEXT NOT NULL,
    "endpoint" TEXT,
    "requireProof" BOOLEAN NOT NULL DEFAULT false,
    "optional" BOOLEAN NOT NULL DEFAULT false,
    "points" INTEGER NOT NULL,

    CONSTRAINT "QuestStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestCompletion" (
    "id" TEXT NOT NULL,
    "questId" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "totalXPEarned" INTEGER NOT NULL DEFAULT 0,
    "rewardClaimed" BOOLEAN NOT NULL DEFAULT false,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "QuestCompletion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StepCompletion" (
    "id" TEXT NOT NULL,
    "completionId" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "proofData" JSONB,
    "verifiedAt" TIMESTAMP(3),
    "attempts" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "StepCompletion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "walletAddress" TEXT NOT NULL,
    "username" TEXT,
    "email" TEXT,
    "totalXP" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "completedQuests" INTEGER NOT NULL DEFAULT 0,
    "twitterHandle" TEXT,
    "discordId" TEXT,
    "discordUsername" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("walletAddress")
);

-- CreateIndex
CREATE INDEX "Quest_active_endDate_idx" ON "Quest"("active", "endDate");

-- CreateIndex
CREATE INDEX "Quest_category_idx" ON "Quest"("category");

-- CreateIndex
CREATE INDEX "QuestStep_questId_order_idx" ON "QuestStep"("questId", "order");

-- CreateIndex
CREATE INDEX "QuestCompletion_walletAddress_idx" ON "QuestCompletion"("walletAddress");

-- CreateIndex
CREATE INDEX "QuestCompletion_status_idx" ON "QuestCompletion"("status");

-- CreateIndex
CREATE UNIQUE INDEX "QuestCompletion_questId_walletAddress_key" ON "QuestCompletion"("questId", "walletAddress");

-- CreateIndex
CREATE INDEX "StepCompletion_walletAddress_idx" ON "StepCompletion"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "StepCompletion_completionId_stepId_key" ON "StepCompletion"("completionId", "stepId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_level_idx" ON "User"("level");

-- CreateIndex
CREATE INDEX "User_totalXP_idx" ON "User"("totalXP");

-- AddForeignKey
ALTER TABLE "QuestStep" ADD CONSTRAINT "QuestStep_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestCompletion" ADD CONSTRAINT "QuestCompletion_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepCompletion" ADD CONSTRAINT "StepCompletion_completionId_fkey" FOREIGN KEY ("completionId") REFERENCES "QuestCompletion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepCompletion" ADD CONSTRAINT "StepCompletion_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "QuestStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
