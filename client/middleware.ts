import type { NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { isAuthenticated, isRateLimited } from "@/lib/auth-utils";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);
  if (
    request.nextUrl.pathname === "/api/get-stripe-account-details" ||
    request.nextUrl.pathname === "/api/validate-stripe-key"
  ) {
    // Check authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the user and apply rate limiting:
    const supabase = await createClient();
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    const rateLimited = await isRateLimited(
      userId,
      request.nextUrl.pathname,
      50
    );

    if (rateLimited) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 }
      );
    }
  }
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
