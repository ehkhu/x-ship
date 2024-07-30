'use client';
'use memo';

import * as React from 'react';

import { useDataTable } from '@/hooks/use-data-table';

import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';

import { getColumns } from './locations-table-columns';
import { type getLocations } from '@/app/_lib/_locations/queries';
import { useLocationsTable } from './locations-table-provider';
import { DataTableFilterField } from '@/types';
import { type Location } from '@/types/types-locations';
import { LocationsTableFloatingBar } from './locations-table-floating-bar';
import { LocationsTableToolbarActions } from './locations-table-toolbar-actions';

interface LocationsTableProps {
  locationsPromise: ReturnType<typeof getLocations>;
}

export function LocationsTable({ locationsPromise }: LocationsTableProps) {
  // Feature flags for showcasing some additional features. Feel free to remove them.
  const { featureFlags } = useLocationsTable();

  const { data, pageCount } = React.use(locationsPromise);

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => getColumns(), []);

  /**
   * This component can render either a faceted filter or a search filter based on the `options` prop.
   *
   * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
   *
   * Each `option` object has the following properties:
   * @prop {string} label - The label for the filter option.
   * @prop {string} value - The value for the filter option.
   * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
   * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
   */
  const filterFields: DataTableFilterField<Location>[] = [
    {
      label: 'streetAddress',
      value: 'streetAddress',
      placeholder: 'Filter location addresses...',
    },
  ];

  const { table } = useDataTable({
    data,
    columns: columns ?? [],
    pageCount: pageCount ?? 0,
    // optional props
    filterFields,
    enableAdvancedFilter: featureFlags.includes('advancedFilter'),
    defaultPerPage: 10,
    defaultSort: 'id.desc',
  });

  return (
    <DataTable
      table={table}
      floatingBar={
        featureFlags.includes('floatingBar') ? (
          <LocationsTableFloatingBar table={table} />
        ) : null
      }
    >
      {/* {featureFlags.includes('advancedFilter') ? (
        <DataTableAdvancedToolbar table={table} filterFields={filterFields}>
          <LocationsTableToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      ) : (
        <DataTableToolbar table={table} filterFields={filterFields}>
          <LocationsTableToolbarActions table={table} />
        </DataTableToolbar>
      )} */}

      <DataTableToolbar table={table} filterFields={filterFields}>
        <LocationsTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
