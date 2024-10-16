import { Book, Dot, Pill, Syringe, Waypoints } from 'lucide-react';

export const DefaultTimeZone = 'America/New_York';
// export const DefaultTimeZone = 'Europe/Paris'

export const unknownError =
  'An unknown error occurred. Please try again later.';

export const databasePrefix = 'kd_infomx';
export const KDHWORGCODE = 'CPI-05';
export const regPlaceOptions = [
  { label: 'Clinic', value: 1 },
  { label: 'Outreach', value: 2 },
  { label: 'Secondary Care', value: 6 },
  // { label: 'Volunteer', value: 3 },
  // { label: 'Home', value: 4 },
  { label: 'Other', value: 5 },
];
export const ageUnitOptions = [
  { label: 'Year', value: 365 },
  { label: 'Month', value: 30 },
  { label: 'Day', value: 1 },
];

export const sexOptions = [
  { label: 'Male', value: 1 },
  { label: 'Female', value: 2 },
  { label: 'Other', value: 3 },
];
export const typeOfVisit = [
  { label: 'New', value: 1 },
  { label: 'Old', value: 2 },
];
export const regEduOptions = [
  { label: 'Illiterate', value: 1 },
  { label: 'Primary school', value: 2 },
  { label: 'Middle school', value: 3 },
  { label: 'High school', value: 4 },
  { label: 'Graduate', value: 5 },
  { label: 'Post-graduate', value: 6 },
  { label: 'Missing', value: 999 },
];

export const regMaritalOptions = [
  { label: 'Single', value: 1 },
  { label: 'Married', value: 2 },
  { label: 'Separated', value: 3 },
  { label: 'Divorced', value: 4 },
  { label: 'Widow/Widower', value: 5 },
  { label: 'Other', value: 6 },
  { label: 'Missing', value: 999 },
];

export const regStatus = [
  { label: 'Insert', value: 1 },
  { label: 'Update', value: 2 },
  { label: 'Delete', value: 3 },
];

export const userStatus = [
  {
    label: 'Active',
    value: 1,
  },
  {
    label: 'Inactive',
    value: 0,
  },
];

export const workloadArray = [
  'full_time',
  'part_time',
  'volunteer',
  'intern',
] as const;

export const donorArray = [
  'CPI_SDC',
  'CPI_LIFT',
  'CPM_USAID',
  'IRC_PRM',
  'SDC_InF',
  'SNF_Plan',
  'TBC_Nexus',
  'BHF_3D',
  'URC_GF',
  'R4E_HEI_REACH',
  'MCH',
  'HSS',
] as const;

export const programArray = [
  'MCH',
  'KNP',
  'LEARN',
  'ERP',
  'SKID',
  'SRHR',
  'WASH',
  'ThreeD',
  'ThreeD_MP',
  'EPI',
] as const;

export const typeOfIdArray = ['Thai', 'Myanmar', 'MTC', 'UN_No'] as const;

export const leavingReasonArray = [
  'end_of_contract',
  'transfer',
  'resigned',
  'termination',
  'dimissal',
] as const;

export const bloodTypeArray = [
  'A_Positive',
  'A_Negative',
  'B_Positive',
  'B_Negative',
  'O_Positive',
  'O_Negative',
  'AB_Positive',
  'AB_Negative',
] as const;
export const disableOptions = [
  { label: 'No difficulty', value: 1 },
  { label: 'Some difficulties', value: 2 },
  { label: 'A lot of difficulties', value: 3 },
  { label: 'Cannot do it at all', value: 4 },
  { label: 'NA', value: 9 },
];

export const yesNoOptions = [
  { label: 'Yes', value: 1 },
  { label: 'No', value: 2 },
];
export const yesNoUnknowOptions = [
  { label: 'Yes', value: 1 },
  { label: 'No', value: 2 },
  { label: 'Unknow', value: 999 },
];
export const dewormOptions = [
  { label: '1st', value: 1 },
  { label: '2nd', value: 2 },
];
export const ttOptions = [
  { label: '1st', value: 1 },
  { label: '2nd', value: 2 },
];

export const b1UnitOptions = [
  { label: '10mg', value: 1 },
  { label: '50mg', value: 2 },
  { label: '100mg', value: 3 },
  { label: 'Missing', value: 999 },
];

export const vitAUnitOptions = [
  { label: '0.25L', value: 1 },
  { label: '2L', value: 2 },
];

