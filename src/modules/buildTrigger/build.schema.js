"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachmentSchema = exports.webhookEventSchema = void 0;
const zod_1 = require("zod");
const UserSchema = zod_1.z.object({
    self: zod_1.z.string(),
    accountId: zod_1.z.string(),
    avatarUrls: zod_1.z.object({
        "48x48": zod_1.z.string(),
        "24x24": zod_1.z.string(),
        "16x16": zod_1.z.string(),
        "32x32": zod_1.z.string(),
    }),
    displayName: zod_1.z.string(),
    active: zod_1.z.boolean(),
    timeZone: zod_1.z.string(),
    accountType: zod_1.z.string(),
});
const PrioritySchema = zod_1.z.object({
    self: zod_1.z.string(),
    iconUrl: zod_1.z.string(),
    name: zod_1.z.string(),
    id: zod_1.z.string(),
});
const StatusCategorySchema = zod_1.z.object({
    self: zod_1.z.string(),
    id: zod_1.z.number(),
    key: zod_1.z.string(),
    colorName: zod_1.z.string(),
    name: zod_1.z.string(),
});
const StatusSchema = zod_1.z.object({
    self: zod_1.z.string(),
    description: zod_1.z.string(),
    iconUrl: zod_1.z.string(),
    name: zod_1.z.string(),
    id: zod_1.z.string(),
    statusCategory: StatusCategorySchema,
});
const IssueTypeSchema = zod_1.z.object({
    self: zod_1.z.string(),
    id: zod_1.z.string(),
    description: zod_1.z.string(),
    iconUrl: zod_1.z.string(),
    name: zod_1.z.string(),
    subtask: zod_1.z.boolean(),
    avatarId: zod_1.z.number(),
    hierarchyLevel: zod_1.z.number(),
});
const ProjectSchema = zod_1.z.object({
    self: zod_1.z.string(),
    id: zod_1.z.string(),
    key: zod_1.z.string(),
    name: zod_1.z.string(),
    projectTypeKey: zod_1.z.string(),
    simplified: zod_1.z.boolean(),
    avatarUrls: zod_1.z.object({
        "48x48": zod_1.z.string(),
        "24x24": zod_1.z.string(),
        "16x16": zod_1.z.string(),
        "32x32": zod_1.z.string(),
    }),
});
const CommentSchema = zod_1.z.object({
    self: zod_1.z.string(),
    id: zod_1.z.string(),
    author: UserSchema,
    body: zod_1.z.string(),
    updateAuthor: UserSchema,
    created: zod_1.z.string(),
    updated: zod_1.z.string(),
    jsdPublic: zod_1.z.boolean(),
});
const IssueSchema = zod_1.z.object({
    id: zod_1.z.string(),
    self: zod_1.z.string(),
    key: zod_1.z.string(),
    fields: zod_1.z.object({
        summary: zod_1.z.string(),
        issuetype: IssueTypeSchema,
        project: ProjectSchema,
        assignee: UserSchema,
        priority: PrioritySchema,
        status: StatusSchema,
    }),
});
exports.webhookEventSchema = zod_1.z.object({
    timestamp: zod_1.z.number().optional(),
    webhookEvent: zod_1.z.string(),
    comment: CommentSchema,
    issue: IssueSchema,
    eventType: zod_1.z.string(),
});
exports.attachmentSchema = zod_1.z.object({
    fileName: zod_1.z.string(),
    base64Data: zod_1.z.string(),
    issueKey: zod_1.z.string()
});
