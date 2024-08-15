'use client';
'use memo';

import * as React from 'react';

import { useDataTable } from '@/hooks/use-data-table';

import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';

import { getColumns } from './employees-table-columns';
import { type getEmployees } from '@/app/_lib/_employees/queries';
import { useEmployeesTable } from './employees-table-provider';
import { DataTableFilterField } from '@/types';
import { type Employee } from '@/types/types-employees';
import { EmployeesTableFloatingBar } from './employees-table-floating-bar';
import { EmployeesTableToolbarActions } from './employees-table-toolbar-actions';

interface EmployeesTableProps {
  employeesPromise: ReturnType<typeof getEmployees>;
}

export function EmployeesTable({ employeesPromise }: EmployeesTableProps) {
  // Feature flags for showcasing some additional features. Feel free to remove them.
  const { featureFlags } = useEmployeesTable();

  const { data, pageCount } = React.use(employeesPromise);

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
  const filterFields: DataTableFilterField<Employee>[] = [
    {
      label: 'name',
      value: 'name',
      placeholder: 'Filter employee addresses...',
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
          <EmployeesTableFloatingBar table={table} />
        ) : null
      }
    >
      {/* {featureFlags.includes('advancedFilter') ? (
        <DataTableAdvancedToolbar table={table} filterFields={filterFields}>
          <EmployeesTableToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      ) : (
        <DataTableToolbar table={table} filterFields={filterFields}>
          <EmployeesTableToolbarActions table={table} />
        </DataTableToolbar>
      )} */}

      <DataTableToolbar table={table} filterFields={filterFields}>
        <EmployeesTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
