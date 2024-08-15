import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface LabelValue {
  label: string;
  value: number;
}

export async function GET(request: NextRequest) {
  //get locations
  const locations: any[] = await prisma.location.findMany();

  const transformedLocations: LabelValue[] = locations.map((location) => ({
    label: location.streetAddress,
    value: location.id,
  }));

  return NextResponse.json(transformedLocations);
}
