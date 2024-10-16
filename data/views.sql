-- ANC REPORTS
CREATE OR REPLACE VIEW `VIEW_ANC` AS 
  select t.orgName AS ORGNAME,
  t.ANregid as RegId,
  t.regName as PatientName,
  t.clnName as ClinicName,
  t.tspName as TownshipName,
  t.villageName,
  t.project_Name as ProjectName,
(CASE t.regSex WHEN 1 THEN 'Male' ELSE 'Female' END) AS Sex, 
(CASE WHEN (t.ageinday) >=365 THEN TRUNCATE((t.ageinday)/365,0)
WHEN (t.ageinday) <365 AND (t.ageinday) >=30 THEN TRUNCATE((t.ageinday)/30,0) ELSE TRUNCATE((t.ageinday),0) END) Age,
 (CASE  WHEN t.ageinday>=365 THEN 'Year' WHEN t.ageinday<365 and t.ageinday>=30 THEN 'Month' ELSE 'Day' END) AS AgeUnit,
--  SQLINES DEMO *** edDate , 'YYYY-MM-DD' ) as ProvidedDate,
t.ANProvidedDate as  ProvidedDate,
(CASE t.ANPlace WHEN 1 THEN 'Clinic' WHEN 2 THEN 'Outreach' WHEN 3 THEN 'Volunteer' WHEN 4 THEN 'Home' WHEN 5 THEN 'Other' WHEN 6 THEN 'Secondary Care' ELSE '' END) AS ProvidedPlace,
(CASE t.ANProviderPosition WHEN 1 THEN 'EmoCW' WHEN 2 THEN 'MCHW' WHEN 3 THEN 'Medic' WHEN 4 THEN 'CHW' WHEN 5 THEN 'AMW' WHEN 6 THEN 'Nurse' WHEN 7 THEN 'Doctor'  WHEN 8 THEN 'TTBA' WHEN 9 THEN 'Others' WHEN 13 THEN 'Midwife' WHEN 16 THEN 'VHW' WHEN 18 THEN 'PA'   ELSE '' END) AS ProviderPosition,  

(CASE WHEN t.ANG=999 THEN ('') WHEN t.ANG=999.9 THEN ('') WHEN t.ANG=NULL THEN ('') ELSE ( t.ANG) END) as G,
(CASE t.ANP WHEN 999 THEN ('') WHEN 999.9 THEN ('')  WHEN null THEN ('')  ELSE (t.ANP)  END) AS P, 
(CASE t.ANA WHEN 999 THEN ('') WHEN 999.9 THEN ('')WHEN null THEN ('')  ELSE (t.ANA)  END) AS A,
(CASE WHEN t.ANwt=999 THEN ('') WHEN t.ANwt=999.9 THEN ('') WHEN t.ANWt=NULL THEN ('') ELSE ( t.ANWt) END) as Wt,
(CASE WHEN t.ANHt=999 THEN ('') WHEN t.ANHt=999.9 THEN ('') WHEN t.ANHt=NULL THEN ('') ELSE ( t.ANHt) END) as Ht,
(CASE t.ANBP WHEN NULL THEN ('')  ELSE (t.ANBP) END) AS BP, 
(CASE t.ANTemp WHEN 999 THEN ('') WHEN 999.9 THEN ('') WHEN NULL THEN ('')  ELSE (t.ANTemp) END) AS Temp,
(CASE t.ANTemp WHEN 999 THEN ('')  WHEN 999.9 THEN ('') ELSE (CASE t.ANTempUnit WHEN 1 THEN 'Fahrenheit' WHEN 2 THEN 'Celsius' WHEN 999 THEN ('') WHEN null THEN ('')  ELSE (t.ANTempUnit) END)END) AS TempUnit, 
(CASE WHEN t.ANGP=999 THEN ('') WHEN t.ANGP=999.9 THEN ('') WHEN t.ANGP=NULL THEN ('') ELSE ( t.ANGP) END) as GP,
--  SQLINES DEMO *** EN 1 THEN 'Yes'  WHEN 2 THEN 'No' WHEN 999 THEN ('') WHEN 999.9 THEN ('') WHEN NULL THEN ('') WHEN 0 THEN ('')  ELSE ('')  END) AS Odema, 
--  SQLINES DEMO *** tion WHEN 1 THEN 'Yes'  WHEN 2 THEN 'No'  WHEN 999 THEN ('') WHEN 999.9 THEN ('') WHEN NULL THEN ('') WHEN 0 THEN ('')  ELSE ('')  END) AS Presentation,
--  SQLINES DEMO ***   WHEN 999 THEN ('') WHEN 999.9 THEN ('') WHEN null THEN ('')  ELSE (t.anFundalHt) END) AS  FundalHt,
--  SQLINES DEMO ***  1 THEN 'Yes'  WHEN 2 THEN 'No'  WHEN 999 THEN ('') WHEN NULL THEN ('') WHEN 0 THEN ('')  ELSE ('')   END) AS FHS,
(CASE t.ANLab WHEN 1 THEN 'Yes' WHEN 0 THEN 'No'  ELSE '' END) AS Lab,
(CASE t.ANFA  WHEN 1 THEN 'Yes'  WHEN 2 THEN 'No'  WHEN 999 THEN ('') WHEN null THEN ('')  ELSE (t.ANFA) END) AS  FA,
(CASE t.ANFeSO4 WHEN 1 THEN 'Yes'  WHEN 2 THEN 'No'  WHEN 999 THEN ('') WHEN null THEN ('')  ELSE (t.ANFeSO4) END) AS  FeSO4,
(CASE t.ANFC WHEN 1 THEN 'Yes'  WHEN 2 THEN 'No'  WHEN 999 THEN ('') WHEN null THEN ('')  ELSE (t.ANFC) END) AS  FC,
(CASE t.ANB1 WHEN 999 THEN ('') WHEN 999.9 THEN ('') WHEN null THEN ('')  ELSE (t.ANB1) END) AS  B1,
(CASE t.ANB1Unit WHEN 999 THEN ('') WHEN 999.9 THEN ('') WHEN null THEN ('') WHEN 1 THEN '10mg'  WHEN 2 THEN '50mg'  WHEN 3 THEN '100mg' ELSE ('')  END) AS B1Unit, 
(CASE t.anDeworm1 WHEN 1 THEN  'Yes'   ELSE 'No'  END) AS Deworming1stDose,
(CASE t.anDeworm2 WHEN 1 THEN  'Yes'   ELSE 'No'  END) AS Deworming2ndDose,
(CASE t.anTT1 WHEN 1 THEN  'Yes'   ELSE 'No'  END) AS Tetanus1stDose,
(CASE t.anTT2 WHEN 1 THEN  'Yes'   ELSE 'No'  END) AS Tetanus2ndDose,
(CASE t.ANCDK WHEN 1 THEN 'Yes'  WHEN 2 THEN 'No'  WHEN 999 THEN ('') WHEN NULL THEN ('') WHEN 0 THEN ('')  ELSE ('')  END) AS CDK,
(CASE t.ANNBK WHEN 1 THEN 'Yes'  WHEN 2 THEN 'No'  WHEN 999 THEN ('') WHEN NULL THEN ('') WHEN 0 THEN ('')  ELSE ('')  END) AS NBK,
t. Anindirectdx OtherDiagnosis,t. Anindirecttx TreatmentComlications,
(CASE t.anHE1 WHEN 1 THEN 'Yes'  WHEN 999 THEN ('') WHEN NULL THEN ('') WHEN 0 THEN ('')  ELSE ('')  END) AS MaternalNutritionHE,
(CASE t.anHE2 WHEN 1 THEN 'Yes'  WHEN 999 THEN ('') WHEN NULL THEN ('') WHEN 0 THEN ('')  ELSE ('')  END) AS FamilyPlanningHE,
-- (CASE t.anHE3 WHEN 1 THEN 'Yes'  WHEN 999 THEN ('') WHEN NULL THEN ('') WHEN 0 THEN ('')  ELSE ('')  END) AS NewBornCareHE,
(CASE t.anHE4 WHEN 1 THEN 'Yes'  WHEN 999 THEN ('') WHEN NULL THEN ('') WHEN 0 THEN ('')  ELSE ('')  END) AS DeliveryPlanHE,
(CASE t.anHE5 WHEN 1 THEN 'Yes'  WHEN 999 THEN ('') WHEN NULL THEN ('') WHEN 0 THEN ('')  ELSE ('')  END) AS EmergencyResponsePlanHE,
(CASE t.anHE6 WHEN 1 THEN 'Yes'  WHEN 999 THEN ('') WHEN NULL THEN ('') WHEN 0 THEN ('')  ELSE ('')  END) AS DangerSignsHE,
(CASE t.anHE7 WHEN 1 THEN 'Yes'  WHEN 999 THEN ('') WHEN NULL THEN ('') WHEN 0 THEN ('')  ELSE ('')  END) AS ExclusiveBreastFeedingHE,
(CASE t.anHE8 WHEN 1 THEN 'Yes'  WHEN 999 THEN ('') WHEN NULL THEN ('') WHEN 0 THEN ('')  ELSE ('')  END) AS RTIsHIVSTIHE,
(CASE t.anHE9 WHEN 1 THEN 'Yes'  WHEN 999 THEN ('') WHEN NULL THEN ('') WHEN 0 THEN ('')  ELSE ('')  END) AS ImmunizationHE,
(CASE t.anHE10 WHEN 1 THEN 'Yes'  WHEN 999 THEN ('') WHEN NULL THEN ('') WHEN 0 THEN ('')  ELSE ('')  END) AS RestWorkHE,
(CASE t.anHE11 WHEN 1 THEN 'Yes'  WHEN 999 THEN ('') WHEN NULL THEN ('') WHEN 0 THEN ('')  ELSE ('')  END) AS HygieneHE,
(CASE t.anHE12 WHEN 1 THEN 'Yes'  WHEN 999 THEN ('') WHEN NULL THEN ('') WHEN 0 THEN ('')  ELSE ('')  END) AS DrugAlcoholUseHE,
(CASE t.anHE13 WHEN 1 THEN 'Yes'  WHEN 999 THEN ('') WHEN NULL THEN ('') WHEN 0 THEN ('')  ELSE ('')  END) AS SmokingHE,
(CASE t.ANOutcome WHEN 1 THEN 'OPD' WHEN 2 THEN 'IPD' WHEN 3 THEN 'Referral' WHEN 4 THEN 'Death' WHEN 5 THEN 'Discharge'  WHEN 0 THEN '' WHEN 999 THEN '' ELSE '' END) AS  Outcome,
(CASE t.ANRefto WHEN 1 THEN 'GOV Hospital' WHEN 2 THEN 'MaeTao Cinic' WHEN 3 THEN 'NGO' WHEN 4 THEN 'Thai Hospital' WHEN 5 THEN 'Other'  WHEN 0 THEN '' WHEN 999 THEN '' ELSE '' END) AS Refto,
(CASE (t.ANRefreason) WHEN 'null' THEN ''  WHEN NULL THEN  '' ELSE (t.ANRefreason) END) AS Refreason,
 (CASE (t.ANRefToOther) WHEN 'null' THEN ''  WHEN NULL THEN  '' ELSE (t.ANRefToOther) END) AS ReferraltoOther,
