import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
var XLSX = require('xlsx');
import * as fs from 'fs';

XLSX.set_fs(fs);

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const from = url.searchParams.get('from');
  const to = url.searchParams.get('to');

  console.log(`from ${from} to ${to}`);

  const ancs: any[] = await prisma.$queryRaw`
  Select
    OrgName,
    RegId,
    PatientName,
    ClinicName,
    TownshipName,
    VillageName,
    ProjectName,
    Sex,
    Age,
    AgeUnit,
   DATE_FORMAT(ProvidedDate, '%Y-%m-%d %H:%i') ProvidedDate,
    ProvidedPlace,
    ProviderPosition,
    ANSelfRep,
    P,
    A,
    BP,
    Temp,
    TempUnit,
    PR,
    RR,
    Lab,
    B1,
    B1Unit,
    VitA,
    VitAUnit,
    FeSo4,
    HE,
    Outcome,
    Refto,
    ReferraltoOther,
    Refreason,
    Deathreason,
    To_char(DeliveryDate, 'YYYY-MM-DD') DeliveryDate,
    Treatment,
    OtherTreatment,
    Diagnosis,
    ErrorCommentRemark,
    pnFP,
    pnNBC,
    InsertDate,
    ModifyDate,
    MigrantWorker,
    DSee,
    DHear,
    DWalk,
    DRemember,
    DWash,
    DCommunication,
    Disability
from
    view_pnc
where ( provideddate between STR_TO_DATE(${from},'%Y-%m-%d') and STR_TO_DATE(${to},'%Y-%m-%d'))
and org='CPI-05'
`;
  return NextResponse.json(ancs);
}
