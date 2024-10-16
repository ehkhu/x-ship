/*
  Warnings:

  - A unique constraint covering the columns `[DIV_ID]` on the table `tbl_division` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `tbl_division_DIV_ID_key` ON `tbl_division`(`DIV_ID`);

-- AddForeignKey
ALTER TABLE `TBL_CFRM` ADD CONSTRAINT `TBL_CFRM_CFRMFBVILLAGE_fkey` FOREIGN KEY (`CFRMFBVILLAGE`) REFERENCES `tbl_village`(`VILLAGE_CODE`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TBL_CFRM` ADD CONSTRAINT `TBL_CFRM_CFRMFBORG_fkey` FOREIGN KEY (`CFRMFBORG`) REFERENCES `TBL_ORG`(`ORG_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TBL_CFRM` ADD CONSTRAINT `TBL_CFRM_CFRMFBPROJECT_fkey` FOREIGN KEY (`CFRMFBPROJECT`) REFERENCES `TBL_PROJECT`(`PROJECT_ID`) ON DELETE SET NULL ON UPDATE CASCADE;