import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a ticket
export const createTicket = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("tickets", args);
  },
});

// get all tickets
export const getAllTickets = query(async ({ db }) => {
  return await db.query("tickets").order("desc").take(25);
});

// get user ticket by id
export const getUserTicketsById = query(
  async ({ db }, { userId }: { userId: string }) => {
    return await db
      .query("tickets")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .order("desc")
      .take(25);
  }
);
