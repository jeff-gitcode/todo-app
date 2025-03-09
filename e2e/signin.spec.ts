// // tests/e2e/todos.spec.ts
import { test, expect } from "@playwright/test";

test("should show the sigin page", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible();
    await expect(page.locator("p")).toHaveText("Access Denied");
});

test("should show the register page", async ({ page }) => {
    await page.goto("/");
    // click on sign in link
    await page.click("text=Sign In");
    // should redirect to sign in page
    await page.waitForURL('**/signin');
    // click on register link    
});

// test("should show the register form", async ({ page }) => {
//     await page.goto("/register");
//     await expect(page.locator("h1")).toHaveText("Register");
// });

// test("should show the todos page", async ({ page }) => {
//     await page.goto("/todos");
//     await expect(page.locator("h1")).toHaveText("Todos");
// });





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