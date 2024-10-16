'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon, ReloadIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
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
import { createPatientSchema, CreatePatientSchema } from '../_lib/validations';
import { createPatient, updatePatient } from '../_lib/actions';
import { CreatePatientForm } from './create-patient-form';
import { Patient } from '@/types';
interface UpdatePatientSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  patient: Patient;
}

export function UpdatePatientSheet({
  patient,
  ...props
}: UpdatePatientSheetProps) {
  const [open, setOpen] = React.useState(false);
  const [isUpdatePending, startUpdateTransition] = React.useTransition();
  const isDesktop = useMediaQuery('(min-width: 640px)');

  const form = useForm<CreatePatientSchema>({
    resolver: zodResolver(createPatientSchema),
  });
  function onSubmit(input: CreatePatientSchema) {
    startUpdateTransition(async () => {
      const { error } = await updatePatient({
        id: patient.id,
        ...input,
      });

      if (error) {
        toast.error(error);
        return;
      }

      form.reset();
      props.onOpenChange?.(false);
      toast.success('Patient updated');
    });
  }

  if (isDesktop)
    return (
      <Sheet {...props}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Update patient</SheetTitle>
            <SheetDescription>
              Fill in the details below to update a new patient.
            </SheetDescription>
          </SheetHeader>
          <CreatePatientForm form={form} onSubmit={onSubmit} editData={patient}>
            <SheetFooter className="gap-2 pt-2 sm:space-x-0">
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </SheetClose>
              <Button disabled={isUpdatePending}>
                {isUpdatePending && (
                  <ReloadIcon
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Create
              </Button>
            </SheetFooter>
          </CreatePatientForm>
        </SheetContent>
      </Sheet>
    );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {/* <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusIcon className="mr-2 size-4" aria-hidden="true" />
          New patient
        </Button>
      </DrawerTrigger> */}

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create patient</DrawerTitle>
          <DrawerDescription>
            Fill in the details below to create a new patient.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="gap-2 sm:space-x-0">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          {/* <Button disabled={isUpdatePending}>
            {isUpdatePending && (
              <ReloadIcon
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Create
          </Button> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
