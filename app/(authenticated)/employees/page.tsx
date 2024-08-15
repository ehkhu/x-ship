'use memo';

import * as React from 'react';
import type { SearchParams } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';
import { DateRangePicker } from '@/components/date-range-picker';
import { Shell } from '@/components/shell';
// import { EmployeesTableProvider } from '@/app/_components/_employees/employees-table-provider';
import { getEmployees } from '@/app/_lib/_employees/queries';
// import { EmployeesTable } from '@/app/_components/_employees/employees-table';
import { searchEmployeeParamsSchema } from '@/app/_lib/_employees/validations';
import { EmployeesTableProvider } from '@/app/_components/_employees/employees-table-provider';
import { EmployeesTable } from '@/app/_components/_employees/employees-table';

export interface IndexPageProps {
  searchParams: SearchParams;
}

export default async function IndexPage({ searchParams }: IndexPageProps) {
  const search = searchEmployeeParamsSchema.parse(searchParams);

  const employeesPromise = getEmployees(search);

  return (
    <Shell className="gap-2">
      {/**
       * The `EmployeesTableProvider` is use to enable some feature flags for the `EmployeesTable` component.
       * Feel free to remove this, as it's not required for the `EmployeesTable` component to work.
       */}
      <EmployeesTableProvider>
        {/**
         * The `DateRangePicker` component is used to render the date range picker UI.
         * It is used to filter the employees based on the selected date range it was created at.
         * The business logic for filtering the employees based on the selected date range is handled inside the component.
         */}
        <React.Suspense fallback={<Skeleton className="h-7 w-52" />}>
          <DateRangePicker
            triggerSize="sm"
            triggerClassName="ml-auto w-56 sm:w-60"
            align="end"
          />
        </React.Suspense>
        <React.Suspense
          fallback={
            <DataTableSkeleton
              columnCount={5}
              searchableColumnCount={1}
              filterableColumnCount={2}
              cellWidths={['10rem', '40rem', '12rem', '12rem', '8rem']}
              shrinkZero
            />
          }
        >
          {/**
           * Passing promises and consuming them using React.use for triggering the suspense fallback.
           * @see https://react.dev/reference/react/use
           */}
          <EmployeesTable employeesPromise={employeesPromise} />
        </React.Suspense>
      </EmployeesTableProvider>
    </Shell>
  );
}
