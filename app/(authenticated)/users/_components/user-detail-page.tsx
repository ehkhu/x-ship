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
  userStatus,
} from '@/lib/constants';
import { calculateAge } from '@/lib/utils';
import { ChevronLeft, Pencil } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const userFields = [
  { key: 'userId', label: 'ID' },
  { key: 'userFullName', label: 'Full Name' },
  // { key: 'userOrg', label: 'Organization' },
  { key: 'userName', label: 'UserName' },
  // { key: 'userType', label: 'Type' },
  { key: 'createdBy', label: 'Created By' },
  { key: 'createdDate', label: 'Created At', format: 'date' },
  { key: 'userStatus', label: 'Status' },
  // { key: 'userSalt', label: 'Register Type' },
  { key: 'userExpired', label: 'Expired', format: 'date' },
  { key: 'userCln', label: 'Clinic' },
];

export default function UserDetailPage({ user }: any) {
  const router = useRouter();
  return (
    <>
      <div className="space-y-4 lg:w-1/2 md:1/2">
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()} size="icon">
            <ChevronLeft />
          </Button>
          {/* <Link className="" href={'/users/' + user.userId + '/edit'}>
            <Button variant="outline" size="icon">
              <Pencil></Pencil>
            </Button>
          </Link> */}
        </div>
        <Card className="py-2 ">
          <CardHeader>
            <CardTitle>User</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {userFields.map((field) => {
                  let value = user[field.key] || 'N/A';

                  if (field.format === 'date' && value !== 'N/A') {
                    value = new Date(value).toLocaleDateString(); // Or use date-fns for custom formatting
                  }

                  if (field.key === 'userStatus') {
                    value =
                      userStatus.find((option: any) => option.value === value)
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
        {user.role && (
          <Card className="">
            <CardHeader>
              <CardTitle>Role</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableHead className="w-1/4"> Name</TableHead>
                    <TableCell className="w-3/4"> {user.role.name}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* Add other fields as needed */}
            </CardContent>
          </Card>
        )}

        {/* Organization Information Card */}
        {user.organization && (
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
                      {user.organization.orgName}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/4"> Short Name</TableHead>
                    <TableCell className="w-3/4">
                      {user.organization.orgShortName}
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
