import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  //get countries
  const countries = await prisma.country.findMany();
  return NextResponse.json(countries);
}
