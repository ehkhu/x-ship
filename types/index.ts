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
  id?: number;
  name?: string;
  email?: string;
  email_verified_at?: string;
  must_verify_email?: boolean; // this is custom attribute
  createdAt?: string;
  updatedAt?: string;
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
