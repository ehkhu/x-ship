import { type Table } from '@tanstack/react-table';
import { calculateAge, getFormattedDate } from './utils';
import {
  headerMapping,
  regMaritalOptions,
  sexOptions,
  typeOfVisit,
  yesNoOptions,
} from './constants';

export function exportTableToCSV<TData>(
  /**
   * The table to export.
   * @type Table<TData>
   */
  table: Table<TData>,
  opts: {
    /**
     * The filename for the CSV file.
     * @default "table"
     * @example "tasks"
     */
    filename?: string;
    /**
     * The columns to exclude from the CSV file.
     * @default []
     * @example ["select", "actions"]
     */
    excludeColumns?: (keyof TData | 'select' | 'actions')[];

    /**
     * Whether to export only the selected rows.
     * @default false
     */
    onlySelected?: boolean;
  } = {}
): void {
  const {
    filename = 'table',
    excludeColumns = [],
    onlySelected = false,
  } = opts;

  // Retrieve headers (column names)
  const headers = table
    .getAllLeafColumns()
    .map((column) => headerMapping[column.id] || column.id) // Use readable name or fallback to the internal name
    .filter(
      (id) => !excludeColumns.includes(id as 'select' | keyof TData | 'actions')
    );
  // .filter((id) => !excludeColumns.includes(id as keyof TData));

  // Build CSV content
  const csvContent = [
    headers.join(','), // Headers row with readable names
    ...(onlySelected
      ? table.getFilteredSelectedRowModel().rows
      : table.getRowModel().rows
    ).map((row) =>
      headers
        .map((header: any) => {
          const originalKey =
            Object.keys(headerMapping).find(
              (key) => headerMapping[key] === header
            ) || header;

          // Get the cell value based on the original key
          let cellValue = row.getValue(originalKey);

          // const cellValue = row.getValue(header);

          // Calculate age if the column is regAge
          if (originalKey === 'regAge') {
            const { regDate, regAge, regAgeUnit }: any = row.original;
            return calculateAge(regDate, regAge, regAgeUnit);
          }

          if (originalKey === 'regSex') {
            const { regSex }: any = row.original;
            const genderLabel =
              sexOptions.find((option: any) => option.value === regSex)
                ?.label || 'Unknown';
            return genderLabel;
          }
          if (originalKey === 'regType') {
            const { regType }: any = row.original;
            const typeLabel =
              typeOfVisit.find((option: any) => option.value === regType)
                ?.label || 'Unknown';
            return typeLabel;
          }
          if (originalKey === 'regMarital') {
            const { regMarital }: any = row.original;
            const maritalLabel =
              regMaritalOptions.find(
                (option: any) => option.value === regMarital
              )?.label || 'Unknown';
            return maritalLabel;
          }

          if (originalKey === 'regMigrant') {
            const { regMigrant }: any = row.original;
            const maritalLabel =
              yesNoOptions.find((option: any) => option.value === regMigrant)
                ?.label || 'Unknown';
            return maritalLabel;
          }

          if (originalKey === 'regAgeUnit') {
            const { regDate, regAge, regAgeUnit }: any = row.original;
            return calculateAge(regDate, regAge, regAgeUnit, true);
          }

          if (
            originalKey === 'regDate' ||
            originalKey === 'regInsert' ||
            originalKey === 'regUpdate'
          ) {
            const celldate = cellValue as Date;
            const formattedDate = celldate?.toLocaleDateString();
            return formattedDate;
          }
          //for patient export
          if (originalKey === 'parent') {
            const { regMother, regFather }: any = row.original;
            return `${regFather} / ${regMother}`;
          }
          //for user export
          if (
            originalKey === 'role' &&
            typeof cellValue === 'object' &&
            cellValue !== null
          ) {
            return `"${(cellValue as { name: string }).name.replace(/"/g, '""')}"`;
          }

          //export for patient
          if (
            originalKey === 'village' &&
            typeof cellValue === 'object' &&
            cellValue !== null
          ) {
            return `"${(cellValue as { villageName: string }).villageName.replace(/"/g, '""')}"`;
          }

          if (header === 'township') {
            const { village }: any = row.original || {};
            const township = village?.township;
            return `"${(township?.tspName || 'N/A').replace(/"/g, '""')}"`;
          }

          //export for patient
          if (
            originalKey === 'organization' &&
            typeof cellValue === 'object' &&
            cellValue !== null
          ) {
            return `"${(cellValue as { orgShortName: string }).orgShortName.replace(/"/g, '""')}"`;
          }

          // Handle values that might contain commas or newlines
          return typeof cellValue === 'string'
            ? `"${cellValue.replace(/"/g, '""')}"`
            : cellValue;
        })
        .join(',')
    ),
  ].join('\n');

  // Create a Blob with CSV content
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  // Create a link and trigger the download
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${getFormattedDate()}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
