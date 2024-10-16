import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import LoginForm from './form';
import LoginMultiStepComponent from './multi-setp';
import prisma from '@/prisma/client';
interface LabelValue {
  label: string;
  value: number;
}
export default async function LoginPage() {
  const porjects: any[] = await prisma.project.findMany();
  const donors: any[] = await prisma.donor.findMany();
  const transformProjects: LabelValue[] = porjects.map((project) => ({
    label: project.projectName,
    value: project.projectId,
  }));
  const transformDonors: LabelValue[] = donors.map((donor) => ({
    label: donor.donorName,
    value: donor.donorId,
  }));
  return (
    <>
      <LoginMultiStepComponent
        projects={transformProjects}
        donors={transformDonors}
      ></LoginMultiStepComponent>
    </>
  );
}
