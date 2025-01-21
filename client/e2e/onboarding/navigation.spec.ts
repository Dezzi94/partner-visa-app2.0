import { test, expect } from "@playwright/test";

test.describe("Navigation and Redirection", () => {
  test("Logged in user with no account is redirected to /onboarding", async ({
    page,
  }) => {
    // Attempt to visit the dashboard
    await page.goto("/dashboard");

    // Check if we're redirected to /onboarding
    await expect(page).toHaveURL("/onboarding");
  });

  test("User can access homepage", async ({ page }) => {
    await page.goto("/");

    // Check if we're on the homepage
    await expect(page).toHaveURL("/");

    // Verify some content on the homepage
    await expect(
      page.getByRole("heading", { name: /Why Choose/i })
    ).toBeVisible();
  });

  test("Unpaid user is redirected to /onboarding when accessing dashboard", async ({
    page,
  }) => {
    // Attempt to visit the dashboard
    await page.goto("/dashboard");

    // Check if we're redirected to /onboarding
    await expect(page).toHaveURL("/onboarding");
  });
});
