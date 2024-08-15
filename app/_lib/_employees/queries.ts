import 'server-only';
import { unstable_noStore as noStore } from 'next/cache';
import { parseISO, startOfDay, endOfDay, max } from 'date-fns';
import prisma from '@/prisma/client';
import { GetEmployeesSchema } from './validations';

export async function getEmployees(input: GetEmployeesSchema) {
  noStore();

  const page = +input.page;
  const per_page = +input.per_page;
  const sort = (input.sort as string) || 'createdAt.desc';
  const name = input.name as string;
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
        from && to
          ? {
              hireDate: {
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

    // Handle sorting by nested fields like `department.name` or `job.title`
    let orderByClause: any;
    if (column === 'department') {
      orderByClause = { department: { name: order } };
    } else if (column === 'job') {
      orderByClause = { job: { title: order } };
    } else if (column === 'manager') {
      orderByClause = { manager: { name: order } };
    } else {
      orderByClause = { [column]: order };
    }

    const [employees, total] = await prisma.$transaction([
      prisma.employee.findMany({
        where,
        skip: (page - 1) * per_page,
        take: per_page,
        orderBy: orderByClause as any, // Temporarily bypass typing issues
        include: {
          department: true, // Include related department
          job: true, // Include related job
          manager: true, // Include manager details
          subordinates: true, // Include subordinates
          jobHistory: true, // Include job history
        },
      }),
      prisma.employee.count({
        where,
      }),
    ]);

    console.log(employees);
    return {
      data: employees,
      pageCount: Math.ceil(total / per_page),
    };
  } catch (error) {
    console.error('Error fetching employees:', error);
    return { data: [], pageCount: 0 };
  }
}

export async function getCountrys() {
  return prisma.country.findMany();
}
