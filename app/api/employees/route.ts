import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface LabelValue {
  label: string;
  value: number;
}

export async function GET(request: NextRequest) {
  //get employees
  const employees: any[] = await prisma.employee.findMany({
    include: {
      department: true, // Include the department relation
    },
  });

  const transformedEmployees: LabelValue[] = employees.map((employee) => ({
    label:
      employee.name +
      ' (' +
      (employee.department?.name ?? 'No Department') +
      ')',
    value: employee.id,
  }));

  return NextResponse.json(transformedEmployees);
}
