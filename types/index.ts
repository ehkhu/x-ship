//refrence

import { Role } from '@prisma/client';

//Common types for application
export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export interface DataTableFilterField<TData> {
  label: string;
  value: keyof TData;
  placeholder?: string;
  options?: Option[];
}

export interface DataTableFilterOption<TData> {
  id: string;
  label: string;
  value: keyof TData;
  options: Option[];
  filterValues?: string[];
  filterOperator?: string;
  isMulti?: boolean;
}
/**
 * Interface to configure middleware for authenticated routes
 */
declare type AuthMiddleware = 'auth' | 'guest';
/**
 * Configuration options for the useAuth hook
 * @property {AuthMiddleware} middleware - Middleware to use for authenticated routes
 * @property {string} [redirectIfAuthenticated] - Route to redirect to if the user is authenticated
 */
export interface IUseAuth {
  middleware: AuthMiddleware;
  redirectIfAuthenticated?: string;
}

/**
 * Interface for making API requests.
 * @property {React.Dispatch<React.SetStateAction<never[]>>} setErrors - Function to set errors.
 * @property {React.Dispatch<React.SetStateAction<any | null>>} setStatus - Function to set status.
 * @property {any} [key: string] - Additional properties.
 */
export interface IApiRequest {
  /**
   * Function to set errors.
   */
  setErrors: React.Dispatch<React.SetStateAction<never[]>>;
  /**
   * Function to set status.
   */
  setStatus: React.Dispatch<React.SetStateAction<any | null>>;
  [key: string]: any;
}

export interface User {
  // id?: number;
  userId: number;
  userName?: string | undefined | null;
  userStatus?: number | undefined | null;
  userFullName?: string | null;
  email?: string;
  email_verified_at?: string;
  must_verify_email?: boolean; // this is custom attribute
  roleId?: number | null;
  role?: Role | null;
  createdAt?: string;
  updatedAt?: string;
}

//Patient
export interface Patient {
  id: number;
  regId: string;
  regName: string;
  regDate: string | Date; // assuming DateTime is serialized as a string
  regOrg: string;
  regPlace?: number;
  regVillage?: string;
  regAge?: number;
  regAgeUnit?: number;
  regSex?: number;
  regType?: number;
  regEdu?: number;
  regJob?: string | undefined | null;
  regMarital?: number | undefined | null;
  regSpouse?: string | undefined | null;
  regMother?: string | undefined | null;
  regFather?: string | undefined | null;
  regAddress?: string | undefined | null;
  regPh?: string | undefined | null;
  regEthnic?: string | undefined | null;
  regRefFrom?: string | undefined | null;
  regRemark?: string | undefined | null;
  regUsrLogin?: string | undefined | null;
  regInsert: string | Date | null; // assuming Timestamp is serialized as a string
  regUpdate?: string | Date | null; // assuming Timestamp is serialized as a string
  regStatus?: number | undefined | null;
  regSync?: number | undefined | null;
  regMigrant?: number | undefined | null;
  regIdp?: number | undefined | null;
  regDsee?: number | undefined | null;
  regDhear?: number | undefined | null;
  regDwalk?: number | undefined | null;
  regDrembr?: number | undefined | null;
  regDwash?: number | undefined | null;
  regDcommu?: number | undefined | null;
  regEthnicO?: string | undefined | null;
  regDisability?: number | undefined | null;
}

