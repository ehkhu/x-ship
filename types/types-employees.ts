import { Department } from './types-departments';
import { JobHistory } from './types-jobHistory';
import { Job } from './types-jobs';
import { Location } from './types-locations';

// Define the Employee type based on the table structure
export type Employee = {
  id: number;
  name: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  hireDate: Date;
  jobId?: number | null;
  salary?: number | null;
  commissionPct?: number | null;
  managerId?: number | null;
  departmentId?: number | null;
  nameInKaren?: string | null;
  nameInBurmese?: string | null;
  dateOfBirth?: Date | null | undefined;
  fatherName?: string | null;
  motherName?: string | null;
  gender?: string | null;
  nationality?: string | null;
  ethnicity?: string | null;
  religion?: string | null;
  bloodType?: string | null;
  typeOfId?: string | null;
  idNumber?: string | null;
  homeAddress?: string | null;
  currentAddress?: string | null;
  emergencyContactInfo?: string | null;
  placeCodeNo?: string | null;
  enrollInKNUDate?: Date | null;
  employeeCode?: string | null;
  gradeLevel?: string | null;
  currentContractPeriod?: number | null;
  propationPeriod?: number | null;
  trainingLevel?: string | null;
  workloads?: string | null;
  // Relations
  department?: Department | null;
  job?: Job | null;
  manager?: Employee | null;
  subordinates?: Employee[] | null;
  jobHistorys?: JobHistory[] | null;
};

// Define the NewEmployee type for insert operations
export type NewEmployee = {
  id: number;
  name: string;
  email?: string | null;
  phoneNumber?: string | null;
  hireDate: Date;
  jobId?: number | null;
  salary?: number | null;
  commissionPct?: number | null;
  managerId?: number | null;
  departmentId?: number | null;
  nameInKaren?: string | null;
  nameInBurmese?: string | null;
  dateOfBirth?: Date | null | undefined;
  fatherName?: string | null;
  motherName?: string | null;
  gender?: string | null;
  nationality?: string | null;
  ethnicity?: string | null;
  religion?: string | null;
  bloodType?: string | null;
  typeOfId?: string | null;
  idNumber?: string | null;
  homeAddress?: string | null;
  currentAddress?: string | null;
  emergencyContactInfo?: string | null;
  placeCodeNo?: string | null;
  enrollInKNUDate?: Date | null;
  employeeCode?: string | null;
  gradeLevel?: string | null;
  currentContractPeriod?: number | null;
  propationPeriod?: number | null;
  trainingLevel?: string | null;
  workloads?: string | null;
};

//task defination
// Define the type for GetEmployeesSchema
export interface GetTableSchema {
  page: number;
  per_page: number;
  sort?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  operator?: string;
  from?: string;
  to?: string;
}

// Define the type for the API response
export interface ApiResponseEmployee {
  data: Employee[];
  pageCount: number;
}
