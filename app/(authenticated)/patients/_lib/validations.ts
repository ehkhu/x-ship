import * as z from 'zod';

export const searchPatientParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  regId: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(['and', 'or']).optional(),
});

export const getPatientsSchema = searchPatientParamsSchema;

export type GetPatientsSchema = z.infer<typeof getPatientsSchema>;

export const createPatientSchema = z.object({
  id: z.number().int().optional(),
  regId: z
    .string()
    .min(9)
    .regex(/^[AB]\d{8}$/, {
      message:
        "Invalid format. Must start with 'A' or 'B' followed by 8 digits.",
    })
    .default(''),
  regName: z.string().min(3),
  regDate: z
    .union([
      z.string(),
      z.date().transform((date) => date.toISOString().split('T')[0]),
    ])
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format',
    }),
  // regOrg: z.string().min(3),
  regPlace: z.number().int().min(0, {
    message: 'Place is require!',
  }),
  regVillage: z.string().min(0, {
    message: 'Village is require!',
  }),
  regAge: z.coerce.number().int().default(999),
  regAgeUnit: z.number().int().default(999),
  regSex: z.number().int().default(999),
  regType: z.number().int().default(999),
  // regEdu: z.number().int().default(999),
  // regJob: z.string().max(30),
  regMarital: z.number().int().default(999),
  // regSpouse: z.string().max(30),
  regMother: z.string().max(30),
  regFather: z.string().max(30),
  regAddress: z.string().max(100),
  // regPh: z.string().max(30),
  regEthnic: z.string().max(100),
  regRefFrom: z.string().max(1000),
  regRemark: z.string().max(255),
  // regUsrLogin: z.string().max(100),
  // regInsert: z
  //   .union([
  //     z.string(),
  //     z.date().transform((date) => date.toISOString().split('T')[0]),
  //   ])
  //   .refine((date) => !isNaN(Date.parse(date)), {
  //     message: 'Invalid date format',
  //   }),
  // regUpdate: z
  //   .union([
  //     z.string(),
  //     z.date().transform((date) => date.toISOString().split('T')[0]),
  //   ])
  //   .refine((date) => !isNaN(Date.parse(date)), {
  //     message: 'Invalid date format',
  //   }),
  // regStatus: z.number().int().default(0),
  // regSync: z.number().int().default(0),
  // regMigrant: z.number().int().default(999),
  // regIdp: z.number().int().default(999),
  // regDsee: z.number().int().default(999),
  // regDhear: z.number().int().default(999),
  // regDwalk: z.number().int().default(999),
  // regDrembr: z.number().int().default(999),
  // regDwash: z.number().int().default(999),
  // regDcommu: z.number().int().default(999),
  // regEthnicO: z.string().max(100),
  // regDisability: z.number().int().default(999),
});

export type CreatePatientSchema = z.infer<typeof createPatientSchema>;
