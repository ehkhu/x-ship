/*
  Warnings:

  - Added the required column `vthcId` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Employee` ADD COLUMN `vthcId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_vthcId_fkey` FOREIGN KEY (`vthcId`) REFERENCES `Vthc`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
