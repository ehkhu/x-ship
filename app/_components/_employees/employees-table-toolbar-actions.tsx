'use client';

import { DownloadIcon } from '@radix-ui/react-icons';
import { type Table } from '@tanstack/react-table';

import { exportTableToCSV } from '@/lib/export';
import { Button } from '@/components/ui/button';
import { Employee } from '@/types/types-employees';
import { DeleteEmployeesDialog } from './delete-employee-dialog';

import { CreateEmployeeDialog } from './create-employee-dialog';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

interface EmployeesTableToolbarActionsProps {
  table: Table<Employee>;
}

export function EmployeesTableToolbarActions({
  table,
}: EmployeesTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteEmployeesDialog
          employees={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null}
      {/* <CreateEmployeeDialog /> */}
      <Link
        href={'/employees/create'}
        className="flex items-center gap-2"
        passHref={true}
      >
        <Button variant="outline" size="sm">
          <PlusIcon className="mr-2 size-4" aria-hidden="true" />
          New Employee
        </Button>
      </Link>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          exportTableToCSV(table, {
            filename: 'employees',
            excludeColumns: ['select', 'actions'],
          })
        }
      >
        <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
        Export
      </Button>
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  );
}
