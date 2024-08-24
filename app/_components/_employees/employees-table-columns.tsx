'use client';

import * as React from 'react';
import { CircleBackslashIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
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
import { Employee } from '@/types/types-employees';
import { DeleteEmployeesDialog } from './delete-employee-dialog';
// import { CreateEmployeeDialog } from './create-employee-dialog';
import { format } from 'date-fns';
import Link from 'next/link';
import { PencilIcon, TrashIcon } from 'lucide-react';

export function getColumns(): ColumnDef<Employee>[] {
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
      cell: ({ row }) => (
        <div className="w-30 font-medium truncate">{row.getValue('name')}</div>
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => (
        <div className="w-30 truncate">{row.getValue('email')}</div>
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: 'phoneNumber',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phone Number" />
      ),
      cell: ({ row }) => (
        <div className="w-30 truncate">{row.getValue('phoneNumber')}</div>
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: 'hireDate',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hire Date" />
      ),
      cell: ({ row }) => {
        const hireDate = row.getValue('hireDate');

        // Define a consistent format for both server and client
        const formattedDate = hireDate
          ? format(new Date(hireDate + ''), 'dd/MM/yyyy') // Choose a specific format like dd/MM/yyyy
          : 'N/A';

        return <div className="w-30 truncate">{formattedDate}</div>;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: 'job',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Job" />
      ),
      cell: ({ row }) => {
        const job = row.getValue('job') as { jobTitle: string };
        return (
          <div className="flex items-center">
            <span className="capitalize">{job?.jobTitle}</span>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'salary',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Salary" />
      ),
      cell: ({ row }) => (
        <div className="w-30 truncate">{row.getValue('salary')}</div>
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: 'commissionPct',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Commission Percent" />
      ),
      cell: ({ row }) => (
        <div className="w-30 truncate">{row.getValue('commissionPct')}</div>
      ),
      enableSorting: true,
      enableHiding: true,
    },

    {
      accessorKey: 'department',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Department" />
      ),
      cell: ({ row }) => {
        const department = row.getValue('department') as { name: string };
        return (
          <div className="flex items-center">
            <span className="capitalize">{department?.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'manager',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Manager" />
      ),
      cell: ({ row }) => {
        const manager = row.getValue('manager') as { name: string };
        return (
          <div className="flex items-center">
            <span className="capitalize">{manager?.name}</span>
          </div>
        );
      },
    },
    {
      id: 'actions',
      cell: function Cell({ row }) {
        const [isUpdatePending, startUpdateTransition] = React.useTransition();
        // const [showUpdateEmployeeSheet, setShowUpdateEmployeeSheet] =
        //   React.useState(false);
        const [showCreateEmployeeDialog, setShowCreateEmployeeDialog] =
          React.useState(false);
        const [showDeleteEmployeeDialog, setShowDeleteEmployeeDialog] =
          React.useState(false);

        return (
          <>
            <DeleteEmployeesDialog
              open={showDeleteEmployeeDialog}
              onOpenChange={setShowDeleteEmployeeDialog}
              employees={[row.original]}
              showTrigger={false}
              onSuccess={() => row.toggleSelected(false)}
            />
            <div className="flex">
              {/* <CreateEmployeeDialog
                openDialog={showCreateEmployeeDialog}
                isEdit={true}
                editData={row.original}
              /> */}
              <Link
                href={'/employees/1/edit'}
                className="flex items-center gap-2"
                passHref={true}
              >
                <Button variant="ghost" size="sm">
                  <PencilIcon
                    className="opacity-50 size-4"
                    aria-hidden="true"
                  />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowDeleteEmployeeDialog(true)}
              >
                <TrashIcon className="opacity-50 size-4" aria-hidden="true" />
              </Button>
            </div>

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
                  <CreateEmployeeDialog isEdit={true} editData={row.original} />
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => setShowDeleteEmployeeDialog(true)}
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