(CASE t.ANDeathreason  WHEN 'null' THEN ''  WHEN NULL THEN '' ELSE t.ANDeathreason  END) AS Deathreason,
(CASE t.ANVisit WHEN 999 THEN ('') WHEN null THEN ('')  ELSE (t.ANVisit) END) AS  Visit,
(CASE t.ANVtCount WHEN 999 THEN ('') WHEN null THEN ('')  ELSE (t.ANVtCount) END) AS  VtCount,
(CASE t.ANVisitTiming WHEN 999 THEN ('') WHEN null THEN ('')  ELSE (t.ANVisitTiming) END) AS  VisitTiming,
(CASE t.ANVisitSkill WHEN 999 THEN ('') WHEN null THEN ('')  ELSE (t.ANVisitSkill) END) AS  VisitSkill,
(CASE t.ANVisitTimingSkill  WHEN 999 THEN ('')  WHEN null THEN ('')  ELSE (t.ANVisitTimingSkill) END) AS  VisitTimingSkill,
(CASE t.ANOther WHEN 'null' THEN ''  WHEN NULL THEN '' ELSE t.ANOther END) AS ErrorCommentRemark,
(CASE anType2 WHEN 1 THEN 'New' WHEN 2 THEN 'Old' ELSE '' END ) anVISITNew,
(CASE anMigrant WHEN 1 THEN 'Yes' WHEN 2 THEN 'No' ELSE '' END ) MigrantWorker,
(CASE anIDP WHEN 1 THEN 'Yes' WHEN 2 THEN 'No' ELSE '' END ) IDP,
(CASE anDSee WHEN 1 THEN 'No difficulty' WHEN 2 THEN 'Some difficulties'  WHEN 3 THEN 'A lot of difficulties'  WHEN 4 THEN 'Cannot do it at all'  WHEN 9 THEN 'NA'  ELSE '' END ) DSee,
(CASE anDHear WHEN 1 THEN 'No difficulty' WHEN 2 THEN 'Some difficulties'  WHEN 3 THEN 'A lot of difficulties'  WHEN 4 THEN 'Cannot do it at all'  WHEN 9 THEN 'NA'  ELSE '' END ) DHear,
(CASE anDWalk WHEN 1 THEN 'No difficulty' WHEN 2 THEN 'Some difficulties'  WHEN 3 THEN 'A lot of difficulties'  WHEN 4 THEN 'Cannot do it at all'  WHEN 9 THEN 'NA'  ELSE '' END ) DWalk,
(CASE anDRembr WHEN 1 THEN 'No difficulty' WHEN 2 THEN 'Some difficulties'  WHEN 3 THEN 'A lot of difficulties'  WHEN 4 THEN 'Cannot do it at all'  WHEN 9 THEN 'NA'  ELSE '' END ) DRemember,
(CASE anDWash WHEN 1 THEN 'No difficulty' WHEN 2 THEN 'Some difficulties'  WHEN 3 THEN 'A lot of difficulties'  WHEN 4 THEN 'Cannot do it at all'  WHEN 9 THEN 'NA'  ELSE '' END ) DWash,
(CASE anDCommu WHEN 1 THEN 'No difficulty' WHEN 2 THEN 'Some difficulties'  WHEN 3 THEN 'A lot of difficulties'  WHEN 4 THEN 'Cannot do it at all'  WHEN 9 THEN 'NA'  ELSE '' END ) DCommunication,
(CASE anDisability WHEN 1 THEN 'Yes' WHEN 2 THEN 'No' ELSE '' END ) Disability,(CASE t.ANFAFESO4 WHEN 999 THEN ('') WHEN 999.9 THEN ('') WHEN null THEN ('')  ELSE (t.ANFAFESO4) END) AS  FAFESO4,
--  SQLINES DEMO *** rtDate,
-- SQLINES DEMO *** ifyDate,
DATE_FORMAT(t.ANInsert , '%Y-%m-%d %H:%i:%s' )  as InsertDate,
DATE_FORMAT(t.ANUpdate , '%Y-%m-%d %H:%i:%s' ) as ModifyDate,
t.ANClnid as clnId,t.ANtsp as tspId,t.ANVillage as Villagecode, t.ANproject as ProjID, t.ANorg as org
from (
select tt.*,b.regAge,b.regAgeUnit,b.regDate,(tt.ANprovideddate-b.regDate) + (b.regAge* b.regAgeUnit) as ageinday,b.regSex,b.regName,org.org_Name orgName,cln.cln_Name clnName,pro.project_Name,tsp.tsp_Name tspName,v.village_name villageName  from (
SELECT a.* FROM tbl_anc a where a.ANstatus<3 ) tt
left join tbl_reg b on tt.ANregid=b.regid
left join TBL_village v on tt.ANvillage=v.village_code
left join tbl_township tsp on tt.ANtsp=tsp.tsp_id
left join tbl_clinic cln on tt.ANclnid=cln.cln_id
left join tbl_project pro on tt.ANproject=pro.project_id
left join tbl_org org on tt.ANorg=org.org_id ) t
;

