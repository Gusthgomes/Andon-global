import { mutation } from "./_generated/server";
import { v } from "convex/values";

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
