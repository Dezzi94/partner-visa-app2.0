import { AppConfig } from "@/types/config";
import {
  Code,
  Database,
  CreditCard,
  Search,
  BarChart,
  Sun,
  Newspaper,
  TestTube,
  AlertTriangle,
  Clock,
  Server,
  Code2,
  Home,
  Settings,
  HelpCircle,
} from "lucide-react";

export const config: AppConfig = {
  name: "CursorDevKit",
  domainName: "cursordevkit.com",
  appDescription: "A powerful SaaS boilerplate for rapid development",
  company: {
    name: "CursorDevKit Inc.",
    address: "",
    phone: "",
    supportEmail: "james@brightpool.dev",
  },
  indieMaker: {
    name: "James Phoenix",
    avatar:
      "https://understandingdata.com/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Favatar.00f76042.webp&w=64&q=75",
    twitter: "https://twitter.com/jamesaphoenix12",
    linkedin: "https://www.linkedin.com/feed/",
    website: "https://understandingdata.com/",
  },
  googleTagManagerId: "GTM-XXXXXXX",
  stripe: {
    publicKey:
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "default_public_key",
    secretKey: process.env.STRIPE_SECRET_KEY || "default_secret_key",
    webhookSecret:
      process.env.STRIPE_WEBHOOK_SECRET || "default_webhook_secret",
    plans: [
      {
        name: "Standard Plan",
        price: "$40",
        description: "Perfect for small to medium projects",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_SINGLE_PAYMENT!,
        mode: "payment",
        features: [
          "Next.js boilerplate",
          "Supabase local stack",
          "Type Generation & Strong SDKs",
          "Stripe integration",
          "SEO & Blog setup",
          "Google OAuth & Magic Links",
          "Basic components & animations",
          "ChatGPT prompts for terms & privacy",
        ],
      },
      {
        name: "Pro Plan",
        price: "$60",
        description: "For serious SaaS builders",
        priceId:
          process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_SINGLE_PAYMENT_SECONDARY!,
        mode: "payment",
        features: [
          "All Standard Plan features",
          "Advanced components & animations",
          "Discord community access",
          "Lifetime updates",
        ],
      },
    ],
  },
  environment: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  },
  auth: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    signInRedirectUrl: "/onboarding",
    authCallbackUrl: "/api/auth/callback",
    dashboardUrl: "/dashboard",
    loginUrl: "/login",
  },
  homepage: {
    numberOfMakersShipped: 2,
    heroTitle: "Build Your SaaS Faster",
    heroSubtitle:
      "Launch your SaaS product in days, not months, with our powerful boilerplate.",
    usps: [
      {
        title: "Rapid Development",
        description:
          "Get your MVP up and running quickly with our pre-built components and integrations.",
        icon: Clock,
      },
      {
        title: "Scalable Architecture",
        description:
          "Built on Next.js and Supabase for performance and scalability from day one.",
        icon: Server,
      },
      {
        title: "Seamless Payments",
        description:
          "Integrated Stripe payments and subscriptions, ready out of the box.",
        icon: CreditCard,
      },
    ],
    painPointsSection: {
      title: "Say Goodbye to SaaS Development Headaches",
      withoutProduct: {
        points: [
          "Months of development time",
          "Complex payment integrations",
          "Authentication headaches",
          "Scaling issues",
          "Reinventing the wheel",
        ],
      },
      withProduct: {
        points: [
          "Launch in days, not months",
          "Pre-built Stripe integration",
          "Supabase auth out of the box",
          "Scalable from the start",
          "Focus on your unique features",
        ],
      },
    },
    featuresSection: {
      title: "Powerful Features",
      useTabLayout: true,
      description: "Everything you need to build and grow your SaaS",
      features: [
        {
          title: "Local Supabase Development",
          description:
            "Seamlessly develop locally with Supabase. Then deploy to production for robust authentication and efficient database management. Leverage the power of PostgreSQL with a user-friendly interface and real-time capabilities.",
          image: "/features/supabase-integration.png",
          icon: Database,
        },
        {
          title: ".cursorrules and Prompts Folder",
          description:
            "Accelerate your development process with our custom .cursorrules file and dedicated prompts folder. These powerful tools are designed to enhance your coding experience, providing intelligent suggestions, automated workflows, and project-specific guidelines. Leverage AI-assisted coding to reduce repetitive tasks, maintain consistent code quality, and significantly speed up your development cycle. With these features, you'll be able to focus on building unique functionalities while shipping your SaaS product faster and more efficiently than ever before.",
          image: "/features/cursor-friendly.png",
          icon: Code2,
        },
        {
          title: "TypeScript Support with Supabase",
          description:
            "Enjoy full TypeScript support throughout the boilerplate, ensuring type safety, better code quality, and an enhanced developer experience. Catch errors early and improve code maintainability.",
          image: "/features/typescript-support.png",
          icon: Code,
        },
        {
          title: "Stripe Integration",
          description:
            "Implement secure payment processing with our built-in Stripe support. Handle both one-time payments and recurring subscriptions effortlessly, complete with webhook integration.",
          image: "/features/stripe-integration.png",
          icon: CreditCard,
        },
        {
          title: "Sentry Error Tracking",
          description:
            "Keep your application running smoothly with integrated Sentry error tracking and monitoring. Quickly identify, triage, and resolve issues in your production environment.",
          image: "/features/sentry-integration.png",
          icon: AlertTriangle,
        },
        {
          title: "Comprehensive Testing",
          description:
            "Ensure code quality and reliability with our setup for both Jest unit tests and Playwright end-to-end tests. Catch bugs early and maintain a robust codebase as your SaaS grows.",
          image: "/features/comprehensive-testing.png",
          icon: TestTube,
        },

        {
          title: "SEO Optimization",
          description:
            "Boost your search engine visibility with our built-in SEO utilities. Generate dynamic metadata, implement structured data for rich snippets, and optimize your content for better rankings.",
          image: "/features/seo-optimization.png",
          icon: Search,
        },
        {
          title: "Google Tag Manager",
          description:
            "Easily integrate Google Tag Manager for comprehensive analytics and marketing tag management. Track user behavior, conversions, and other key metrics without modifying your code.",
          image: "/features/google-tag-manager.png",
          icon: BarChart,
        },
        {
          title: "Light/Dark Mode",
          description:
            "Enhance user experience with built-in light and dark mode support using Next Themes. Allow users to choose their preferred color scheme or automatically adapt to system preferences.",
          image: "/features/light-dark-mode.png",
          icon: Sun,
        },
        {
          title: "Blog Functionality",
          description:
            "Engage your audience with our integrated blog system featuring SEO-friendly article pages. Create, manage, and publish content easily to drive traffic and establish thought leadership.",
          image: "/features/blog-functionality.png",
          icon: Newspaper,
        },
      ],
    },
    testimonials: [
      {
        imageId: 1,
        name: "Sarah Johnson",
        company: "TechStartup Inc.",
        quote:
          "CursorDevKit cut our development time in half. We launched our MVP in just two weeks!",
      },
      {
        imageId: 2,
        name: "Michael Chen",
        company: "DataDriven Co.",
        quote:
          "The pre-built components and integrations saved us months of work. Highly recommended!",
      },
      {
        imageId: 3,
        name: "Emily Rodriguez",
        company: "SaaS Innovators",
        quote:
          "From auth to payments, everything just worked. It's the perfect foundation for any SaaS project.",
      },
    ],
    faqs: [
      {
        question: "How quickly can I launch my SaaS with this boilerplate?",
        answer:
          "With CursorDevKit, you can have a fully functional MVP up and running in as little as a few days, depending on your specific requirements and customizations.",
      },
      {
        question: "Is it easy to customize and add my own features?",
        answer:
          "Absolutely! The boilerplate is built with customization in mind. You can easily add your own components, pages, and backend logic while leveraging the existing infrastructure.",
      },
      {
        question: "How does the Stripe integration work?",
        answer:
          "Our Stripe integration handles payments out of the box. It's pre-configured for easy setup, and you can customize pricing plans and payment flows as needed.",
      },
      {
        question: "Can I use my own design system with this boilerplate?",
        answer:
          "Yes, while we provide a default UI using Shadcn UI and Radix UI, you can easily swap these out or customize them to match your own design system.",
      },
      {
        question: "How do I handle authentication and user management?",
        answer:
          "We use Supabase for authentication, which provides a robust and secure auth system out of the box. User management is handled through Supabase as well, making it easy to manage users, roles, and permissions.",
      },
      {
        question: "What programming language does CursorDevKit use?",
        answer:
          "CursorDevKit is built entirely with TypeScript, providing you with a strongly-typed foundation for your SaaS project. This ensures better code quality, easier maintenance, and improved developer experience.",
      },
      {
        question: "How frequently is the boilerplate updated?",
        answer:
          "We're committed to keeping CursorDevKit at the cutting edge. The boilerplate receives weekly updates, incorporating the latest features, security patches, and performance improvements to ensure your SaaS stays modern and competitive.",
      },
      {
        question: "What if I'm not satisfied with my purchase?",
        answer:
          "We stand behind our product. If you're not completely satisfied with CursorDevKit, we offer a hassle-free refund policy. Simply reach out to our support team within 14 days of your purchase, and we'll process your refund promptly.",
      },
      {
        question: "Can I integrate CursorDevKit with my existing tech stack?",
        answer:
          "While CursorDevKit comes with a pre-configured stack (Next.js, Supabase, Stripe), it's designed to be flexible. You can easily swap out or integrate additional technologies to match your specific needs. Our documentation provides guidance on customizing the stack.",
      },

      {
        question: "What kind of support is available if I run into issues?",
        answer:
          "We offer comprehensive support to ensure your success. This includes detailed documentation, video tutorials, a community forum for peer support, and direct email support from our development team for more complex issues.",
      },
      {
        question: "Can I use CursorDevKit for multiple projects?",
        answer:
          "Absolutely! Your license allows you to use CursorDevKit for multiple projects, whether they're for yourself or your clients. This makes it an excellent investment for agencies and serial entrepreneurs.",
      },
    ],
    ctaSection: {
      title: "Ready to Supercharge Your SaaS Development?",
      description:
        "Start building your next big thing today with CursorDevKit.",
      ctaText: "Get Started",
      ctaLink: "/login",
    },
  },
  blog: {
    title: "CursorDevKit Blog",
    description:
      "Insights, tips, and best practices for SaaS development and growth.",
  },
  dashboard: {
    sidebarNavItems: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: Home,
      },
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
      },
      {
        title: "Help",
        href: "/help",
        icon: HelpCircle,
      },
    ],
  },
};

export const getEnvironment = () => {
  return config.environment;
};

export const getPlans = () => {
  return config.stripe.plans;
};

export const getCompanyInfo = () => {
  return config.company;
};

export const getBlogConfig = () => {
  return config.blog;
};

export const getDashboardConfig = () => {
  return config.dashboard;
};
