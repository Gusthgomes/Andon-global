import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    uid: v.string(),
    fullName: v.string(),
    email: v.string(),
    role: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_uid", ["uid"]),

  tickets: defineTable({
    number: v.string(),
    motivo: v.string(),
    posto: v.string(),
    area: v.string(),
    kit: v.string(),
    line: v.string(),
    status: v.string(),
    createdAt: v.float64(),
    updatedAt: v.float64(),
    userId: v.string(),
    ticketItem: v.array(
      v.object({
        item: v.string(),
        quantity: v.string(),
        description: v.string(),
      })
    ),
  }).index("by_userId", ["userId"]),
});
