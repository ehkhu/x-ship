'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil2Icon, PlusIcon, ReloadIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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

import { CreatePatientForm } from './create-patient-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Patient } from '@/types';
import { createPatientSchema, CreatePatientSchema } from '../_lib/validations';
import { createPatient, updatePatient } from '../_lib/actions';

export function CreatePatientCard({
  isEdit = false,
  editData = undefined,
}: {
  openCard?: boolean;
  isEdit?: boolean;
  editData?: any;
}) {
  const [open, setOpen] = React.useState(false);
  const [isCreatePending, startCreateTransition] = React.useTransition();
  const isDesktop = useMediaQuery('(min-width: 640px)');
  const form = useForm<CreatePatientSchema>({
    resolver: zodResolver(createPatientSchema),
    defaultValues: {
      regId: editData?.regId ?? '',
      regName: editData?.regName ?? '',
      regDate: editData?.regDate ?? '',
      // regOrg: editData?.regOrg ?? '',
      regPlace: editData?.regPlace ?? 2,
      regVillage: editData?.regVillage ?? '',
      regAge: editData?.regAge ?? 1,
      regAgeUnit: editData?.regAgeUnit ?? 1,
      regSex: editData?.regSex ?? 1,
      regType: editData?.regType ?? 1,
      regMarital: editData?.regMarital ?? 0,
      regMother: editData?.regMother ?? '',
      regFather: editData?.regFather ?? '',
      regAddress: editData?.regAddress ?? '',
      regEthnic: editData?.regEthnic ?? '',
      regRefFrom: editData?.regRefFrom ?? '',
      regRemark: editData?.regRemark ?? '',
    },
  });
  function onSubmit(input: CreatePatientSchema) {
    startCreateTransition(async () => {
      if (!isEdit) {
        const { error } = await createPatient(input);
        if (error) {
          toast.error(error);
          return;
        }
        form.reset();
        toast.success('Patient created');
      }
      if (isEdit) {
        startCreateTransition(async () => {
          const { error } = await updatePatient({
            id: editData?.id ?? 0,
            ...input,
          });

          if (error) {
            toast.error(error);
            return;
          }

          // form.reset();
          toast.success('Patient updated');
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
              {isEdit ? 'Update Patient' : ' Create Patient'}
            </CardTitle>
            <CardDescription>
              Fill in the details below to {isEdit ? ' update' : ' create'} a
              Patient.
            </CardDescription>
          </CardHeader>
          <CreatePatientForm
            form={form}
            onSubmit={onSubmit}
            editData={editData ?? undefined}
          >
            <CardFooter className="flex-row-reverse gap-2 p-0 pt-2 sm:space-x-0">
              <Button disabled={isCreatePending}>
                {isCreatePending && (
                  <ReloadIcon
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                {isEdit ? 'Update' : 'Create'}
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  form.reset();
                }}
                type="button"
                variant="outline"
              >
                Reset
              </Button>
              <Link href="/patients">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </CardFooter>
          </CreatePatientForm>
        </CardContent>
      </Card>
    );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {/* <DrawerTrigger asChild>
        <Button variant="ghost" size="sm">
          <Pencil2Icon className="mr-2 size-4" aria-hidden="true" />
        </Button>
      </DrawerTrigger> */}

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {isEdit ? 'Update Patient' : ' Create Patient'}
          </DrawerTitle>
          <DrawerDescription>
            Fill in the details below to {isEdit ? ' update ' : ' create'} a
            Patient.
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
