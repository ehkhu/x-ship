import 'server-only';
import { unstable_noStore as noStore } from 'next/cache';
import { parseISO, startOfDay, endOfDay, max } from 'date-fns';
import prisma from '@/prisma/client';
import { GetLocationsSchema } from './validations';

export async function getLocations(input: GetLocationsSchema) {
  noStore();
  // const { page, per_page, sort, title, status, priority, operator, from, to } =
  //   input;

  const page = +input.page;
  const per_page = +input.per_page;
  const sort = (input.sort as string) || 'createdAt.desc';
  const streetAddress = input.streetAddress as string;
  const operator = (input.operator as 'and' | 'or') || 'and';
  const [column, order]: any = sort?.split('.');
  console.log('Input', input);
  console.log('streetAddress', streetAddress);
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
    console.log(where);
    const [locations, total] = await prisma.$transaction([
      prisma.location.findMany({
        where,
        skip: (page - 1) * per_page,
        take: per_page,
        orderBy: {
          [column]: order,
        },
        include: {
          country: true, // This will include the related Country data
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
