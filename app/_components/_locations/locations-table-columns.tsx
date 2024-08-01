'use client';

import * as React from 'react';
import { DotsHorizontalIcon, TrashIcon } from '@radix-ui/react-icons';
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
import { Location } from '@/types/types-locations';
import { DeleteLocationsDialog } from './delete-location-dialog';
import { CreateLocationDialog } from './create-location-dialog';

export function getColumns(): ColumnDef<Location>[] {
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
      accessorKey: 'streetAddress',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Street Address" />
      ),
      cell: ({ row }) => (
        <div className="w-20">{row.getValue('streetAddress')}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'postalCode',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Postal Code" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue('postalCode')}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'city',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="City" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex w-[6.25rem] items-center">
            <span className="capitalize">{row.getValue('city')}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: 'stateProvince',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="State Province" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <span className="capitalize">{row.getValue('stateProvince')}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: 'countryName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Country" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <span className="capitalize">{row.getValue('countryName')}</span>
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
        // const [showUpdateLocationSheet, setShowUpdateLocationSheet] =
        //   React.useState(false);
        const [showCreateLocationDialog, setShowCreateLocationDialog] =
          React.useState(false);
        const [showDeleteLocationDialog, setShowDeleteLocationDialog] =
          React.useState(false);

        return (
          <>
            {/* <UpdateLocationSheet
              open={showUpdateLocationSheet}
              onOpenChange={setShowUpdateLocationSheet}
              location={row.original}
            /> */}
            <DeleteLocationsDialog
              open={showDeleteLocationDialog}
              onOpenChange={setShowDeleteLocationDialog}
              locations={[row.original]}
              showTrigger={false}
              onSuccess={() => row.toggleSelected(false)}
            />

            <CreateLocationDialog
              openDialog={showCreateLocationDialog}
              isEdit={true}
              editData={row.original}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowDeleteLocationDialog(true)}
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
                  <CreateLocationDialog isEdit={true} editData={row.original} />
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => setShowDeleteLocationDialog(true)}
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
