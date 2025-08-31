import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('redirects unauthenticated users to login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/.*login/);
  });

  test('successful login with form submission', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="password"]', 'password123');
    
    await page.getByTestId('role-select-trigger').click();
    await page.locator('[data-value="ADMIN"]').click();

    await page.click('button:has-text("Sign In")');

    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('h1:has-text("DemoApp")')).toBeVisible();
  });

  test('quick role button login', async ({ page }) => {
    await page.goto('/login');

    await page.click('button:has-text("Admin")');

    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('h1:has-text("DemoApp")')).toBeVisible();
  });

  test('logout functionality', async ({ page }) => {
    await page.goto('/login');
    await page.click('button:has-text("Admin")');

    await page.waitForLoadState('networkidle');

    await page.click('button:has-text("Logout")');

    await expect(page).toHaveURL(/.*login/);
  });
});
