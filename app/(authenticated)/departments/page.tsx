'use memo';

import * as React from 'react';
import type { SearchParams } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';
import { DateRangePicker } from '@/components/date-range-picker';
import { Shell } from '@/components/shell';
// import { DepartmentsTableProvider } from '@/app/_components/_departments/departments-table-provider';
import { getDepartments } from '@/app/_lib/_departments/queries';
// import { DepartmentsTable } from '@/app/_components/_departments/departments-table';
import { searchDepartmentParamsSchema } from '@/app/_lib/_departments/validations';
import { DepartmentsTableProvider } from '@/app/_components/_departments/departments-table-provider';
import { DepartmentsTable } from '@/app/_components/_departments/departments-table';

export interface IndexPageProps {
  searchParams: SearchParams;
}

export default async function IndexPage({ searchParams }: IndexPageProps) {
  const search = searchDepartmentParamsSchema.parse(searchParams);

  const departmentsPromise = getDepartments(search);

  return (
    <Shell className="gap-2">
      {/**
       * The `DepartmentsTableProvider` is use to enable some feature flags for the `DepartmentsTable` component.
       * Feel free to remove this, as it's not required for the `DepartmentsTable` component to work.
       */}
      <DepartmentsTableProvider>
        {/**
         * The `DateRangePicker` component is used to render the date range picker UI.
         * It is used to filter the departments based on the selected date range it was created at.
         * The business logic for filtering the departments based on the selected date range is handled inside the component.
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
          <DepartmentsTable departmentsPromise={departmentsPromise} />
        </React.Suspense>
      </DepartmentsTableProvider>
    </Shell>
  );
}
