// import { pgTable } from '@/db/utils';
// import { sql } from "drizzle-orm"
// import { timestamp, varchar } from "drizzle-orm/pg-core"

// import { generateId } from '@/lib/id';

// export const tasks = pgTable('tasks', {
// id: varchar("id", { length: 30 })
//   .$defaultFn(() => generateId())
//   .primaryKey(),
// code: varchar("code", { length: 128 }).notNull().unique(),
// title: varchar("title", { length: 128 }),
// status: varchar("status", {
//   length: 30,
//   enum: ["todo", "in-progress", "done", "canceled"],
// })
//   .notNull()
//   .default("todo"),
// label: varchar("label", {
//   length: 30,
//   enum: ["bug", "feature", "enhancement", "documentation"],
// })
//   .notNull()
//   .default("bug"),
// priority: varchar("priority", {
//   length: 30,
//   enum: ["low", "medium", "high"],
// })
//   .notNull()
//   .default("low"),
// createdAt: timestamp("created_at").defaultNow().notNull(),
// updatedAt: timestamp("updated_at")
//   .default(sql`current_timestamp`)
//   .$onUpdate(() => new Date()),
// });

// export type Task = typeof tasks.$inferSelect;
// export type NewTask = typeof tasks.$inferInsert;

export const unknownError =
  'An unknown error occurred. Please try again later.';
export const databasePrefix = 'shadcn';

// Enum values
export const statusEnum = ['todo', 'in_progress', 'done', 'canceled'] as const;
export const labelEnum = [
  'bug',
  'feature',
  'enhancement',
  'documentation',
] as const;
export const priorityEnum = ['low', 'medium', 'high'] as const;

// Define the tasks object with enum values
export const tasks = {
  status: {
    enumValues: statusEnum,
  },
  label: {
    enumValues: labelEnum,
  },
  priority: {
    enumValues: priorityEnum,
  },
};
