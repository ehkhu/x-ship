'use client';

import * as React from 'react';

import { useForm, type UseFormReturn } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// import { CreatePatientSchema, updatePatientSchema } from '@/app/_lib/_patients/validations';

import { Input } from '@/components/ui/input';
import { createPatientSchema, CreatePatientSchema } from '../_lib/validations';
import useSWR from 'swr';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn, getProjectNameFromLocal } from '@/lib/utils';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Skeleton } from '@/components/ui/skeleton';
import { Patient } from '@/types';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  ageUnitOptions,
  regMaritalOptions,
  regPlaceOptions,
  sexOptions,
  typeOfVisit,
} from '@/lib/constants';

const fetcher = (...args: [RequestInfo, RequestInit?]): Promise<any> =>
  fetch(...args).then((res) => res.json());

interface CreatePatientFormProps
  extends Omit<React.ComponentPropsWithRef<'form'>, 'onSubmit'> {
  children: React.ReactNode;
  form: UseFormReturn<CreatePatientSchema>;
  onSubmit: (data: CreatePatientSchema) => void;
  editData?: Patient;
}

export function CreatePatientForm({
  form,
  onSubmit,
  children,
  editData,
}: CreatePatientFormProps) {
  //fetch orgs
  const {
    data: orgs,
    error: orgsError,
    isLoading: orgsIsLoading,
  } = useSWR('/api/orgs', fetcher);
  //fetch villages
  const {
    data: villages,
    error: villagesError,
    isLoading: villagesIsLoading,
  } = useSWR('/api/villages?proj=' + getProjectNameFromLocal(), fetcher);
  // If there was an error fetching the data, display a message

  if (orgsError || villagesError)
    return <div>Failed to load initial data!</div>;

  // If the data is still being loaded, display a loading state
  if (orgsIsLoading || villagesIsLoading) {
    return (
      <div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[300px]" />
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
        <div className="flex flex-wrap gap-y-3">
          <div className="w-1/3 px-1">
            <FormField
              control={form.control}
              name="regDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="py-1">Register Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            ' pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={field.onChange}
                        disabled={(date: any) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {/* <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3 px-1">
            <FormField
              control={form.control}
              name="regId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Register Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Full Name"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3 px-1">
            <FormField
              control={form.control}
              name="regName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Patient Name"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3 px-1">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="regAge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Age"
                          type="number"
                          onWheel={(e) => (e.target as HTMLInputElement).blur()}
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="regAgeUnit"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="py-1">Age Unit</FormLabel>
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
                                ? ageUnitOptions.find(
                                    (ageUnit: any) =>
                                      ageUnit.value === field.value
                                  )?.label
                                : 'Select Unit'}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search Unit..." />
                            <CommandList>
                              <CommandEmpty>No Unit found.</CommandEmpty>
                              <CommandGroup>
                                {ageUnitOptions.map((ageUnit: any) => (
                                  <CommandItem
                                    value={ageUnit.label}
                                    key={ageUnit.value}
                                    onSelect={() => {
                                      form.setValue(
                                        'regAgeUnit',
                                        ageUnit.value
                                      );
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        ageUnit.value === field.value
                                          ? 'opacity-100'
                                          : 'opacity-0'
                                      )}
                                    />
                                    {ageUnit.label}
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
              </div>
            </div>
          </div>
          <div className="w-1/3 px-1">
            <FormField
              control={form.control}
              name="regSex"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="py-1">Gender</FormLabel>
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
                            ? sexOptions.find(
                                (sex: any) => sex.value === field.value
                              )?.label
                            : 'Select Sex'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Sex..." />
                        <CommandList>
                          <CommandEmpty>Not found.</CommandEmpty>
                          <CommandGroup>
                            {sexOptions.map((sex: any) => (
                              <CommandItem
                                value={sex.label}
                                key={sex.value}
                                onSelect={() => {
                                  form.setValue('regSex', sex.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    sex.value === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {sex.label}
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
          </div>
          <div className="w-1/3 px-1">
            <FormField
              control={form.control}
              name="regType"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="py-1">Patient Type</FormLabel>
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
                            ? typeOfVisit.find(
                                (typeVisit: any) =>
                                  typeVisit.value === field.value
                              )?.label
                            : 'Select Type'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Type..." />
                        <CommandList>
                          <CommandEmpty>No Type found.</CommandEmpty>
                          <CommandGroup>
                            {typeOfVisit.map((typeVisit: any) => (
                              <CommandItem
                                value={typeVisit.label}
                                key={typeVisit.value}
                                onSelect={() => {
                                  form.setValue('regType', typeVisit.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    typeVisit.value === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {typeVisit.label}
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
          </div>
          <div className="w-1/3 px-1">
            <FormField
              control={form.control}
              name="regVillage"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="py-1">Village</FormLabel>
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
                            ? villages.find(
                                (village: any) => village.value === field.value
                              )?.label
                            : 'Select Village'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Village..." />
                        <CommandList>
                          <CommandEmpty>No Village found.</CommandEmpty>
                          <CommandGroup>
                            {villages.map((village: any) => (
                              <CommandItem
                                value={village.label}
                                key={village.value}
                                onSelect={() => {
                                  form.setValue('regVillage', village.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    village.value === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {village.label}
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
          </div>
          <div className="w-1/3 px-1">
            <FormField
              control={form.control}
              name="regMarital"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="py-1">Marital</FormLabel>
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
                            ? regMaritalOptions.find(
                                (marital: any) => marital.value === field.value
                              )?.label
                            : 'Select Marital'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Marital..." />
                        <CommandList>
                          <CommandEmpty>Not found.</CommandEmpty>
                          <CommandGroup>
                            {regMaritalOptions.map((marital: any) => (
                              <CommandItem
                                value={marital.label}
                                key={marital.value}
                                onSelect={() => {
                                  form.setValue('regMarital', marital.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    marital.value === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {marital.label}
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
          </div>

          {/* <div className="w-1/3 px-1">
            <FormField
              control={form.control}
              name="regOrg"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="py-1">Organization</FormLabel>
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
                            ? orgs.find(
                                (role: any) => role.value === field.value
                              )?.label
                            : 'Select Organization'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Organization..." />
                        <CommandList>
                          <CommandEmpty>No organization found.</CommandEmpty>
                          <CommandGroup>
                            {orgs.map((org: any) => (
                              <CommandItem
                                value={org.label}
                                key={org.value}
                                onSelect={() => {
                                  form.setValue('regOrg', org.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    org.value === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {org.label}
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
          </div> */}
          <div className="w-1/3 px-1">
            <FormField
              control={form.control}
              name="regPlace"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="py-1">Register Place</FormLabel>
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
                            ? regPlaceOptions.find(
                                (place: any) => place.value === field.value
                              )?.label
                            : 'Select place'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search place..." />
                        <CommandList>
                          <CommandEmpty>No place found.</CommandEmpty>
                          <CommandGroup>
                            {regPlaceOptions.map((place: any) => (
                              <CommandItem
                                value={place.label}
                                key={place.value}
                                onSelect={() => {
                                  form.setValue('regPlace', place.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    place.value === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {place.label}
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
          </div>

          <div className="w-1/3 px-1">
            <FormField
              control={form.control}
              name="regFather"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Father Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Father Name"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3 px-1">
            <FormField
              control={form.control}
              name="regMother"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mother Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Mother Name"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3 px-1">
            <FormField
              control={form.control}
              name="regEthnic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ethnic Group</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ethnic Group"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-1/3 px-1">
            <FormField
              control={form.control}
              name="regAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Address"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-1/3 px-1">
            <FormField
              control={form.control}
              name="regRefFrom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Refer From</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Refer From"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-1/3 px-1">
            <FormField
              control={form.control}
              name="regRemark"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remark</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Remark"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* end flex container */}
        {children}
      </form>
    </Form>
  );
}
