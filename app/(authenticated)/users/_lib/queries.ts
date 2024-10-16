import 'server-only';
import { unstable_noStore as noStore } from 'next/cache';
import { parseISO, startOfDay, endOfDay, max } from 'date-fns';
import prisma from '@/prisma/client';
import { GetUsersSchema } from './validations';

export async function getUsers(input: GetUsersSchema) {
  noStore();
  // const { page, per_page, sort, title, status, priority, operator, from, to } =
  //   input;

  const page = +input.page;
  const per_page = +input.per_page;
  const sort = (input.sort as string) || 'createdAt.desc';
  const userFullName = input.userFullName as string;
  const operator = (input.operator as 'and' | 'or') || 'and';
  const [column, order]: any = sort?.split('.');
  const from = input.from as string;
  const to = input.to as string;

  try {
    const where: any = {
      AND: [
        userFullName ? { userFullName: { contains: userFullName } } : undefined,
        from && to
          ? {
              createdDate: {
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

    // Handle sorting by nested fields
    let orderByClause: any;
    if (column === 'role') {
      orderByClause = { role: { name: order } };
    } else {
      orderByClause = { [column]: order };
    }

    const [users, total] = await prisma.$transaction([
      prisma.user.findMany({
        where,
        skip: (page - 1) * per_page,
        take: per_page,
        orderBy: orderByClause as any,
        include: { role: { include: { permissions: true } } }, // include role and permission
      }),
      prisma.user.count({
        where,
      }),
    ]);

    return {
      data: users,
      pageCount: Math.ceil(total / per_page),
    };
  } catch (error) {
    return { data: [], pageCount: 0 };
  }
}
