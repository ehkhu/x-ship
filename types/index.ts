//gonna replace drizzle-orm with prisma
// import { type SQL } from 'drizzle-orm';

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

declare type AuthMiddleware = 'auth' | 'guest';
export interface IUseAuth {
  middleware: AuthMiddleware;
  redirectIfAuthenticated?: string;
}

export interface IApiRequest {
  setErrors: React.Dispatch<React.SetStateAction<never[]>>;
  setStatus: React.Dispatch<React.SetStateAction<any | null>>;
  [key: string]: any;
}

export interface User {
  id?: number;
  name?: string;
  email?: string;
  email_verified_at?: string;
  must_verify_email?: boolean; // this is custom attribute
  created_at?: string;
  updated_at?: string;
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

// Define the Task type based on the table structure
export type Task = {
  id: string;
  code: string;
  title: string | null;
  status: 'todo' | 'in_progress' | 'done' | 'canceled';
  label: 'bug' | 'feature' | 'enhancement' | 'documentation';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
};

// Define the NewTask type for insert operations
export type NewTask = {
  id?: string; // Optional because it might be auto-generated
  code: string;
  title?: string | null; // Optional and can be null
  status?: 'todo' | 'in-progress' | 'done' | 'canceled'; // Optional with default value
  label?: 'bug' | 'feature' | 'enhancement' | 'documentation'; // Optional with default value
  priority?: 'low' | 'medium' | 'high'; // Optional with default value
  createdAt?: Date; // Optional with default value
  updatedAt?: Date; // Optional with default value
};

//task defination
// Define the type for GetTasksSchema
export interface GetTasksSchema {
  page: number;
  per_page: number;
  sort?: string;
  title?: string;
  status?: string;
  priority?: string;
  operator?: string;
  from?: string;
  to?: string;
}

// Define the type for the API response

export interface ApiResponse {
  data: Task[];
  pageCount: number;
}
