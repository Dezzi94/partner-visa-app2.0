// A faulty API route to test Sentry's error monitoring
export const runtime = "edge";
export const dynamic = "force-dynamic";

export function GET() {
  throw new Error("Sentry Example API Route Error");
}
