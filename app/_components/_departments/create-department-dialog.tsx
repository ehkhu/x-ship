'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil2Icon, PlusIcon, ReloadIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { type Department } from '@/types/types-departments';
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

import {
  createDepartment,
  updateDepartment,
} from '../../_lib/_departments/actions';
import {
  createDepartmentSchema,
  type CreateDepartmentSchema,
} from '../../_lib/_departments/validations';
import { CreateDepartmentForm } from './create-department-form';

export function CreateDepartmentDialog({
  openDialog = false,
  isEdit = false,
  editData = undefined,
}: {
  openDialog?: boolean;
  isEdit?: boolean;
  editData?: Department;
}) {
  const [open, setOpen] = React.useState(false);
  const [isCreatePending, startCreateTransition] = React.useTransition();
  const isDesktop = useMediaQuery('(min-width: 640px)');
  if (openDialog) setOpen(openDialog);
  const form = useForm<CreateDepartmentSchema>({
    resolver: zodResolver(createDepartmentSchema),
    defaultValues: {
      name: editData?.name ?? '',
      managerId: editData?.managerId ?? 0,
      locationId: editData?.locationId ?? 0,
    },
  });
  // Use useEffect to reset form values when editData changes
  React.useEffect(() => {
    form.reset({
      name: editData?.name ?? '',
      managerId: editData?.managerId ?? 0,
      locationId: editData?.locationId ?? 0,
    });
  }, [editData, form]);
  function onSubmit(input: CreateDepartmentSchema) {
    startCreateTransition(async () => {
      if (!isEdit) {
        const { error } = await createDepartment(input);
        if (error) {
          toast.error(error);
          return;
        }
        form.reset();
        setOpen(false);
        toast.success('Department created');
      }
      if (isEdit) {
        startCreateTransition(async () => {
          const { error } = await updateDepartment({
            id: editData?.id ?? 0,
            ...input,
          });

          if (error) {
            toast.error(error);
            return;
          }

          form.reset();
          // props.onOpenChange?.(false);
          toast.success('Department updated');
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
            New Department
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
              {isEdit ? 'Update Department' : ' Create Department'}
            </DialogTitle>
            <DialogDescription>
              Fill in the details below to {isEdit ? ' update' : ' create'} a
              Department.
            </DialogDescription>
          </DialogHeader>
          <CreateDepartmentForm form={form} onSubmit={onSubmit}>
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
          </CreateDepartmentForm>
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="sm">
          <Pencil2Icon className="mr-2 size-4" aria-hidden="true" />
          {/* <PlusIcon className="mr-2 size-4" aria-hidden="true" /> */}
          {/* {isEdit ? 'Update Department' : 'New Department'} */}
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {isEdit ? 'Update Department' : ' Create Department'}
          </DrawerTitle>
          <DrawerDescription>
            Fill in the details below to {isEdit ? ' update ' : ' create'} a
            Department.
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
