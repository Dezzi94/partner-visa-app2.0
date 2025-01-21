# 🧙‍♂️ CursorDevKit - SaaS Boilerplate

<div align="center">
  <img src="https://storage.googleapis.com/strapi_cms_assets/header.jpg" alt="CursorDevKit Banner" width="100%" style="border-radius: 8px;" />
</div>

Transform yourself into a full-stack wizard with CursorDevKit - your magical companion for modern web development. This enchanted boilerplate combines the powers of Next.js, React, TypeScript, and Supabase to help you craft powerful SaaS applications with ease. Whether you're a seasoned sorcerer or an apprentice developer, CursorDevKit provides all the spells (tools) and magical artifacts (components) you need to bring your ideas to life.

## Local First, Testing, AI, what's not to love? 🪄

> ⚠️ 🚧 **NOTE**: We welcome Pull Requests that enhance the stability and generalizability of this boilerplate! Whether you're adding new features, improving existing ones, or suggesting optimizations, your contributions help keep this magical toolkit fresh and up-to-date. Just ensure your enchantments align with our core mission of maintaining a robust, production-ready foundation.

## Documentation:

- <a href="https://docs.cursordevkit.com/docs/getting-started/introduction" target="_blank">Documentation</a> - Access our comprehensive documentation for setup instructions and detailed guides.

## Your Powerful Toolkit

CursorDevKit equips you with:

- **🛠️ Local Development**: Stop pushing to production every time you want to test something. Quick and easy local development setup with Supabase
- **Next.js App Router**: Leverage the latest Next.js 15+ App Router for lightning-fast server-side rendering
- **⚡ [.cursorrules](client/.cursorrules)**: Wield enchanted Cursor rules, carefully crafted to amplify your Supabase, TypeScript, and NextJS powers
- **📚 [Prompts Folder](client/prompts)**: Master the arcane arts with our collection of mystical AI prompts
- **🛡️ Sentry Guardian**: Summon Sentry's watchful eye to protect your realm from unexpected errors
- **🧪 Testing Suite**: Cast powerful Jest unit spells and Playwright E2E enchantments to ensure your magical realm remains stable
- **TypeScript Support**: Write safer code with full TypeScript integration and automated type generation via [`LocalGenerateTypes.sh`](LocalGenerateTypes.sh)
- **Supabase Integration**: Seamless authentication and database management at your fingertips
- **Stripe Integration**: Handle payments and subscriptions with enterprise-grade reliability
- **SEO Optimization**: Boost your visibility with built-in SEO utilities
- **Analytics Ready**: Track user journeys with Google Tag Manager integration
- **Blog System**: Share your knowledge with an integrated, SEO-friendly blog

## Configuration

The `config/index.ts` file serves as the central configuration hub for the application. It includes:

- Application name and description
- Company information
- Stripe configuration for both development and production environments
- Authentication settings
- Homepage content configuration
- Blog settings

## Development Tools

### Type Generation

The `LocalGenerateTypes.sh` script automates the process of generating TypeScript types from your Supabase schema, ensuring type safety across your application.

### AI-Assisted Development

The `/prompts` directory contains a collection of AI prompts for various development tasks, including:

- Bug hunting and fixing
- Code refactoring and optimization
- Mobile responsiveness improvements
- Test generation
- Documentation creation

These prompts can be used with AI coding assistants to streamline development tasks.

## Client Side Project Structure

The client side project is organized into several key areas:

- **/app**: Contains the main application code, organized into route groups:
  - **(blog)**: Blog-related pages and components
  - **(dashboard)**: User dashboard and account management
  - **(website)**: Public-facing website pages
- **/components**: Reusable React components
- **/lib**: Utility functions and helpers
- **/utils**: Additional utility functions, including Supabase and Stripe helpers
- **/types**: TypeScript type definitions
- **/prompts**: AI prompts for various development tasks
- **/e2e**: Playwright end-to-end tests
- **/**tests\*\*\*\*: Jest unit tests

## Core Functionality

### Stripe Integration (@actions/stripe.ts)

The Stripe integration provides robust payment processing capabilities:

- Create and manage checkout sessions
- Handle both one-time payments and subscriptions
- Automatic customer creation and management
- Support for trial periods and promotional codes
- Flexible invoice creation options

### Authentication and Authorization (@lib/safe-action.ts)

The `safe-action.ts` module provides secure, rate-limited actions for both authenticated and non-authenticated users:

- Rate limiting based on IP address or user ID
- Easy-to-use wrappers for creating authenticated and non-authenticated actions
- Integration with Supabase for user management

### SEO Optimization (@lib/seo.ts)

The SEO module offers utilities for generating SEO metadata and structured data:

- Dynamic metadata generation for pages and blog posts
- Structured data generation for rich search results
- Easy customization of OpenGraph and Twitter card metadata

### Google Tag Manager Integration (@lib/gtm.ts)

Seamless integration with Google Tag Manager for tracking page views and custom events.

### Toast Notifications (@lib/withToast.ts)

A utility for wrapping functions with toast notifications, providing a consistent user feedback mechanism across the application.

## License

This project is protected under a custom license that prohibits commercial resale. See the [LICENSE](LICENSE) file for details.
