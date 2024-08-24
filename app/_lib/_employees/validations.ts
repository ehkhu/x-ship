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
  name: z.string(),
  email: z.string().email().max(25, {
    message: 'Email must be at most 25 characters and a valid email.',
  }),
  phoneNumber: z.string().min(10, {
    message: 'Phone number must be at most 10 characters.',
  }),
  hireDate: z.date({
    required_error: 'A hired date is required.',
  }),

  //new fields
  nameInKaren: z.string().optional(),
  nameInBurmese: z.string().optional(),
  dateOfBirth: z.date().optional(),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  gender: z
    .string({
      required_error: 'Gender is required.',
    })
    .optional(),
  nationality: z.string().optional(),
  ethnicity: z.string().optional(),
  religion: z.string().optional(),
  bloodType: z.string().optional(),
  typeOfId: z.string().optional(),
  idNumber: z.string().optional(),
  homeAddress: z.string().optional(),
  currentAddress: z.string().optional(),
  emergencyContactInfo: z.string().optional(),
  placeCodeNo: z.string().optional(),
  enrollInKNUDate: z.date().optional(),
  employeeCode: z.string().optional(),
  gradeLevel: z.string().optional(),
  currentContractPeriod: z.coerce.number().optional(),
  propationPeriod: z.coerce.number().optional(),
  trainingLevel: z.string().optional(),
  workloads: z.string().optional(),

  jobId: z.number(),
  salary: z.coerce.number(),
  commissionPct: z.coerce.number(),
  managerId: z.number().optional(),
  departmentId: z.number(),
});

export type CreateEmployeeSchema = z.infer<typeof createEmployeeSchema>;

export const updateEmployeeSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  hireDate: z.date({
    required_error: 'A hired date is required.',
  }),
  jobId: z.number().optional(),
  salary: z.number().optional(),
  commissionPct: z.number().optional(),
  managerId: z.number().optional(),
  departmentId: z.number().optional(),

  nameInKaren: z.string().optional(),
  nameInBurmese: z.string().optional(),
  dateOfBirth: z.date(),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  gender: z.string().optional(),
  nationality: z.string().optional(),
  ethnicity: z.string().optional(),
  religion: z.string().optional(),
  bloodType: z.string().optional(),
  typeOfId: z.string().optional(),
  idNumber: z.string().optional(),
  homeAddress: z.string().optional(),
  currentAddress: z.string().optional(),
  emergencyContactInfo: z.string().optional(),
  placeCodeNo: z.string().optional(),
  enrollInKNUDate: z.date().optional(),
  employeeCode: z.string().optional(),
  gradeLevel: z.string().optional(),
  currentContractPeriod: z.coerce.number().optional(),
  propationPeriod: z.coerce.number().optional(),
  trainingLevel: z.string().optional(),
  workloads: z.string().optional(),
});

export type UpdateEmployeeSchema = z.infer<typeof updateEmployeeSchema>;
