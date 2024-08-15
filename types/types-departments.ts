import { Employee } from './types-employees';
import { Location } from './types-locations';

// Define the Task type based on the table structure
export type Department = {
  id: number;
  name: string;
  managerId?: number | null;
  locationId?: number | null;

  // Relations
  employees: Employee[];
  location?: Location | null;
  jobHistorys: JobHistory[];
};

// Define the NewTask type for insert operations
export type NewDepartment = {
  id: number;
  name: string;
  managerId?: number | null;
  locationId?: number | null;

  // Relations
  employees: Employee[];
  location?: Location | null;
  jobHistorys: JobHistory[];
};

//task defination
// Define the type for GetTasksSchema
export interface GetTableSchema {
  page: number;
  per_page: number;
  sort?: string;
  name?: string;
  operator?: string;
  from?: string;
  to?: string;
}

export type JobHistory = {
  // Define JobHistory fields here
};

// Define the type for the API response

export interface ApiResponseJob {
  data: Department[];
  pageCount: number;
}