export const nationalityArray = ['MYANMAR', 'THAI'] as const;

export const ethnicityArray = [
  'BAMAR',
  'KAREN',
  'CHIN',
  'KACHIN',
  'CHAN',
  'YAKINE',
  'MON',
] as const;

export const gradeLevelArray = [
  'Grade_1',
  'Grade_2',
  'Grade_3',
  'Grade_4',
  'Grade_5',
  'Grade_6',
  'Grade_7',
] as const;

export const religionArray = ['BUDISH', 'CHIRSTIAN'] as const;

export const trainingLevelArray = [
  'Admin',
  'Doctor',
  'PA',
  'HA',
  'Nurse',
  'Medic',
  'CHW',
  'VHW',
  'EMOC',
  'MW',
] as const;

export const kCodeArray = [
  'K1',
  'K2',
  'K3',
  'K4',
  'K5',
  'K6',
  'K7',
  'CENTRAL',
] as const;

// Mapping of internal column keys to readable names
export const headerMapping: Record<string, string> = {
  regAge: 'Age',
  regAgeUnit: 'Age Unit',
  regDate: 'Reg Date',
  regFather: 'Father',
  regMother: 'Mother',
  regSex: 'Gender',
  role: 'Role',
  village: 'Village',
  regMarital: 'Marital',
  regMigrant: 'Migrant',
  regType: 'Type',
  organization: 'Organization',
  parent: 'Parent',
  regId: 'Reg ID',
  regName: 'Name',
  regAddress: 'Address',
  userId: 'ID',
  regRefFrom: 'Refer From',
  regRemark: 'Remark',
  regInsert: 'Inserted At',
  regUpdate: 'Updated At',
  regEthnic: 'Ethnic',
  // Add other columns as needed
};

export const anTempUnitOptions = [
  { label: '°F', value: 1 },
  { label: '°C', value: 2 },
];

export const ancProviderPositionOptions = [
  { label: 'EmOCW', value: 1 },
  { label: 'MCHW', value: 2 },
  { label: 'Medic', value: 3 },
  { label: 'CHW', value: 4 },
  { label: 'AMW', value: 5 },
  { label: 'Nurse', value: 6 },
  { label: 'Doctor', value: 7 },
  { label: 'TTBA', value: 8 },
  { label: 'VHW', value: 9 },
  { label: 'Others', value: 10 },
  { label: 'physician Assistant(PA)', value: 11 },
  { label: 'Midwife', value: 12 },
  { label: 'Health Assistant(HA)', value: 13 },
];

export const heOptions = [
  { label: '1. Maternal Nutrition', value: '1', icon: Book },
  { label: '2. Family Planning', value: '2', icon: Book },
  { label: '3. New Born Care', value: '3', icon: Book },
  { label: '4. Birth Plan', value: '4', icon: Book },
  { label: '5. Emergency Response Plan', value: '5', icon: Book },
  { label: '6. Danger Signs', value: '6', icon: Book },
  { label: '7. Exclusive Breast Feeding', value: '7', icon: Book },
  { label: '8. RTIs/HIV/STI', value: '8', icon: Book },
];

export const resuscitationOptions = [
  { label: 'Drying with towel', value: 'Drying with towel', icon: Dot },
  { label: 'Suction', value: 'Suction', icon: Dot },
  { label: 'Stimulation', value: 'Stimulation', icon: Dot },
  { label: 'Bag and Mask', value: 'Bag and Mask', icon: Dot },
  { label: 'Chest compression', value: 'Chest Compression', icon: Dot },
];

export const patientOutcomeOptions = [
  { label: 'OPD', value: 1 },
  { label: 'IPD', value: 2 },
  { label: 'Referral', value: 3 },
  { label: 'Death', value: 4 },
  { label: 'Discharged', value: 5 },
  { label: '-', value: 999 },
];

export const ancReferPlaceOptions = [
  { label: 'KDHW Secondary Care', value: 1 },
  { label: 'Government hospital', value: 2 },
  { label: 'Mae Tao Clinic', value: 3 },
  { label: 'Non-governmental organization', value: 4 },
  { label: 'Thailand hospital', value: 5 },
  { label: 'Others', value: 6 },
  // { label: 'EHO health post', value: 1 },
  // { label: 'Private hospital(new)', value: 1 },
  // { label: 'Missing', value: 1 },
];

