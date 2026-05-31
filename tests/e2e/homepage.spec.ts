import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load the homepage", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Amoré/);
  });

  test("should display the hero section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Gifts That Speak Love")).toBeVisible();
  });

  test("should navigate to shop page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Shop Bouquets/i }).click();
    await expect(page).toHaveURL(/\/shop/);
  });

  test("should display the header with navigation", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /Amoré/i }).first()).toBeVisible();
  });

  test("should display the footer", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByText(/Made with love/i)).toBeVisible();
  });
});

test.describe("Shop page", () => {
  test("should display products", async ({ page }) => {
    await page.goto("/shop");
    await expect(page.getByText("Our Collection")).toBeVisible();
  });
});

test.describe("Cart page", () => {
  test("should show empty cart message", async ({ page }) => {
    await page.goto("/cart");
    await expect(page.getByText(/Your cart is empty/i)).toBeVisible();
  });
});
