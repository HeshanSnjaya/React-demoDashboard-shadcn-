import { test, expect } from '@playwright/test';

test.describe('Dashboard Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.click('button:has-text("Admin")');
    await page.waitForLoadState('networkidle');
  });

  test('pipeline tabs update borrower list and active profile', async ({ page }) => {
    await expect(page.locator('[role="tab"][aria-selected="true"]')).toContainText('New');

    await page.click('[role="tab"]:has-text("In Review")');
    await expect(page.locator('[role="tab"][aria-selected="true"]')).toContainText('In Review');

    await expect(page.locator('text=Alan Matthews')).toBeVisible();
  });

  test('borrower selection updates the center pane', async ({ page }) => {
    await page.click('text=Sarah Dunn');
    await page.waitForTimeout(500);

    await expect(page.getByTestId('borrower-email')).toContainText('sarah.dunn@example.com');
    await expect(page.getByTestId('loan-amount')).toContainText('$300,000');
  });

  test('AI Explainability section renders flags and is collapsible', async ({ page }) => {
    await page.click('text=Sarah Dunn');
    await page.waitForTimeout(500);

    await page.getByTestId('ai-explainability-trigger').click();
    
    await expect(page.getByTestId('ai-explainability-content')).toBeVisible();

    await expect(page.getByTestId('ai-flags')).toContainText('Income Inconsistent with Bank statements');
    await expect(page.getByTestId('ai-flags')).toContainText('High Debt-to-Income Ratio detected');

    await expect(page.getByTestId('btn-request-docs')).toBeVisible();
    await expect(page.getByTestId('btn-send-valuer')).toBeVisible();
  });

  test('button clicks log appropriate console outputs', async ({ page }) => {
    const consoleMessages: string[] = [];
    page.on('console', msg => consoleMessages.push(msg.text()));

    await page.click('text=Sarah Dunn');
    await page.waitForTimeout(500);
    
    await page.getByTestId('ai-explainability-trigger').click();
    await expect(page.getByTestId('ai-explainability-content')).toBeVisible();

    await page.getByTestId('btn-request-docs').click();
    await page.waitForTimeout(200);

    expect(consoleMessages.some(msg => msg.includes('Request Documents'))).toBeTruthy();
  });

  test('Escalate to Credit Committee button is conditionally enabled', async ({ page }) => {
    await page.click('text=Sarah Dunn');
    await page.waitForTimeout(500);

    await expect(page.getByTestId('btn-escalate')).toBeVisible();
    await expect(page.getByTestId('btn-escalate')).toBeEnabled();
  });

  test('responsive layout across screen sizes', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('[role="tablist"]')).toBeVisible();

    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('[role="tablist"]')).toBeVisible();
  });
});
