-- CreateTable
CREATE TABLE `TBL_RH` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `RHREGID` VARCHAR(20) NOT NULL,
    `RHPROVIDEDDATE` DATETIME(3) NULL,
    `RHTYPE` INTEGER NOT NULL DEFAULT 999,
    `RHDONOR` VARCHAR(10) NULL,
    `RHORG` VARCHAR(10) NULL,
    `RHPROJECT` VARCHAR(10) NULL,
    `RHTSP` VARCHAR(20) NULL,
    `RHPLACE` INTEGER NOT NULL DEFAULT 999,
    `RHVILLAGE` VARCHAR(20) NULL,
    `RHPROVIDERNAME` VARCHAR(30) NULL,
    `RHPROVIDERPOSITION` INTEGER NOT NULL DEFAULT 999,
    `RHWT` DOUBLE NOT NULL DEFAULT 999.90,
    `RHHT` DOUBLE NOT NULL DEFAULT 999.90,
    `RHBP` VARCHAR(10) NOT NULL DEFAULT '000/000',
    `RHPR` INTEGER NOT NULL DEFAULT 999,
    `RHRR` INTEGER NOT NULL DEFAULT 999,
    `RHTEMP` DOUBLE NOT NULL DEFAULT 999.90,
    `RHPREG` INTEGER NOT NULL DEFAULT 999,
    `RHLAB` INTEGER NOT NULL DEFAULT 0,
    `RHPAC` INTEGER NOT NULL DEFAULT 999,
    `RHGVB` INTEGER NOT NULL DEFAULT 999,
    `RHDXOTHER` VARCHAR(255) NULL,
    `RHPROCEDURE` VARCHAR(255) NULL,
    `RHTX` VARCHAR(255) NULL,
    `RHOUTCOME` INTEGER NOT NULL DEFAULT 999,
    `RHDEATHREASON` VARCHAR(255) NULL,
    `RHREFTO` INTEGER NOT NULL DEFAULT 999,
    `RHINSERT` DATETIME(3) NULL,
    `RHP` INTEGER NOT NULL DEFAULT 999,
    `RHA` INTEGER NOT NULL DEFAULT 999,
    `RHHE` INTEGER NOT NULL DEFAULT 999,
    `RHAGE` INTEGER NOT NULL DEFAULT 999,
    `RHAGEUNIT` INTEGER NOT NULL DEFAULT 999,
    `RHTEMPUNIT` INTEGER NOT NULL DEFAULT 999,
    `RHCLNID` VARCHAR(10) NULL,
    `RHREFREASON` VARCHAR(255) NULL,
    `RHUSRLOGIN` VARCHAR(30) NULL,
    `RHUPDATE` DATETIME(3) NULL,
    `RHSTATUS` INTEGER NOT NULL DEFAULT 0,
    `RHSYNC` INTEGER NOT NULL DEFAULT 0,
    `RHREMARK` VARCHAR(255) NULL,
    `RHCHEIFCOMPLAIN` VARCHAR(1000) NULL,
    `RHREFTOOTHER` VARCHAR(1000) NULL,
    `RHMIGRANT` INTEGER NOT NULL DEFAULT 999,
    `RHIDP` INTEGER NOT NULL DEFAULT 999,
    `RHDSEE` INTEGER NOT NULL DEFAULT 999,
    `RHDHEAR` INTEGER NOT NULL DEFAULT 999,
    `RHDWALK` INTEGER NOT NULL DEFAULT 999,
    `RHDREMBR` INTEGER NOT NULL DEFAULT 999,
    `RHDWASH` INTEGER NOT NULL DEFAULT 999,
    `RHDCOMMU` INTEGER NOT NULL DEFAULT 999,
    `RHLACMOTHER` INTEGER NOT NULL DEFAULT 999,
    `RHDISABILITY` INTEGER NOT NULL DEFAULT 999,
    `RHVIAR` INTEGER NOT NULL DEFAULT 999,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TBL_RH` ADD CONSTRAINT `TBL_RH_RHREGID_fkey` FOREIGN KEY (`RHREGID`) REFERENCES `TBL_REG`(`REGID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TBL_RH` ADD CONSTRAINT `TBL_RH_RHCLNID_fkey` FOREIGN KEY (`RHCLNID`) REFERENCES `TBL_CLINIC`(`CLN_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TBL_RH` ADD CONSTRAINT `TBL_RH_RHORG_fkey` FOREIGN KEY (`RHORG`) REFERENCES `TBL_ORG`(`ORG_ID`) ON DELETE SET NULL ON UPDATE CASCADE;
