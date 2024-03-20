import { z } from "zod";

const UserSchema = z.object({
  self: z.string(),
  accountId: z.string(),
  avatarUrls: z.object({
    "48x48": z.string(),
    "24x24": z.string(),
    "16x16": z.string(),
    "32x32": z.string(),
  }),
  displayName: z.string(),
  active: z.boolean(),
  timeZone: z.string(),
  accountType: z.string(),
});

const PrioritySchema = z.object({
  self: z.string(),
  iconUrl: z.string(),
  name: z.string(),
  id: z.string(),
});

const StatusCategorySchema = z.object({
  self: z.string(),
  id: z.number(),
  key: z.string(),
  colorName: z.string(),
  name: z.string(),
});

const StatusSchema = z.object({
  self: z.string(),
  description: z.string(),
  iconUrl: z.string(),
  name: z.string(),
  id: z.string(),
  statusCategory: StatusCategorySchema,
});

const IssueTypeSchema = z.object({
  self: z.string(),
  id: z.string(),
  description: z.string(),
  iconUrl: z.string(),
  name: z.string(),
  subtask: z.boolean(),
  avatarId: z.number(),
  hierarchyLevel: z.number(),
});

const ProjectSchema = z.object({
  self: z.string(),
  id: z.string(),
  key: z.string(),
  name: z.string(),
  projectTypeKey: z.string(),
  simplified: z.boolean(),
  avatarUrls: z.object({
    "48x48": z.string(),
    "24x24": z.string(),
    "16x16": z.string(),
    "32x32": z.string(),
  }),
});

const CommentSchema = z.object({
  self: z.string(),
  id: z.string(),
  author: UserSchema,
  body: z.string(),
  updateAuthor: UserSchema,
  created: z.string(),
  updated: z.string(),
  jsdPublic: z.boolean(),
});

const IssueSchema = z.object({
  id: z.string(),
  self: z.string(),
  key: z.string(),
  fields: z.object({
    summary: z.string(),
    issuetype: IssueTypeSchema,
    project: ProjectSchema,
    assignee: UserSchema,
    priority: PrioritySchema,
    status: StatusSchema,
  }),
});

export const webhookEventSchema = z.object({
  timestamp: z.number().optional(),
  webhookEvent: z.string(),
  comment: CommentSchema,
  issue: IssueSchema,
  eventType: z.string(),
});


export type WebhookEventSchema = z.infer< typeof webhookEventSchema >;


export const attachmentSchema = z.object({
    fileName: z.string(),
    base64Data: z.string(),
    issueKey: z.string()
})


export type AttachmentSchema = z.infer< typeof attachmentSchema >;
