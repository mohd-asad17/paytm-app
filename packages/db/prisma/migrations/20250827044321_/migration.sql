/*
  Warnings:

  - Added the required column `auth_type` to the `Merchant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."AuthType" AS ENUM ('Google', 'GitHub');

-- AlterTable
ALTER TABLE "public"."Merchant" ADD COLUMN     "auth_type" "public"."AuthType" NOT NULL;
