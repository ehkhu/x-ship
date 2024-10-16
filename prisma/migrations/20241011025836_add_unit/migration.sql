/*
  Warnings:

  - A unique constraint covering the columns `[Township_ID]` on the table `TBL_EHOTOWNSHIP` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `TBL_EHOTOWNSHIP_Township_ID_key` ON `TBL_EHOTOWNSHIP`(`Township_ID`);

-- AddForeignKey
ALTER TABLE `tbl_township` ADD CONSTRAINT `tbl_township_DIV_ID_fkey` FOREIGN KEY (`DIV_ID`) REFERENCES `tbl_division`(`DIV_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_village` ADD CONSTRAINT `tbl_village_TSP_IDEHO_fkey` FOREIGN KEY (`TSP_IDEHO`) REFERENCES `TBL_EHOTOWNSHIP`(`Township_ID`) ON DELETE SET NULL ON UPDATE CASCADE;
