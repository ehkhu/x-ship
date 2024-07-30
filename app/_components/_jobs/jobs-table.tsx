'use client';
'use memo';

import * as React from 'react';

// import { Job, type DataTableFilterField } from '@/types';

import { useDataTable } from '@/hooks/use-data-table';
import { DataTableAdvancedToolbar } from '@/components/data-table/advanced/data-table-advanced-toolbar';
import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';

// import { type getJobs } from '../_lib/queries';
// import { getPriorityIcon, getStatusIcon } from '../_lib/utils';
import { getColumns } from './jobs-table-columns';
import { type getJobs } from '@/app/_lib/_jobs/queries';
import { useJobsTable } from './jobs-table-provider';
import { DataTableFilterField } from '@/types';
import { type Job } from '@/types/types-jobs';
import { JobsTableFloatingBar } from './jobs-table-floating-bar';
import { JobsTableToolbarActions } from './jobs-table-toolbar-actions';
// import { JobsTableFloatingBar } from './jobs-table-floating-bar';
// import { useJobsTable } from './jobs-table-provider';
// import { JobsTableToolbarActions } from './jobs-table-toolbar-actions';
// import { jobs } from '@/db/constent';

interface JobsTableProps {
  jobsPromise: ReturnType<typeof getJobs>;
}

export function JobsTable({ jobsPromise }: JobsTableProps) {
  // Feature flags for showcasing some additional features. Feel free to remove them.
  const { featureFlags } = useJobsTable();

  const { data, pageCount } = React.use(jobsPromise);

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
  const filterFields: DataTableFilterField<Job>[] = [
    {
      label: 'jobTitle',
      value: 'jobTitle',
      placeholder: 'Filter job titles...',
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
          <JobsTableFloatingBar table={table} />
        ) : null
      }
    >
      {/* {featureFlags.includes('advancedFilter') ? (
        <DataTableAdvancedToolbar table={table} filterFields={filterFields}>
          <JobsTableToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      ) : (
        <DataTableToolbar table={table} filterFields={filterFields}>
          <JobsTableToolbarActions table={table} />
        </DataTableToolbar>
      )} */}

      <DataTableToolbar table={table} filterFields={filterFields}>
        <JobsTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
