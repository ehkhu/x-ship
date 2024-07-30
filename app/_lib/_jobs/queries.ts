import 'server-only';
import { unstable_noStore as noStore } from 'next/cache';
import { parseISO, startOfDay, endOfDay, max } from 'date-fns';
import prisma from '@/prisma/client';
import { GetJobsSchema } from './validations';

export async function getJobs(input: GetJobsSchema) {
  noStore();
  // const { page, per_page, sort, title, status, priority, operator, from, to } =
  //   input;

  const page = +input.page;
  const per_page = +input.per_page;
  const sort = (input.sort as string) || 'createdAt.desc';
  const jobTitle = input.jobTitle as string;
  const operator = (input.operator as 'and' | 'or') || 'and';
  const [column, order]: any = sort?.split('.');
  console.log('Input', input);
  console.log('jobTitle', jobTitle);
  try {
    const where: any = {
      AND: [jobTitle ? { jobTitle: { contains: jobTitle } } : undefined].filter(
        Boolean
      ),
    };

    if (operator === 'or') {
      where.OR = where.AND;
      delete where.AND;
    }
    console.log(where);
    const [jobs, total] = await prisma.$transaction([
      prisma.job.findMany({
        where,
        skip: (page - 1) * per_page,
        take: per_page,
        orderBy: {
          [column]: order,
        },
      }),
      prisma.job.count({
        where,
      }),
    ]);

    return {
      data: jobs,
      pageCount: Math.ceil(total / per_page),
    };
  } catch (error) {
    return { data: [], pageCount: 0 };
  }
}