export const labRDTOptions = [
  { label: 'Pf', value: 1 },
  { label: 'Pv', value: 2 },
  { label: 'Pmix', value: 3 },
  { label: 'Negative', value: 4 },
  { label: 'Missing', value: 999 },
];

export const labMicroscopicOptions = [
  { label: 'Not seen', value: 1 },
  { label: 'Pf', value: 2 },
  { label: 'Pf+', value: 3 },
  { label: 'Pf++', value: 4 },
  { label: 'Pf+++', value: 5 },
  { label: 'Pv', value: 6 },
  { label: 'Pv+', value: 7 },
  { label: 'Pv++', value: 8 },
  { label: 'Pv+++', value: 9 },
  { label: 'Pmixed', value: 10 },
  { label: 'Po', value: 11 },
  { label: 'Po+', value: 12 },
  { label: 'Po++', value: 13 },
  { label: 'Po+++', value: 14 },
  { label: 'Pm', value: 15 },
  { label: 'Pm+', value: 16 },
  { label: 'Pm++', value: 17 },
  { label: 'Pm+++', value: 18 },
  { label: 'Missing', value: 999 },
];

export const labBGOptions = [
  { label: 'A', value: 1 },
  { label: 'B', value: 2 },
  { label: 'O', value: 3 },
  { label: 'AB', value: 4 },
  { label: 'Missing', value: 999 },
];

export const labRhOptions = [
  { label: 'Rh+', value: 1 },
  { label: 'Rh-', value: 2 },
  { label: 'Missing', value: 999 },
];

export const labUrineOptions = [
  { label: 'None', value: 1 },
  { label: 'Trace', value: 2 },
  { label: '+', value: 3 },
  { label: '++', value: 4 },
  { label: '+++', value: 5 },
  { label: 'Missing', value: 999 },
];

/*
for
labGono
labTricho
labCandida
*/
export const labSeenOrNotOptions = [
  { label: 'Seen', value: 1 },
  { label: 'Not Seen', value: 2 },
  { label: 'Missing', value: 999 },
];

/*
labRPR
labTPHA
labVDRL
labHIV
labHBV
labHCV
*/
export const labReactiveOptions = [
  { label: 'Reactive', value: 1 },
  { label: 'Non Reactive', value: 2 },
  { label: 'Missing', value: 999 },
];

export const laaPostiveOptions = [
  { label: 'Positive', value: 1 },
  { label: 'Negative', value: 2 },
  { label: 'Missing', value: 999 },
];
export const typeOfDeliveryOptions = [
  { label: '-', value: 999 },
  { label: 'NSVD', value: 1 },
  { label: 'Breech', value: 2 },
  { label: 'Vacuum', value: 3 },
  { label: 'LSCS', value: 4 },
  { label: 'Forcep', value: 5 },
];

export const deliOutcomeOptions = [
  { label: '-', value: 999 },
  { label: 'Still Birth', value: 1 },
  { label: 'Live Birth', value: 2 },
  { label: 'Prem', value: 3 },
  { label: 'IUGR', value: 4 },
];

export const pncDiagnosisOptoins = [
  //   { label: '1. Maternal Nutrition', value: '1', icon: Book },
  { label: 'Pureperal Sepsis', value: 'Pureperal Sepsis', icon: Syringe },
  {
    label: 'Post Partum Hemorrhage',
    value: 'Post Partum Hemorrhage',
    icon: Syringe,
  },
  { label: 'Incomplete Placenta', value: 'Incomplete Placenta', icon: Syringe },
  {
    label: 'Severe Pre-Eclampsia/Eclampsia',
    value: 'Severe Pre-Eclampsia/Eclampsia',
    icon: Syringe,
  },
  { label: 'Breast Abscess', value: 'Breast Abscess', icon: Syringe },
  { label: 'Wound Infection', value: 'Wound Infection', icon: Syringe },
  { label: 'Malaria', value: 'Malaria', icon: Syringe },
];
// <Syringe />
export const pncProcedureOptoins = [
  { label: 'Blood Transfusion', value: 'Blood Transfusion', icon: Waypoints },
  { label: 'MVA Info', value: 'MVA Info', icon: Waypoints },
  {
    label: 'Placenta Manual Removal',
    value: 'Placenta Manual Removal',
    icon: Waypoints,
  },
];

export const referralImplantOptions = [
  { label: 'Imp', value: 1 },
  { label: 'IUD', value: 2 },
  { label: 'Vasectomy', value: 3 },
  { label: 'Tubal Ligation(TL)', value: 4 },
];

