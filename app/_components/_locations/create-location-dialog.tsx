'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil2Icon, PlusIcon, ReloadIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { type Location } from '@/types/types-locations';
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

import { createLocation, updateLocation } from '../../_lib/_locations/actions';
import {
  createLocationSchema,
  type CreateLocationSchema,
} from '../../_lib/_locations/validations';
import { CreateLocationForm } from './create-location-form';

export function CreateLocationDialog({
  openDialog = false,
  isEdit = false,
  editData = undefined,
}: {
  openDialog?: boolean;
  isEdit?: boolean;
  editData?: Location;
}) {
  const [open, setOpen] = React.useState(false);
  const [isCreatePending, startCreateTransition] = React.useTransition();
  const isDesktop = useMediaQuery('(min-width: 640px)');
  if (openDialog) setOpen(openDialog);
  console.log(editData);
  const form = useForm<CreateLocationSchema>({
    resolver: zodResolver(createLocationSchema),
    defaultValues: {
      streetAddress: editData?.streetAddress ?? '',
      postalCode: editData?.postalCode ?? '',
      city: editData?.city ?? '',
      stateProvince: editData?.stateProvince ?? '',
      countryId: editData?.countryId ?? 1,
    },
  });
  // Use useEffect to reset form values when editData changes
  React.useEffect(() => {
    form.reset({
      streetAddress: editData?.streetAddress ?? '',
      postalCode: editData?.postalCode ?? '',
      city: editData?.city ?? '',
      stateProvince: editData?.stateProvince ?? '',
      countryId: editData?.countryId ?? 1,
    });
  }, [editData, form]);
  function onSubmit(input: CreateLocationSchema) {
    startCreateTransition(async () => {
      if (!isEdit) {
        const { error } = await createLocation(input);
        if (error) {
          toast.error(error);
          return;
        }
        form.reset();
        setOpen(false);
        toast.success('Location created');
      }
      if (isEdit) {
        startCreateTransition(async () => {
          const { error } = await updateLocation({
            id: editData?.id ?? 0,
            ...input,
          });

          if (error) {
            toast.error(error);
            return;
          }

          form.reset();
          // props.onOpenChange?.(false);
          toast.success('Location updated');
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
            New Location
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
              {isEdit ? 'Update Location' : ' Create Location'}
            </DialogTitle>
            <DialogDescription>
              Fill in the details below to {isEdit ? ' update' : ' create'} a
              Location.
            </DialogDescription>
          </DialogHeader>
          <CreateLocationForm form={form} onSubmit={onSubmit}>
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
          </CreateLocationForm>
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusIcon className="mr-2 size-4" aria-hidden="true" />
          {isEdit ? 'Update Location' : 'New Location'}
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {isEdit ? 'Update Location' : ' Create Location'}
          </DrawerTitle>
          <DrawerDescription>
            Fill in the details below to {isEdit ? ' update ' : ' create'} a
            Location.
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