-- View Delivery

CREATE OR REPLACE VIEW `VIEW_DELIVERY` AS 
 SELECT t.orgName,
       t.DELIregid AS RegId,
       t.regName AS PatientName,
       t.clnName AS ClinicName,
       t.tspName AS TownshipName,
       t.villageName,
       t.project_Name AS ProjectName,
       CASE t.regSex WHEN 1 THEN 'Male' ELSE 'Female' END AS Sex,
       (CASE WHEN (t.ageinday) >=365 THEN TRUNCATE((t.ageinday)/365,0)
WHEN (t.ageinday) <365 AND (t.ageinday) >=30 THEN TRUNCATE((t.ageinday)/30,0) ELSE TRUNCATE((t.ageinday),0) END) Age,
       CASE
           WHEN t.ageinday >= 365 THEN 'Year'
           WHEN t.ageinday >= 30 THEN 'Month'
           ELSE 'Day'
       END AS AgeUnit,
       t.DELIProvidedDate AS ProvidedDate,
       CASE t.DELIPlace
           WHEN 1 THEN 'Clinic'
           WHEN 2 THEN 'Outreach'
           ELSE ''
       END AS ProvidedPlace,
        (CASE t.DELIProviderPosition WHEN 1 THEN 'EmoCW' WHEN 2 THEN 'MCHW' WHEN 3 THEN 'Medic' WHEN 4 THEN 'CHW' WHEN 5 THEN 'AMW' WHEN 6 THEN 'Nurse' WHEN 7 THEN 'Doctor'  WHEN 8 THEN 'TTBA' WHEN 9 THEN 'Others' WHEN 13 THEN 'Midwife' WHEN 16 THEN 'VHW' WHEN 18 THEN 'PA'   ELSE '' END) AS ProviderPosition,  
        CASE
           WHEN t.deliMComplication IS NULL THEN ''
           ELSE t.deliMComplication
       END AS MComplication,
       CASE
           WHEN t.deliMProcedure IS NULL THEN ''
           ELSE t.deliMProcedure
       END AS MProcedure,
       
