import { faker } from '@faker-js/faker';
import { generateId } from '@/lib/id';
import { Location } from '@/types/types-locations';

export function generateRandomJob(): Location {
  return {
    id: +generateId(),
    streetAddress: faker.address.streetAddress(),
    postalCode: faker.address.zipCode(),
    city: faker.address.city(),
    stateProvince: faker.address.state(),
    countryId: faker.datatype.number({
      min: 1,
      max: 249,
    }),
  };
}
