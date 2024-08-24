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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { format } from 'date-fns';

export function CreateEmployeeDialog({
  openDialog = false,
  isEdit = false,
  editData = undefined,
}: {
  openDialog?: boolean;
  isEdit?: boolean;
  editData?: Employee;
}) {
  const [open, setOpen] = React.useState(false);
  const [isCreatePending, startCreateTransition] = React.useTransition();
  const isDesktop = useMediaQuery('(min-width: 640px)');
  if (openDialog) setOpen(openDialog);
  // let formattedDate = editData?.hireDate
  //   ? format(new Date(editData?.hireDate + ''), 'dd/MM/yyyy') // Choose a specific format like dd/MM/yyyy
  //   : format(new Date(), 'dd/MM/yyyy'); // Choose a specific format like dd/MM/yyyy;

  const form = useForm<CreateEmployeeSchema>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: {
      name: editData?.name ?? '',
      email: editData?.email ?? '',
      phoneNumber: editData?.phoneNumber ?? '',
      hireDate: editData?.hireDate
        ? new Date(editData?.hireDate + '')
        : undefined,
      jobId: editData?.jobId ?? 0,
      salary: editData?.salary ?? 0,
      commissionPct: editData?.commissionPct ?? 0,
      managerId: editData?.managerId ?? 0,
      departmentId: editData?.departmentId ?? 0,

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
      currentContractPeriod: editData?.currentContractPeriod ?? 0,
      propationPeriod: editData?.propationPeriod ?? 0,
      trainingLevel: editData?.trainingLevel ?? '',
      workloads: editData?.workloads ?? '',
    },
  });
  // Use useEffect to reset form values when editData changes
  React.useEffect(() => {
    form.reset({
      name: editData?.name ?? '',
      email: editData?.email ?? '',
      phoneNumber: editData?.phoneNumber ?? '',
      hireDate: editData?.hireDate
        ? new Date(editData?.hireDate + '')
        : undefined,
      jobId: editData?.jobId ?? 0,
      salary: editData?.salary ?? 0,
      commissionPct: editData?.commissionPct ?? 0,
      managerId: editData?.managerId ?? 0,
      departmentId: editData?.departmentId ?? 0,

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
      currentContractPeriod: editData?.currentContractPeriod ?? 0,
      propationPeriod: editData?.propationPeriod ?? 0,
      trainingLevel: editData?.trainingLevel ?? '',
      workloads: editData?.workloads ?? '',
    });
  }, [editData, form]);
  function onSubmit(input: CreateEmployeeSchema) {
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
      <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogTrigger asChild> */}
        {!isEdit ? (
          <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
            <PlusIcon className="mr-2 size-4" aria-hidden="true" />
            New Employee
          </Button>
        ) : (
          <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
            {/* <PlusIcon className="mr-2 size-4" aria-hidden="true" /> */}
            <Pencil2Icon className="h-4 w-4" />
          </Button>
        )}
        {/* </DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEdit ? 'Update Employee' : ' Create Employee'}
            </DialogTitle>
            <DialogDescription>
              Fill in the details below to {isEdit ? ' update' : ' create'} a
              Employee.
            </DialogDescription>
          </DialogHeader>
          <CreateEmployeeForm form={form} onSubmit={onSubmit}>
            <DialogFooter className="gap-2 pt-2 sm:space-x-0">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isCreatePending}>
                {isCreatePending && (
                  <ReloadIcon
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                {isEdit ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </CreateEmployeeForm>
        </DialogContent>
      </Dialog>
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