(CASE t.deliMTx WHEN 'null' THEN ''  WHEN NULL THEN '' ELSE t.deliMTx END) AS MaternalTreatment,
(CASE t.deliDeliType WHEN 1 THEN 'NSVD' WHEN 2 THEN 'Breech' WHEN 3 THEN 'Vacuum' WHEN 4 THEN 'LSCS' WHEN 5 THEN 'Forcep' ELSE '' END ) AS TypeofDelivery,
--(CASE t.DELIGP WHEN 999 THEN ('') WHEN 999.9 THEN ('') WHEN null THEN ('')  ELSE (t.DELIGP)  END) AS GP, 
(CASE t.DELIG WHEN 999 THEN ('') WHEN 999.9 THEN ('') WHEN null THEN ('')  ELSE (t.DELIG)  END) AS G, 
(CASE t.DELIP WHEN 999 THEN ('') WHEN 999.9 THEN ('') WHEN null THEN ('')  ELSE (t.DELIP)  END) AS P, 
(CASE t.DELIA WHEN 999 THEN ('') WHEN 999.9 THEN ('') WHEN null THEN ('')  ELSE (t.DELIA)  END) AS A,
--(CASE t.deliEpi WHEN 1 THEN 'Yes'  WHEN 2 THEN 'No' WHEN 999 THEN ('') WHEN NULL THEN ('') WHEN 0 THEN ('')  ELSE ('')  END) AS Epi,
--(CASE t.deliDefect WHEN 1 THEN 'Yes'  WHEN 2 THEN 'No' WHEN 999 THEN ('') WHEN NULL THEN ('') WHEN 0 THEN ('')  ELSE ('')  END) AS DeliDefect,
(CASE t.DELILab WHEN 1 THEN 'Yes' WHEN 0 THEN 'No'  ELSE '' END) AS Lab,
(CASE t.DELIMOutcome WHEN 1 THEN 'OPD' WHEN 2 THEN 'IPD' WHEN 3 THEN 'Referral' WHEN 4 THEN 'Death' WHEN 5 THEN 'Discharge'  WHEN 0 THEN '' WHEN 999 THEN '' ELSE '' END) AS  MotherOutcome,
(CASE t.DELIMRefto WHEN 1 THEN 'GOV Hospital' WHEN 2 THEN 'MaeTao Cinic' WHEN 3 THEN 'NGO' WHEN 4 THEN 'Thai Hospital' WHEN 5 THEN 'Other'  WHEN 0 THEN '' WHEN 999 THEN '' ELSE '' END) AS MRefto,
(CASE t.deliMRefreason WHEN 'null' THEN ''  WHEN NULL THEN  '' ELSE t.deliMRefreason  END) AS MRefreason,
(CASE t.DELIMDeathreason  WHEN 'null' THEN ''  WHEN NULL THEN '' ELSE t.DELIMDeathreason  END) AS MDeathreason,
(CASE t.deliANSelfRep WHEN 999 THEN ('') WHEN 999.9 THEN ('') WHEN NULL THEN ('')  ELSE (t.deliANSelfRep ) END) AS ANSelfRep,
(CASE t.DELIBOutcome WHEN 1 THEN 'OPD' WHEN 2 THEN 'IPD' WHEN 3 THEN 'Referral' WHEN 4 THEN 'Death' WHEN 5 THEN 'Discharge'  WHEN 0 THEN '' WHEN 999 THEN '' ELSE '' END) AS  BabyOutcome,
(CASE t.DELIBDeliOutcome WHEN 1 THEN 'StillBirth' WHEN 2 THEN 'LiveBirth' WHEN 3 THEN 'Preterm' WHEN 4 THEN 'IUGR'  WHEN 0 THEN '' WHEN 999 THEN '' ELSE '' END) AS  BDeliOutcome,
(CASE t.DELIBRefto WHEN 1 THEN 'GOV Hospital' WHEN 2 THEN 'MaeTao Cinic' WHEN 3 THEN 'NGO' WHEN 4 THEN 'Thai Hospital' WHEN 5 THEN 'Other'  WHEN 0 THEN '' WHEN 999 THEN '' ELSE '' END) AS BRefto,
(CASE t.deliBRefreason WHEN 'null' THEN ''  WHEN NULL THEN  '' ELSE t.deliBRefreason  END) AS BRefreason,
(CASE t.DELIBDeathreason  WHEN 'null' THEN ''  WHEN NULL THEN '' ELSE t.DELIBDeathreason  END) AS BDeathreason,
--(CASE  WHEN t.DELITemp=999 THEN ('') WHEN t.DELITemp=999.9 THEN ('') WHEN t.DELITemp=NULL THEN ('')  ELSE (t.DELITemp) END) AS Temp,
--(CASE t.DELITemp WHEN 999.9 THEN ('') ELSE (CASE t.DELITempUnit WHEN 1 THEN 'Fahrenheit' WHEN 2 THEN 'Celsius' WHEN 999 THEN ('') WHEN null THEN ('')  ELSE (t.DELITempUnit) END)END) AS TempUnit, 
-- (CASE  WHEN t.deliPR=999 THEN ('')WHEN t.deliPR=999.9 THEN ('') WHEN t.deliPR=NULL THEN ('')  ELSE (t.deliPR) END) AS PR, 
-- (CASE t.DELIBP WHEN (999) THEN ('') WHEN NULL THEN ('')  ELSE (t.DELIBP) END) AS BP, 
(CASE  WHEN t.deliBSex1=999 THEN ('') WHEN t.deliBSex1=999.9 THEN ('') WHEN t.deliBSex1=NULL THEN ('') WHEN t.deliBSex1=1 THEN 'Male' WHEN t.deliBSex1=2 THEN 'Female' ELSE ('') END) AS BSex1, 
(CASE  WHEN t.deliBSex2=999 THEN ('') WHEN t.deliBSex2=999.9 THEN ('') WHEN t.deliBSex2=NULL THEN ('') WHEN t.deliBSex2=1 THEN 'Male' WHEN t.deliBSex2=2 THEN 'Female' ELSE ('') END) AS BSex2, 
(CASE  WHEN t.deliBSex3=999 THEN ('') WHEN t.deliBSex3=999.9 THEN ('') WHEN t.deliBSex3=NULL THEN ('') WHEN t.deliBSex3=1 THEN 'Male' WHEN t.deliBSex3=2 THEN 'Female' ELSE ('') END) AS BSex3, 
(CASE  WHEN t.deliBWt1=999 THEN ('') WHEN t.deliBWt1=999.9 THEN ('') WHEN t.deliBWt1=NULL THEN ('')  ELSE (t.deliBWt1 ) END) AS BWt1, 
(CASE  WHEN t.deliBWt2=999 THEN ('') WHEN t.deliBWt2=999.9 THEN ('') WHEN t.deliBWt2=NULL THEN ('')  ELSE (t.deliBWt2 ) END) AS BWt2, 
(CASE  WHEN t.deliBWt3=999 THEN ('') WHEN t.deliBWt3=999.9 THEN ('') WHEN t.deliBWt3=NULL THEN ('')  ELSE (t.deliBWt3 ) END) AS BWt3, 
(CASE t.deliBBF1 WHEN 1 THEN 'Yes'  WHEN 2 THEN 'No' WHEN 999 THEN ('') WHEN 999.9 THEN ('') WHEN NULL THEN ('') WHEN 0 THEN ('')  ELSE ('')  END) AS BBF1,
(CASE t.deliBBF2 WHEN 1 THEN 'Yes'  WHEN 2 THEN 'No' WHEN 999 THEN ('') WHEN 999.9 THEN ('') WHEN NULL THEN ('') WHEN 0 THEN ('')  ELSE ('')  END) AS BBF2,
(CASE t.deliBBF3 WHEN 1 THEN 'Yes'  WHEN 2 THEN 'No' WHEN 999 THEN ('') WHEN 999.9 THEN ('') WHEN NULL THEN ('') WHEN 0 THEN ('')  ELSE ('')  END) AS BBF3,
-- (CASE t.deliBCCut1 WHEN 1 THEN 'Yes'  WHEN 2 THEN 'No' WHEN 999 THEN ('') WHEN 999.9 THEN ('') WHEN NULL THEN ('') WHEN 0 THEN ('')  ELSE ('')  END) AS BCCut1,
--(CASE t.deliBCCut2 WHEN 1 THEN 'Yes'  WHEN 2 THEN 'No' WHEN 999 THEN ('') WHEN 999.9 THEN ('') WHEN NULL THEN ('') WHEN 0 THEN ('')  ELSE ('')  END) AS BCCut2,
--(CASE t.deliBCCut3 WHEN 1 THEN 'Yes'  WHEN 2 THEN 'No' WHEN 999 THEN ('') WHEN 999.9 THEN ('') WHEN NULL THEN ('') WHEN 0 THEN ('')  ELSE ('')  END) AS BCCut3,
(CASE t.DELIREMARK WHEN 'null' THEN ''  WHEN NULL THEN '' ELSE t.DELIREMARK END) AS ErrorCommentRemark,
(CASE deliMigrant WHEN 1 THEN 'Yes' WHEN 2 THEN 'No' ELSE '' END ) MigrantWorker,
(CASE deliIDP WHEN 1 THEN 'Yes' WHEN 2 THEN 'No' ELSE '' END ) IDP,
(CASE deliDSee WHEN 1 THEN 'No difficulty' WHEN 2 THEN 'Some difficulties'  WHEN 3 THEN 'A lot of difficulties'  WHEN 4 THEN 'Cannot do it at all'  WHEN 9 THEN 'NA'  ELSE '' END ) DSee,
(CASE deliDHear WHEN 1 THEN 'No difficulty' WHEN 2 THEN 'Some difficulties'  WHEN 3 THEN 'A lot of difficulties'  WHEN 4 THEN 'Cannot do it at all'  WHEN 9 THEN 'NA'  ELSE '' END ) DHear,
(CASE deliDWalk WHEN 1 THEN 'No difficulty' WHEN 2 THEN 'Some difficulties'  WHEN 3 THEN 'A lot of difficulties'  WHEN 4 THEN 'Cannot do it at all'  WHEN 9 THEN 'NA'  ELSE '' END ) DWalk,
(CASE deliDRembr WHEN 1 THEN 'No difficulty' WHEN 2 THEN 'Some difficulties'  WHEN 3 THEN 'A lot of difficulties'  WHEN 4 THEN 'Cannot do it at all'  WHEN 9 THEN 'NA'  ELSE '' END ) DRemember,
(CASE deliDWash WHEN 1 THEN 'No difficulty' WHEN 2 THEN 'Some difficulties'  WHEN 3 THEN 'A lot of difficulties'  WHEN 4 THEN 'Cannot do it at all'  WHEN 9 THEN 'NA'  ELSE '' END ) DWash,
(CASE deliDCommu WHEN 1 THEN 'No difficulty' WHEN 2 THEN 'Some difficulties'  WHEN 3 THEN 'A lot of difficulties'  WHEN 4 THEN 'Cannot do it at all'  WHEN 9 THEN 'NA'  ELSE '' END ) DCommunication,
(CASE deliDisability WHEN 1 THEN 'Yes' WHEN 2 THEN 'No' ELSE '' END ) Disability,

DATE_FORMAT(t.DELIInsert , '%Y-%m-%d %H:%i:%s' )  as InsertDate,
DATE_FORMAT(t.DELIUpdate , '%Y-%m-%d %H:%i:%s' ) as ModifyDate,
t.DELIClnid as clnId,t.DELItsp as tspId,t.DELIVillage as Villagecode, t.DELIproject as ProjID, t.DELIorg as org

