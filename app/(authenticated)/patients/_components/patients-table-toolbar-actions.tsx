'use client';

import { DownloadIcon } from '@radix-ui/react-icons';
import { type Table } from '@tanstack/react-table';

import { exportTableToCSV } from '@/lib/export';
import { Button } from '@/components/ui/button';
import { Patient } from '@/types';
import { DeletePatientsDialog } from './delete-patient-dialog';

import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
// import { Patient } from '@/types/types-patients';
// import { DeletePatientsDialog } from './delete-patient-dialog';

interface PatientsTableToolbarActionsProps {
  table: Table<Patient>;
}

export function PatientsTableToolbarActions({
  table,
}: PatientsTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeletePatientsDialog
          patients={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null}
      {/* <CreatePatientDialog /> */}
      <Link href={'patients/create'}>
        <Button variant="outline" size="sm">
          <PlusIcon className="mr-2 size-4" aria-hidden="true" />
          New patient
        </Button>
      </Link>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          exportTableToCSV(table, {
            filename: 'patients',
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
