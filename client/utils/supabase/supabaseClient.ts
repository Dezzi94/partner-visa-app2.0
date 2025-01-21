import { Database } from "@/types/types";

type SupabaseClient =
  | ReturnType<typeof import("@supabase/ssr").createServerClient<Database>>
  | ReturnType<typeof import("@supabase/ssr").createBrowserClient<Database>>;

export async function getSupabaseClient(): Promise<SupabaseClient> {
  if (typeof window === "undefined") {
    // Server-side
    const { createClient } = await import("@/utils/supabase/server");
    return createClient();
  } else {
    // Client-side
    const { createClient } = await import("@/utils/supabase/client");
    return createClient();
  }
}
