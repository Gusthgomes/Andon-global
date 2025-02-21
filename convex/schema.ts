import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    uid: v.string(),
    fullName: v.string(),
    email: v.string(),
    role: v.optional(v.string()),
    createdAt: v.number(),
  }),

  tickets: defineTable({
    number: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    motivo: v.string(),
    posto: v.string(),
    area: v.string(),
    kit: v.string(),
    line: v.string(),
    userId: v.string(),
    status: v.string(),
  }),

  ticketItems: defineTable({
    item: v.string(),
    quantity: v.string(),
    description: v.string(),
    ticketId: v.string(),
  }),
});
