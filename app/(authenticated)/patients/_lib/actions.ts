'use server';

import { unstable_noStore as noStore, revalidatePath } from 'next/cache';

import { customAlphabet } from 'nanoid';

import { getErrorMessage } from '@/lib/handle-error';

import prisma from '@/prisma/client';
import { CreatePatientSchema } from './validations';
import { Patient } from '@/types';
import { formatedLocalDate, hashPassword } from '@/lib/utils';
import { KDHWORGCODE } from '@/lib/constants';

export async function createPatient(input: CreatePatientSchema) {
  noStore();
  try {
    const {
      regId,
      regName,
      regDate,
      // regOrg,
      regPlace,
      regVillage,
      regAge,
      regAgeUnit,
      regSex,
      regType,
      // regEdu,
      // regJob,
      regMarital,
      // regSpouse,
      regMother,
      regFather,
      regAddress,
      // regPh,
      regEthnic,
      regRefFrom,
      regRemark,
      // regUsrLogin,
      // regInsert,
      // regUpdate,
      // regStatus,
      // regSync,
      // regMigrant,
      // regIdp,
      // regDsee,
      // regDhear,
      // regDwalk,
      // regDrembr,
      // regDwash,
      // regDcommu,
      // regEthnicO,
      // regDisability,
    } = input;

    const patient = await prisma.patient.create({
      data: {
        regId,
        regName,
        regDate: formatedLocalDate(regDate),
        regOrg: KDHWORGCODE,
        regPlace,
        regVillage,
        regAge,
        regAgeUnit,
        regSex,
        regType,
        // regEdu,
        // regJob,
        regMarital,
        // regSpouse,
        regMother,
        regFather,
        regAddress,
        // regPh,
        regEthnic,
        regRefFrom,
        regRemark,
        // regUsrLogin,
        regInsert: new Date(),
        regUpdate: new Date(),
        // regStatus,
        // regSync,
        // regMigrant,
        // regIdp,
        // regDsee,
        // regDhear,
        // regDwalk,
        // regDrembr,
        // regDwash,
        // regDcommu,
        // regEthnicO,
        // regDisability,
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

export async function updatePatient(
  input: CreatePatientSchema & { id: number }
) {
  noStore();
  console.log(input.id);
  try {
    await prisma.patient.update({
      where: { id: input.id },
      data: {
        ...input,
        regDate: formatedLocalDate(input.regDate),
        regUpdate: new Date(),
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

export async function updatePatients(input: {
  ids: number[];
  patient: Patient;
}) {
  noStore();
  try {
    await prisma.patient.updateMany({
      where: {
        id: {
          in: input.ids,
        },
      },
      data: {
        ...input.patient,
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

export async function deletePatient(input: { id: string }) {
  try {
    const deletedPatient = await prisma.patient.delete({
      where: {
        id: +input.id,
      },
    });
    revalidatePath('/');
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function deletePatients(input: { ids: number[] }) {
  try {
    const deletedPatients = await prisma.patient.deleteMany({
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

export async function getChunkedPatients(input: { chunkSize?: number } = {}) {
  try {
    const chunkSize = input.chunkSize ?? 1000;

    let totalPatients = 0;
    await prisma.patient.count().then((count) => {
      totalPatients = count;
    });

    const totalChunks = Math.ceil(totalPatients / chunkSize);

    let chunkedPatients;

    for (let i = 0; i < totalChunks; i++) {
      chunkedPatients = await prisma.patient
        .findMany({
          take: chunkSize,
          skip: i * chunkSize,
        })
        .then((patients) =>
          patients.map((patient) => ({
            ...patient,
          }))
        );
    }

    return {
      data: chunkedPatients,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}
