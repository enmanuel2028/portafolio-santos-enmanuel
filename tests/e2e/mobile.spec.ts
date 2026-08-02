import { expect, test } from "@playwright/test";

// The sheet only exists below the `lg` breakpoint.
test.use({ viewport: { width: 390, height: 844 } });

test.describe("Mobile menu", () => {
  test("opens, navigates and closes", async ({ page }) => {
    await page.goto("/es");

    await page.getByRole("button", { name: /Abrir menú/i }).click();

    const menu = page.getByRole("dialog", { name: /Menú/i });
    await expect(menu).toBeVisible();

    await menu.getByRole("link", { name: "Proyectos" }).click();
    await expect(menu).toBeHidden();
    await expect(page).toHaveURL(/#projects$/);
  });

  test("closes with Escape", async ({ page }) => {
    await page.goto("/es");

    await page.getByRole("button", { name: /Abrir menú/i }).click();
    const menu = page.getByRole("dialog", { name: /Menú/i });
    await expect(menu).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
  });

  test("page does not scroll horizontally", async ({ page }) => {
    await page.goto("/es");

    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflows).toBe(false);
  });
});

test.describe("Reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("content stays reachable without the pinned journey", async ({ page }) => {
    await page.goto("/es");

    // Showreel falls back to a static list; its heading must still be present.
    await expect(page.locator("#showreel-title")).toBeAttached();
    await expect(page.locator("#contact")).toBeAttached();
  });
});
