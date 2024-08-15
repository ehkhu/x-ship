import { faker } from '@faker-js/faker';
import { generateId } from '@/lib/id';
import { Department } from '@/types/types-departments';

export function generateRandomDepartment(): Department {
  return {
    id: +generateId(),
    name: faker.name.firstName(),
    locationId: faker.datatype.number({
      min: 1,
      max: 3,
    }),
    managerId: faker.datatype.number({
      min: 1,
      max: 3,
    }),
    employees: [],
    jobHistorys: [],
  };
}
