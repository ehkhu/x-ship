'use client';

import { DownloadIcon } from '@radix-ui/react-icons';
import { type Table } from '@tanstack/react-table';

import { exportTableToCSV } from '@/lib/export';
import { Button } from '@/components/ui/button';
import { User } from '@/types';
import { DeleteUsersDialog } from './delete-user-dialog';
import { CreateUserDialog } from './create-user-dialog';
// import { User } from '@/types/types-users';
// import { DeleteUsersDialog } from './delete-user-dialog';

// import { CreateUserDialog } from './create-user-dialog';

interface UsersTableToolbarActionsProps {
  table: Table<User>;
}

export function UsersTableToolbarActions({
  table,
}: UsersTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteUsersDialog
          users={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null}
      <CreateUserDialog />
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          exportTableToCSV(table, {
            filename: 'users',
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
