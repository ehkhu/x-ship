'use server';

import { unstable_noStore as noStore, revalidatePath } from 'next/cache';

import { getErrorMessage } from '@/lib/handle-error';

import prisma from '@/prisma/client';

import { CreateLocationSchema, UpdateLocationSchema } from './validations';

export async function seedLocations(input: { count: number }) {
  const count = input.count ?? 100;

  try {
    /*
    const allLocations: Location[] = [];
    for (let i = 0; i < count; i++) {
      allLocations.push(generateRandomLocation());
    }
    await prisma.Location.deleteMany();
    console.log('📝 Inserting Locations', allLocations.length);
    await prisma.Location.createMany({ data: allLocations }).onConflictDoNothing();
    */
  } catch (err) {
    console.error(err);
  }
}

export async function createLocation(input: CreateLocationSchema) {
  noStore();
  try {
    const { streetAddress, postalCode, city, stateProvince, countryId } = input;
    const location = await prisma.location.create({
      data: {
        streetAddress,
        postalCode,
        city: city ?? '',
        stateProvince,
        countryId,
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

export async function updateLocation(
  input: UpdateLocationSchema & { id: number }
) {
  noStore();
  try {
    await prisma.location.update({
      where: { id: input.id },
      data: {
        streetAddress: input.streetAddress,
        postalCode: input.postalCode,
        city: input.city,
        stateProvince: input.stateProvince,
        countryId: input.countryId,
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

export async function updateLocations(input: {
  ids: number[];
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  stateProvince?: string;
  countryId?: number;
}) {
  noStore();
  try {
    await prisma.location.updateMany({
      where: {
        id: {
          in: input.ids,
        },
      },
      data: {
        streetAddress: input.streetAddress,
        postalCode: input.postalCode,
        city: input.city,
        stateProvince: input.stateProvince,
        countryId: input.countryId,
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

export async function deleteLocation(input: { id: string }) {
  console.log('deleteLocation', input.id);
  try {
    const deletedLocation = await prisma.location.delete({
      where: {
        id: +input.id,
      },
    });
    console.log(deleteLocation);
    revalidatePath('/');
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function deleteLocations(input: { ids: number[] }) {
  console.log('deleteLocations', input.ids);
  try {
    const deletedLocations = await prisma.location.deleteMany({
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

export async function getChunkedLocations(input: { chunkSize?: number } = {}) {
  try {
    const chunkSize = input.chunkSize ?? 1000;
    let chunkedLocations;
    return {
      data: chunkedLocations,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}
