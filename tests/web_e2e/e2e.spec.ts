import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('End-to-End Test', () => {
  test('E2E: Login -> Add to Cart -> Checkout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);

    // 1. Login
    await loginPage.goto();
    await loginPage.login('standard_user');
    await expect(page).toHaveURL('/inventory.html');

    // 2. Add to Cart
    await inventoryPage.addToCart('Sauce Labs Fleece Jacket');
    await expect(inventoryPage.cartBadge).toHaveText('1');

    // 3. Go to Cart & Checkout
    await inventoryPage.goToCart();
    await checkoutPage.startCheckout();
    await checkoutPage.fillShippingInfo('Jane', 'Smith', '90210');
    await checkoutPage.finishCheckout();

    // 4. Verify Success
    await expect(checkoutPage.completeHeader).toBeVisible();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });
});