// import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // Update this to include all the domains you want to allow
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
// export default withSentryConfig(nextConfig, {
//   silent: true,
//   // https://github.com/getsentry/sentry-webpack-plugin#options
//   authToken: process.env.SENTRY_AUTH_TOKEN,
//   org: process.env.NEXT_PUBLIC_SENTRY_ORG,
//   project: process.env.NEXT_PUBLIC_SENTRY_PROJECT,
// }, {
//   // For all available options, see:
//   // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
//   // Upload a larger set of source maps for prettier stack traces (increases build time)
//   widenClientFileUpload: true,
//   // Transpiles SDK to be compatible with IE11 (increases bundle size)
//   transpileClientSDK: true,
//   // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
//   tunnelRoute: "/monitoring",
//   // Hides source maps from generated client bundles
//   hideSourceMaps: true,
//   // Automatically tree-shake Sentry logger statements to reduce bundle size
//   disableLogger: true,
//   // Enables automatic instrumentation of Vercel Cron Monitors.
//   // See the following for more information:
//   // https://docs.sentry.io/product/crons/
//   automaticVercelMonitors: true,
// });
