// // tests/e2e/todos.spec.ts
import { test, expect } from "@playwright/test";

test("should show the home page", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveText("Home");
});

test("should show the login form", async ({ page }) => {
    await page.goto("/login");
    await expect(page.locator("h1")).toHaveText("Login");
});

test("should show the register form", async ({ page }) => {
    await page.goto("/register");
    await expect(page.locator("h1")).toHaveText("Register");
});

test("should show the todos page", async ({ page }) => {
    await page.goto("/todos");
    await expect(page.locator("h1")).toHaveText("Todos");
});





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