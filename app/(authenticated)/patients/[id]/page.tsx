import prisma from '@/prisma/client';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import PatientDetailPage from '../_components/patient-detail-page';

export default async function PatientPage({
  params,
}: {
  params: { id: string };
}) {
  const patientData = await prisma.patient.findFirst({
    where: {
      regId: params.id,
    },
    include: { village: { include: { township: true } }, organization: true },
  });
  if (!patientData) return redirect('/patients');
  return (
    <>
      <Suspense fallback={<p>Loading feed...</p>}>
        {/* <h1>Patient Detail</h1> */}
        <PatientDetailPage patient={patientData} />
      </Suspense>
    </>
  );
}