FROM (
    SELECT tt.*, 
           b.regAge,
           b.regAgeUnit,
           b.regDate,
           (tt.DELIProvidedDate - b.regDate) + (b.regAge * b.regAgeUnit) AS ageinday,
           b.regSex,
           b.regName,
           org.org_Name AS orgName,
           cln.cln_Name AS clnName,
           pro.project_Name,
           tsp.tsp_Name AS tspName,
           v.village_Name AS villageName
    FROM tbl_DELIVERY tt
    LEFT JOIN tbl_reg b ON tt.DELIregid = b.regid
    LEFT JOIN TBL_village v ON tt.DELIvillage = v.village_code
    LEFT JOIN tbl_township tsp ON tt.DELItsp = tsp.tsp_id
    LEFT JOIN TBL_CLINIC cln ON tt.DELIclnid = cln.cln_id
    LEFT JOIN tbl_project pro ON tt.DELIproject = pro.project_id
    LEFT JOIN tbl_org org ON tt.DELIorg = org.org_id
) t;

-- VIEW PNC
CREATE OR REPLACE VIEW `VIEW_PNC` AS
select
    t.orgName,
    t.pnregid as RegId,
    t.regName as PatientName,
    t.clnName as ClinicName,
    t.tspName as TownshipName,
    t.villageName,
    t.project_Name as ProjectName,
    (
        CASE
            t.regSex
            WHEN 1 THEN 'Male'
            ELSE 'Female'
        END
    ) AS Sex,
    (CASE WHEN (t.ageinday) >=365 THEN TRUNCATE((t.ageinday)/365,0)
WHEN (t.ageinday) <365 AND (t.ageinday) >=30 THEN TRUNCATE((t.ageinday)/30,0) ELSE TRUNCATE((t.ageinday),0) END) Age,
    (
        CASE
            WHEN t.ageinday >= 365 THEN 'Year'
            WHEN t.ageinday < 365
            and t.ageinday >= 30 THEN 'Month'
            ELSE 'Day'
        END
    ) AS AgeUnit,
    t.pnProvidedDate as ProvidedDate,(
        CASE
            t.pnPlace
            WHEN 1 THEN 'Clinic'
            WHEN 2 THEN 'Outreach'
            WHEN 3 THEN 'Volunteer'
            WHEN 4 THEN 'Home'
            WHEN 5 THEN 'Other'
            WHEN 6 THEN 'Secondary Care'
            ELSE ''
        END
    ) AS ProvidedPlace,
    (
        CASE
            t.pnProviderPosition
            WHEN 1 THEN 'EmoCW'
            WHEN 2 THEN 'MCHW'
            WHEN 3 THEN 'Medic'
            WHEN 4 THEN 'CHW'
            WHEN 5 THEN 'AMW'
            WHEN 6 THEN 'Nurse'
            WHEN 7 THEN 'Doctor'
            WHEN 8 THEN 'TTBA'
            WHEN 9 THEN 'Others'
            WHEN 13 THEN 'Midwife'
            WHEN 16 THEN 'VHW'
            WHEN 18 THEN 'PA'
            ELSE ''
        END
    ) AS ProviderPosition,
    (
        CASE
            WHEN t.pnANSelfRep = 999 THEN ''
            WHEN t.pnANSelfRep = NULL THEN ''
            ELSE (t.pnANSelfRep)
        END
    ) as ANSelfRep,
    (
        CASE
            t.pnP
            WHEN 999 THEN ''
            WHEN null THEN ''
            ELSE (t.pnP)
        END
    ) AS P,
    (
        CASE
            t.pnA
            WHEN 999 THEN ''
            WHEN null THEN ''
            ELSE (t.pnA)
        END
    ) AS A,
    (
        CASE
            t.pnBP
            WHEN NULL THEN ''
            ELSE (t.pnBP)
        END
    ) AS BP,
    (
        CASE
            t.pnTemp
            WHEN 999 THEN ''
            WHEN NULL THEN ''
            ELSE (t.pnTemp)
        END
    ) AS Temp,
    (
        CASE
            t.pnTempUnit
            WHEN 999 THEN ''
            WHEN 999.9 THEN ''
            ELSE (
                CASE
                    t.pnTempUnit
                    WHEN 1 THEN 'Fahrenheit'
                    WHEN 2 THEN 'Celsius'
                    WHEN 999 THEN ''
                    WHEN null THEN ''
                    ELSE (t.pnTempUnit)
                END
            )
        END
    ) AS TempUnit,
    (
        CASE
            WHEN t.pnPR = 999 THEN ''
            WHEN t.pnPR = NULL THEN ''
            ELSE (t.pnPR)
        END
    ) as PR,
    (
        CASE
            WHEN t.pnRR = 999 THEN ''
            WHEN t.pnRR = NULL THEN ''
            ELSE (t.pnRR)
        END
    ) as RR,
    (
        CASE
            t.pnLab
            WHEN 1 THEN 'Yes'
            WHEN 0 THEN 'No'
            ELSE ''
        END
    ) AS Lab,
    (
        CASE
            t.pnB1
            WHEN 999 THEN ''
            WHEN null THEN ''
            ELSE (t.pnB1)
        END
    ) AS B1,
    (
        CASE
            t.pnB1Unit
            WHEN 999 THEN ''
            WHEN 999.9 THEN ''
            WHEN null THEN ''
            WHEN 1 THEN '10mg'
            WHEN 2 THEN '50mg'
            WHEN 3 THEN '100mg'
            ELSE ''
        END
    ) AS B1Unit,
    (
        CASE
            t.pnVitA
            WHEN 999 THEN ''
            WHEN null THEN ''
            ELSE (t.pnVitA)
        END
    ) AS VitA,
    (
        CASE
            t.pnVitAUnit
            WHEN 999 THEN ''
            WHEN 999.9 THEN ''
            WHEN null THEN ''
            WHEN 1 THEN '0.25ml'
            WHEN 2 THEN '0.2ml'
            ELSE ''
        END
    ) AS VitAUnit,
    (
        CASE
            t.pnFeSo4
            WHEN 999 THEN ''
            WHEN null THEN ''
            ELSE (t.pnFeSo4)
        END
    ) AS FeSo4,
    (
        CASE
            t.pnHE
            WHEN 1 THEN 'Yes'
            WHEN 999 THEN ''
            WHEN NULL THEN ''
            WHEN 0 THEN ''
            ELSE ''
        END
    ) AS HE,
    (
        CASE
            t.pnOutcome
            WHEN 1 THEN 'OPD'
            WHEN 2 THEN 'IPD'
            WHEN 3 THEN 'Referral'
            WHEN 4 THEN 'Death'
            WHEN 5 THEN 'Discharge'
            WHEN 0 THEN ''
            WHEN 999 THEN ''
            ELSE ''
        END
    ) AS Outcome,
    (
        CASE
            t.pnRefto
            WHEN 1 THEN 'GOV Hospital'
            WHEN 2 THEN 'MaeTao Cinic'
            WHEN 3 THEN 'NGO'
            WHEN 4 THEN 'Thai Hospital'
            WHEN 5 THEN 'Other'
            WHEN 0 THEN ''
            WHEN 999 THEN ''
            ELSE ''
        END
    ) AS Refto,
    (
        CASE
            (t.pnRefToOther)
            WHEN 'null' THEN ''
            WHEN NULL THEN ''
            ELSE (t.pnRefToOther)
        END
    ) AS ReferraltoOther,
    (
        CASE
            (t.pnRefreason)
            WHEN 'null' THEN ''
            WHEN NULL THEN ''
            ELSE (t.pnRefreason)
        END
    ) AS Refreason,
    (
        CASE
            t.pnDeathreason
            WHEN 'null' THEN ''
            WHEN NULL THEN ''
            ELSE t.pnDeathreason
        END
    ) AS Deathreason,
    t.pnDDeli as DeliveryDate,
    (
        CASE
            t.pnTx
            WHEN 1 THEN 'Yes'
            WHEN 999 THEN ''
            WHEN NULL THEN ''
            WHEN 0 THEN ''
            ELSE ''
        END
    ) AS Treatment,
    (
        CASE
            t.pnTxOther
            WHEN 'null' THEN ''
            WHEN NULL THEN ''
            ELSE t.pnTxOther
        END
    ) AS OtherTreatment,
    (
        CASE
            t.pnDx
            WHEN 1 THEN 'Yes'
            WHEN 999 THEN ''
            WHEN NULL THEN ''
            WHEN 0 THEN ''
            ELSE ''
        END
    ) AS Diagnosis,
    (
        CASE
            t.pnRemark
            WHEN 'null' THEN ''
            WHEN NULL THEN ''
            ELSE t.pnRemark
        END
    ) AS ErrorCommentRemark,
    DATE_FORMAT(t.pnInsert, '%Y-%m-%d %H:%i:%s') as InsertDate,
    DATE_FORMAT(t.pnUpdate, '%Y-%m-%d %H:%i:%s') as ModifyDate,
    t.pnClnid as clnId,
    t.pntsp as tspId,
    t.pnVillage as Villagecode,
    t.pnproject as ProjID,
    t.pnorg as org,
    (
        CASE
            t.pnFP
            WHEN 1 THEN 'Yes'
            WHEN 999 THEN ''
            WHEN NULL THEN ''
            WHEN 0 THEN ''
            ELSE ''
        END
    ) AS pnFP,
    (
        CASE
            t.pnNBC
            WHEN 1 THEN 'Yes'
            WHEN 2 THEN 'No'
            WHEN 999 THEN ''
            WHEN NULL THEN ''
            WHEN 0 THEN ''
            ELSE ''
        END
    ) AS pnNBC,
    (
        CASE
            pnMigrant
            WHEN 1 THEN 'Yes'
            WHEN 2 THEN 'No'
            ELSE ''
        END
    ) MigrantWorker,
    (
        CASE
            pnIDP
            WHEN 1 THEN 'Yes'
            WHEN 2 THEN 'No'
            ELSE ''
        END
    ) IDP,
    (
        CASE
            pnDSee
            WHEN 1 THEN 'No difficulty'
            WHEN 2 THEN 'Some difficulties'
            WHEN 3 THEN 'A lot of difficulties'
            WHEN 4 THEN 'Cannot do it at all'
            WHEN 9 THEN 'NA'
            ELSE ''
        END
    ) DSee,
    (
        CASE
            pnDHear
            WHEN 1 THEN 'No difficulty'
            WHEN 2 THEN 'Some difficulties'
            WHEN 3 THEN 'A lot of difficulties'
            WHEN 4 THEN 'Cannot do it at all'
            WHEN 9 THEN 'NA'
            ELSE ''
        END
    ) DHear,
    (
        CASE
            pnDWalk
            WHEN 1 THEN 'No difficulty'
            WHEN 2 THEN 'Some difficulties'
            WHEN 3 THEN 'A lot of difficulties'
            WHEN 4 THEN 'Cannot do it at all'
            WHEN 9 THEN 'NA'
            ELSE ''
        END
    ) DWalk,
    (
        CASE
            pnDRembr
            WHEN 1 THEN 'No difficulty'
            WHEN 2 THEN 'Some difficulties'
            WHEN 3 THEN 'A lot of difficulties'
            WHEN 4 THEN 'Cannot do it at all'
            WHEN 9 THEN 'NA'
            ELSE ''
        END
    ) DRemember,
    (
        CASE
            pnDWash
            WHEN 1 THEN 'No difficulty'
            WHEN 2 THEN 'Some difficulties'
            WHEN 3 THEN 'A lot of difficulties'
            WHEN 4 THEN 'Cannot do it at all'
            WHEN 9 THEN 'NA'
            ELSE ''
        END
    ) DWash,
    (
        CASE
            pnDCommu
            WHEN 1 THEN 'No difficulty'
            WHEN 2 THEN 'Some difficulties'
            WHEN 3 THEN 'A lot of difficulties'
            WHEN 4 THEN 'Cannot do it at all'
            WHEN 9 THEN 'NA'
            ELSE ''
        END
    ) DCommunication,
    (
        CASE
            pnDisability
            WHEN 1 THEN 'Yes'
            WHEN 2 THEN 'No'
            ELSE ''
        END
    ) Disability
