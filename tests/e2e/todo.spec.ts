// // tests/e2e/todos.spec.ts
// import { test, expect } from "@playwright/test";

// test("should create a todo", async ({ page }) => {
//     await page.goto("/todos");
//     await page.click("text=Add Todo");
//     await page.fill("input[name='title']", "New Todo");
//     await page.click("text=Submit");
//     await expect(page.locator("text=New Todo")).toBeVisible();
// });

// test("should mark a todo as completed", async ({ page }) => {
//     await page.goto("/todos");
//     await page.click("text=New Todo");
//     await page.click("text=Mark as Completed");
//     await expect(page.locator("text=New Todo")).toHaveClass("completed");
// });

// test("should delete a todo", async ({ page }) => {
//     await page.goto("/todos");
//     await page.click("text=New Todo");
//     await page.click("text=Delete");
//     await expect(page.locator("text=New Todo")).not.toBeVisible();
// });