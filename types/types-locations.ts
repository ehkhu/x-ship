// Define the Task type based on the table structure
export type Location = {
  id: number;
  streetAddress?: string | null;
  postalCode?: string | null;
  city: string | null | undefined;
  stateProvince?: string | null;
  countryId?: number | null;
};

// Define the NewTask type for insert operations
export type NewLocation = {
  streetAddress?: string | null;
  postalCode?: string | null;
  city: string;
  stateProvince?: string | null;
  countryId?: number | null;
};

//task defination
// Define the type for GetTasksSchema
export interface GetTableSchema {
  page: number;
  per_page: number;
  sort?: string;
  code?: string;
  streeAddress?: string;
  operator?: string;
  from?: string;
  to?: string;
}

// Define the type for the API response

export interface ApiResponseJob {
  data: Location[];
  pageCount: number;
}
