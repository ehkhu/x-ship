'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import {
  regMaritalOptions,
  regPlaceOptions,
  sexOptions,
  typeOfVisit,
} from '@/lib/constants';
import { calculateAge } from '@/lib/utils';
import { ChevronLeft, MoveLeft, Pencil } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const patientFields = [
  { key: 'regId', label: 'Register ID' },
  { key: 'regName', label: 'Name' },
  { key: 'regDate', label: 'Register Date', format: 'date' },
  { key: 'regPlace', label: 'Register Place' },
  { key: 'regVillage', label: 'Register Village' },
  { key: 'regAge', label: 'Age' },
  { key: 'regAgeUnit', label: 'Age Unit' },
  { key: 'regSex', label: 'Gender' },
  { key: 'regType', label: 'Register Type' },
  { key: 'regMarital', label: 'Marital Status' },
  { key: 'regMother', label: "Mother's Name" },
  { key: 'regFather', label: "Father's Name" },
  { key: 'regAddress', label: 'Address' },
  { key: 'regEthnic', label: 'Ethnic Group' },
  { key: 'regRefFrom', label: 'Referred From' },
  { key: 'regRemark', label: 'Remarks' },
];

export default function PatientDetailPage({ patient }: any) {
  const router = useRouter();
  return (
    <>
      <div className="space-y-4 w-1/2">
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()} size="icon">
            <ChevronLeft />
          </Button>
          <Link className="" href={'/patients/' + patient.regId + '/edit'}>
            <Button variant="outline" size="icon">
              <Pencil></Pencil>
            </Button>
          </Link>
        </div>
        <Card className="py-2 ">
          <CardHeader>
            <CardTitle>Patient</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {patientFields.map((field) => {
                  let value = patient[field.key] || 'N/A';

                  if (field.format === 'date' && value !== 'N/A') {
                    value = new Date(value).toLocaleDateString(); // Or use date-fns for custom formatting
                  }

                  if (field.key === 'regSex') {
                    value =
                      sexOptions.find((option: any) => option.value === value)
                        ?.label || 'Unknown';
                  }

                  // Handle regMarital field
                  if (field.key === 'regMarital') {
                    value =
                      regMaritalOptions.find((option) => option.value === value)
                        ?.label || 'Unknown';
                  }

                  // Handle regAgeUnit field
                  if (field.key === 'regAgeUnit') {
                    const { regDate, regAge, regAgeUnit }: any = patient;
                    value = calculateAge(regDate, regAge, regAgeUnit, true);
                  }
                  if (field.key === 'regAge') {
                    const { regDate, regAge, regAgeUnit }: any = patient;
                    value = calculateAge(regDate, regAge, regAgeUnit);
                  }

                  // Handle regType field
                  if (field.key === 'regType') {
                    value =
                      typeOfVisit.find((option) => option.value === value)
                        ?.label || 'Unknown';
                  }

                  if (field.key === 'regPlace') {
                    value =
                      regPlaceOptions.find((option) => option.value === value)
                        ?.label || 'Unknown';
                  }

                  return (
                    <TableRow key={field.key}>
                      <TableHead className="w-1/4">{field.label}</TableHead>
                      <TableCell className="w-3/4">{value}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Village Information Card */}
        {patient.village && (
          <Card className="">
            <CardHeader>
              <CardTitle>Village</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableHead className="w-1/4"> Name</TableHead>
                    <TableCell className="w-3/4">
                      {' '}
                      {patient.village.villageName}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/4"> Code</TableHead>
                    <TableCell className="w-3/4">
                      {patient.village.villageCode}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/4">Township</TableHead>
                    <TableCell className="w-3/4">
                      {patient.village.township.tspName}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* Add other fields as needed */}
            </CardContent>
          </Card>
        )}

        {/* Organization Information Card */}
        {patient.organization && (
          <Card className="">
            <CardHeader>
              <CardTitle>Organization</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableHead className="w-1/4"> Name</TableHead>
                    <TableCell className="w-3/4">
                      {' '}
                      {patient.organization.orgName}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/4"> Short Name</TableHead>
                    <TableCell className="w-3/4">
                      {patient.organization.orgShortName}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
