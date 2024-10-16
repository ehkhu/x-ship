'use memo';

import * as React from 'react';
import type { SearchParams } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';
import { DateRangePicker } from '@/components/date-range-picker';
import { Shell } from '@/components/shell';
import { searchPatientParamsSchema } from './_lib/validations';
import { getPatients } from './_lib/queries';
import { PatientsTableProvider } from './_components/patients-table-provider';
import { PatientsTable } from './_components/patients-table';

export interface IndexPageProps {
  searchParams: SearchParams;
}

export default async function IndexPage({ searchParams }: IndexPageProps) {
  const search = searchPatientParamsSchema.parse(searchParams);

  const patientsPromise = getPatients(search);

  return (
    <Shell className="gap-2">
      {/**
       * The `PatientsTableProvider` is use to enable some feature flags for the `PatientsTable` component.
       * Feel free to remove this, as it's not required for the `PatientsTable` component to work.
       */}
      <PatientsTableProvider>
        {/**
         * The `DateRangePicker` component is used to render the date range picker UI.
         * It is used to filter the patients based on the selected date range it was created at.
         * The business logic for filtering the patients based on the selected date range is handled inside the component.
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
              cellWidths={['20rem', '10rem', '12rem', '12rem', '8rem']}
              shrinkZero
            />
          }
        >
          {/**
           * Passing promises and consuming them using React.use for triggering the suspense fallback.
           * @see https://react.dev/reference/react/use
           */}
          <PatientsTable patientsPromise={patientsPromise} />
        </React.Suspense>
      </PatientsTableProvider>
    </Shell>
  );
}