export const removalOptions = [
  { label: 'Implant', value: 1 },
  { label: 'IUD', value: 2 },
];

export const fpServiceOptions = [
  { label: 'Fertility', value: 'Fertility' },
  { label: 'FP', value: 'FP' },
];

export const pncTreatmentOptions = [
  { label: 'IV/IM Oxytocin', value: 'IV/IM Oxytocin', icon: Pill },
  { label: 'Antibiotic (IV/IM)', value: 'Antibiotic (IV/IM)', icon: Pill },
  { label: 'Misoprostol Info', value: 'Misoprostol Info', icon: Pill },
  {
    label: 'V Anticonvulsant Info',
    value: 'V Anticonvulsant Info',
    icon: Pill,
  },
  { label: 'Malaria Treatment', value: 'Malaria Treatment', icon: Pill },
];

export const gmGmTypeOptions = [
  { label: 'GM', value: 1 },
  { label: 'IMCI', value: 2 },
];

export const rhPacOptions = [
  { label: '-', value: 999 },
  { label: 'Complete', value: 1 },
  { label: 'Incomplete', value: 2 },
  { label: 'Threaten', value: 3 },
  { label: 'Missed', value: 4 },
  { label: 'Inevitable', value: 5 },
];

export const gmDiarrhoeaOptions = [
  { label: '-', value: 999 },
  { label: 'ORS', value: 1 },
  { label: 'ORS+ZINC', value: 2 },
  { label: 'NO', value: 3 },
];

export const cfrmFbPersonOptions = [
  { label: 'ကိုယ်တိုင်', value: 1 },
  { label: 'မိသားစု၀င်/ဆွေမျိုး', value: 2 },
  { label: 'ရပ်ရွာ', value: 3 },
  { label: 'အခြား', value: 4 },
];

export const cfrmFbPersonCat2Options = [
  { label: '-', value: 999 },
  { label: 'စီမံချက်ဝန်ထမ်းများမှ တဆင့်', value: 1 },
  { label: 'ကျေးရွာလူထု အစည်းအဝေးပြုလုပ်၍', value: 2 },
  { label: 'တယ်လီဖုန်းမှ တဆင့်', value: 3 },
  { label: 'အခြားနည်းလမ်း', value: 4 },
];

export const personCat1Options = [
  { value: 999, label: '-' },
  { value: 1, label: 'စေတနာ့ဝန်ထမ်း' },
  { value: 2, label: 'စီမံချက်ဝန်ထမ်း' },
  { value: 3, label: 'စီမံချက်ခေါင်းဆောင်' },
  { value: 4, label: 'ကျေးရွာလူကြီးများ' },
];
export const cfrmFbComplaintOptions = [
  { value: 999, label: '-' },
  { label: 'မလုပ်ဆောင်ရသေးပါ', value: 1 },
  { label: 'လုပ်ဆောင်နေဆဲ', value: 2 },
  { label: 'လုပ်ဆောင်ပြီးခဲ့သည်', value: 3 },
  { label: 'အခြား', value: 4 },
];

export const cfrmFbType1Options = [
  { value: 999, label: '-' },
  { label: 'အကြံပြုချက် (Feedback)', value: 1 },
  { label: 'တိုင်ကြားချက် (Complaint)', value: 2 },
];

export const cfrmFbType2Options = [
  { value: 999, label: '-' },
  {
    label: '(၁) သတင်းအချက်အလက်များနှင့် အကြံပြုချက်များ တောင်းခံခြင်း',
    value: 1,
  },
  { label: '(၂) သာမညတိုင်ကြားချက်', value: 2 },
  { label: '(၃) အဓိကတိုင်ကြားချက်', value: 3 },
  { label: '(၄) ထိရှလွယ်သောတိုင်ကြားချက်', value: 4 },
];

export const cfrmFbType3Options = [
  { value: 999, label: '-' },
  { label: 'Positive (အကောင်းမြင်အကြံပြုချက်)', value: 1 },
  { label: 'Negative (အဆိုးမြင်အကြံပြုတိုင်ကြားချက်)', value: 2 },
  { label: 'Suggestion (အကြံဉာဏ်ပေးခြင်း)', value: 3 },
  { label: 'Other (အခြား)', value: 4 },
];
// Helper function to get the value by label
export const getSexValue = (label: string) => {
  return sexOptions.find((option) => option.label === label)?.value;
};
