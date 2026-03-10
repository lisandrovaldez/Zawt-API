/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "provider" TEXT NOT NULL DEFAULT 'local',
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;
