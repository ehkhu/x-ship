import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface LabelValue {
  label: string;
  value: number;
}

export async function GET(request: NextRequest) {
  //get jobs
  const jobs: any[] = await prisma.job.findMany();

  const transformedLocations: LabelValue[] = jobs.map((job) => ({
    label: job.jobTitle,
    value: job.id,
  }));

  return NextResponse.json(transformedLocations);
}
