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
import { User } from '@/types';
import { DeleteUsersDialog } from './delete-user-dialog';
import { UpdateUserSheet } from './update-user-sheet';
import Link from 'next/link';

export function getColumns(): ColumnDef<User>[] {
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
      accessorKey: 'userId',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => <div className="w-20">{row.getValue('userId')}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'userFullName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue('userFullName')}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'userName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="User Name" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex w-[6.25rem] items-center">
            <span className="capitalize">{row.getValue('userName')}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: 'createdDate',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Create At" />
      ),
      cell: ({ row }) => {
        const createdDate = row.getValue('createdDate') as Date;
        const formattedDate = createdDate?.toLocaleDateString();
        return (
          <div className="flex w-[6.25rem] items-center">
            <span>{formattedDate}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'role',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
      cell: ({ row }) => {
        const role = row.getValue('role') as { name: string };
        return (
          <div className="flex items-center">
            {role?.name && <Badge variant="outline">{role?.name}</Badge>}
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
        const [showUpdateUserSheet, setShowUpdateUserSheet] =
          React.useState(false);
        const [showDeleteUserDialog, setShowDeleteUserDialog] =
          React.useState(false);

        return (
          <>
            <UpdateUserSheet
              open={showUpdateUserSheet}
              onOpenChange={setShowUpdateUserSheet}
              user={row.original}
            />
            <DeleteUsersDialog
              open={showDeleteUserDialog}
              onOpenChange={setShowDeleteUserDialog}
              users={[row.original]}
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
                <DropdownMenuItem>
                  <Link
                    className="w-full"
                    href={'/users/' + row.original.userId}
                  >
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setShowUpdateUserSheet(true)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => setShowDeleteUserDialog(true)}
                >
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
