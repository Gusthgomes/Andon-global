import { mutation } from "./_generated/server";
import { v } from "convex/values";

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
