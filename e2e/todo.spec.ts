import { test, expect } from '@playwright/test';

test('should sign in and navigate to the protected page', async ({ page }) => {
  // Navigate to the home page
  await page.goto('http://localhost:3000/');

  // Click on the 'Main' navigation link
  await page.getByRole('navigation', { name: 'Main' }).click();

  // Verify that the 'Sign In' button is visible
  await expect(page.getByLabel('Main').getByText('Sign In')).toBeVisible();

  // Click on the 'Email' textbox
  await page.getByRole('textbox', { name: 'Email' }).click();

  // Click on the 'Sign In' button
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Verify that the 'Sign In' text is visible
  await expect(page.getByText('Sign In').nth(1)).toBeVisible();

  // Verify that the 'Email' textbox is visible
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();

  // Verify that the 'Password' textbox is visible
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();

  // Verify that the 'Sign In' button is visible
  await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();

  // Click on the 'Email' textbox and fill it with the email
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@test.com');

  // Press 'Tab' to move to the 'Password' textbox and fill it with the password
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('test');

  // Click on the 'Sign In' button
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Verify that the user is signed in and the home page is displayed
  await expect(page.getByText('HomeSign Outtest1')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
  await expect(page.getByText('test1')).toBeVisible();

  // Verify that the protected page is displayed
  await expect(page.getByRole('heading', { name: 'Protected Page' })).toBeVisible();
  await expect(page.getByText('Todo List')).toBeVisible();
  // await expect(page.getByRole('button', { name: 'Edit' })).toBeVisible();
  // await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'New' })).toBeVisible();

  // Click on the 'New' button to create a new todo
  await page.getByRole('button', { name: 'New' }).click();

  // Verify that the 'Create Todo' page is displayed
  await expect(page.getByRole('heading', { name: 'Create Todo' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Title' })).toBeVisible();

  // Verify that the 'Create Todo' button is visible
  await expect(page.getByRole('button', { name: 'Create Todo' })).toBeVisible();

  // Verify that the 'Cancel' button is visible
  await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();

  // Click on the 'Title' textbox and fill it with the title 'playwright'
  await page.getByRole('textbox', { name: 'Title' }).click();
  await page.getByRole('textbox', { name: 'Title' }).fill('playwright');

  // Press 'Tab' to move to the next element
  await page.getByRole('textbox', { name: 'Title' }).press('Tab');

  // Click on the 'Create Todo' button
  await page.getByRole('button', { name: 'Create Todo' }).click();

  // Verify that the 'Todo List' is visible
  await expect(page.getByText('Todo List')).toBeVisible();

  // Verify that the newly created todo 'playwright' is visible
  await expect(page.getByRole('cell', { name: 'playwright' })).toBeVisible();

  // Click on the 'Edit' button for the newly created todo
  await page.getByRole('button', { name: 'Edit' }).nth(0).click();

  // Verify that the 'Edit Todo' page is visible
  await expect(page.getByRole('heading', { name: 'Edit Todo' })).toBeVisible();

  // Verify that the 'Title' textbox is visible
  await expect(page.getByRole('textbox', { name: 'Title' })).toBeVisible();

  // Verify that the 'Update Todo' button is visible
  await expect(page.getByRole('button', { name: 'Update Todo' })).toBeVisible();

  // Verify that the 'Cancel' button is visible
  await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();

  // Click on the 'Title' textbox and update the title to 'playwright update'
  await page.getByRole('textbox', { name: 'Title' }).click();
  await page.getByRole('textbox', { name: 'Title' }).fill('playwright update');

  // Press 'Tab' to move to the next element
  await page.getByRole('textbox', { name: 'Title' }).press('Tab');

  // Click on the 'Update Todo' button
  await page.getByRole('button', { name: 'Update Todo' }).click();

  // Verify that the updated todo 'playwright update' is visible
  await expect(page.getByRole('cell', { name: 'playwright update' })).toBeVisible();

  // Verify that the 'Todo List' is visible
  await expect(page.getByText('Todo List')).toBeVisible();

  // Click on the 'Delete' button for the updated todo
  await page.getByRole('button', { name: 'Delete' }).nth(0).click();

  // Verify that the 'Protected Page' is visible
  await expect(page.getByRole('heading', { name: 'Protected Page' })).toBeVisible();

  // Click on the 'Sign Out' button
  await page.getByRole('button', { name: 'Sign Out' }).click();

  // Verify that the 'Sign In' page is visible
  await expect(page.getByText('Sign In')).toBeVisible();

  // Verify that the 'Access Denied' message is visible
  await expect(page.getByText('Access Denied')).toBeVisible();

});
