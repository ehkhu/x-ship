'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil2Icon, PlusIcon, ReloadIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { type Employee } from '@/types/types-employees';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { createEmployee, updateEmployee } from '../../_lib/_employees/actions';
import {
  createEmployeeSchema,
  type CreateEmployeeSchema,
} from '../../_lib/_employees/validations';
import { CreateEmployeeForm } from './create-employee-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export function CreateEmployeeCard({
  isEdit = false,
  editData = undefined,
}: {
  openCard?: boolean;
  isEdit?: boolean;
  editData?: Employee;
}) {
  const [open, setOpen] = React.useState(false);
  const [isCreatePending, startCreateTransition] = React.useTransition();
  const isDesktop = useMediaQuery('(min-width: 640px)');
  const form = useForm<CreateEmployeeSchema>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: {
      name: editData?.name ?? undefined,
      email: editData?.email ?? '',
      phoneNumber: editData?.phoneNumber ?? '',
      hireDate: editData?.hireDate
        ? new Date(editData?.hireDate + '')
        : undefined,
      jobId: editData?.jobId ?? undefined,
      salary: editData?.salary ?? undefined,
      commissionPct: editData?.commissionPct ?? undefined,
      managerId: editData?.managerId ?? undefined,
      departmentId: editData?.departmentId ?? undefined,

      nameInKaren: editData?.nameInKaren ?? '',
      nameInBurmese: editData?.nameInBurmese ?? '',
      dateOfBirth: editData?.dateOfBirth
        ? new Date(editData?.dateOfBirth + '')
        : undefined,
      fatherName: editData?.fatherName ?? '',
      motherName: editData?.motherName ?? '',
      gender: editData?.gender ?? '',
      nationality: editData?.nationality ?? '',
      ethnicity: editData?.ethnicity ?? '',
      religion: editData?.religion ?? '',
      bloodType: editData?.bloodType ?? '',
      typeOfId: editData?.typeOfId ?? '',
      idNumber: editData?.idNumber ?? '',
      homeAddress: editData?.homeAddress ?? '',
      currentAddress: editData?.currentAddress ?? '',
      emergencyContactInfo: editData?.emergencyContactInfo ?? '',
      placeCodeNo: editData?.placeCodeNo ?? '',
      enrollInKNUDate: editData?.enrollInKNUDate
        ? new Date(editData?.enrollInKNUDate + '')
        : undefined,
      employeeCode: editData?.employeeCode ?? '',
      gradeLevel: editData?.gradeLevel ?? '',
      currentContractPeriod: editData?.currentContractPeriod ?? undefined,
      propationPeriod: editData?.propationPeriod ?? undefined,
      trainingLevel: editData?.trainingLevel ?? '',
      workloads: editData?.workloads ?? '',
    },
  });
  // Use useEffect to reset form values when editData changes
  React.useEffect(() => {
    form.reset({
      name: editData?.name ?? undefined,
      email: editData?.email ?? '',
      phoneNumber: editData?.phoneNumber ?? '',
      hireDate: editData?.hireDate
        ? new Date(editData?.hireDate + '')
        : undefined,
      jobId: editData?.jobId ?? undefined,
      salary: editData?.salary ?? undefined,
      commissionPct: editData?.commissionPct ?? undefined,
      managerId: editData?.managerId ?? undefined,
      departmentId: editData?.departmentId ?? undefined,

      nameInKaren: editData?.nameInKaren ?? '',
      nameInBurmese: editData?.nameInBurmese ?? '',
      dateOfBirth: editData?.dateOfBirth
        ? new Date(editData?.dateOfBirth + '')
        : undefined,
      fatherName: editData?.fatherName ?? '',
      motherName: editData?.motherName ?? '',
      gender: editData?.gender ?? '',
      nationality: editData?.nationality ?? '',
      ethnicity: editData?.ethnicity ?? '',
      religion: editData?.religion ?? '',
      bloodType: editData?.bloodType ?? '',
      typeOfId: editData?.typeOfId ?? '',
      idNumber: editData?.idNumber ?? '',
      homeAddress: editData?.homeAddress ?? '',
      currentAddress: editData?.currentAddress ?? '',
      emergencyContactInfo: editData?.emergencyContactInfo ?? '',
      placeCodeNo: editData?.placeCodeNo ?? '',
      enrollInKNUDate: editData?.enrollInKNUDate
        ? new Date(editData?.enrollInKNUDate + '')
        : undefined,
      employeeCode: editData?.employeeCode ?? '',
      gradeLevel: editData?.gradeLevel ?? '',
      currentContractPeriod: editData?.currentContractPeriod ?? undefined,
      propationPeriod: editData?.propationPeriod ?? undefined,
      trainingLevel: editData?.trainingLevel ?? '',
      workloads: editData?.workloads ?? '',
    });
  }, [editData, form]);
  function onSubmit(input: CreateEmployeeSchema) {
    console.log('submit');
    startCreateTransition(async () => {
      if (!isEdit) {
        const { error } = await createEmployee(input);
        if (error) {
          toast.error(error);
          return;
        }
        form.reset();
        setOpen(false);
        toast.success('Employee created');
      }
      if (isEdit) {
        startCreateTransition(async () => {
          const { error } = await updateEmployee({
            id: editData?.id ?? 0,
            ...input,
            hireDate: new Date(input?.hireDate + ''),
            dateOfBirth: new Date(input?.dateOfBirth + ''),
          });

          if (error) {
            toast.error(error);
            return;
          }

          form.reset();
          // props.onOpenChange?.(false);
          toast.success('Employee updated');
        });
      }
    });
  }

  if (isDesktop)
    return (
      <Card>
        <CardContent>
          <CardHeader className="px-0">
            <CardTitle>
              {isEdit ? 'Update Employee' : ' Create Employee'}
            </CardTitle>
            <CardDescription>
              Fill in the details below to {isEdit ? ' update' : ' create'} a
              Employee.
            </CardDescription>
          </CardHeader>
          <CreateEmployeeForm form={form} onSubmit={onSubmit}>
            <CardFooter className="flex-row-reverse gap-2 p-0 pt-2 sm:space-x-0">
              <Link href="/employees">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button disabled={isCreatePending}>
                {isCreatePending && (
                  <ReloadIcon
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                {isEdit ? 'Update' : 'Create'}
              </Button>
            </CardFooter>
          </CreateEmployeeForm>
        </CardContent>
      </Card>
    );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="sm">
          <Pencil2Icon className="mr-2 size-4" aria-hidden="true" />
          {/* <PlusIcon className="mr-2 size-4" aria-hidden="true" /> */}
          {/* {isEdit ? 'Update Employee' : 'New Employee'} */}
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {isEdit ? 'Update Employee' : ' Create Employee'}
          </DrawerTitle>
          <DrawerDescription>
            Fill in the details below to {isEdit ? ' update ' : ' create'} a
            Employee.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="gap-2 sm:space-x-0">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button disabled={isCreatePending}>
            {isCreatePending && (
              <ReloadIcon
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
