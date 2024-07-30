// Define the Task type based on the table structure
export type Job = {
  id: number;
  code?: string | null;
  jobTitle: string;
  minSalary?: number | null;
  maxSalary?: number | null;
};

// Define the NewTask type for insert operations
export type NewJob = {
  id?: number; // Optional because it might be auto-generated
  code?: string | null;
  jobTitle: string;
  minSalary?: number | null;
  maxSalary?: number | null;
};

//task defination
// Define the type for GetTasksSchema
export interface GetTableSchema {
  page: number;
  per_page: number;
  sort?: string;
  code?: string;
  jobTitle?: string;
  operator?: string;
  from?: string;
  to?: string;
}

// Define the type for the API response

export interface ApiResponseJob {
  data: Job[];
  pageCount: number;
}
