import * as z from 'zod';
/*
  model Department {
  id         Int    @id @default(autoincrement())
  name       String
  managerId  Int?
  locationId Int?

  // Relations
  employees   Employee[]
  location    Location?    @relation(fields: [locationId], references: [id])
  jobHistorys JobHistory[]
}
*/
export const searchDepartmentParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  name: z.string().optional(),
  managerId: z.coerce.number().optional(),
  locationId: z.coerce.number().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(['and', 'or']).optional(),
});

export const getDepartmentsSchema = searchDepartmentParamsSchema;

export type GetDepartmentsSchema = z.infer<typeof getDepartmentsSchema>;

export const createDepartmentSchema = z.object({
  name: z.string({
    required_error: 'Please enter a name.',
  }),
  managerId: z.number().optional(),
  locationId: z.number().optional(),
});

export type CreateDepartmentSchema = z.infer<typeof createDepartmentSchema>;

export const updateDepartmentSchema = z.object({
  name: z.string(),
  managerId: z.number().optional(),
  locationId: z.number().optional(),
});

export type UpdateDepartmentSchema = z.infer<typeof updateDepartmentSchema>;
