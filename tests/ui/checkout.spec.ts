import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('3. Shopping Cart/Checkout Module', () => {
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user');
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await checkoutPage.startCheckout();
  });

  test('Positive: Complete checkout flow', async ({ page }) => {
    await checkoutPage.fillShippingInfo('John', 'Doe', '12345');
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    await checkoutPage.finishCheckout();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('Negative: Validation errors in checkout form', async () => {
    // Attempting to continue without entering required data
    await checkoutPage.fillShippingInfo('', '', '');
    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText('Error: First Name is required');
  });
});