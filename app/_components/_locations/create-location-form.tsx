'use client';

import * as React from 'react';

import { type UseFormReturn } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { CreateLocationSchema } from '@/app/_lib/_locations/validations';

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

interface CreateLocationFormProps
  extends Omit<React.ComponentPropsWithRef<'form'>, 'onSubmit'> {
  children: React.ReactNode;
  form: UseFormReturn<CreateLocationSchema>;
  onSubmit: (data: CreateLocationSchema) => void;
}

// const fetcher = (...args) => fetch({ ...args ).then((res) => res.json());
const fetcher = (...args: [RequestInfo, RequestInit?]): Promise<any> =>
  fetch(...args).then((res) => res.json());

export function CreateLocationForm({
  form,
  onSubmit,
  children,
}: CreateLocationFormProps) {
  // const countries = await prisma.country.findMany();

  const {
    data: countries,
    error,
    isLoading,
  } = useSWR('/api/countries', fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  console.log(countries);
  //for combo box of countries
  const countriesOptions = countries;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="streetAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street / Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="street / address"
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
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="Postal Code"
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
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stateProvince"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State Province </FormLabel>
              <FormControl>
                <Input
                  placeholder="Stage Provience"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Other form fields country select */}
        <FormField
          control={form.control}
          name="countryId"
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
                        ? countriesOptions.find(
                            (country: any) => country.value === field.value
                          )?.label
                        : 'Select country'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandList>
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {countriesOptions.map((country: any) => (
                          <CommandItem
                            value={country.label}
                            key={country.value}
                            onSelect={() => {
                              form.setValue('countryId', country.value);
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
