import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('2. Product Catalog Module', () => {
  test('Positive: Successfully add product to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    
    await loginPage.goto();
    await loginPage.login('standard_user');
    
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('Negative: Verify behavior with invalid product interactions (Unauthorized access)', async ({ page }) => {
    // Attempting to bypass login and access the inventory directly
    await page.goto('/inventory.html');
    const loginPage = new LoginPage(page);
    
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText("Epic sadface: You can only access '/inventory.html' when you are logged in.");
  });
});