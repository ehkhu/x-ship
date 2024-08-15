import 'server-only';
import { unstable_noStore as noStore } from 'next/cache';
import { parseISO, startOfDay, endOfDay, max } from 'date-fns';
import prisma from '@/prisma/client';
import { GetDepartmentsSchema } from './validations';

export async function getDepartments(input: GetDepartmentsSchema) {
  noStore();
  const page = +input.page;
  const per_page = +input.per_page;
  const sort = (input.sort as string) || 'createdAt.desc';
  const name = input.name as string;
  const managerId = input.managerId as number;
  const locationId = input.locationId as number;
  const from = input.from as string;
  const to = input.to as string;
  const operator = (input.operator as 'and' | 'or') || 'and';

  const [column, order]: [string, 'asc' | 'desc'] = sort?.split('.') as [
    string,
    'asc' | 'desc',
  ];

  try {
    const where: any = {
      AND: [
        name ? { name: { contains: name } } : undefined,
        managerId ? { managerId } : undefined,
        locationId ? { locationId } : undefined,
        from && to
          ? {
              createdAt: {
                gte: startOfDay(parseISO(from)),
                lte: endOfDay(parseISO(to)),
              },
            }
          : undefined,
      ].filter(Boolean),
    };

    if (operator === 'or') {
      where.OR = where.AND;
      delete where.AND;
    }
    const orderByClause =
      column === 'location'
        ? { location: { streetAddress: order } } // Sort by related location's name
        : { [column]: order }; // Sort by direct column
    const [departments, total] = await prisma.$transaction([
      prisma.department.findMany({
        where,
        skip: (page - 1) * per_page,
        take: per_page,
        orderBy: orderByClause as any, // Use 'as any' to temporarily bypass typing issues
        include: {
          employees: true, // Include related employees
          jobHistorys: true, // Include related jobHistorys
          location: true, // Include related location
        },
      }),
      prisma.department.count({
        where,
      }),
    ]);
    console.log(departments);
    return {
      data: departments,
      pageCount: Math.ceil(total / per_page),
    };
  } catch (error) {
    console.error('Error fetching departments:', error);
    return { data: [], pageCount: 0 };
  }
}

export async function getCountrys() {
  return prisma.country.findMany();
}
