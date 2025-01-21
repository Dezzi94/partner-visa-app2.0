import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../test-utils";
import HomePage from "@/components/homepage/HomePage";
import { jest, test, expect, beforeEach, describe } from "@jest/globals";

jest.mock("lucide-react", () => ({
  X: () => <div>X Icon</div>,
  Clock: () => <div>Clock Icon</div>,
  Server: () => <div>Server Icon</div>,
  CreditCard: () => <div>CreditCard Icon</div>,
  Database: () => <div>Database Icon</div>,
  Code2: () => <div>Code2 Icon</div>,
  Code: () => <div>Code Icon</div>,
  AlertTriangle: () => <div>AlertTriangle Icon</div>,
  TestTube: () => <div>TestTube Icon</div>,
  Search: () => <div>Search Icon</div>,
  BarChart: () => <div>BarChart Icon</div>,
  Sun: () => <div>Sun Icon</div>,
  Newspaper: () => <div>Newspaper Icon</div>,
}));

// Mock PlanSelector component
jest.mock("@/components/PlanSelector", () => ({
  PlanSelector: () => (
    <div data-testid="plan-selector">Mocked PlanSelector</div>
  ),
}));

describe("HomePage Rendering", () => {
  beforeEach(() => {
    render(<HomePage />);
  });

  test("renders correctly", () => {
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  test("renders HeroSection", () => {
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
  });

  test("renders PainPointsSection", () => {
    expect(screen.getByTestId("pain-points-section")).toBeInTheDocument();
  });

  test("renders USPSection", () => {
    expect(screen.getByTestId("usp-section")).toBeInTheDocument();
  });

  test("renders FeaturesSection", () => {
    expect(screen.getByTestId("features-section")).toBeInTheDocument();
  });

  test("renders PricingSection", () => {
    expect(screen.getByTestId("pricing-section")).toBeInTheDocument();
  });

  test("renders PricingTitle", () => {
    expect(screen.getByTestId("pricing-title")).toBeInTheDocument();
  });

  test("renders PlanSelector", () => {
    expect(screen.getByTestId("plan-selector")).toBeInTheDocument();
  });

  test("renders TestimonialSection", () => {
    expect(screen.getByTestId("testimonial-section")).toBeInTheDocument();
  });

  test("renders CTASection", () => {
    expect(screen.getByTestId("cta-section")).toBeInTheDocument();
  });

  test("renders FAQSection", () => {
    expect(screen.getByTestId("faq-section")).toBeInTheDocument();
  });
});
