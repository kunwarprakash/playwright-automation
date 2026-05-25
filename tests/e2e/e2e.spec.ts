import { test, expect } from '../../utils/test-base';

test.describe('End-to-End Test', () => {
  test('E2E: Login -> Add to Cart -> Checkout', async ({ pages }) => {

    // 1. Login
    await pages.loginPage.goto();
    await pages.loginPage.login('standard_user');
    await expect(pages.page).toHaveURL('/inventory.html');

    // 2. Add to Cart
    await pages.inventoryPage.addToCart('Sauce Labs Fleece Jacket');
    await expect(pages.inventoryPage.cartBadge).toHaveText('1');

    // 3. Go to Cart & Checkout
    await pages.inventoryPage.goToCart();
    await pages.checkoutPage.startCheckout();
    await pages.checkoutPage.fillShippingInfo('Jane', 'Smith', '90210');
    await pages.checkoutPage.finishCheckout();

    // 4. Verify Success
    await expect(pages.checkoutPage.completeHeader).toBeVisible();
    await expect(pages.checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });
});