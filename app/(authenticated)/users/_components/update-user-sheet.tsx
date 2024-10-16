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
import { createUserSchema, CreateUserSchema } from '../_lib/validations';
import { createUser, updateUser } from '../_lib/actions';
import { CreateUserForm } from './create-user-form';
import { User } from '@/types';
interface UpdateUserSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  user: User;
}

export function UpdateUserSheet({ user, ...props }: UpdateUserSheetProps) {
  const [open, setOpen] = React.useState(false);
  const [isUpdatePending, startUpdateTransition] = React.useTransition();
  const isDesktop = useMediaQuery('(min-width: 640px)');

  const form = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  });
  function onSubmit(input: CreateUserSchema) {
    startUpdateTransition(async () => {
      const { error } = await updateUser({
        id: user.userId,
        ...input,
      });

      if (error) {
        toast.error(error);
        return;
      }

      form.reset();
      props.onOpenChange?.(false);
      toast.success('User updated');
    });
  }

  if (isDesktop)
    return (
      <Sheet {...props}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Update user</SheetTitle>
            <SheetDescription>
              Fill in the details below to update a new user.
            </SheetDescription>
          </SheetHeader>
          <CreateUserForm form={form} onSubmit={onSubmit} editData={user}>
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
          </CreateUserForm>
        </SheetContent>
      </Sheet>
    );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {/* <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusIcon className="mr-2 size-4" aria-hidden="true" />
          New user
        </Button>
      </DrawerTrigger> */}

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create user</DrawerTitle>
          <DrawerDescription>
            Fill in the details below to create a new user.
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
