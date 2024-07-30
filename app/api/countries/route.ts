import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface LabelValue {
  label: string;
  value: number;
}

export async function GET(request: NextRequest) {
  //get countries
  const countries: any[] = await prisma.country.findMany();

  const transformedCountries: LabelValue[] = countries.map((country) => ({
    label: country.countryName,
    value: country.id,
  }));

  return NextResponse.json(transformedCountries);
}
