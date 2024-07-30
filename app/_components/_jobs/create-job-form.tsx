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

import { CreateJobSchema, updateJobSchema } from '@/app/_lib/_jobs/validations';

import { Input } from '@/components/ui/input';

interface CreateJobFormProps
  extends Omit<React.ComponentPropsWithRef<'form'>, 'onSubmit'> {
  children: React.ReactNode;
  form: UseFormReturn<CreateJobSchema>;
  onSubmit: (data: CreateJobSchema) => void;
}

export function CreateJobForm({
  // form,
  onSubmit,
  children,
}: CreateJobFormProps) {
  const form = useForm<CreateJobSchema>({
    resolver: zodResolver(updateJobSchema),
    defaultValues: {
      jobTitle: '',
      minSalary: 0,
      maxSalary: 0,
      code: '',
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Job title"
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
          name="minSalary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Min Salary</FormLabel>
              <FormControl>
                <Input
                  placeholder="Job title"
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
          name="maxSalary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Salary</FormLabel>
              <FormControl>
                <Input
                  placeholder="Job title"
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
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code </FormLabel>
              <FormControl>
                <Input placeholder="Code" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  );
}
