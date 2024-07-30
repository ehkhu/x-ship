'use memo';

import * as React from 'react';
import type { SearchParams } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';
import { DateRangePicker } from '@/components/date-range-picker';
import { Shell } from '@/components/shell';
// import { LocationsTableProvider } from '@/app/_components/_locations/locations-table-provider';
import { getLocations } from '@/app/_lib/_locations/queries';
// import { LocationsTable } from '@/app/_components/_locations/locations-table';
import { searchLocationParamsSchema } from '@/app/_lib/_locations/validations';
import { LocationsTableProvider } from '@/app/_components/_locations/locations-table-provider';
import { LocationsTable } from '@/app/_components/_locations/locations-table';

export interface IndexPageProps {
  searchParams: SearchParams;
}

export default async function IndexPage({ searchParams }: IndexPageProps) {
  const search = searchLocationParamsSchema.parse(searchParams);

  const locationsPromise = getLocations(search);

  return (
    <Shell className="gap-2">
      {/**
       * The `LocationsTableProvider` is use to enable some feature flags for the `LocationsTable` component.
       * Feel free to remove this, as it's not required for the `LocationsTable` component to work.
       */}
      <LocationsTableProvider>
        {/**
         * The `DateRangePicker` component is used to render the date range picker UI.
         * It is used to filter the locations based on the selected date range it was created at.
         * The business logic for filtering the locations based on the selected date range is handled inside the component.
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
          <LocationsTable locationsPromise={locationsPromise} />
        </React.Suspense>
      </LocationsTableProvider>
    </Shell>
  );
}
