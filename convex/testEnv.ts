import { query } from "./_generated/server";
export const getEnv = query(async () => {
  return process.env.CONVEX_SITE_URL;
});
