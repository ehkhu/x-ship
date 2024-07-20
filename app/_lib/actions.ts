'use server';

import { unstable_noStore as noStore, revalidatePath } from 'next/cache';

import { customAlphabet } from 'nanoid';

import { getErrorMessage } from '@/lib/handle-error';

import { generateRandomTask } from './utils';

import type { CreateTaskSchema, UpdateTaskSchema } from './validations';
import { Task } from '@/types';
import prisma from '@/prisma/client';
import { generateId } from '@/lib/id';

export async function seedTasks(input: { count: number }) {
  const count = input.count ?? 100;

  try {
    // const allTasks: Task[] = [];
    // for (let i = 0; i < count; i++) {
    //   allTasks.push(generateRandomTask());
    // }
    // await db.delete(tasks);
    // console.log('📝 Inserting tasks', allTasks.length);
    // await db.insert(tasks).values(allTasks).onConflictDoNothing();
  } catch (err) {
    console.error(err);
  }
}

export async function createTask(input: CreateTaskSchema) {
  noStore();
  try {
    const { title, status, label, priority } = input;
    const task = await prisma.task.create({
      data: {
        id: generateId(),
        title,
        code: `TASK-${customAlphabet('0123456789', 4)()}`,
        status,
        label,
        priority,
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

export async function updateTask(input: UpdateTaskSchema & { id: string }) {
  noStore();
  try {
    await prisma.task.update({
      where: { id: input.id },
      data: {
        title: input.title,
        status: input.status,
        label: input.label,
        priority: input.priority,
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

export async function updateTasks(input: {
  ids: string[];
  label?: Task['label'];
  status?: Task['status'];
  priority?: Task['priority'];
}) {
  noStore();
  try {
    await prisma.task.updateMany({
      where: {
        id: {
          in: input.ids,
        },
      },
      data: {
        label: input.label,
        status: input.status,
        priority: input.priority,
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

export async function deleteTask(input: { id: string }) {
  console.log('deleteTask', input.id);
  try {
    const deletedTask = await prisma.task.delete({
      where: {
        id: input.id,
      },
    });
    console.log(deleteTask);
    revalidatePath('/');
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function deleteTasks(input: { ids: string[] }) {
  console.log('deleteTasks', input.ids);
  try {
    const deletedTasks = await prisma.task.deleteMany({
      where: {
        id: {
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

export async function getChunkedTasks(input: { chunkSize?: number } = {}) {
  try {
    const chunkSize = input.chunkSize ?? 1000;

    // const totalTasks = 0;
    // await db
    //   .select({
    //     count: count(),
    //   })
    //   .from(tasks)
    //   .then(takeFirstOrThrow);

    // const totalChunks = Math.ceil(totalTasks.count / chunkSize);

    let chunkedTasks;

    // for (let i = 0; i < totalChunks; i++) {
    //   chunkedTasks = await db
    //     .select()
    //     .from(tasks)
    //     .limit(chunkSize)
    //     .offset(i * chunkSize)
    //     .then((tasks) =>
    //       tasks.map((task) => ({
    //         ...task,
    //         createdAt: task.createdAt.toString(),
    //         updatedAt: task.updatedAt?.toString(),
    //       }))
    //     );
    // }

    return {
      data: chunkedTasks,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}
