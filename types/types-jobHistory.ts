import { Department } from './types-departments';
import { Employee } from './types-employees';
import { Job } from './types-jobs';

// Define the Task type based on the table structure
export type JobHistory = {
  employeeId: number;
  startDate: Date;
  endDate: Date;
  jobId?: number;
  departmentId?: number | null;

  // Relations
  employee?: Employee;
  job?: Job;
  department?: Department;

  // Composite key
  readonly id?: [number, Date, Date];
};

// Define the NewTask type for insert operations
export type NewJobHistory = {
  employeeId: number;
  startDate: Date;
  endDate: Date;
  jobId: number;
  departmentId?: number | null;

  // Relations
  employee?: Employee;
  job?: Job;
  department?: Department;

  // Composite key
  readonly id: [number, Date, Date];
};

//task defination
// Define the type for GetTasksSchema
export interface GetTableSchema {
  page: number;
  per_page: number;
  sort?: string;
  jobTitle?: string;
  operator?: string;
  from?: string;
  to?: string;
}

// Define the type for the API response

export interface ApiResponseJobHistory {
  data: JobHistory[];
  pageCount: number;
}
