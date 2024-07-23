-- AlterTable
ALTER TABLE `Employee` ADD COLUMN `managerId` INTEGER NULL,
    MODIFY `status` ENUM('active', 'leave', 'resign', 'business_trip') NOT NULL DEFAULT 'active';

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_managerId_fkey` FOREIGN KEY (`managerId`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
