import 'server-only';
import { unstable_noStore as noStore } from 'next/cache';
import { parseISO, startOfDay, endOfDay, max } from 'date-fns';
import prisma from '@/prisma/client';
import { GetLocationsSchema } from './validations';

export async function getLocations(input: GetLocationsSchema) {
  noStore();
  const page = +input.page || 1;
  const per_page = +input.per_page || 10;
  const sort = (input.sort as string) || 'createdAt.desc';
  const streetAddress = input.streetAddress as string;
  const operator = (input.operator as 'and' | 'or') || 'and';
  const [column, order] = sort?.split('.') || ['createdAt', 'desc'];

  try {
    const where: any = {
      AND: [
        streetAddress
          ? { streetAddress: { contains: streetAddress } }
          : undefined,
      ].filter(Boolean),
    };

    if (operator === 'or') {
      where.OR = where.AND;
      delete where.AND;
    }

    const orderBy =
      column === 'countryName'
        ? { country: { countryName: order as 'asc' | 'desc' } }
        : { [column]: order as 'asc' | 'desc' };

    const [locations, total] = await prisma.$transaction([
      prisma.location.findMany({
        where,
        skip: (page - 1) * per_page,
        take: per_page,
        orderBy,
        include: {
          country: true, // Include the related Country data
        },
      }),
      prisma.location.count({
        where,
      }),
    ]);

    // Transform the data to embed countryName directly in the Location object
    const transformedLocations = locations.map((location) => ({
      ...location,
      countryName: location.country?.countryName || null, // Embed countryName
    }));

    return {
      data: transformedLocations,
      pageCount: Math.ceil(total / per_page),
    };
  } catch (error) {
    return { data: [], pageCount: 0 };
  }
}

export async function getCountrys() {
  return prisma.country.findMany();
}
