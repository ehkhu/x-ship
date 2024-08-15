'use server';

import { unstable_noStore as noStore, revalidatePath } from 'next/cache';

import { getErrorMessage } from '@/lib/handle-error';

import prisma from '@/prisma/client';

import { CreateEmployeeSchema, UpdateEmployeeSchema } from './validations';

export async function seedEmployees(input: { count: number }) {
  const count = input.count ?? 100;

  try {
    /*
    const allEmployees: Employee[] = [];
    for (let i = 0; i < count; i++) {
      allEmployees.push(generateRandomEmployee());
    }
    await prisma.Employee.deleteMany();
    console.log('📝 Inserting Employees', allEmployees.length);
    await prisma.Employee.createMany({ data: allEmployees }).onConflictDoNothing();
    */
  } catch (err) {
    console.error(err);
  }
}

export async function createEmployee(input: CreateEmployeeSchema) {
  noStore();
  try {
    const {
      name,
      email,
      phoneNumber,
      hireDate,
      jobId,
      salary,
      commissionPct,
      managerId,
      departmentId,
    } = input;
    const parsedHireDate = hireDate ? new Date(hireDate) : '';
    const employee = await prisma.employee.create({
      data: {
        name,
        email,
        phoneNumber,
        hireDate: parsedHireDate,
        jobId,
        salary,
        commissionPct,
        managerId,
        departmentId,
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

export async function updateEmployee(
  input: UpdateEmployeeSchema & { id: number }
) {
  noStore();
  try {
    const parsedHireDate = input.hireDate ? new Date(input.hireDate) : '';
    await prisma.employee.update({
      where: { id: input.id },
      data: {
        name: input.name,
        email: input.email,
        phoneNumber: input.phoneNumber,
        hireDate: parsedHireDate,
        jobId: input.jobId,
        salary: input.salary,
        commissionPct: input.commissionPct,
        managerId: input.managerId,
        departmentId: input.departmentId,
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

export async function updateEmployees(input: {
  ids: number[];
  name?: string;
  email?: string;
  phoneNumber?: string;
  hireDate?: string;
  jobId?: number;
  salary?: number;
  commissionPct?: number;
  managerId?: number;
  departmentId?: number;
}) {
  noStore();
  try {
    const parsedHireDate = input.hireDate ? new Date(input.hireDate) : '';
    await prisma.employee.updateMany({
      where: {
        id: {
          in: input.ids,
        },
      },
      data: {
        name: input.name,
        email: input.email,
        phoneNumber: input.phoneNumber,
        hireDate: parsedHireDate,
        jobId: input.jobId,
        salary: input.salary,
        commissionPct: input.commissionPct,
        managerId: input.managerId,
        departmentId: input.departmentId,
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

export async function deleteEmployee(input: { id: string }) {
  console.log('deleteEmployee', input.id);
  try {
    const deletedEmployee = await prisma.employee.delete({
      where: {
        id: +input.id,
      },
    });
    console.log(deleteEmployee);
    revalidatePath('/');
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function deleteEmployees(input: { ids: number[] }) {
  console.log('deleteEmployees', input.ids);
  try {
    const deletedEmployees = await prisma.employee.deleteMany({
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

export async function getChunkedEmployees(input: { chunkSize?: number } = {}) {
  try {
    const chunkSize = input.chunkSize ?? 1000;
    let chunkedEmployees;
    return {
      data: chunkedEmployees,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}
