'use client';

import * as React from 'react';
import {
  CircleBackslashIcon,
  DotsHorizontalIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { type ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Department } from '@/types/types-departments';
import { DeleteDepartmentsDialog } from './delete-department-dialog';
import { CreateDepartmentDialog } from './create-department-dialog';

export function getColumns(): ColumnDef<Department>[] {
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
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => <div className="w-30">{row.getValue('name')}</div>,
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: 'location',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Location" />
      ),
      cell: ({ row }) => {
        const location = row.getValue('location') as { streetAddress: string };
        return (
          <div className="flex items-center">
            <span className="capitalize">{location?.streetAddress}</span>
          </div>
        );
      },
      // filterFn: (row, id, value) => {
      //   return Array.isArray(value) && value.includes(row.getValue(id)?.name);
      // },
    },

    {
      accessorKey: 'managerName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Manager" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <span className="capitalize">{row.getValue('managerName')}</span>
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
        // const [showUpdateDepartmentSheet, setShowUpdateDepartmentSheet] =
        //   React.useState(false);
        const [showCreateDepartmentDialog, setShowCreateDepartmentDialog] =
          React.useState(false);
        const [showDeleteDepartmentDialog, setShowDeleteDepartmentDialog] =
          React.useState(false);

        return (
          <>
            {/* <UpdateDepartmentSheet
              open={showUpdateDepartmentSheet}
              onOpenChange={setShowUpdateDepartmentSheet}
              department={row.original}
            /> */}
            <DeleteDepartmentsDialog
              open={showDeleteDepartmentDialog}
              onOpenChange={setShowDeleteDepartmentDialog}
              departments={[row.original]}
              showTrigger={false}
              onSuccess={() => row.toggleSelected(false)}
            />

            <CreateDepartmentDialog
              openDialog={showCreateDepartmentDialog}
              isEdit={true}
              editData={row.original}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowDeleteDepartmentDialog(true)}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>

            {/* <DropdownMenu>
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
                  <CreateDepartmentDialog isEdit={true} editData={row.original} />
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => setShowDeleteDepartmentDialog(true)}
                >
                  Delete
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </>
        );
      },
    },
  ];
}
