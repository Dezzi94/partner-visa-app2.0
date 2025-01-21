import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { jest } from "@jest/globals";
import { TextDecoder, TextEncoder } from "util";

// Add this mock for window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: () => "Next image stub",
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;

// Mock environment variables (this is optional if you don't include them in your .env.local file)
// process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY = "test_public_key";
// process.env.STRIPE_SECRET_KEY = "test_secret_key";
// process.env.STRIPE_WEBHOOK_SECRET = "test_webhook_secret";
// process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_SINGLE_PAYMENT = "test_price_id_single";
// process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_SINGLE_PAYMENT_SECONDARY =
//   "test_price_id_single_secondary";
// process.env.NEXT_PUBLIC_API_URL = "http://localhost:3000/api";
// process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";

// Load environment variables
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
