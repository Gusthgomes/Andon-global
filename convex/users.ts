import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { query } from "./_generated/server";

export const saveUser = mutation({
  args: {
    uid: v.string(),
    email: v.string(),
    fullName: v.string(),
    role: v.optional(v.string()),
  },
  handler: async ({ db }, { uid, email, fullName, role = "COMMON" }) => {
    await db.insert("users", {
      uid,
      email,
      fullName,
      role,
      createdAt: Date.now(),
    });
  },
});

export const getUserByUid = query({
  args: { uid: v.string() },
  handler: async ({ db }, { uid }) => {
    return await db
      .query("users")
      .withIndex("by_uid", (q) => q.eq("uid", uid))
      .unique();
  },
});