export interface Anc {
  id: number;
  anRegId: string | undefined | null; // assuming ANREGID is a string
  anProvidedDate: string | Date | null; // assuming date fields can be serialized as strings or Date objects
  anType?: number | null; // assuming these fields are optional
  anDonor?: string | undefined | null;
  anOrg?: string | undefined | null;
  anProject?: string | undefined | null;
  anTsp?: string | undefined | null;
  anPlace?: number | undefined | null;
  anVillage?: string | undefined | null;
  anProviderName?: string | undefined | null;
  anProviderPosition?: number | undefined | null;
  anUsrLogin?: string | undefined | null;
  anLmp?: string | Date | undefined | null;
  anEdd?: string | Date | undefined | null;
  anFirstMens?: number | undefined | null;
  anMarriage?: number | undefined | null;
  anYoungestChild?: number | undefined | null;
  anG?: number | undefined | null;
  anP?: number | undefined | null;
  anA?: number | undefined | null;
  anWt?: number | undefined | null;
  anHt?: number | undefined | null;
  anBp?: string | undefined | null;
  anPr?: number | undefined | null;
  anRr?: number | undefined | null;
  anTemp?: number | undefined | null;
  anGp?: number | undefined | null;
  anEdema?: number | undefined | null;
  anNoFetus?: number | undefined | null;
  anLie?: number | undefined | null;
  anPresentation?: number | undefined | null;
  anFundalHt?: number | undefined | null;
  anFhs?: number | undefined | null;
  anOther?: string | undefined | null;
  anLab?: number | undefined | null;
  anFa?: number | undefined | null;
  anFeSo4?: number | undefined | null;
  anFc?: number | undefined | null;
  anB1?: number | undefined | null;
  anDeworm1?: number | undefined | null;
  anTt1?: number | undefined | null;
  anCdk?: number | undefined | null;
  anNbk?: number | undefined | null;
  anDirectComplication?: number | undefined | null;
  anIndirectComplication?: number | undefined | null;
  anIndirectOther?: string | undefined | null;
  anIndirectDx?: string | undefined | null;
  anIndirectTx?: string | undefined | null;
  anHe1?: number | undefined | null;
  anHe2?: number | undefined | null;
  anHe3?: number | undefined | null;
  anHe4?: number | undefined | null;
  anHe5?: number | undefined | null;
  anHe6?: number | undefined | null;
  anHe7?: number | undefined | null;
  anHe8?: number | undefined | null;
  anOutcome?: number | undefined | null;
  anRefTo?: number | undefined | null;
  anRefToOther?: string | undefined | null;
  anRefReason?: string | undefined | null;
  anDeathReason?: string | undefined | null;
  anVisit?: number | undefined | null;
  anHe9?: number | undefined | null;
  anHe10?: number | undefined | null;
  anHe11?: number | undefined | null;
  anHe12?: number | undefined | null;
  anHe13?: number | undefined | null;
  anFirstPreg?: number | undefined | null;
  anHygKit?: number | undefined | null;
  anB1Unit?: number | undefined | null;
  anAge?: number | undefined | null;
  anAgeUnit?: number | undefined | null;
  anVtCount?: number | undefined | null;
  anTempUnit?: number | undefined | null;
  anVisitSkill?: number | undefined | null;
  anVisitTimingSkill?: number | undefined | null;
  anDeworm2?: number | undefined | null;
  anTt2?: number | undefined | null;
  anClnId?: string | undefined | null;
  anInsert?: string | Date | undefined | null;
  anUpdate?: string | Date | undefined | null;
  anStatus?: number | undefined | null;
  anSync?: number | undefined | null;
  anVisitTiming?: number | undefined | null;
  anType2?: number | undefined | null;
  anMigrant?: number | undefined | null;
  anIdp?: number | undefined | null;
  anDsee?: number | undefined | null;
  anDhear?: number | undefined | null;
  anDwalk?: number | undefined | null;
  anDrembr?: number | undefined | null;
  anDwash?: number | undefined | null;
  anDcommu?: number | undefined | null;
  anDisability?: number | undefined | null;
  anFaFeSo4?: number | undefined | null;
}

// for data table
export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export interface DataTableFilterField<TData> {
  label: string;
  value: keyof TData;
  placeholder?: string;
  options?: Option[];
}

export interface DataTableFilterOption<TData> {
  id: string;
  label: string;
  value: keyof TData;
  options: Option[];
  filterValues?: string[];
  filterOperator?: string;
  isMulti?: boolean;
}