from
    (
        select
            tt.*,
            b.regAge,
            b.regAgeUnit,
            b.regDate,(tt.pnprovideddate - b.regDate) + (b.regAge * b.regAgeUnit) as ageinday,
            b.regSex,
            b.regName,
            org.org_Name ORGNAME,
            cln.cln_Name CLNNAME,
            pro.project_Name,
            tsp.tsp_Name TSPNAME,
            v.village_Name VILLAGENAME
        from
            (
                SELECT
                    a.*
                FROM
                    tbl_PNC a
                where
                    a.pnstatus < 3
            ) tt
            left join tbl_reg b on tt.pnregid = b.regid
            left join TBL_village v on tt.pnvillage = v.village_code
            left join tbl_township tsp on tt.pntsp = tsp.tsp_id
            left join TBL_CLINIC cln on tt.pnclnid = cln.cln_id
            left join tbl_project pro on tt.pnproject = pro.project_id
            left join tbl_org org on tt.pnorg = org.org_id
    ) t;

-- VIEW FP
CREATE OR REPLACE VIEW `VIEW_FP` AS
select
    t.orgName,
    t.fpRegId as Regid,
    t.regName as PatientName,
    t.clnName as ClinicName,
    t.tspName as TownshipName,
    t.villageName,
    t.project_Name as ProjectName,
    (
        CASE
            t.regSex
            WHEN 1 THEN 'Male'
            ELSE 'Female'
        END
    ) AS Sex,
    (CASE WHEN (t.ageinday) >=365 THEN TRUNCATE((t.ageinday)/365,0)
WHEN (t.ageinday) <365 AND (t.ageinday) >=30 THEN TRUNCATE((t.ageinday)/30,0) ELSE TRUNCATE((t.ageinday),0) END) Age,
    (
        CASE
            WHEN t.ageinday >= 365 THEN 'Year'
            WHEN t.ageinday < 365
            and t.ageinday >= 30 THEN 'Month'
            ELSE 'Day'
        END
    ) AS AgeUnit,
    t.fpprovidedDate as ProvidedDate,(
        CASE
            t.fpPlace
            WHEN 1 THEN 'Clinic'
            WHEN 2 THEN 'Outreach'
            WHEN 3 THEN 'Volunteer'
            WHEN 4 THEN 'Home'
            WHEN 5 THEN 'Other'
            WHEN 6 THEN 'Secondary Care'
            ELSE ''
        END
    ) AS ProvidedPlace,
    (
        CASE
            t.fpProviderPosition
            WHEN 1 THEN 'EmoCW'
            WHEN 2 THEN 'MCHW'
            WHEN 3 THEN 'Medic'
            WHEN 4 THEN 'CHW'
            WHEN 5 THEN 'AMW'
            WHEN 6 THEN 'Nurse'
            WHEN 7 THEN 'Doctor'
            WHEN 8 THEN 'TTBA'
            WHEN 9 THEN 'Others'
            WHEN 13 THEN 'Midwife'
            WHEN 16 THEN 'VHW'
            WHEN 18 THEN 'PA'
            ELSE ''
        END
    ) AS ProviderPosition,
    (
        CASE
            WHEN t.fpwt = 999 THEN ''
            WHEN t.fpwt = 999.9 THEN ''
            WHEN t.fpWt = NULL THEN ''
            ELSE (t.fpWt)
        END
    ) as Wt,
    (
        CASE
            WHEN t.fpHt = 999 THEN ''
            WHEN t.fpHt = 999.9 THEN ''
            WHEN t.fpHt = NULL THEN ''
            ELSE (t.fpHt)
        END
    ) as Ht,
    (
        CASE
            t.fpBP
            WHEN NULL THEN ''
            WHEN (999) THEN ''
            ELSE (t.fpBP)
        END
    ) AS BP,
    (
        CASE
            t.fpPR
            WHEN 999 THEN ''
            WHEN 999.9 THEN ''
            WHEN NULL THEN ''
            ELSE (t.fpPR)
        END
    ) AS PR,
    (
        CASE
            t.fpRR
            WHEN 999 THEN ''
            WHEN 999.9 THEN ''
            WHEN NULL THEN ''
            ELSE (t.fpRR)
        END
    ) AS RR,
    (
        CASE
            t.fpTemp
            WHEN 999 THEN ''
            WHEN 999.9 THEN ''
            WHEN NULL THEN ''
            ELSE (t.fpTemp)
        END
    ) AS Temp,
    (
        CASE
            t.fpTemp
            WHEN 999 THEN ''
            WHEN 999.9 THEN ''
            ELSE (
                CASE
                    t.fpTempUnit
                    WHEN 1 THEN 'Fahrenheit'
                    WHEN 2 THEN 'Celsius'
                    WHEN 999 THEN ''
                    WHEN null THEN ''
                    ELSE (t.fpTempUnit)
                END
            )
        END
    ) AS TempUnit,
    (
        CASE
            t.fpP
            WHEN 999 THEN ''
            WHEN 999.9 THEN ''
            WHEN null THEN ''
            ELSE (t.fpP)
        END
    ) AS P,
    (
        CASE
            t.fpA
            WHEN 999 THEN ''
            WHEN 999.9 THEN ''
            WHEN null THEN ''
            ELSE (t.fpA)
        END
    ) AS A,
    (
        CASE
            WHEN t.fpCondomM = 999 THEN ''
            WHEN t.fpCondomM = 999.9 THEN ''
            WHEN t.fpCondomM = NULL THEN ''
            ELSE (t.fpCondomM)
        END
    ) as MaleCondom,
    (
        CASE
            WHEN t.fpCondomF = 999 THEN ''
            WHEN t.fpCondomF = 999.9 THEN ''
            WHEN t.fpCondomF = NULL THEN ''
            ELSE (t.fpCondomF)
        END
    ) as FemaleCondom,
    (
        CASE
            WHEN t.fpDepo = 999 THEN ''
            WHEN t.fpDepo = 999.9 THEN ''
            WHEN t.fpDepo = NULL THEN ''
            ELSE (t.fpDepo)
        END
    ) as Depo,
    (
        CASE
            WHEN t.fpCOC = 999 THEN ''
            WHEN t.fpCOC = 999.9 THEN ''
            WHEN t.fpCOC = NULL THEN ''
            ELSE (t.fpCOC)
        END
    ) as COC,
    (
        CASE
            WHEN t.fpPOP = 999 THEN ''
            WHEN t.fpPOP = 999.9 THEN ''
            WHEN t.fpPOP = NULL THEN ''
            ELSE (t.fpPOP)
        END
    ) as POP,
    (
        CASE
            WHEN t.fpEC = 999 THEN ''
            WHEN t.fpEC = 999.9 THEN ''
            WHEN t.fpEC = NULL THEN ''
            ELSE (t.fpEC)
        END
    ) as EC,
    (
        CASE
            WHEN t.fpImp3 = 999 THEN ''
            WHEN t.fpImp3 = 999.9 THEN ''
            WHEN t.fpImp3 = 1 THEN ('Yes')
            WHEN t.fpImp3 = 2 THEN ('No')
            ELSE ''
        END
    ) as Year3Implant,
    (
        CASE
            WHEN t.fpImp4 = 999 THEN ''
            WHEN t.fpImp4 = 999.9 THEN ''
            WHEN t.fpImp4 = 1 THEN ('Yes')
            WHEN t.fpImp4 = 2 THEN ('No')
            ELSE ''
        END
    ) as year4Implant,
    (
        CASE
            WHEN t.fpImp5 = 999 THEN ''
            WHEN t.fpImp5 = 999.9 THEN ''
            WHEN t.fpImp5 = 1 THEN ('Yes')
            WHEN t.fpImp5 = 2 THEN ('No')
            ELSE ''
        END
    ) as Year5Implant,
    (
        CASE
            t.fpNA
            WHEN 1 THEN 'Yes'
            WHEN 2 THEN 'No'
            WHEN 0 THEN ''
            WHEN 999 THEN ''
            WHEN null THEN ''
            ELSE ''
        END
    ) AS NewAcceptor,
    (
        CASE
            t.fpIUDCu
            WHEN 1 THEN 'Yes'
            WHEN 0 THEN ''
            WHEN 999 THEN ''
            WHEN null THEN ''
            ELSE ''
        END
    ) AS IUDCu,
    (
        CASE
            t.fpIUDMulti
            WHEN 1 THEN 'Yes'
            WHEN 0 THEN ''
            WHEN 999 THEN ''
            WHEN null THEN ''
            ELSE ''
        END
    ) AS IUDMulti,
    (
        CASE
            t.fpRefImp
            WHEN 1 THEN 'Yes'
            WHEN 0 THEN ''
            WHEN 999 THEN ''
            WHEN null THEN ''
            ELSE ''
        END
    ) AS RefImp,
    (
        CASE
            t.fpRefIUD
            WHEN 1 THEN 'Yes'
            WHEN 0 THEN ''
            WHEN 999 THEN ''
            WHEN null THEN ''
            ELSE ''
        END
    ) AS RefIUD,
    (
        CASE
            t.fpRefTL
            WHEN 1 THEN 'Yes'
            WHEN 0 THEN ''
            WHEN 999 THEN ''
            WHEN null THEN ''
            ELSE ''
        END
    ) AS RefTL,
    (
        CASE
            t.fpRefVt
            WHEN 1 THEN 'Yes'
            WHEN 0 THEN ''
            WHEN 999 THEN ''
            WHEN null THEN ''
            ELSE ''
        END
    ) AS RefVt,
    (
        CASE
            t.fpCSLFP
            WHEN 1 THEN 'Yes'
            WHEN 0 THEN ''
            WHEN 999 THEN ''
            WHEN null THEN ''
            ELSE ''
        END
    ) AS CSLFP,
    (
        CASE
            t.fpCSLFer
            WHEN 1 THEN 'Yes'
            WHEN 0 THEN ''
            WHEN 999 THEN ''
            WHEN null THEN ''
            ELSE ''
        END
    ) AS CSLFer,
    (
        CASE
            WHEN t.fpCondomMBk = 999 THEN ''
            WHEN t.fpCondomMBk = 999.9 THEN ''
            WHEN t.fpCondomMBk = NULL THEN ''
            ELSE (t.fpCondomMBk)
        END
    ) as MaleCondomBk,
    (
        CASE
            WHEN t.fpCondomFBk = 999 THEN ''
            WHEN t.fpCondomFBk = 999.9 THEN ''
            WHEN t.fpCondomFBk = NULL THEN ''
            ELSE (t.fpCondomFBk)
        END
    ) as FemaleCondomBk,
    (
        CASE
            WHEN t.fpECBk = 999 THEN ''
            WHEN t.fpECBk = 999.9 THEN ''
            WHEN t.fpECBk = NULL THEN ''
            ELSE (t.fpECBk)
        END
    ) as ECBk,
    (
        CASE
            t.fpLab
            WHEN 1 THEN 'Yes'
            WHEN 0 THEN 'No'
            ELSE ''
        END
    ) AS Lab,
    (
        CASE
            t.fpOutcome
            WHEN 1 THEN 'OPD'
            WHEN 2 THEN 'IPD'
            WHEN 3 THEN 'Referral'
            WHEN 4 THEN 'Death'
            WHEN 5 THEN 'Discharge'
            WHEN 0 THEN ''
            WHEN 999 THEN ''
            ELSE ''
        END
    ) AS Outcome,
    (
        CASE
            t.fpRefto
            WHEN 1 THEN 'GOV Hospital'
            WHEN 2 THEN 'MaeTao Cinic'
            WHEN 3 THEN 'NGO'
            WHEN 4 THEN 'Thai Hospital'
            WHEN 5 THEN 'Other'
            WHEN 0 THEN ''
            WHEN 999 THEN ''
            ELSE ''
        END
    ) AS Refto,
    (
        CASE
            (t.fpRefreason)
            WHEN 'null' THEN ''
            WHEN NULL THEN ''
            ELSE (t.fpRefreason)
        END
    ) AS Refreason,
    (
        CASE
            (t.fpRefToOther)
            WHEN 'null' THEN ''
            WHEN NULL THEN ''
            ELSE (t.fpRefToOther)
        END
    ) AS ReferraltoOther,
    (
        CASE
            t.fpDeathreason
            WHEN 'null' THEN ''
            WHEN NULL THEN ''
            ELSE t.fpDeathreason
        END
    ) AS Deathreason,
    (
        CASE
            WHEN t.fpDepoSc = 999 THEN ''
            WHEN t.fpDepoSc = 999.9 THEN ''
            WHEN t.fpDepo = NULL THEN ''
            ELSE (t.fpDepoSc)
        END
    ) as DepoSc,
    (
        CASE
            t.fpRemark
            WHEN 'null' THEN ''
            WHEN NULL THEN ''
            ELSE t.fpRemark
        END
    ) AS ErrorCommentRemark,
    (
        CASE
            FPREMOVAL
            WHEN 1 THEN 'Imp'
            WHEN 2 THEN 'IUD'
            WHEN 999 THEN ''
            ELSE ''
        END
    ) Removal,
    (
        CASE
            fpPreg
            WHEN 1 THEN 'Yes'
            WHEN 2 THEN 'No'
            WHEN 999 THEN ''
            ELSE ''
        END
    ) PregnantWomen,
    (
        CASE
            fpLacMother
            WHEN 1 THEN 'Yes'
            WHEN 2 THEN 'No'
            WHEN 999 THEN ''
            ELSE ''
        END
    ) LactatingMother,
    (
        CASE
            fpMigrant
            WHEN 1 THEN 'Yes'
            WHEN 2 THEN 'No'
            WHEN 999 THEN ''
            ELSE ''
        END
    ) MigrantWorker,
    (
        CASE
            fpIDP
            WHEN 1 THEN 'Yes'
            WHEN 2 THEN 'No'
            WHEN 999 THEN ''
            ELSE ''
        END
    ) IDP,
    (
        CASE
            fpDSee
            WHEN 1 THEN 'No difficulty'
            WHEN 2 THEN 'Some difficulties'
            WHEN 3 THEN 'A lot of difficulties'
            WHEN 4 THEN 'Cannot do it at all'
            WHEN 9 THEN 'NA'
            WHEN 999 THEN ''
            ELSE ''
        END
    ) DSee,
    (
        CASE
            fpDHear
            WHEN 1 THEN 'No difficulty'
            WHEN 2 THEN 'Some difficulties'
            WHEN 3 THEN 'A lot of difficulties'
            WHEN 4 THEN 'Cannot do it at all'
            WHEN 9 THEN 'NA'
            WHEN 999 THEN ''
            ELSE ''
        END
    ) DHear,
    (
        CASE
            fpDWalk
            WHEN 1 THEN 'No difficulty'
            WHEN 2 THEN 'Some difficulties'
            WHEN 3 THEN 'A lot of difficulties'
            WHEN 4 THEN 'Cannot do it at all'
            WHEN 9 THEN 'NA'
            WHEN 999 THEN ''
            ELSE ''
        END
    ) DWalk,
    (
        CASE
            fpDRembr
            WHEN 1 THEN 'No difficulty'
            WHEN 2 THEN 'Some difficulties'
            WHEN 3 THEN 'A lot of difficulties'
            WHEN 4 THEN 'Cannot do it at all'
            WHEN 9 THEN 'NA'
            WHEN 999 THEN ''
            ELSE ''
        END
    ) DRemember,
    (
        CASE
            fpDWash
            WHEN 1 THEN 'No difficulty'
            WHEN 2 THEN 'Some difficulties'
            WHEN 3 THEN 'A lot of difficulties'
            WHEN 4 THEN 'Cannot do it at all'
            WHEN 9 THEN 'NA'
            WHEN 999 THEN ''
            ELSE ''
        END
    ) DWash,
    (
        CASE
            fpDCommu
            WHEN 1 THEN 'No difficulty'
            WHEN 2 THEN 'Some difficulties'
            WHEN 3 THEN 'A lot of difficulties'
            WHEN 4 THEN 'Cannot do it at all'
            WHEN 9 THEN 'NA'
            WHEN 999 THEN ''
            ELSE ''
        END
    ) DCommunication,
    (
        CASE
            fpDisability
            WHEN 1 THEN 'Yes'
            WHEN 2 THEN 'No'
            WHEN 999 THEN ''
            ELSE ''
        END
    ) Disability,
    DATE_FORMAT(t.fpInsert, '%Y-%m-%d %H:%i:%s') as InsertDate,
    DATE_FORMAT(t.fpUpdate, '%Y-%m-%d %H:%i:%s') as ModifyDate,
    t.fpClnid as clnId,
    t.fptsp as tspId,
    t.fpVillage as Villagecode,
    t.fpproject as ProjID,
    t.fporg as org
from
    (
        select
            tt.*,
            b.regAge,
            b.regAgeUnit,
            b.regDate,(tt.fpprovideddate - b.regDate) + (b.regAge * b.regAgeUnit) as ageinday,
            b.regSex,
            org.org_Name orgName,
            cln.cln_Name clnName,
            pro.project_Name,
            b.regName,
            tsp.tsp_Name tspName,
            v.village_Name villageName
        from
            (
                select
                    a.*
                from
                    tbl_fp a
                where
                    a.fpstatus < 3
            ) tt
            left join tbl_reg b on tt.fpregid = b.regid
            left join TBL_village v on tt.fpvillage = v.village_code
            left join tbl_township tsp on tt.fptsp = tsp.tsp_id
            left join TBL_CLINIC cln on tt.fpclnid = cln.cln_id
            left join tbl_project pro on tt.fpproject = pro.project_id
            left join tbl_org org on tt.fporg = org.org_id
    ) t;