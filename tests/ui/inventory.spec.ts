import { test, expect } from '../../utils/test-base';


test.describe('2. Product Catalog Module', () => {
  test('Positive: Successfully add product to cart', async ({ pages }) => {
    
    await pages.loginPage.goto();
    await pages.loginPage.login('standard_user');
    
    await pages.inventoryPage.addToCart('Sauce Labs Backpack');
    await expect(pages.inventoryPage.cartBadge).toHaveText('1');
  });

  test('Negative: Verify behavior with invalid product interactions (Unauthorized access)', async ({ pages }) => {
    // Attempting to bypass login and access the inventory directly
    await pages.page.goto('/inventory.html');
    
    await expect(pages.loginPage.errorMessage).toBeVisible();
    await expect(pages.loginPage.errorMessage).toContainText("Epic sadface: You can only access '/inventory.html' when you are logged in.");
  });
});