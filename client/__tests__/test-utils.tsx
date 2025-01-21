import React from "react";
import { render } from "@testing-library/react";
import ClientSideProviders from "@/components/providers/ClientSideProviders";
import { jest } from "@jest/globals";

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },

      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
  // Mocking the usePathname and useSearchParams hooks, you might want to add custom mocks on specific tests though!
  usePathname: () => "/",
  useSearchParams: () => {},
}));

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <ClientSideProviders>{children}</ClientSideProviders>;
};

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
