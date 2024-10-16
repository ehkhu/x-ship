'use server';

import { unstable_noStore as noStore, revalidatePath } from 'next/cache';

import { customAlphabet } from 'nanoid';

import { getErrorMessage } from '@/lib/handle-error';

import prisma from '@/prisma/client';
import { CreateUserSchema } from './validations';
import { User } from '@/types';
import { hashPassword } from '@/lib/utils';

export async function createUser(input: CreateUserSchema) {
  noStore();
  try {
    const { userFullName, userName, userPassword, roleId, userStatus } = input;
    let password = await process.env.DEFAULT_PASSWORD;
    if (userPassword) {
      password = userPassword;
    }
    const hashedPassword = await hashPassword(password + '');

    const user = await prisma.user.create({
      data: {
        userFullName,
        userName,
        userPassword: hashedPassword,
        roleId,
        userStatus,
        createdDate: new Date(),
      },
    });

    revalidatePath('/');

    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function updateUser(input: CreateUserSchema & { id: number }) {
  let updateData: any = {
    userFullName: input.userFullName,
    userName: input.userName,
    roleId: input.roleId,
    userStatus: input.userStatus,
  };

  if (input.userPassword) {
    const hashedPassword = await hashPassword(input.userPassword + '');
    updateData.userPassword = hashedPassword;
  }

  noStore();
  try {
    await prisma.user.update({
      where: { userId: input.id },
      data: updateData,
    });

    revalidatePath('/');

    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function updateUsers(input: {
  ids: number[];
  userFullName?: User['userFullName'];
  username?: User['userName'];
}) {
  noStore();
  try {
    await prisma.user.updateMany({
      where: {
        userId: {
          in: input.ids,
        },
      },
      data: {
        userFullName: input.userFullName,
        userName: input.username,
      },
    });

    revalidatePath('/');

    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function deleteUser(input: { id: string }) {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        userId: +input.id,
      },
    });

    revalidatePath('/');
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function deleteUsers(input: { ids: number[] }) {
  try {
    const deletedUsers = await prisma.user.deleteMany({
      where: {
        userId: {
          in: input.ids,
        },
      },
    });

    revalidatePath('/');

    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function getChunkedUsers(input: { chunkSize?: number } = {}) {
  try {
    const chunkSize = input.chunkSize ?? 1000;

    let totalUsers = 0;
    await prisma.user.count().then((count) => {
      totalUsers = count;
    });

    const totalChunks = Math.ceil(totalUsers / chunkSize);

    let chunkedUsers;

    for (let i = 0; i < totalChunks; i++) {
      chunkedUsers = await prisma.user
        .findMany({
          take: chunkSize,
          skip: i * chunkSize,
        })
        .then((users) =>
          users.map((user) => ({
            ...user,
            // createdAt: user.createdAt.toString(),
            // updatedAt: user.updatedAt?.toString(),
          }))
        );
    }

    return {
      data: chunkedUsers,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}
