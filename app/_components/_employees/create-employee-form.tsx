'use client';

import * as React from 'react';

import { useForm, type UseFormReturn } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  CreateEmployeeSchema,
  updateEmployeeSchema,
} from '@/app/_lib/_employees/validations';

import { Input } from '@/components/ui/input';

import useSWR from 'swr';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

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

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';

interface CreateEmployeeFormProps
  extends Omit<React.ComponentPropsWithRef<'form'>, 'onSubmit'> {
  children: React.ReactNode;
  form: UseFormReturn<CreateEmployeeSchema>;
  onSubmit: (data: CreateEmployeeSchema) => void;
}

const fetcher = (...args: [RequestInfo, RequestInit?]): Promise<any> =>
  fetch(...args).then((res) => res.json());

export function CreateEmployeeForm({
  form,
  onSubmit,
  children,
}: CreateEmployeeFormProps) {
  //for react default form

  //fech department
  const {
    data: departments,
    error: departmentsError,
    isLoading: departmentsIsLoading,
  } = useSWR('/api/departments', fetcher);

  const {
    data: jobs,
    error: jobsError,
    isLoading: jobsIsLoading,
  } = useSWR('/api/jobs', fetcher);

  const {
    data: managers,
    error: employeesError,
    isLoading: employeesIsLoading,
  } = useSWR('/api/employees', fetcher);

  // If there was an error fetching the data, display a message
  if (departmentsError || jobsError || employeesError)
    return <div>Failed to load data.</div>;

  // If the data is still being loaded, display a loading state
  if (departmentsIsLoading || jobsIsLoading || employeesIsLoading) {
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
        <div className="flex gap-4">
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="employee name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-1/3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="employee email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="employee phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-1/3 pt-3">
            <FormField
              control={form.control}
              name="hireDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Hired Date</FormLabel>
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
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
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
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="employee salary"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="commissionPct"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commission Percent</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="employee commission percent"
                      // Convert null to an empty string
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* fll other field here */}
        <div className="flex gap-4">
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="departmentId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Department</FormLabel>
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
                            ? departments.find(
                                (department: any) =>
                                  department.value === field.value
                              )?.label
                            : 'Select department'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search department..." />
                        <CommandList>
                          <CommandEmpty>No department found.</CommandEmpty>
                          <CommandGroup>
                            {departments.map((country: any) => (
                              <CommandItem
                                value={country.label}
                                key={country.value}
                                onSelect={() => {
                                  form.setValue('departmentId', country.value);
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
          </div>
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="jobId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Job Name</FormLabel>
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
                            ? jobs.find((job: any) => job.value === field.value)
                                ?.label
                            : 'Select Job Title'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Job ..." />
                        <CommandList>
                          <CommandEmpty>No Job found.</CommandEmpty>
                          <CommandGroup>
                            {jobs.map((job: any) => (
                              <CommandItem
                                value={job.label}
                                key={job.value}
                                onSelect={() => {
                                  form.setValue('jobId', job.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    job.value === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {job.label}
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
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="managerId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Manager Name</FormLabel>
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
                            ? managers.find(
                                (manager: any) => manager.value === field.value
                              )?.label
                            : 'Select Manager Name'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Manager..." />
                        <CommandList>
                          <CommandEmpty>No Manager found.</CommandEmpty>
                          <CommandGroup>
                            {managers.map((manager: any) => (
                              <CommandItem
                                value={manager.label}
                                key={manager.value}
                                onSelect={() => {
                                  form.setValue('managerId', manager.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    manager.value === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {manager.label}
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

        <div className="flex gap-4">
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="nameInKaren"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name in Karen</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="employee name in karen"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="nameInBurmese"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name in Burmese</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="employee name in burmese"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3 pt-2">
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'pl-3 text-left font-normal',
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
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="fatherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Father Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="employee father name"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="motherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mother Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="employee mother name"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="employee gender"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="employee nationality"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="ethnicity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ethnicity</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="employee ethnicity"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="religion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Religion</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="employee religion"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="bloodType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Type</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="employee blood type"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="typeOfId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="employee type of id"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="idNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="employee id number"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="homeAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Home Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="employee home address"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="currentAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="employee current address"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="emergencyContactInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Contact Info</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="employee emergency contact info"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="placeCodeNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Place Code No</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="employee place code no"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3 pt-2">
            <FormField
              control={form.control}
              name="enrollInKNUDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Enroll in KNU Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'pl-3 text-left font-normal',
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
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="employeeCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="employee code"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="gradeLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade Level</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="employee grade level"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="currentContractPeriod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Contract Period</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="employee current contract period"
                      {...field}
                      value={field.value ?? 0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="propationPeriod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Propation Period</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="employee propation period"
                      {...field}
                      value={field.value ?? 0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="trainingLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Training Level</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="employee training level"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="workloads"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workloads</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="employee workloads"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3"></div>
        </div>

        {children}
      </form>
    </Form>
  );
}
