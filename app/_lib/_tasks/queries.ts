import 'server-only';
import { unstable_noStore as noStore } from 'next/cache';
import { type GetTasksSchema } from './validations';
import { parseISO, startOfDay, endOfDay } from 'date-fns';
import prisma from '@/prisma/client';

export async function getTasks(input: GetTasksSchema) {
  noStore();
  // const { page, per_page, sort, title, status, priority, operator, from, to } =
  //   input;

  const page = +input.page;
  const per_page = +input.per_page;
  const sort = (input.sort as string) || 'createdAt.desc';
  const title = input.title as string;
  const status = input.status as 'todo' | 'in-progress' | 'done' | 'canceled';
  const priority = input.priority as 'low' | 'medium' | 'high';
  const from = input.from as string;
  const to = input.to as string;
  const operator = (input.operator as 'and' | 'or') || 'and';

  const [column, order]: any = sort?.split('.');

  try {
    const where: any = {
      AND: [
        title ? { title: { contains: title } } : undefined,
        status ? { status } : undefined,
        priority ? { priority } : undefined,
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

    const [tasks, total] = await prisma.$transaction([
      prisma.task.findMany({
        where,
        skip: (page - 1) * per_page,
        take: per_page,
        orderBy: {
          [column]: order,
        },
      }),
      prisma.task.count({
        where,
      }),
    ]);

    return {
      data: tasks,
      pageCount: Math.ceil(total / per_page),
    };
  } catch (error) {
    return { data: [], pageCount: 0 };
  }
}

export async function getTaskCountByStatus() {
  noStore();
  try {
    // return await db
    //   .select({
    //     status: tasks.status,
    //     count: count(),
    //   })
    //   .from(tasks)
    //   .groupBy(tasks.status)
    //   .execute();
    return [];
  } catch (err) {
    return [];
  }
}

export async function getTaskCountByPriority() {
  noStore();
  try {
    // return await db
    //   .select({
    //     priority: tasks.priority,
    //     count: count(),
    //   })
    //   .from(tasks)
    //   .groupBy(tasks.priority)
    //   .execute();
    return [];
  } catch (err) {
    return [];
  }
}
