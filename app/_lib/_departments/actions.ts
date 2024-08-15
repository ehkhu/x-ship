'use server';

import { unstable_noStore as noStore, revalidatePath } from 'next/cache';

import { getErrorMessage } from '@/lib/handle-error';

import prisma from '@/prisma/client';

import { CreateDepartmentSchema, UpdateDepartmentSchema } from './validations';

export async function seedDepartments(input: { count: number }) {
  const count = input.count ?? 100;

  try {
    /*
    const allDepartments: Department[] = [];
    for (let i = 0; i < count; i++) {
      allDepartments.push(generateRandomDepartment());
    }
    await prisma.Department.deleteMany();
    console.log('📝 Inserting Departments', allDepartments.length);
    await prisma.Department.createMany({ data: allDepartments }).onConflictDoNothing();
    */
  } catch (err) {
    console.error(err);
  }
}

export async function createDepartment(input: CreateDepartmentSchema) {
  noStore();
  try {
    const { name, managerId, locationId } = input;
    const department = await prisma.department.create({
      data: {
        name,
        managerId,
        locationId,
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

export async function updateDepartment(
  input: UpdateDepartmentSchema & { id: number }
) {
  noStore();
  try {
    await prisma.department.update({
      where: { id: input.id },
      data: {
        name: input.name,
        managerId: input.managerId,
        locationId: input.locationId,
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

export async function updateDepartments(input: {
  ids: number[];
  name?: string;
  managerId?: number;
  locationId?: number;
}) {
  noStore();
  try {
    await prisma.department.updateMany({
      where: {
        id: {
          in: input.ids,
        },
      },
      data: {
        name: input.name,
        managerId: input.managerId,
        locationId: input.locationId,
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

export async function deleteDepartment(input: { id: string }) {
  console.log('deleteDepartment', input.id);
  try {
    const deletedDepartment = await prisma.department.delete({
      where: {
        id: +input.id,
      },
    });
    console.log(deleteDepartment);
    revalidatePath('/');
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function deleteDepartments(input: { ids: number[] }) {
  console.log('deleteDepartments', input.ids);
  try {
    const deletedDepartments = await prisma.department.deleteMany({
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

export async function getChunkedDepartments(
  input: { chunkSize?: number } = {}
) {
  try {
    const chunkSize = input.chunkSize ?? 1000;
    let chunkedDepartments;
    return {
      data: chunkedDepartments,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}
