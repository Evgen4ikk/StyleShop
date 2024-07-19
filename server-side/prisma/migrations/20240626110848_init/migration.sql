/*
  Warnings:

  - You are about to drop the column `slug` on the `Subcategory` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Subcategory_slug_key";

-- AlterTable
ALTER TABLE "Subcategory" DROP COLUMN "slug";
