import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const testAuth = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return "Not authenticated";
    const user = await ctx.db.get(userId);
    return {
      userId,
      userExists: !!user,
      user,
    };
  },
});
