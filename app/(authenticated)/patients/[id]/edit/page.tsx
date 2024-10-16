import prisma from '@/prisma/client';
import { CreatePatientCard } from '../../_components/create-patient-page';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';

export default async function PatientEditPage({
  params,
}: {
  params: { id: string };
}) {
  const editData = await prisma.patient.findFirst({
    where: {
      regId: params.id,
    },
  });
  if (!editData) return redirect('/patients');
  return (
    <>
      <Suspense fallback={<p>Loading feed...</p>}>
        <CreatePatientCard
          isEdit={true}
          editData={editData}
        ></CreatePatientCard>
      </Suspense>
    </>
  );
}
