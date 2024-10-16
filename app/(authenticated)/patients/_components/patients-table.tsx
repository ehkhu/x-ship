'use client';
'use memo';

import * as React from 'react';

import { useDataTable } from '@/hooks/use-data-table';
import { DataTableAdvancedToolbar } from '@/components/data-table/advanced/data-table-advanced-toolbar';
import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { getPatients } from '../_lib/queries';
import { DataTableFilterField, Patient } from '@/types';
import { PatientsTableFloatingBar } from './patients-table-floating-bar';
import { PatientsTableToolbarActions } from './patients-table-toolbar-actions';
import { getColumns } from './patients-table-columns';
import { usePatientsTable } from './patients-table-provider';

interface PatientsTableProps {
  patientsPromise: ReturnType<typeof getPatients>;
}

export function PatientsTable({ patientsPromise }: PatientsTableProps) {
  // Feature flags for showcasing some additional features. Feel free to remove them.
  const { featureFlags } = usePatientsTable();

  const { data, pageCount } = React.use(patientsPromise);

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
  const filterFields: DataTableFilterField<Patient>[] = [
    {
      label: 'regId',
      value: 'regId',
      placeholder: 'Filter ID...',
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
    defaultSort: 'regDate.desc',
  });

  return (
    <DataTable
      table={table}
      floatingBar={
        featureFlags.includes('floatingBar') ? (
          <PatientsTableFloatingBar table={table} />
        ) : null
      }
    >
      {/* {featureFlags.includes('advancedFilter') ? (
        <DataTableAdvancedToolbar table={table} filterFields={filterFields}>
          <PatientsTableToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      ) : (
        <DataTableToolbar table={table} filterFields={filterFields}>
          <PatientsTableToolbarActions table={table} />
        </DataTableToolbar>
      )} */}

      <DataTableToolbar table={table} filterFields={filterFields}>
        <PatientsTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