export interface Delivery {
  id: number;
  deliRegId: string;
  deliProvidedDate: Date;
  deliDonor?: string | null;
  deliOrg?: string | null;
  deliProject?: string | null;
  deliTsp?: string | null;
  deliVillage?: string | null;
  deliProviderName?: string | null;
  deliProviderPosition?: number | null;
  deliUsrLogin?: string | null;
  deliDefectOther?: string | null;
  deliMComplication?: string | null;
  deliMProcedure?: string | null;
  deliMTx?: string | null;
  deliMRefReason?: string | null;
  deliMDeathReason?: string | null;
  deliBRefReason?: string | null;
  deliBDeathReason?: string | null;
  deliAge?: number | null;
  deliType?: number | null;
  deliPlace?: number | null;
  deliDeliType?: number | null;
  deliGp?: number | null;
  deliG?: number | null;
  deliP?: number | null;
  deliA?: number | null;
  deliEpi?: number | null;
  deliDefect?: number | null;
  deliPN6?: number | null;
  deliLab?: number | null;
  deliMOutcome?: number | null;
  deliMRefTo?: number | null;
  deliBOutcome?: number | null;
  deliBDeliOutcome?: number | null;
  deliBSex1?: number | null;
  deliBApgar1?: number | null;
  deliResTowel?: number | null;
  deliResMask?: number | null;
  deliResSuction?: number | null;
  deliResCompression?: number | null;
  deliResStimulation?: number | null;
  deliBCCut1?: number | null;
  deliBBF1?: number | null;
  deliBRefTo?: number | null;
  deliBWT1?: number | null;
  deliAnSelfRep?: number | null;
  deliPOFDelivery?: number | null;
  deliTemp?: number | null;
  deliPR?: number | null;
  deliBP?: string | null;
  deliBSex2?: number | null;
  deliBWT2?: number | null;
  deliBBF2?: number | null;
  deliBBF3?: number | null;
  deliAgeUnit?: number | null;
  deliTempUnit?: number | null;
  deliClnId?: string | null;
  deliBApgar2?: number | null;
  deliBApgar3?: number | null;
  deliBSex3?: number | null;
  deliBWT3?: number | null;
  deliBCCut2?: number | null;
  deliBCCut3?: number | null;
  deliAdmissionDate?: Date | null;
  deliInsert?: Date | null;
  deliUpdate?: Date | null;
  deliStatus?: number | null;
  deliSync?: number | null;
  deliRemark?: string | null;
  deliTime?: Date | null;
  deliMigrant?: number | null;
  deliIDP?: number | null;
  deliDSee?: number | null;
  deliDHear?: number | null;
  deliDWalk?: number | null;
  deliDRembr?: number | null;
  deliDWash?: number | null;
  deliDCommu?: number | null;
  deliDisability?: number | null;
}

