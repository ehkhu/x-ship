-- CreateTable
CREATE TABLE `tbl_division` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `DIV_ID` VARCHAR(7) NULL,
    `DIV_NAME` VARCHAR(100) NULL,
    `DIV_NAMEMM` VARCHAR(225) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_township` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `TSP_ID` VARCHAR(100) NULL,
    `TSP_NAME` VARCHAR(100) NULL,
    `TSP_SHORTNAME` VARCHAR(100) NULL,
    `DIV_ID` VARCHAR(50) NULL,
    `TSP_LAT` DOUBLE NULL,
    `TSP_LONG` DOUBLE NULL,

    UNIQUE INDEX `tbl_township_TSP_ID_key`(`TSP_ID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_village` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `VILLAGE_CODE` VARCHAR(20) NULL,
    `VILLAGE_NAME` VARCHAR(100) NULL,
    `VILLAGE_NAMEMM` VARCHAR(100) NULL,
    `VILLAGE_MALEPOP` INTEGER NULL DEFAULT 0,
    `VILLAGE_FEMALEPOP` INTEGER NULL DEFAULT 0,
    `VILLAGE_LATITUDE` DOUBLE NULL DEFAULT 0.0,
    `VILLAGE_LONGITUDE` DOUBLE NULL DEFAULT 0.0,
    `VILLAGE_HOUSEHOLD` INTEGER NULL DEFAULT 0,
    `TSP_ID` VARCHAR(100) NULL,
    `TSP_IDEHO` VARCHAR(100) NULL,
    `VILLAGE_STATUS` INTEGER NULL DEFAULT 0,

    UNIQUE INDEX `tbl_village_VILLAGE_CODE_key`(`VILLAGE_CODE`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TBL_CLINIC` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `CLN_ID` VARCHAR(100) NULL,
    `CLN_NAME` VARCHAR(100) NULL,
    `CLN_TSP` VARCHAR(100) NULL,
    `EHO_TSP` VARCHAR(50) NULL,
    `CLN_POP` INTEGER NULL DEFAULT 0,

    UNIQUE INDEX `TBL_CLINIC_CLN_ID_key`(`CLN_ID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TBL_ORG` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `ORG_ID` VARCHAR(10) NULL,
    `ORG_NAME` VARCHAR(100) NULL,
    `ORG_SHORTNAME` VARCHAR(100) NULL,

    UNIQUE INDEX `TBL_ORG_ORG_ID_key`(`ORG_ID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TBL_PROJECT` (
    `PROJECT_ID` VARCHAR(10) NOT NULL,
    `PROJECT_NAME` VARCHAR(100) NOT NULL,
    `DONOR_ID` VARCHAR(10) NULL,
    `PROJECT_STARTDATE` DATE NULL,
    `PROJECT_ENDDATE` DATE NULL,
    `PROJECT_DESCRIPTION` VARCHAR(255) NULL,
    `PROJECT_STATUS` INTEGER NULL,

    PRIMARY KEY (`PROJECT_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TBL_DONOR` (
    `DONOR_ID` VARCHAR(10) NOT NULL,
    `DONOR_NAME` VARCHAR(100) NULL,
    `DONOR_SHORTNAME` VARCHAR(10) NULL,
    `GRANT_NAME` VARCHAR(45) NULL,
    `START_DATE` DATE NULL,
    `END_DATE` DATE NULL,

    PRIMARY KEY (`DONOR_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TBL_USER` (
    `USER_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `USER_FULL_NAME` VARCHAR(100) NULL,
    `USER_ORG` VARCHAR(100) NULL,
    `USER_NAME` VARCHAR(100) NULL,
    `USER_TYPE` VARCHAR(100) NULL,
    `USER_PASSWORD` VARCHAR(1000) NULL,
    `CREATED_BY` VARCHAR(100) NULL,
    `CREATED_DATE` DATE NULL,
    `USER_STATUS` INTEGER NULL,
    `USER_SALT` VARCHAR(20) NULL,
    `USER_EXPIRED` DATE NULL,
    `USER_CLN` VARCHAR(20) NULL,
    `roleId` INTEGER NULL,

    UNIQUE INDEX `TBL_USER_USER_NAME_key`(`USER_NAME`),
    PRIMARY KEY (`USER_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TBL_DISTRICT` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `KNU_District_Code` VARCHAR(191) NULL,
    `KNU_District_Name_EN` VARCHAR(191) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TBL_EHOTOWNSHIP` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `KNU_District_Code` VARCHAR(191) NULL,
    `KNU_District_Name_EN` VARCHAR(191) NULL,
    `Township_ID` VARCHAR(191) NULL,
    `Township_Name` VARCHAR(191) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Permission_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TBL_REG` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `REGID` VARCHAR(20) NOT NULL,
    `REGNAME` VARCHAR(100) NOT NULL,
    `REGDATE` DATE NOT NULL,
    `REGORG` VARCHAR(10) NOT NULL,
    `REGPLACE` INTEGER NOT NULL DEFAULT 999,
    `REGVILLAGE` VARCHAR(20) NOT NULL,
    `REGAGE` INTEGER NOT NULL DEFAULT 999,
    `REGAGEUNIT` INTEGER NOT NULL DEFAULT 999,
    `REGSEX` INTEGER NOT NULL DEFAULT 999,
    `REGTYPE` INTEGER NOT NULL DEFAULT 999,
    `REGEDU` INTEGER NOT NULL DEFAULT 999,
    `REGJOB` VARCHAR(30) NULL,
    `REGMARITAL` INTEGER NULL DEFAULT 999,
    `REGSPOUSE` VARCHAR(30) NULL,
    `REGMOTHER` VARCHAR(30) NULL,
    `REGFATHER` VARCHAR(30) NULL,
    `REGADDRESS` VARCHAR(100) NULL,
    `REGPH` VARCHAR(30) NULL,
    `REGETHNIC` VARCHAR(100) NULL,
    `REGREFFROM` VARCHAR(1000) NULL,
    `REGREMARK` VARCHAR(255) NULL,
    `REGUSRLOGIN` VARCHAR(100) NULL,
    `REGINSERT` TIMESTAMP(6) NULL,
    `REGUPDATE` TIMESTAMP(6) NULL,
    `REGSTATUS` INTEGER NULL DEFAULT 0,
    `REGSYNC` INTEGER NULL DEFAULT 0,
    `REGMIGRANT` INTEGER NULL DEFAULT 999,
    `REGIDP` INTEGER NULL DEFAULT 999,
    `REGDSEE` INTEGER NULL DEFAULT 999,
    `REGDHEAR` INTEGER NULL DEFAULT 999,
    `REGDWALK` INTEGER NULL DEFAULT 999,
    `REGDREMBR` INTEGER NULL DEFAULT 999,
    `REGDWASH` INTEGER NULL DEFAULT 999,
    `REGDCOMMU` INTEGER NULL DEFAULT 999,
    `REGETHNICO` VARCHAR(100) NULL,
    `REGDISABILITY` INTEGER NULL DEFAULT 999,

    UNIQUE INDEX `TBL_REG_REGID_key`(`REGID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TBL_ANC` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `ANREGID` VARCHAR(20) NULL,
    `ANPROVIDEDDATE` DATE NULL,
    `ANTYPE` INTEGER NULL DEFAULT 999,
    `ANDONOR` VARCHAR(10) NULL,
    `ANORG` VARCHAR(10) NULL,
    `ANPROJECT` VARCHAR(10) NULL,
    `ANTSP` VARCHAR(100) NULL,
    `ANPLACE` INTEGER NULL DEFAULT 999,
    `ANVILLAGE` VARCHAR(20) NULL,
    `ANPROVIDERNAME` VARCHAR(30) NULL,
    `ANPROVIDERPOSITION` INTEGER NULL DEFAULT 999,
    `ANUSRLOGIN` VARCHAR(100) NULL,
    `ANLMP` DATE NULL,
    `ANEDD` DATE NULL,
    `ANFIRSTMENS` INTEGER NULL DEFAULT 999,
    `ANMARRIAGE` INTEGER NULL DEFAULT 999,
    `ANYOUNGESTCHILD` INTEGER NULL DEFAULT 999,
    `ANG` INTEGER NULL DEFAULT 999,
    `ANP` INTEGER NULL DEFAULT 999,
    `ANA` INTEGER NULL DEFAULT 999,
    `ANWT` FLOAT NULL DEFAULT 999.90,
    `ANHT` FLOAT NULL DEFAULT 999.90,
    `ANBP` VARCHAR(10) NULL DEFAULT '000/00',
    `ANPR` INTEGER NULL DEFAULT 999,
    `ANRR` INTEGER NULL DEFAULT 999,
    `ANTEMP` FLOAT NULL DEFAULT 999.90,
    `ANGP` INTEGER NULL DEFAULT 999,
    `ANODEMA` INTEGER NULL DEFAULT 999,
    `ANNOFETUS` INTEGER NULL DEFAULT 999,
    `ANLIE` INTEGER NULL DEFAULT 999,
    `ANPRESENTATION` INTEGER NULL DEFAULT 999,
    `ANFUNDALHT` INTEGER NULL DEFAULT 999,
    `ANFHS` INTEGER NULL DEFAULT 999,
    `ANOTHER` VARCHAR(1000) NULL,
    `ANLAB` INTEGER NULL DEFAULT 0,
    `ANFA` INTEGER NULL DEFAULT 999,
    `ANFESO4` INTEGER NULL DEFAULT 999,
    `ANFC` INTEGER NULL DEFAULT 999,
    `ANB1` INTEGER NULL DEFAULT 999,
    `ANDEWORM1` INTEGER NULL DEFAULT 999,
    `ANTT1` INTEGER NULL DEFAULT 999,
    `ANCDK` INTEGER NULL DEFAULT 999,
    `ANNBK` INTEGER NULL DEFAULT 999,
    `ANDIRECTCOMPLICATION` INTEGER NULL DEFAULT 999,
    `ANINDIRECTCOMPLICATION` INTEGER NULL DEFAULT 999,
    `ANINDIRECTOTHER` VARCHAR(1000) NULL,
    `ANINDIRECTDX` VARCHAR(1000) NULL,
    `ANINDIRECTTX` VARCHAR(1000) NULL,
    `ANHE1` INTEGER NULL DEFAULT 999,
    `ANHE2` INTEGER NULL DEFAULT 999,
    `ANHE3` INTEGER NULL DEFAULT 999,
    `ANHE4` INTEGER NULL DEFAULT 999,
    `ANHE5` INTEGER NULL DEFAULT 999,
    `ANHE6` INTEGER NULL DEFAULT 999,
    `ANHE7` INTEGER NULL DEFAULT 999,
    `ANHE8` INTEGER NULL DEFAULT 999,
    `ANOUTCOME` INTEGER NULL DEFAULT 999,
    `ANREFTO` INTEGER NULL DEFAULT 999,
    `ANREFTOOTHER` VARCHAR(1000) NULL,
    `ANREFREASON` VARCHAR(1000) NULL,
    `ANDEATHREASON` VARCHAR(1000) NULL,
    `ANVISIT` INTEGER NULL DEFAULT 999,
    `ANHE9` INTEGER NULL DEFAULT 999,
    `ANHE10` INTEGER NULL DEFAULT 999,
    `ANHE11` INTEGER NULL DEFAULT 999,
    `ANHE12` INTEGER NULL DEFAULT 999,
    `ANHE13` INTEGER NULL DEFAULT 999,
    `ANFIRSTPREG` INTEGER NULL DEFAULT 999,
    `ANHYGKIT` INTEGER NULL DEFAULT 999,
    `ANB1UNIT` INTEGER NULL DEFAULT 999,
    `ANAGE` INTEGER NULL DEFAULT 999,
    `ANAGEUNIT` INTEGER NULL DEFAULT 999,
    `ANVTCOUNT` INTEGER NULL DEFAULT 999,
    `ANTEMPUNIT` INTEGER NULL DEFAULT 999,
    `ANVISITSKILL` INTEGER NULL DEFAULT 999,
    `ANVISITTIMINGSKILL` INTEGER NULL DEFAULT 999,
    `ANDEWORM2` INTEGER NULL DEFAULT 999,
    `ANTT2` INTEGER NULL DEFAULT 999,
    `ANCLNID` VARCHAR(10) NULL,
    `ANINSERT` TIMESTAMP(6) NULL,
    `ANUPDATE` TIMESTAMP(6) NULL,
    `ANSTATUS` INTEGER NULL DEFAULT 0,
    `ANSYNC` INTEGER NULL DEFAULT 0,
    `ANVISITTIMING` INTEGER NULL,
    `ANTYPE2` INTEGER NULL DEFAULT 999,
    `ANMIGRANT` INTEGER NULL DEFAULT 999,
    `ANIDP` INTEGER NULL DEFAULT 999,
    `ANDSEE` INTEGER NULL DEFAULT 999,
    `ANDHEAR` INTEGER NULL DEFAULT 999,
    `ANDWALK` INTEGER NULL DEFAULT 999,
    `ANDREMBR` INTEGER NULL DEFAULT 999,
    `ANDWASH` INTEGER NULL DEFAULT 999,
    `ANDCOMMU` INTEGER NULL DEFAULT 999,
    `ANDISABILITY` INTEGER NULL DEFAULT 999,
    `ANFAFESO4` FLOAT NULL DEFAULT 999,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TBL_LAB` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `LABREGID` VARCHAR(20) NULL,
    `LABPROVIDEDDATE` DATE NULL,
    `LABPLACE` INTEGER NULL DEFAULT 999,
    `LABVILLAGE` VARCHAR(20) NULL,
    `LABRDT` INTEGER NULL DEFAULT 999,
    `LABMICROSCOPIC` INTEGER NULL DEFAULT 999,
    `LABHB` INTEGER NULL DEFAULT 999,
    `LABBG` INTEGER NULL DEFAULT 999,
    `LABRH` INTEGER NULL DEFAULT 999,
    `LABUCG` INTEGER NULL DEFAULT 999,
    `LABUSUGAR` INTEGER NULL DEFAULT 999,
    `LABUPROTEIN` INTEGER NULL DEFAULT 999,
    `LABGONO` INTEGER NULL DEFAULT 999,
    `LABTRICHO` INTEGER NULL DEFAULT 999,
    `LABCANDIDA` INTEGER NULL DEFAULT 999,
    `LABRPR` INTEGER NULL DEFAULT 999,
    `LABTPHA` INTEGER NULL DEFAULT 999,
    `LABVDRL` INTEGER NULL DEFAULT 999,
    `LABHIV` INTEGER NULL DEFAULT 999,
    `LABHBV` INTEGER NULL DEFAULT 999,
    `LABHCV` INTEGER NULL DEFAULT 999,
    `LABSSOURCE` VARCHAR(20) NULL,
    `LABOTHER` VARCHAR(1000) NULL,
    `LABRBS` FLOAT NULL DEFAULT 0.0,
    `LABORG` VARCHAR(10) NULL,
    `LABINSERT` TIMESTAMP(6) NULL,
    `LABUPDATE` TIMESTAMP(6) NULL,
    `LABSTATUS` INTEGER NULL DEFAULT 0,
    `LABSYNC` INTEGER NULL DEFAULT 0,
    `LABTEST` INTEGER NULL DEFAULT 0,

    UNIQUE INDEX `TBL_LAB_ID_LABREGID_LABPROVIDEDDATE_LABSSOURCE_key`(`ID`, `LABREGID`, `LABPROVIDEDDATE`, `LABSSOURCE`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TBL_VILLAGE_ORG_PROJ` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `VILLAGE_CODE` VARCHAR(20) NULL,
    `ORG_CODE` VARCHAR(10) NULL,
    `PROJ_CODE` VARCHAR(10) NULL,
    `TSP_CODE` VARCHAR(20) NULL,
    `CLN_CODE` VARCHAR(20) NULL,
    `VOP_STATUS` INTEGER NULL DEFAULT 0,
    `VOP_INSERT` TIMESTAMP(6) NULL,
    `VOP_UPDATE` TIMESTAMP(6) NULL,
    `VOP_REMARK` VARCHAR(255) NULL,
    `VOP_VLT` INTEGER NULL DEFAULT 0,
    `VOP_INFOMX` INTEGER NULL DEFAULT 0,
    `VOP_MPOP` INTEGER NULL,
    `VOP_FPOP` INTEGER NULL,
    `VOP_HHOLD` INTEGER NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TBL_DELIVERY` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `DELIREGID` VARCHAR(20) NOT NULL,
    `DELIPROVIDEDDATE` DATETIME(3) NOT NULL,
    `DELIDONOR` VARCHAR(10) NULL,
    `DELIORG` VARCHAR(10) NULL,
    `DELIPROJECT` VARCHAR(10) NULL,
    `DELITSP` VARCHAR(100) NULL,
    `DELIVILLAGE` VARCHAR(20) NULL,
    `DELIPROVIDERNAME` VARCHAR(30) NULL,
    `DELIPROVIDERPOSITION` INTEGER NULL DEFAULT 999,
    `DELIUSRLOGIN` VARCHAR(100) NULL,
    `DELIDEFECTOTHER` VARCHAR(1000) NULL,
    `DELIMCOMPLICATION` VARCHAR(1000) NULL,
    `DELIMPROCEDURE` VARCHAR(1000) NULL,
    `DELIMTX` VARCHAR(1000) NULL,
    `DELIMREFREASON` VARCHAR(1000) NULL,
    `DELIMDEATHREASON` VARCHAR(1000) NULL,
    `DELIBREFREASON` VARCHAR(1000) NULL,
    `DELIBDEATHREASON` VARCHAR(1000) NULL,
    `DELIAGE` INTEGER NULL DEFAULT 999,
    `DELITYPE` INTEGER NULL DEFAULT 999,
    `DELIPLACE` INTEGER NULL DEFAULT 999,
    `DELIDELITYPE` INTEGER NULL DEFAULT 999,
    `DELIGP` INTEGER NULL DEFAULT 999,
    `DELIG` INTEGER NULL DEFAULT 999,
    `DELIP` INTEGER NULL DEFAULT 999,
    `DELIA` INTEGER NULL DEFAULT 999,
    `DELIEPI` INTEGER NULL DEFAULT 999,
    `DELIDEFECT` INTEGER NULL DEFAULT 999,
    `DELIPN6` INTEGER NULL DEFAULT 999,
    `DELILAB` INTEGER NULL DEFAULT 0,
    `DELIMOUTCOME` INTEGER NULL DEFAULT 999,
    `DELIMREFTO` INTEGER NULL DEFAULT 999,
    `DELIBOUTCOME` INTEGER NULL DEFAULT 999,
    `DELIBDELIOUTCOME` INTEGER NULL DEFAULT 999,
    `DELIBSEX1` INTEGER NULL DEFAULT 999,
    `DELIBAPGAR1` INTEGER NULL DEFAULT 999,
    `DELRESTOWEL` INTEGER NULL DEFAULT 999,
    `DELIRESMASK` INTEGER NULL DEFAULT 999,
    `DELIRESSUCTION` INTEGER NULL DEFAULT 999,
    `DELIRESCOMPRESSION` INTEGER NULL DEFAULT 999,
    `DELIRESSTIMULATION` INTEGER NULL DEFAULT 999,
    `DELIBCCUT1` INTEGER NULL DEFAULT 999,
    `DELIBBF1` INTEGER NULL DEFAULT 999,
    `DELIBREFTO` INTEGER NULL DEFAULT 999,
    `DELIBWT1` DOUBLE NULL DEFAULT 999.90,
    `DELIANSELFREP` INTEGER NULL DEFAULT 999,
    `DELIPOFDELIVERY` INTEGER NULL DEFAULT 999,
    `DELITEMP` DOUBLE NULL DEFAULT 999.90,
    `DELIPR` INTEGER NULL DEFAULT 999,
    `DELIBP` VARCHAR(10) NULL DEFAULT '000/00',
    `DELIBSEX2` INTEGER NULL DEFAULT 999,
    `DELIBWT2` DOUBLE NULL DEFAULT 999.90,
    `DELIBBF2` INTEGER NULL DEFAULT 999,
    `DELIBBF3` INTEGER NULL DEFAULT 999,
    `DELIAGEUNIT` INTEGER NULL DEFAULT 999,
    `DELITEMPUNIT` INTEGER NULL DEFAULT 999,
    `DELICLNID` VARCHAR(10) NULL,
    `DELIBAPGAR2` INTEGER NULL DEFAULT 999,
    `DELIBAPGAR3` INTEGER NULL DEFAULT 999,
    `DELIBSEX3` INTEGER NULL DEFAULT 999,
    `DELIBWT3` DOUBLE NULL DEFAULT 999.90,
    `DELIBCCUT2` INTEGER NULL DEFAULT 999,
    `DELIBCCUT3` INTEGER NULL DEFAULT 999,
    `DELIADMISSIONDATE` DATETIME(3) NULL,
    `DELIINSERT` DATETIME(3) NULL,
    `DELIUPDATE` DATETIME(3) NULL,
    `DELISTATUS` INTEGER NULL DEFAULT 0,
    `DELISYNC` INTEGER NULL DEFAULT 0,
    `DELIREMARK` VARCHAR(255) NULL,
    `DELITIME` DATETIME(3) NULL,
    `DELIMIGRANT` INTEGER NULL DEFAULT 999,
    `DELIIDP` INTEGER NULL DEFAULT 999,
    `DELIDSEE` INTEGER NULL DEFAULT 999,
    `DELIDHEAR` INTEGER NULL DEFAULT 999,
    `DELIDWALK` INTEGER NULL DEFAULT 999,
    `DELIDREMBR` INTEGER NULL DEFAULT 999,
    `DELIDWASH` INTEGER NULL DEFAULT 999,
    `DELIDCOMMU` INTEGER NULL DEFAULT 999,
    `DELIDISABILITY` INTEGER NULL DEFAULT 999,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PermissionToRole` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PermissionToRole_AB_unique`(`A`, `B`),
    INDEX `_PermissionToRole_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_village` ADD CONSTRAINT `tbl_village_TSP_ID_fkey` FOREIGN KEY (`TSP_ID`) REFERENCES `tbl_township`(`TSP_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TBL_USER` ADD CONSTRAINT `TBL_USER_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TBL_USER` ADD CONSTRAINT `TBL_USER_USER_ORG_fkey` FOREIGN KEY (`USER_ORG`) REFERENCES `TBL_ORG`(`ORG_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TBL_REG` ADD CONSTRAINT `TBL_REG_REGVILLAGE_fkey` FOREIGN KEY (`REGVILLAGE`) REFERENCES `tbl_village`(`VILLAGE_CODE`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TBL_REG` ADD CONSTRAINT `TBL_REG_REGORG_fkey` FOREIGN KEY (`REGORG`) REFERENCES `TBL_ORG`(`ORG_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TBL_ANC` ADD CONSTRAINT `TBL_ANC_ANREGID_fkey` FOREIGN KEY (`ANREGID`) REFERENCES `TBL_REG`(`REGID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TBL_ANC` ADD CONSTRAINT `TBL_ANC_ANCLNID_fkey` FOREIGN KEY (`ANCLNID`) REFERENCES `TBL_CLINIC`(`CLN_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TBL_ANC` ADD CONSTRAINT `TBL_ANC_ANORG_fkey` FOREIGN KEY (`ANORG`) REFERENCES `TBL_ORG`(`ORG_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TBL_LAB` ADD CONSTRAINT `TBL_LAB_LABREGID_fkey` FOREIGN KEY (`LABREGID`) REFERENCES `TBL_REG`(`REGID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PermissionToRole` ADD CONSTRAINT `_PermissionToRole_A_fkey` FOREIGN KEY (`A`) REFERENCES `Permission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PermissionToRole` ADD CONSTRAINT `_PermissionToRole_B_fkey` FOREIGN KEY (`B`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
