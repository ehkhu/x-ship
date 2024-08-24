'use server';

import { unstable_noStore as noStore, revalidatePath } from 'next/cache';

import { getErrorMessage } from '@/lib/handle-error';

import prisma from '@/prisma/client';

import { CreateEmployeeSchema, UpdateEmployeeSchema } from './validations';

export async function seedEmployees(input: { count: number }) {
  const count = input.count ?? 100;

  try {
    /*
    code go here
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
      nameInKaren,
      nameInBurmese,
      dateOfBirth,
      fatherName,
      motherName,
      gender,
      nationality,
      ethnicity,
      religion,
      bloodType,
      typeOfId,
      idNumber,
      homeAddress,
      currentAddress,
      emergencyContactInfo,
      placeCodeNo,
      enrollInKNUDate,
      employeeCode,
      gradeLevel,
      currentContractPeriod,
      propationPeriod,
      trainingLevel,
      workloads,
    } = input;
    const parsedHireDate = hireDate ? new Date(hireDate) : '';
    const parsedDateOfBirth = dateOfBirth ? new Date(dateOfBirth) : '';
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
        nameInKaren,
        nameInBurmese,
        dateOfBirth: parsedDateOfBirth,
        fatherName,
        motherName,
        gender,
        nationality,
        ethnicity,
        religion,
        bloodType,
        typeOfId,
        idNumber,
        homeAddress,
        currentAddress,
        emergencyContactInfo,
        placeCodeNo,
        enrollInKNUDate,
        employeeCode,
        gradeLevel,
        currentContractPeriod,
        propationPeriod,
        trainingLevel,
        workloads,
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

        nameInKaren: input.nameInKaren,
        nameInBurmese: input.nameInBurmese,
        dateOfBirth: input.dateOfBirth ? new Date(input.dateOfBirth) : '',
        fatherName: input.fatherName,
        motherName: input.motherName,
        gender: input.gender,
        nationality: input.nationality,
        ethnicity: input.ethnicity,
        religion: input.religion,
        bloodType: input.bloodType,
        typeOfId: input.typeOfId,
        idNumber: input.idNumber,
        homeAddress: input.homeAddress,
        currentAddress: input.currentAddress,
        emergencyContactInfo: input.emergencyContactInfo,
        placeCodeNo: input.placeCodeNo,
        enrollInKNUDate: input.enrollInKNUDate
          ? new Date(input.enrollInKNUDate)
          : '',
        employeeCode: input.employeeCode,
        gradeLevel: input.gradeLevel,
        currentContractPeriod: input.currentContractPeriod,
        propationPeriod: input.propationPeriod,
        trainingLevel: input.trainingLevel,
        workloads: input.workloads,
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
  nameInKaren?: string;
  nameInBurmese?: string;
  dateOfBirth?: string;
  fatherName?: string;
  motherName?: string;
  gender?: string;
  nationality?: string;
  ethnicity?: string;
  religion?: string;
  bloodType?: string;
  typeOfId?: string;
  idNumber?: string;
  homeAddress?: string;
  currentAddress?: string;
  emergencyContactInfo?: string;
  placeCodeNo?: string;
  enrollInKNUDate?: string;
  employeeCode?: string;
  gradeLevel?: string;
  currentContractPeriod?: number;
  propationPeriod?: number;
  trainingLevel?: string;
  workloads?: string;
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

        nameInKaren: input.nameInKaren,
        nameInBurmese: input.nameInBurmese,
        dateOfBirth: input.dateOfBirth ? new Date(input.dateOfBirth) : '',
        fatherName: input.fatherName,
        motherName: input.motherName,
        gender: input.gender,
        nationality: input.nationality,
        ethnicity: input.ethnicity,
        religion: input.religion,
        bloodType: input.bloodType,
        typeOfId: input.typeOfId,
        idNumber: input.idNumber,
        homeAddress: input.homeAddress,
        currentAddress: input.currentAddress,
        emergencyContactInfo: input.emergencyContactInfo,
        placeCodeNo: input.placeCodeNo,
        enrollInKNUDate: input.enrollInKNUDate
          ? new Date(input.enrollInKNUDate)
          : '',
        employeeCode: input.employeeCode,
        gradeLevel: input.gradeLevel,
        currentContractPeriod: input.currentContractPeriod ?? 0,
        propationPeriod: input.propationPeriod,
        trainingLevel: input.trainingLevel,
        workloads: input.workloads,
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
