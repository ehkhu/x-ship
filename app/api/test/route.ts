import { formatedLocalDate } from '@/lib/utils';
import prisma from '@/prisma/client';
import { endOfDay, parseISO, startOfDay } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const pneAndDiaData: any[] = await prisma.diagnosis.findMany({
    where: {
      diagnosis: { in: ['Diarrhoea', 'Pneumonia'] },
      dxCpi: 1,
    },
  });

  return NextResponse.json(pneAndDiaData);
}
