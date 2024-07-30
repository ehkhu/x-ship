// import { tasks } from '@/db/constent';
import { add } from 'date-fns';
import * as z from 'zod';

export const searchJobParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  jobTitle: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(['and', 'or']).optional(),
});

export const getJobsSchema = searchJobParamsSchema;

export type GetJobsSchema = z.infer<typeof getJobsSchema>;

export const createJobSchema = z.object({
  jobTitle: z.string(),
  minSalary: z.coerce.number().optional(),
  maxSalary: z.coerce.number().optional(),
  code: z.string().optional(),
});

export type CreateJobSchema = z.infer<typeof createJobSchema>;

export const updateJobSchema = z.object({
  jobTitle: z.string().optional(),
  minSalary: z.coerce.number().min(0).optional(),
  maxSalary: z.coerce.number().min(0).optional(),
  code: z.string().optional(),
});

export type UpdateJobSchema = z.infer<typeof updateJobSchema>;
