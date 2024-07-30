'use server';

import { unstable_noStore as noStore, revalidatePath } from 'next/cache';

import { customAlphabet } from 'nanoid';

import { getErrorMessage } from '@/lib/handle-error';

import { generateRandomJob } from './utils';

import type { CreateJobSchema, UpdateJobSchema } from './validations';

import prisma from '@/prisma/client';

import { Job } from '@/types/types-jobs';

export async function seedJobs(input: { count: number }) {
  const count = input.count ?? 100;

  try {
    // const allJobs: Job[] = [];
    // for (let i = 0; i < count; i++) {
    //   allJobs.push(generateRandomJob());
    // }
    // await prisma.job.deleteMany();
    // console.log('📝 Inserting jobs', allJobs.length);
    // await prisma.job.createMany({ data: allJobs }).onConflictDoNothing();
  } catch (err) {
    console.error(err);
  }
}

export async function createJob(input: CreateJobSchema) {
  noStore();
  try {
    const { jobTitle, minSalary, maxSalary } = input;
    const job = await prisma.job.create({
      data: {
        jobTitle,
        code: `JOB-${customAlphabet('0123456789', 4)()}`,
        maxSalary,
        minSalary,
      },
    });

    revalidatePath('/');

    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function updateJob(input: UpdateJobSchema & { id: number }) {
  noStore();
  try {
    await prisma.job.update({
      where: { id: input.id },
      data: {
        jobTitle: input.jobTitle,
        code: `JOB-${customAlphabet('0123456789', 4)()}`,
        maxSalary: input.maxSalary,
        minSalary: input.minSalary,
      },
    });

    revalidatePath('/');

    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function updateJobs(input: {
  ids: number[];
  jobTitle?: Job['jobTitle'];
  minSalary?: Job['minSalary'];
  maxSalary?: Job['maxSalary'];
}) {
  noStore();
  try {
    await prisma.job.updateMany({
      where: {
        id: {
          in: input.ids,
        },
      },
      data: {
        jobTitle: input.jobTitle,
        minSalary: input.minSalary,
        maxSalary: input.maxSalary,
      },
    });

    revalidatePath('/');

    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function deleteJob(input: { id: string }) {
  console.log('deleteJob', input.id);
  try {
    const deletedJob = await prisma.job.delete({
      where: {
        id: +input.id,
      },
    });
    console.log(deleteJob);
    revalidatePath('/');
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function deleteJobs(input: { ids: number[] }) {
  console.log('deleteJobs', input.ids);
  try {
    const deletedJobs = await prisma.job.deleteMany({
      where: {
        id: {
          in: input.ids,
        },
      },
    });

    revalidatePath('/');

    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function getChunkedJobs(input: { chunkSize?: number } = {}) {
  try {
    const chunkSize = input.chunkSize ?? 1000;

    // const totalJobs = 0;
    // await prisma.job
    //   .count()
    //   .then((count) => {
    //     totalJobs = count;
    //   });

    // const totalChunks = Math.ceil(totalJobs / chunkSize);

    let chunkedJobs;

    // for (let i = 0; i < totalChunks; i++) {
    //   chunkedJobs = await prisma.job
    //     .findMany({
    //       take: chunkSize,
    //       skip: i * chunkSize,
    //     })
    //     .then((jobs) =>
    //       jobs.map((job) => ({
    //         ...job,
    //         createdAt: job.createdAt.toString(),
    //         updatedAt: job.updatedAt?.toString(),
    //       }))
    //     );
    // }

    return {
      data: chunkedJobs,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}
