import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';

interface LabelValue {
  label: string;
  value: number;
}

export async function GET() {
  //get roles
  const roles: any[] = await prisma.role.findMany();

  const transformedRoles: LabelValue[] = roles.map((role) => ({
    label: role.name,
    value: role.id,
  }));

  return NextResponse.json(transformedRoles);

  // ---------#######----------
  // try {
  //   const roles = await prisma.role.findMany({
  //       include: {
  //         permissions: true, // Assuming there's a relation between roles and permissions
  //       },
  //     })
  //   return NextResponse.json(roles);
  // } catch (e) {
  //   console.log({ e });
  //   return NextResponse.json({message:"error"});
  // }
}
