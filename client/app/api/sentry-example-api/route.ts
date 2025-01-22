// A faulty API route to test Sentry's error monitoring

// Explicitly declare edge runtime first
export const runtime = 'edge';

// Other configurations
export const dynamic = 'force-dynamic';

export async function GET() {
  throw new Error("Sentry Example API Route Error");
}
