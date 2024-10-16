import prisma from '@/prisma/client';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import UserDetailPage from '../_components/user-detail-page';

export default async function UserPage({ params }: { params: { id: number } }) {
  const userData = await prisma.user.findFirst({
    where: {
      userId: +params.id,
    },
    include: { role: { include: { permissions: true } }, organization: true },
  });
  if (!userData) return redirect('/users');
  return (
    <>
      <Suspense fallback={<p>Loading feed...</p>}>
        <UserDetailPage user={userData} />
      </Suspense>
    </>
  );
}
