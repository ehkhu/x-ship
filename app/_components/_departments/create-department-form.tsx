'use client';

import * as React from 'react';

import { useForm, type UseFormReturn } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  CreateDepartmentSchema,
  updateDepartmentSchema,
} from '@/app/_lib/_departments/validations';

import { Input } from '@/components/ui/input';

import useSWR from 'swr';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Button } from '@/components/ui/button';

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
import { Skeleton } from '@/components/ui/skeleton';

import { zodResolver } from '@hookform/resolvers/zod';

interface CreateDepartmentFormProps
  extends Omit<React.ComponentPropsWithRef<'form'>, 'onSubmit'> {
  children: React.ReactNode;
  form: UseFormReturn<CreateDepartmentSchema>;
  onSubmit: (data: CreateDepartmentSchema) => void;
}

const fetcher = (...args: [RequestInfo, RequestInit?]): Promise<any> =>
  fetch(...args).then((res) => res.json());

export function CreateDepartmentForm({
  form,
  onSubmit,
  children,
}: CreateDepartmentFormProps) {
  //for react default form

  //fech locations
  const {
    data: locations,
    error,
    isLoading,
  } = useSWR('/api/locations', fetcher);

  // If there was an error fetching the data, display a message
  if (error) return <div>Failed to load locations</div>;

  // If the data is still being loaded, display a loading state
  if (isLoading) {
    return (
      <div>
        <div className="space-x-4">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  return (
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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="department name" {...field} />
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
              <FormLabel>Locations</FormLabel>
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
                        ? locations.find(
                            (location: any) => location.value === field.value
                          )?.label
                        : 'Select location'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search location..." />
                    <CommandList>
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {locations.map((country: any) => (
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

        {children}
      </form>
    </Form>
  );
}
