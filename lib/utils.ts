import prisma from '@/prisma/client';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
const moment = require('moment-timezone');
const bcrypt = require('bcryptjs');
//describe age
import {
  addYears,
  addMonths,
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  format,
} from 'date-fns';
import { useRouter } from 'next/navigation';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  date: Date | string | number,
  opts: Intl.DateTimeFormatOptions = {}
) {
  return new Intl.DateTimeFormat('en-US', {
    month: opts.month ?? 'long',
    day: opts.day ?? 'numeric',
    year: opts.year ?? 'numeric',
    ...opts,
  }).format(new Date(date));
}

/**
 * Stole this from the @radix-ui/primitive
 * @see https://github.com/radix-ui/primitives/blob/main/packages/core/primitive/src/primitive.tsx
 */
export function composeEventHandlers<E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {}
) {
  return function handleEvent(event: E) {
    originalEventHandler?.(event);

    if (
      checkForDefaultPrevented === false ||
      !(event as unknown as Event).defaultPrevented
    ) {
      return ourEventHandler?.(event);
    }
  };
}

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/*
passowrd verify 
user password and hashed password
*/
export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

/*
select auth user from db and verify password
*/
export async function getUserFromDb(username: string, password: string) {
  try {
    // Find user by username
    const user = await prisma.user.findUnique({
      where: {
        userName: username.toLowerCase(), // Convert username to lowercase
      },
      include: { role: { include: { permissions: true } } }, // include role and permission
    });

    // If no user found, return null
    if (!user) {
      return null;
    }

    // Verify the password using bcrypt
    const isPasswordValid = await verifyPassword(
      password,
      user.userPassword + ''
    );

    // If the password is not valid, return null
    if (!isPasswordValid) {
      return null;
    }

    // Return the user if everything is valid
    return user;
  } catch (error) {
    console.error('Error fetching user from DB:', error);
    throw new Error('Failed to fetch user');
  }
}

// Assign permissions to a role
export async function assignPermissionsToRole(
  roleId: number,
  permissionIds: number[]
) {
  try {
    // Update the role with the new permissions
    const updatedRole = await prisma.role.update({
      where: { id: roleId },
      data: {
        permissions: {
          connect: permissionIds.map((id) => ({ id })), // Connect the permissions to the role
        },
      },
    });

    return updatedRole;
  } catch (error) {
    console.error('Error assigning permissions to role:', error);
    throw error;
  }
}

// Assign a role to a user
async function assignRoleToUser(userId: number, roleId: number) {
  try {
    // Update the user with the new role
    const updatedUser = await prisma.user.update({
      where: { userId: userId },
      data: {
        role: {
          connect: { id: roleId }, // Connect the role to the user
        },
      },
    });

    return updatedUser;
  } catch (error) {
    console.error('Error assigning role to user:', error);
    throw error;
  }
}

// import { differenceInDays, differenceInYears, differenceInMonths } from 'date-fns';

export function calculateAge(
  regDate: any,
  regAge: any,
  regAgeUnit: any,
  isGetUnit = false
) {
  const currentDate = new Date();
  const registrationDate = new Date(regDate);

  // Calculate the initial age in days based on the registration date and regAge
  let daysSinceRegistration;

  if (regAgeUnit === 365) {
    //'Year'
    daysSinceRegistration =
      differenceInDays(currentDate, registrationDate) + regAge * 365;
  } else if (regAgeUnit === 30) {
    //'Month'
    daysSinceRegistration =
      differenceInDays(currentDate, registrationDate) + regAge * 30;
  } else {
    daysSinceRegistration =
      differenceInDays(currentDate, registrationDate) + regAge;
  }

  let age;
  let ageUnit;

  if (daysSinceRegistration >= 365) {
    age = Math.trunc(daysSinceRegistration / 365);
    ageUnit = 'Year';
  } else if (daysSinceRegistration >= 30) {
    age = Math.trunc(daysSinceRegistration / 30);
    ageUnit = 'Month';
  } else {
    age = Math.trunc(daysSinceRegistration);
    ageUnit = 'Day';
  }
  if (isGetUnit) {
    return ageUnit;
  }

  return `${age}`; // ${ageUnit}(s)
}

export const getFormattedDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
};

export const getProjectNameFromLocal = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('project') || '';
  }
  return '';
};

export const getDonorNameFromLocal = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('donor') || '';
  }
  return '';
};

export const formatedLocalDate = (selectedDate: any) => {
  const timeZoneOffset = 6.5 * 60 * 60 * 1000; // Offset for Asia/Yangon
  const utcDate = new Date(new Date(selectedDate).getTime() + timeZoneOffset);
  const yangonTime = moment
    .utc(utcDate)
    .tz('Asia/Yangon')
    .format('YYYY-MM-DDT00:00:00[Z]');
  return yangonTime;
};
export const getDateOnyYMDFormat = (isoDate: String) => {
  const dateOnly = isoDate.split('T')[0];
  return dateOnly;
};

export const getPojectNameById = (projects: any, projectId: any) => {
  const data =
    projects.find((option: any) => option.value === projectId)?.label ||
    'Unknown';
  return data;
};
