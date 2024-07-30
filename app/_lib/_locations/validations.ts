// import { tasks } from '@/db/constent';
import { add } from 'date-fns';
import * as z from 'zod';

/*
model Location {
  id            Int     @id @default(autoincrement())
  streetAddress String?
  postalCode    String?
  city          String
  stateProvince String?
  countryId     Int?

  // Relations
  country     Country?     @relation(fields: [countryId], references: [id])
  departments Department[]
}
*/

export const searchLocationParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  streetAddress: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(['and', 'or']).optional(),
});

export const getLocationsSchema = searchLocationParamsSchema;

export type GetLocationsSchema = z.infer<typeof getLocationsSchema>;

export const createLocationSchema = z.object({
  streetAddress: z.string({
    required_error: 'Please enter a street address.',
  }),
  postalCode: z.string({
    required_error: 'Please enter a postal code.',
  }),
  city: z.string({
    required_error: 'Please enter a city.',
  }),
  stateProvince: z.string({
    required_error: 'Please enter a state/province.',
  }),
  countryId: z.number({
    required_error: 'Please select a country.',
  }),
});

export type CreateLocationSchema = z.infer<typeof createLocationSchema>;

export const updateLocationSchema = z.object({
  streetAddress: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  stateProvince: z.string().optional(),
  countryId: z.number().optional(),
});

export type UpdateLocationSchema = z.infer<typeof updateLocationSchema>;
