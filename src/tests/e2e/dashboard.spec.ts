import { test, expect } from '@playwright/test';

test.describe('Dashboard Functionality', () => {
  // Login before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.click('button:has-text("Admin")');
    await page.waitForLoadState('networkidle');
  });

  test('pipeline tabs update borrower list and active profile', async ({ page }) => {
    // Check New tab is active by default
    await expect(page.locator('[role="tab"][aria-selected="true"]')).toContainText('New');

    // Click on In Review tab
    await page.click('[role="tab"]:has-text("In Review")');
    await expect(page.locator('[role="tab"][aria-selected="true"]')).toContainText('In Review');

    // Verify borrower list updates
    await expect(page.locator('text=Alan Matthews')).toBeVisible();
  });

  test('borrower selection updates the center pane', async ({ page }) => {
    // Click on a borrower card
    await page.click('text=Sarah Dunn');

    // Wait for the center panel to update
    await page.waitForTimeout(500);

    // Verify center panel updates - use .first() to avoid strict mode violation
    await expect(page.locator('text=sarah.dunn@example.com')).toBeVisible();
    await expect(page.locator('text=$300,000').first()).toBeVisible();
  });

  test('AI Explainability section renders flags and is collapsible', async ({ page }) => {
    // Select borrower with AI flags
    await page.click('text=Sarah Dunn');
    await page.waitForTimeout(500);

    // Look for accordion trigger with more specific selector
    const accordionTrigger = page.locator('button:has-text("AI Explainability")').first();
    await accordionTrigger.click();

    // Wait for accordion animation
    await page.waitForTimeout(500);

    // Verify AI flags are visible
    await expect(page.locator('text=Income Inconsistent')).toBeVisible();
    await expect(page.locator('text=High Debt-to-Income Ratio')).toBeVisible();

    // Verify action buttons are present
    await expect(page.locator('button:has-text("Request Documents")')).toBeVisible();
    await expect(page.locator('button:has-text("Send to Valuer")')).toBeVisible();
  });

  test('button clicks log appropriate console outputs', async ({ page }) => {
    // Listen for console messages
    const consoleMessages: string[] = [];
    page.on('console', msg => consoleMessages.push(msg.text()));

    await page.click('text=Sarah Dunn');
    await page.waitForTimeout(500);
    
    // Expand accordion
    const accordionTrigger = page.locator('button:has-text("AI Explainability")').first();
    await accordionTrigger.click();
    await page.waitForTimeout(500);

    // Click action buttons and verify console logs
    await page.click('button:has-text("Request Documents")');
    await page.waitForTimeout(200);

    expect(consoleMessages.some(msg => msg.includes('Request Documents'))).toBeTruthy();
  });

  test('Escalate to Credit Committee button is conditionally enabled', async ({ page }) => {
    await page.click('text=Sarah Dunn');
    await page.waitForTimeout(500);

    const escalateButton = page.locator('button:has-text("Escalate to Credit Committee")');
    await expect(escalateButton).toBeVisible();
    await expect(escalateButton).toBeEnabled();
  });

  test('responsive layout across screen sizes', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('[role="tablist"]')).toBeVisible();

    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('[role="tablist"]')).toBeVisible();
  });
});
