import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { isAuthenticated, isRateLimited } from "./auth-utils";
import { createClient } from "@/utils/supabase/server";

// Action client
export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
      numberOfMonthlyRequests: z.number().optional(),
      ip: z.string(),
    });
  },
}).use(async ({ next, metadata }) => {
  // Check rate limiting with IP for logged out users:
  const limit = metadata.numberOfMonthlyRequests || 100;
  const rateLimited = await isRateLimited(
    metadata.ip,
    metadata.actionName,
    limit
  );
  if (rateLimited) {
    throw new Error("Rate limit exceeded");
  }

  // Return the next middleware with `ip` value in the context
  return next({ ctx: { ip: metadata.ip } });
});

// Auth action client
export const authActionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
      numberOfMonthlyRequests: z.number().optional(),
    });
  },
}).use(async ({ next, metadata }) => {
  // Check authentication
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    throw new Error("User not authenticated");
  }

  // Get user ID
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }

  // Check rate limiting
  const limit = metadata.numberOfMonthlyRequests || 100;
  const rateLimited = await isRateLimited(user.id, metadata.actionName, limit);
  if (rateLimited) {
    throw new Error("Rate limit exceeded");
  }

  // Return the next middleware with `userId` value in the context
  return next({ ctx: { user } });
});
