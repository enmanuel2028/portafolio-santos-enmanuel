import { expect, test } from "@playwright/test";

test.describe("Home", () => {
  test("loads and shows the hero", async ({ page }) => {
    await page.goto("/es");

    await expect(page).toHaveTitle(/Santos Enmanuel/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Santos");

    // The main landmark must exist for the skip link to have a target.
    await expect(page.locator("#main")).toBeVisible();
  });

  test("root redirects to the default locale", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/es$/);
  });

  test("has no console errors on load", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    await page.goto("/es");
    await page.waitForLoadState("networkidle");

    expect(errors).toEqual([]);
  });
});

test.describe("Navigation", () => {
  test("in-page anchors reach every section", async ({ page }) => {
    await page.goto("/es");

    for (const id of ["about", "projects", "experience", "skills", "lab", "contact"]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test("skip link is the first tab stop and targets main", async ({ page }) => {
    await page.goto("/es");
    await page.keyboard.press("Tab");

    const focused = page.locator(":focus");
    await expect(focused).toHaveAttribute("href", "#main");
  });
});

test.describe("Projects", () => {
  test("opens a case study from the project list", async ({ page }) => {
    await page.goto("/es/projects");

    await page.getByRole("heading", { name: "VialAI" }).click();

    await expect(page).toHaveURL(/\/es\/projects\/vialai$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("VialAI");
  });

  test("case study renders its narrative sections", async ({ page }) => {
    await page.goto("/es/projects/vialai");

    await expect(page.getByRole("heading", { name: "Arquitectura", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Resultados", exact: true })).toBeVisible();
  });

  test("links to the next project", async ({ page }) => {
    await page.goto("/es/projects/vialai");

    const next = page.getByRole("navigation", { name: /Proyecto siguiente/i });
    await expect(next).toBeVisible();
    await next.getByRole("link").click();
    await expect(page).toHaveURL(/\/es\/projects\/vigilancia-tecnologica$/);
  });
});

test.describe("Locale switcher", () => {
  test("switches language and keeps the route", async ({ page }) => {
    await page.goto("/es/projects");

    await page.getByRole("group", { name: /Cambiar idioma/i }).getByRole("button", { name: "EN" }).click();

    await expect(page).toHaveURL(/\/en\/projects$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });
});

test.describe("Contact", () => {
  test("contact section is reachable and titled", async ({ page }) => {
    await page.goto("/es");
    await page.locator("#contact").scrollIntoViewIfNeeded();

    await expect(
      page.getByRole("heading", { name: /Construyamos algo que realmente funcione/i }),
    ).toBeVisible();
  });
});
