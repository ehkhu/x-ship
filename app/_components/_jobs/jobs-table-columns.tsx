'use client';

import * as React from 'react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { type ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';

import { getErrorMessage } from '@/lib/handle-error';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Job } from '@/types/types-jobs';
import { UpdateJobSheet } from './update-job-sheet';
import { DeleteJobsDialog } from './delete-job-dialog';

// import { updateTask } from '../_lib/actions';
// import { getPriorityIcon, getStatusIcon } from '../_lib/utils';
// import { DeleteTasksDialog } from './delete-job-dialog';
// import { UpdateTaskSheet } from './update-job-sheet';
// import { tasks } from '@/db/constent';
// import { Task } from '@/types';

export function getColumns(): ColumnDef<Job>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'code',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
      cell: ({ row }) => <div className="w-20">{row.getValue('code')}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'jobTitle',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Job Title" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue('jobTitle')}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'minSalary',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Minimum Salary" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex w-[6.25rem] items-center">
            <span className="capitalize">{row.getValue('minSalary')}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: 'maxSalary',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Maximum Salary" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <span className="capitalize">{row.getValue('maxSalary')}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id));
      },
    },
    {
      id: 'actions',
      cell: function Cell({ row }) {
        const [isUpdatePending, startUpdateTransition] = React.useTransition();
        const [showUpdateJobSheet, setShowUpdateJobSheet] =
          React.useState(false);
        const [showDeleteJobDialog, setShowDeleteJobDialog] =
          React.useState(false);

        return (
          <>
            <UpdateJobSheet
              open={showUpdateJobSheet}
              onOpenChange={setShowUpdateJobSheet}
              job={row.original}
            />
            <DeleteJobsDialog
              open={showDeleteJobDialog}
              onOpenChange={setShowDeleteJobDialog}
              jobs={[row.original]}
              showTrigger={false}
              onSuccess={() => row.toggleSelected(false)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  className="flex size-8 p-0 data-[state=open]:bg-muted"
                >
                  <DotsHorizontalIcon className="size-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onSelect={() => setShowUpdateJobSheet(true)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setShowDeleteJobDialog(true)}>
                  Delete
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ];
}
