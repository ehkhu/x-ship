import * as z from 'zod';

export const searchUserParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  userFullName: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(['and', 'or']).optional(),
});

export const getUsersSchema = searchUserParamsSchema;

export type GetUsersSchema = z.infer<typeof getUsersSchema>;

export const createUserSchema = z.object({
  userFullName: z
    .string()
    .min(4, { message: 'Full Name must be at least 4 characters long' }),
  userName: z
    .string()
    .min(4, { message: 'Username must be at least 4 characters long' }),
  userPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .optional()
    .or(z.literal('')), // Allow empty string,
  userStatus: z.coerce.number(),
  roleId: z.coerce.number(),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;

// export const updateUserSchema = z.object({
//   // userId: z.coerce.number(),
//   userFullName: z
//     .string()
//     .min(4, { message: 'Full Name must be at least 4 characters long' }),
//   userName: z
//     .string()
//     .min(4, { message: 'Username must be at least 4 characters long' }),
//   userPassword: z
//     .string()
//     .min(8, { message: 'Password must be at least 8 characters long' })
//     .optional(),
//   userStatus: z.coerce.number(),
//   roleId: z.coerce.number(),
// });

// export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
