/*
model Employee {
  id            Int      @id @default(autoincrement())
  name          String?  @db.VarChar(20)
  email         String   @db.VarChar(25)
  phoneNumber   String?  @db.VarChar(20)
  hireDate      DateTime @db.Date
  jobId         Int?
  salary        Float?
  commissionPct Float?
  managerId     Int?
  departmentId  Int?

  // Relations
  department   Department?  @relation(fields: [departmentId], references: [id])
  job          Job?         @relation(fields: [jobId], references: [id])
  manager      Employee?    @relation("ManagerEmployee", fields: [managerId], references: [id])
  subordinates Employee[]   @relation("ManagerEmployee")
  jobHistory   JobHistory[]
}
*/

import { Department } from './types-departments';
import { Job } from './types-jobs';
import { Location } from './types-locations';

// Define the Employee type based on the table structure
export type Employee = {
  id: number;
  name: string;
  emial?: string | null;
  phoneNumber?: string | null;
  hireDate: Date;
  jobId?: number | null;
  salary?: number | null;
  commissionPct?: number | null;
  managerId?: number | null;
  departmentId?: number | null;

  // Relations
  department?: Department | null;
  job?: Job | null;
  manager?: Employee | null;
  subordinates: Employee[];
  jobHistorys: JobHistory[];
};

// Define the NewEmployee type for insert operations
export type NewEmployee = {
  id: number;
  name: string;
  emial?: string | null;
  phoneNumber?: string | null;
  hireDate: Date;
  jobId?: number | null;
  salary?: number | null;
  commissionPct?: number | null;
  managerId?: number | null;
  departmentId?: number | null;
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

// Example of related types
export type JobHistory = {
  // Define JobHistory fields here
};

// Define the type for the API response
export interface ApiResponseJob {
  data: Department[];
  pageCount: number;
}
