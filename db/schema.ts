import { index, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const subscribers = sqliteTable(
  'subscribers',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    createdAt: text('created_at').notNull(),
  },
  (table) => [uniqueIndex('idx_subscribers_email').on(table.email)],
);

export const inquiries = sqliteTable(
  'inquiries',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    organization: text('organization'),
    inquiryType: text('inquiry_type').notNull(),
    academicBackground: text('academic_background'),
    researchInterest: text('research_interest'),
    experience: text('experience'),
    proposedTopic: text('proposed_topic'),
    message: text('message').notNull(),
    status: text('status').notNull().default('new'),
    createdAt: text('created_at').notNull(),
  },
  (table) => [index('idx_inquiries_status_created').on(table.status, table.createdAt)],
);

export const enrollments = sqliteTable(
  'enrollments',
  {
    id: text('id').primaryKey(),
    courseSlug: text('course_slug').notNull(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    institution: text('institution'),
    message: text('message'),
    status: text('status').notNull().default('pending'),
    createdAt: text('created_at').notNull(),
  },
  (table) => [index('idx_enrollments_status_created').on(table.status, table.createdAt)],
);

export const contentEntries = sqliteTable(
  'content_entries',
  {
    id: text('id').primaryKey(),
    type: text('type').notNull(),
    slug: text('slug').notNull(),
    title: text('title').notNull(),
    summary: text('summary').notNull(),
    body: text('body').notNull().default(''),
    metadata: text('metadata').notNull().default('{}'),
    status: text('status').notNull().default('draft'),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at').notNull(),
  },
  (table) => [
    uniqueIndex('idx_content_entries_type_slug').on(table.type, table.slug),
    index('idx_content_entries_type_status').on(table.type, table.status),
  ],
);

export const uploads = sqliteTable(
  'uploads',
  {
    id: text('id').primaryKey(),
    objectKey: text('object_key').notNull(),
    name: text('name').notNull(),
    contentType: text('content_type').notNull(),
    size: integer('size').notNull(),
    uploadedBy: text('uploaded_by').notNull(),
    createdAt: text('created_at').notNull(),
  },
  (table) => [uniqueIndex('idx_uploads_object_key').on(table.objectKey)],
);
