import { test, expect } from "@playwright/test";

test.describe("Onboarding Process", () => {
  test("New user sees onboarding page with correct elements", async ({
    page,
  }) => {
    await page.goto("/onboarding");

    // Check if we're on the onboarding page
    await expect(page).toHaveURL("/onboarding");

    // Verify onboarding page elements
    await expect(
      page.getByRole("heading", { name: "Choose Your Plan" })
    ).toBeVisible();
  });

  test("User can select a plan", async ({ page }) => {
    await page.goto("/onboarding");

    // Check if the plan selector is visible
    await expect(page.getByTestId("plan-selector")).toBeVisible();

    // Check if there are plan cards available
    const planCards = await page.$$("[data-testid^='plan-card-']");
    await expect(planCards.length).toBeGreaterThan(0);

    // Check if plan selection buttons are present
    const selectButtons = await page.$$("[data-testid^='select-plan-']");
    await expect(selectButtons.length).toBeGreaterThan(0);

    // Optional: Check for email input if subscription plans are present
    const emailInput = await page.getByTestId("email-input");
    if (await emailInput.isVisible()) {
      await emailInput.fill("test@example.com");
    }

    // Select a plan (e.g., the first one)
    const firstSelectButton = selectButtons[0];
    return await firstSelectButton.click();

    // Here you might want to add assertions for what happens after plan selection
    // This could include checking for redirection or changes in the UI
    // For example:
    // await expect(page).toHaveURL("/checkout"); // If it redirects to a checkout page
  });
});