export interface Pnc {
  id: number;
  pnRegId: string;
  pnProvidedDate?: Date | null;
  pnAge: number;
  pnType: number;
  pnDonor?: string | null;
  pnOrg?: string | null;
  pnProject?: string | null;
  pnTsp?: string | null;
  pnPlace: number;
  pnVillage?: string | null;
  pnProviderName?: string | null;
  pnAnSelfRep: number;
  pnProviderPosition: number;
  pnUsrLogin?: string | null;
  pnWt: number;
  pnHt: number;
  pnBp?: string | null;
  pnPr: number;
  pnRr: number;
  pnTemp: number;
  pnP: number;
  pnA: number;
  pnAnaemia: number;
  pnNipple: number;
  pnUtrContraction: number;
  pnVagBleeding: number;
  pnWoundCond: number;
  pnLab: number;
  pnSepsis: number;
  pnPph: number;
  pnRpoc: number;
  pnEclampsia: number;
  pnBtAbscess: number;
  pnInf: number;
  pnMalaria: number;
  pnTransfusion: number;
  pnMva: number;
  pnRemovalPlacenta: number;
  pnOxytocin: number;
  pnAntibioticInj: number;
  pnMiso: number;
  pnAnticonvulsant: number;
  pnMalariaTx: number;
  pnB1: number;
  pnVitA: number;
  pnFeSo4: number;
  pnFp: number;
  pnOutcome: number;
  pnRefTo: number;
  pnRefToOther?: string | null;
  pnRefReason?: string | null;
  pnDeathReason?: string | null;
  pnInsert?: Date | null;
  pnHe: number;
  pnDeli?: Date | null;
  pn3Days: number;
  pnB1Unit: number;
  pnAntibioticPo: number;
  pnTeo: number;
  pnTx: number;
  pnDxOther?: string | null;
  pnTxOther?: string | null;
  pnAgeUnit: number;
  pnDx: number;
  pnTempUnit: number;
  pnVitAUnit: number;
  pnClnId?: string | null;
  pnUpdate?: Date | null;
  pnStatus: number;
  pnSync: number;
  pnRemark?: string | null;
  pnNbc: number;
  pnMigrant: number;
  pnIdp: number;
  pnDSee: number;
  pnDHear: number;
  pnDWalk: number;
  pnDRembr: number;
  pnDWash: number;
  pnDCommu: number;
  pnDisability: number;
  pnBSex1: number;
  pnBSex2: number;
  pnBSex3: number;
}
export interface Fp {
  id: number;
  fpRegId: string;
  fpProvidedDate?: Date | null;
  fpType: number;
  fpDonor?: string | null;
  fpOrg?: string | null;
  fpProject?: string | null;
  fpTsp?: string | null;
  fpPlace: number;
  fpVillage?: string | null;
  fpProviderName?: string | null;
  fpProviderPosition: number;
  fpWt: number;
  fpHt: number;
  fpBp: string;
  fpPr: number;
  fpRr: number;
  fpTemp: number;
  fpFirstMens: number;
  fpMarriage: number;
  fpYoungestChild: number;
  fpYoungestChildUnit: number;
  fpP: number;
  fpA: number;
  fpReason?: string | null;
  fpMensCycle: number;
  fpMensPain: number;
  fpVagBleeding: number;
  fpPreference?: string | null;
  fpLmp?: Date | null;
  fpHisa: number;
  fpSexualContact: number;
  fpCurrentMethod?: string | null;
  fpCurrentMethodDur?: string | null;
  fpCondomM: number;
  fpCondomF: number;
  fpDepo: number;
  fpCoc: number;
  fpPop: number;
  fpEc: number;
  fpImp3: number;
  fpImp4: number;
  fpImp5: number;
  fpIudCu: number;
  fpIudMulti: number;
  fpNa: number;
  fpFuDate?: Date | null;
  fpRefImp: number;
  fpRefIud: number;
  fpRefTl: number;
  fpRefVt: number;
  fpCslFp: number;
  fpCslFer: number;
  fpCondomMbk: number;
  fpCondomFbk: number;
  fpEcBk: number;
  fpOutcome: number;
  fpRefTo: number;
  fpDeathReason?: string | null;
  fpUsrLogin?: string | null;
  fpLab: number;
  fpInsert?: Date | null;
  fpOffMethod?: string | null;
  fpRemark?: string | null;
  fpAge: number;
  fpAgeUnit: number;
  fpTempUnit: number;
  fpClnId?: string | null;
  fpDepoSc: number;
  fpUpdate?: Date | null;
  fpStatus: number;
  fpSync: number;
  fpRemoval: number;
  fpRefReason?: string | null;
  fpRefToOther?: string | null;
  fpImsc: number;
  fpMigrant: number;
  fpIdp: number;
  fpDSee: number;
  fpDHear: number;
  fpDWalk: number;
  fpDRembr: number;
  fpDWash: number;
  fpDCommu: number;
  fpPreg: number;
  fpLacMother: number;
  fpDisability: number;
}

export interface Rh {
  id: number;
  rhRegId: string;
  rhProvidedDate?: Date | null;
  rhType: number;
  rhDonor?: string | null;
  rhOrg?: string | null;
  rhProject?: string | null;
  rhTsp?: string | null;
  rhPlace: number;
  rhVillage?: string | null;
  rhProviderName?: string | null;
  rhProviderPosition: number;
  rhWt: number;
  rhHt: number;
  rhBp: string;
  rhPr: number;
  rhRr: number;
  rhTemp: number;
  rhPreg: number;
  rhLab: number;
  rhPac: number;
  rhGvb: number;
  rhDxOther?: string | null;
  rhProcedure?: string | null;
  rhTx?: string | null;
  rhOutcome: number;
  rhDeathReason?: string | null;
  rhRefTo: number;
  rhInsert?: Date | null;
  rhP: number;
  rhA: number;
  rhHe: number;
  rhAge: number;
  rhAgeUnit: number;
  rhTempUnit: number;
  rhClnId?: string | null;
  rhRefReason?: string | null;
  rhUsrLogin?: string | null;
  rhUpdate?: Date | null;
  rhStatus: number;
  rhSync: number;
  rhRemark?: string | null;
  rhChiefComplain?: string | null;
  rhRefToOther?: string | null;
  rhMigrant: number;
  rhIdp: number;
  rhDSee: number;
  rhDHear: number;
  rhDWalk: number;
  rhDRembr: number;
  rhDWash: number;
  rhDCommu: number;
  rhLacMother: number;
  rhDisability: number;
  rhViar: number;
}

