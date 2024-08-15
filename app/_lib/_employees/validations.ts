import * as z from 'zod';
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
export const searchEmployeeParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  name: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(['and', 'or']).optional(),
});

export const getEmployeesSchema = searchEmployeeParamsSchema;

export type GetEmployeesSchema = z.infer<typeof getEmployeesSchema>;

export const createEmployeeSchema = z.object({
  name: z.string().max(20, {
    message: 'Name must be at most 20 characters.',
  }),
  email: z.string().email().max(25, {
    message: 'Email must be at most 25 characters and a valid email.',
  }),
  phoneNumber: z.string().min(10, {
    message: 'Phone number must be at most 20 characters.',
  }),
  hireDate: z.string().date().nullable(),
  jobId: z.number().nullable(),
  salary: z.number().nullable(),
  commissionPct: z.number().nullable(),
  managerId: z.number().nullable(),
  departmentId: z.number().nullable(),
});

export type CreateEmployeeSchema = z.infer<typeof createEmployeeSchema>;

export const updateEmployeeSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  hireDate: z.date().nullable(),
  jobId: z.number().nullable(),
  salary: z.number().nullable(),
  commissionPct: z.number().nullable(),
  managerId: z.number().nullable(),
  departmentId: z.number().nullable(),
});

export type UpdateEmployeeSchema = z.infer<typeof updateEmployeeSchema>;
