import { kv } from "@vercel/kv";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export async function isAuthenticated() {
  const supabase = await getSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return !!user;
}

export async function isRateLimited(
  userId: string,
  actionName: string,
  limit: number
) {
  // Disable rate limiting for development environments:
  if (process.env.NODE_ENV === "development") {
    return false;
  }

  // If the environment is production, check the rate limit:
  const key = `rate_limit:${userId}:${actionName}`;
  const currentCount = (await kv.get(key)) as number | null;

  if (currentCount === null) {
    await kv.set(key, 1, { ex: 86400 }); // Set expiry for 24 hours
    return false;
  }

  if (currentCount >= limit) {
    return true;
  }

  await kv.incr(key);
  return false;
}
