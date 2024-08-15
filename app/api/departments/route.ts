import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface LabelValue {
  label: string;
  value: number;
}

export async function GET(request: NextRequest) {
  //get departments
  const departments: any[] = await prisma.department.findMany();

  const transformedLocations: LabelValue[] = departments.map((department) => ({
    label: department.name,
    value: department.id,
  }));

  return NextResponse.json(transformedLocations);
}
