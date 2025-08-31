import { test, expect } from '@playwright/test';

test.describe('Pipeline Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.click('button:has-text("Admin")');
  });

  test('radio group selection works', async ({ page }) => {
    // Find and interact with radio group
    const activeRadio = page.locator('input[value="active"]');
    const archivedRadio = page.locator('input[value="archived"]');
    
    // Verify active is selected by default
    await expect(activeRadio).toBeChecked();
    
    // Click archived option
    await archivedRadio.click();
    await expect(archivedRadio).toBeChecked();
    await expect(activeRadio).not.toBeChecked();
  });

  test('broker overview displays correct information', async ({ page }) => {
    // Verify broker information is displayed
    await expect(page.locator('text=Robert Turner')).toBeVisible();
    await expect(page.locator('text=16')).toBeVisible(); // Deals count
    await expect(page.locator('text=75%')).toBeVisible(); // Approval rate
    await expect(page.locator('text=$7,660')).toBeVisible(); // Pending amount
  });

  test('onboarding workflow steps are visible', async ({ page }) => {
    // Verify workflow steps are present
    await expect(page.locator('text=Deal Intake')).toBeVisible();
    await expect(page.locator('text=IDV & Credit Check')).toBeVisible();
    await expect(page.locator('text=Document Upload')).toBeVisible();
    await expect(page.locator('text=AI Validation')).toBeVisible();
    await expect(page.locator('text=Credit Committee')).toBeVisible();
    await expect(page.locator('text=Approval & Docs')).toBeVisible();
    await expect(page.locator('text=Funder Syndication')).toBeVisible();
  });

  test('AI assistant toggle works', async ({ page }) => {
    // Find AI assistant toggle switch
    const aiToggle = page.locator('[role="switch"]').first();
    
    // Check initial state and toggle
    const initialState = await aiToggle.getAttribute('aria-checked');
    await aiToggle.click();
    
    // Verify state changed
    const newState = await aiToggle.getAttribute('aria-checked');
    expect(initialState).not.toBe(newState);
  });
});
