export const dynamic = "force-dynamic";
export const runtime = "edge";

// A faulty API route to test Sentry's error monitoring
export function GET() {
  throw new Error("Sentry Example API Route Error");
}
