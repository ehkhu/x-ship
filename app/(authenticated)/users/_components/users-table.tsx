'use client';
'use memo';

import * as React from 'react';

// import { User, type DataTableFilterField } from '@/types';

import { useDataTable } from '@/hooks/use-data-table';
import { DataTableAdvancedToolbar } from '@/components/data-table/advanced/data-table-advanced-toolbar';
import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { getUsers } from '../_lib/queries';
import { DataTableFilterField, User } from '@/types';
import { UsersTableFloatingBar } from './users-table-floating-bar';
import { UsersTableToolbarActions } from './users-table-toolbar-actions';
import { getColumns } from './users-table-columns';
import { useUsersTable } from './users-table-provider';

interface UsersTableProps {
  usersPromise: ReturnType<typeof getUsers>;
}

export function UsersTable({ usersPromise }: UsersTableProps) {
  // Feature flags for showcasing some additional features. Feel free to remove them.
  const { featureFlags } = useUsersTable();

  const { data, pageCount } = React.use(usersPromise);

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
  const filterFields: DataTableFilterField<User>[] = [
    {
      label: 'userFullName',
      value: 'userFullName',
      placeholder: 'Filter name...',
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
    defaultSort: 'userFullName.desc',
  });

  return (
    <DataTable
      table={table}
      floatingBar={
        featureFlags.includes('floatingBar') ? (
          <UsersTableFloatingBar table={table} />
        ) : null
      }
    >
      {/* {featureFlags.includes('advancedFilter') ? (
        <DataTableAdvancedToolbar table={table} filterFields={filterFields}>
          <UsersTableToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      ) : (
        <DataTableToolbar table={table} filterFields={filterFields}>
          <UsersTableToolbarActions table={table} />
        </DataTableToolbar>
      )} */}

      <DataTableToolbar table={table} filterFields={filterFields}>
        <UsersTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
