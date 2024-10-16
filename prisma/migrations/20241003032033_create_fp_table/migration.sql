-- CreateTable
CREATE TABLE `TBL_FP` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `FPREGID` VARCHAR(20) NOT NULL,
    `FPPROVIDEDDATE` DATETIME(3) NULL,
    `FPTYPE` INTEGER NOT NULL DEFAULT 999,
    `FPDONOR` VARCHAR(10) NULL,
    `FPORG` VARCHAR(10) NULL,
    `FPPROJECT` VARCHAR(10) NULL,
    `FPTSP` VARCHAR(20) NULL,
    `FPPLACE` INTEGER NOT NULL DEFAULT 999,
    `FPVILLAGE` VARCHAR(20) NULL,
    `FPPROVIDERNAME` VARCHAR(30) NULL,
    `FPPROVIDERPOSITION` INTEGER NOT NULL DEFAULT 999,
    `FPWT` DOUBLE NOT NULL DEFAULT 999.90,
    `FPHT` DOUBLE NOT NULL DEFAULT 999.90,
    `FPBP` VARCHAR(10) NOT NULL DEFAULT '000/000',
    `FPPR` INTEGER NOT NULL DEFAULT 999,
    `FPRR` INTEGER NOT NULL DEFAULT 999,
    `FPTEMP` DOUBLE NOT NULL DEFAULT 999.90,
    `FPFIRSTMENS` INTEGER NOT NULL DEFAULT 999,
    `FPMARRIAGE` INTEGER NOT NULL DEFAULT 999,
    `FPYOUNGESTCHILD` INTEGER NOT NULL DEFAULT 999,
    `FPYOUNGESTCHILDUNIT` INTEGER NOT NULL DEFAULT 999,
    `FPP` INTEGER NOT NULL DEFAULT 999,
    `FPA` INTEGER NOT NULL DEFAULT 999,
    `FPREASON` VARCHAR(255) NULL,
    `FPMENSCYCLE` INTEGER NOT NULL DEFAULT 999,
    `FPMENSPAIN` INTEGER NOT NULL DEFAULT 999,
    `FPVAGBLEEDING` INTEGER NOT NULL DEFAULT 999,
    `FPPREFERENCE` VARCHAR(15) NULL,
    `FPLMP` DATETIME(3) NULL,
    `FPHISA` INTEGER NOT NULL DEFAULT 999,
    `FPSEXUALCONTACT` INTEGER NOT NULL DEFAULT 999,
    `FPCURRENTMETHOD` VARCHAR(255) NULL,
    `FPCURRENTMETHODDUR` VARCHAR(255) NULL,
    `FPCONDOMM` INTEGER NOT NULL DEFAULT 999,
    `FPCONDOMF` INTEGER NOT NULL DEFAULT 999,
    `FPDEPO` INTEGER NOT NULL DEFAULT 999,
    `FPCOC` INTEGER NOT NULL DEFAULT 999,
    `FPPOP` INTEGER NOT NULL DEFAULT 999,
    `FPEC` INTEGER NOT NULL DEFAULT 999,
    `FPIMP3` INTEGER NOT NULL DEFAULT 999,
    `FPIMP4` INTEGER NOT NULL DEFAULT 999,
    `FPIMP5` INTEGER NOT NULL DEFAULT 999,
    `FPIUDCU` INTEGER NOT NULL DEFAULT 999,
    `FPIUDMULTI` INTEGER NOT NULL DEFAULT 999,
    `FPNA` INTEGER NOT NULL DEFAULT 999,
    `FPFUDATE` DATETIME(3) NULL,
    `FPREFIMP` INTEGER NOT NULL DEFAULT 999,
    `FPREFIUD` INTEGER NOT NULL DEFAULT 999,
    `FPREFTL` INTEGER NOT NULL DEFAULT 999,
    `FPREFVT` INTEGER NOT NULL DEFAULT 999,
    `FPCSLFP` INTEGER NOT NULL DEFAULT 999,
    `FPCSLFER` INTEGER NOT NULL DEFAULT 999,
    `FPCONDOMMBK` INTEGER NOT NULL DEFAULT 999,
    `FPCONDOMFBK` INTEGER NOT NULL DEFAULT 999,
    `FPECBK` INTEGER NOT NULL DEFAULT 999,
    `FPOUTCOME` INTEGER NOT NULL DEFAULT 999,
    `FPREFTO` INTEGER NOT NULL DEFAULT 999,
    `FPDEATHREASON` VARCHAR(255) NULL,
    `FPUSRLOGIN` VARCHAR(30) NULL,
    `FPLAB` INTEGER NOT NULL DEFAULT 0,
    `FPINSERT` DATETIME(3) NULL,
    `FPOFFMETHOD` VARCHAR(1000) NULL,
    `FPREMARK` VARCHAR(1000) NULL,
    `FPAGE` INTEGER NOT NULL DEFAULT 999,
    `FPAGEUNIT` INTEGER NOT NULL DEFAULT 999,
    `FPTEMPUNIT` INTEGER NOT NULL DEFAULT 999,
    `FPCLNID` VARCHAR(10) NULL,
    `FPDEPOSC` INTEGER NOT NULL DEFAULT 999,
    `FPUPDATE` DATETIME(3) NULL,
    `FPSTATUS` INTEGER NOT NULL DEFAULT 0,
    `FPSYNC` INTEGER NOT NULL DEFAULT 0,
    `FPREMOVAL` INTEGER NOT NULL DEFAULT 999,
    `FPREFREASON` VARCHAR(1000) NULL,
    `FPREFTOOTHER` VARCHAR(1000) NULL,
    `FPIMSC` INTEGER NOT NULL DEFAULT 999,
    `FPMIGRANT` INTEGER NOT NULL DEFAULT 999,
    `FPIDP` INTEGER NOT NULL DEFAULT 999,
    `FPDSEE` INTEGER NOT NULL DEFAULT 999,
    `FPDHEAR` INTEGER NOT NULL DEFAULT 999,
    `FPDWALK` INTEGER NOT NULL DEFAULT 999,
    `FPDREMBR` INTEGER NOT NULL DEFAULT 999,
    `FPDWASH` INTEGER NOT NULL DEFAULT 999,
    `FPDCOMMU` INTEGER NOT NULL DEFAULT 999,
    `FPPREG` INTEGER NOT NULL DEFAULT 999,
    `FPLACMOTHER` INTEGER NOT NULL DEFAULT 999,
    `FPDISABILITY` INTEGER NOT NULL DEFAULT 999,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TBL_FP` ADD CONSTRAINT `TBL_FP_FPREGID_fkey` FOREIGN KEY (`FPREGID`) REFERENCES `TBL_REG`(`REGID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TBL_FP` ADD CONSTRAINT `TBL_FP_FPCLNID_fkey` FOREIGN KEY (`FPCLNID`) REFERENCES `TBL_CLINIC`(`CLN_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TBL_FP` ADD CONSTRAINT `TBL_FP_FPORG_fkey` FOREIGN KEY (`FPORG`) REFERENCES `TBL_ORG`(`ORG_ID`) ON DELETE SET NULL ON UPDATE CASCADE;