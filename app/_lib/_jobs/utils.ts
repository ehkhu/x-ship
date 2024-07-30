import { faker } from '@faker-js/faker';
import { customAlphabet } from 'nanoid';
import { generateId } from '@/lib/id';
import { Job } from '@/types/types-jobs';

export function generateRandomJob(): Job {
  return {
    id: +generateId(),
    jobTitle: faker.company
      .catchPhrase()
      .replace(/^./, (letter) => letter.toUpperCase()),
    code: `JOB-${customAlphabet('0123456789', 4)()}`,
    minSalary: faker.datatype.number({
      min: 10000,
      max: 100000,
    }),
    maxSalary: faker.datatype.number({
      min: 100000,
      max: 500000,
    }),
  };
}
