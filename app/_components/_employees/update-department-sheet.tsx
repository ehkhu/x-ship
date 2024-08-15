'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useSWR from 'swr';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Employee } from '@/types/types-employees';
import {
  updateEmployeeSchema,
  UpdateEmployeeSchema,
} from '@/app/_lib/_employees/validations';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';

import { Check, ChevronsUpDown } from 'lucide-react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { updateEmployee } from '@/app/_lib/_employees/actions';

import { Skeleton } from '@/components/ui/skeleton';

interface UpdateEmployeeSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  employee: Employee;
}

const fetcher = (...args: [RequestInfo, RequestInit?]): Promise<any> =>
  fetch(...args).then((res) => res.json());
export function UpdateEmployeeSheet({
  employee,
  ...props
}: UpdateEmployeeSheetProps) {
  const [isUpdatePending, startUpdateTransition] = React.useTransition();
  console.log('employee', employee);

  let form = useForm<UpdateEmployeeSchema>({
    resolver: zodResolver(updateEmployeeSchema),
    defaultValues: employee.id
      ? {
          name: employee.name ?? '',
          managerId: employee.managerId ?? 1,
          locationId: employee.locationId ?? 1,
        }
      : {},
  });
  console.log(form);
  function onSubmit(input: UpdateEmployeeSchema) {
    startUpdateTransition(async () => {
      const { error } = await updateEmployee({
        id: employee.id,
        ...input,
      });

      if (error) {
        toast.error(error);
        return;
      }

      form.reset();
      props.onOpenChange?.(false);
      toast.success('Employee updated');
    });
  }

  //fech employee
  const {
    data: employees,
    error,
    isLoading,
  } = useSWR('/api/employees', fetcher);

  // If there was an error fetching the data, display a message
  if (error) return <div>Failed to load countries</div>;

  // If the data is still being loaded, display a loading state
  if (isLoading) {
    return (
      <div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }
  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Update employee</SheetTitle>
          <SheetDescription>
            Update the employee details and save the changes
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Do a kickflip"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="locationId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Country</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-full justify-between',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? employees.find(
                                (country: any) => country.value === field.value
                              )?.label
                            : 'Select country'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search employee..." />
                        <CommandList>
                          <CommandEmpty>No country found.</CommandEmpty>
                          <CommandGroup>
                            {employees.map((country: any) => (
                              <CommandItem
                                value={country.label}
                                key={country.value}
                                onSelect={() => {
                                  form.setValue('locationId', country.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    country.value === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {country.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                Save
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
