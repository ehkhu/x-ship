'use client';

import * as React from 'react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { type ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';

import { getErrorMessage } from '@/lib/handle-error';
import { calculateAge } from '@/lib/utils';
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
import { Patient } from '@/types';
import { DeletePatientsDialog } from './delete-patient-dialog';

import Link from 'next/link';
import {
  regMaritalOptions,
  sexOptions,
  typeOfVisit,
  yesNoOptions,
} from '@/lib/constants';

export function getColumns(): ColumnDef<Patient>[] {
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
      accessorKey: 'regId',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => <div className="w-20">{row.getValue('regId')}</div>,
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: 'regDate',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Retister Date" />
      ),
      cell: ({ row }) => {
        const regDate = row.getValue('regDate') as Date; // Get the Date object
        const formattedDate = regDate.toLocaleDateString(); // Convert it to a string
        return (
          <div className="flex w-[6.25rem] items-center">
            <span>{formattedDate}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'regName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex w-[6.25rem] items-center">
            <span className="capitalize">{row.getValue('regName')}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: 'regAge',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Age" />
      ),
      cell: ({ row }) => {
        const age = calculateAge(
          row.original.regDate,
          row.original.regAge,
          row.original.regAgeUnit
        );
        return (
          <div className="flex w-[6.25rem] items-center">
            <span>{age}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'regAgeUnit',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Age Unit" />
      ),
      cell: ({ row }) => {
        const ageUnit = calculateAge(
          row.original.regDate,
          row.original.regAge,
          row.original.regAgeUnit,
          true
        );
        return (
          <div className="flex w-[6.25rem] items-center">
            <span>{ageUnit}</span>
          </div>
        );
      },
    },

    {
      accessorKey: 'regSex',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Gender" />
      ),
      cell: ({ row }) => {
        const regSexValue = row.getValue('regSex');
        const genderLabel =
          sexOptions.find((option: any) => option.value === regSexValue)
            ?.label || 'Unknown';

        return (
          <div className="flex w-[6.25rem] items-center">
            <span>{genderLabel}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'regType',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      cell: ({ row }) => {
        const regTypeValue = row.getValue('regType');
        const regTypeLabel =
          typeOfVisit.find((option: any) => option.value === regTypeValue)
            ?.label || 'Unknown';

        return (
          <div className="flex w-[6.25rem] items-center">
            <span>{regTypeLabel}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'regMarital',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Marital" />
      ),
      cell: ({ row }) => {
        const regMaritalValue = row.getValue('regMarital');
        const regMaritalLabel =
          regMaritalOptions.find(
            (option: any) => option.value === regMaritalValue
          )?.label || 'Unknown';

        return (
          <div className="flex w-[6.25rem] items-center">
            <span>{regMaritalLabel}</span>
          </div>
        );
      },
    },

    {
      accessorKey: 'regFather',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Father" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex w-[6.25rem] items-center">
            <span>{row.getValue('regFather')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'regMother',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Mother" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex w-[6.25rem] items-center">
            <span>{row.getValue('regMother')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'regAddress',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Address" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex w-[6.25rem] items-center">
            <span>{row.getValue('regAddress')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'village',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Village" />
      ),
      cell: ({ row }) => {
        const villageName = row.getValue('village') as { villageName: string };
        return (
          <div className="flex w-[6.25rem] items-center">
            <span>{`${villageName?.villageName} `}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'township', // Or another key if necessary
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Township" />
      ),
      cell: ({ row }) => {
        const village = (row.original as any).village;
        const tspName = village?.township?.tspName;

        return (
          <div className="flex w-[6.25rem] items-center">
            <span>{tspName || 'N/A'}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'organization',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Organization" />
      ),
      cell: ({ row }) => {
        const org = row.getValue('organization') as { orgShortName: string };
        return (
          <div className="flex w-[6.25rem] items-center">
            <span>{`${org?.orgShortName} `}</span>
          </div>
        );
      },
    },

    // regEthnic
    {
      accessorKey: 'regEthnic',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ethnic" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex w-[6.25rem] items-center">
            <span>{row.getValue('regEthnic')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'regRefFrom',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="RefFrom" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex w-[6.25rem] items-center">
            <span>{row.getValue('regRefFrom')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'regRemark',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Remark" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex w-[6.25rem] items-center">
            <span>{row.getValue('regRemark')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'regInsert',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Insert" />
      ),
      cell: ({ row }) => {
        const regInsert = row.getValue('regInsert') as Date;
        const formattedDate = regInsert?.toLocaleDateString();
        return (
          <div className="flex w-[6.25rem] items-center">
            <span>{formattedDate}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'regUpdate',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Update" />
      ),
      cell: ({ row }) => {
        const regUpdate = row.getValue('regUpdate') as Date;
        const formattedDate = regUpdate?.toLocaleDateString();
        return (
          <div className="flex w-[6.25rem] items-center">
            <span>{formattedDate}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'regMigrant',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Migrant" />
      ),
      cell: ({ row }) => {
        const regMigrantValue = row.getValue('regMigrant');
        const regMigrantLabel =
          yesNoOptions.find((option: any) => option.value === regMigrantValue)
            ?.label || 'Unknown';
        return (
          <div className="flex w-[6.25rem] items-center">
            <span>{regMigrantLabel}</span>
          </div>
        );
      },
    },

    {
      id: 'actions',
      cell: function Cell({ row }) {
        const [isUpdatePending, startUpdateTransition] = React.useTransition();
        const [showUpdatePatientSheet, setShowUpdatePatientSheet] =
          React.useState(false);
        const [showDeletePatientDialog, setShowDeletePatientDialog] =
          React.useState(false);

        return (
          <>
            {/* <UpdatePatientSheet
              open={showUpdatePatientSheet}
              onOpenChange={setShowUpdatePatientSheet}
              patient={row.original}
            /> */}
            <DeletePatientsDialog
              open={showDeletePatientDialog}
              onOpenChange={setShowDeletePatientDialog}
              patients={[row.original]}
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
                    href={'/patients/' + row.original.regId}
                  >
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    className="w-full"
                    href={'/patients/' + row.original.regId + '/edit'}
                  >
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => setShowDeletePatientDialog(true)}
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