export interface Gm {
  id: number;
  gmRegId: string;
  gmAge: number;
  gmProvidedDate?: Date | null;
  gmType: number;
  gmDonor?: string | null;
  gmOrg?: string | null;
  gmProject?: string | null;
  gmTsp?: string | null;
  gmPlace: number;
  gmVillage?: string | null;
  gmProviderName?: string | null;
  gmProviderPosition: number;
  gmUsrLogin?: string | null;
  gmWt: number;
  gmHt: number;
  gmBp: string;
  gmPr: number;
  gmRr: number;
  gmTemp: number;
  gmP: number;
  gmA: number;
  gmHe: number;
  gmGmType: number;
  gmPreg: number;
  gmLab: number;
  gmOtherDx?: string | null;
  gmDx1: number;
  gmDx2: number;
  gmDx3: number;
  gmComplaint?: string | null;
  gmProcedure?: string | null;
  gmTx?: string | null;
  gmOutcome: number;
  gmRefTo: number;
  gmRefToOther?: string | null;
  gmRefReason?: string | null;
  gmDeathReason?: string | null;
  gmAgeUnit: number;
  gmSs?: string | null;
  gmPe?: string | null;
  gmTempUnit: number;
  gmHepb: number;
  gmClnId?: string | null;
  gmInsert?: Date | null;
  gmUpdate?: Date | null;
  gmStatus: number;
  gmSync: number;
  gmRemark?: string | null;
  gmMuac?: number | null;
  gmDxStatus: number;
  gmMigrant: number;
  gmIdp: number;
  gmDSee: number;
  gmDHear: number;
  gmDWalk: number;
  gmDRembr: number;
  gmDWash: number;
  gmDCommu: number;
  gmLacMother: number;
  gmDisability: number;
  gmDiarrhoea: number;
  gmPneumonia: number;
}

export interface Cfrm {
  id: number;
  cfrmRegCode?: string | null;
  cfrmFbPerson: number;
  cfrmFbPersonOther?: string | null;
  cfrmFbDate?: Date | null;
  cfrmFbSex: number;
  cfrmFbAge: number;
  cfrmFbAgeUnit: number;
  cfrmFbVillage?: string | null;
  cfrmFbTsp?: string | null;
  cfrmFbDiv?: string | null;
  cfrmFbSatify1?: number | null;
  cfrmFbSatify2?: number | null;
  cfrmFbSatify3?: number | null;
  cfrmFbSatifyDetail?: string | null;
  cfrmFbDsee?: number | null;
  cfrmFbDhear: number;
  cfrmFbDwalk?: number | null;
  cfrmFbDcommu?: number | null;
  cfrmFbDrembr?: number | null;
  cfrmFbDwash?: number | null;
  cfrmFbPersonCat1?: number | null;
  cfrmFbPersonCat2?: number | null;
  cfrmFbPersonCat2Other?: string | null;
  cfrmFbPersonCat2Name?: string | null;
  cfrmFbPersonCat2Contact?: string | null;
  cfrmFbOpenerName?: string | null;
  cfrmFbOpenerPosition?: string | null;
  cfrmFbOpenerTsp?: string | null;
  cfrmFbOpenerDiv?: string | null;
  cfrmFbProject?: string | null;
  cfrmFbOpenerDate?: Date | null;
  cfrmFbReslAct?: string | null;
  cfrmFbReslPerson: number;
  cfrmFbRespMeth: number;
  cfrmFbRespMethO?: string | null;
  cfrmFbComplaint: number;
  cfrmFbComplainOther?: string | null;
  cfrmFbRecPerson?: string | null;
  cfrmFbUsrLogin?: string | null;
  cfrmFbInsert?: Date | null;
  cfrmFbUpdate?: Date | null;
  cfrmFbStatus?: number | null;
  cfrmFbSysnc?: number | null;
  cfrmFbType1: number;
  cfrmFbType2: number;
  cfrmFbType3: number;
  cfrmFbType3Other?: string | null;
  cfrmFbActDate?: Date | null;
  cfrmFbReslDate?: Date | null;
  cfrmFbOrg?: string | null;
  cfrmFbComplaintPending?: string | null;
  cfrmFbPorg?: string | null;
}

export interface multiSelectType {
  /** The text to display for the option. */
  label: string;
  /** The unique value associated with the option. */
  value: string;
  /** Optional icon component to display alongside the option. */
  icon?: React.ComponentType<{ className?: string }>;
}
// Define the type for the API response
export interface ApiResponse {
  data: any[];
  pageCount: number;
}
