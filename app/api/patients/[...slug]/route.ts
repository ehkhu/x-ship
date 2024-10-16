import { getSexValue } from '@/lib/constants';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: any) {
  const regId = params.slug[0];
  let sex = 'Female';
  let filter: any = { regId: regId, regSex: getSexValue(sex) };
  if (params.slug.length > 1) {
    if (params.slug[1] === 'all') delete filter.regSex;
  }

  console.log(filter);
  try {
    // Use it in your query
    const patient = await prisma.patient.findFirst({
      where: filter,
    });

    if (!patient)
      return NextResponse.json({
        error: 'No records found for the specified female patient.',
      });
    // }

    return NextResponse.json({ success: true, patient });
    // return NextResponse.json({ id: id, sex: sex });
  } catch (error) {
    console.error('Error to find paitent.', error);
    return NextResponse.json({ error: 'Failed to find patient' });
  }
}
