import { test, expect } from '../../utils/test-base';

test.describe('3. Shopping Cart/Checkout Module', () => {

  test.beforeEach(async ({ pages }) => {

    await pages.loginPage.goto();
    await pages.loginPage.login('standard_user');
    await pages.inventoryPage.addToCart('Sauce Labs Backpack');
    await pages.inventoryPage.goToCart();
    await pages.checkoutPage.startCheckout();
  });

  test('Positive: Complete checkout flow', async ({ pages }) => {
    await pages.checkoutPage.fillShippingInfo('John', 'Doe', '12345');
    await expect(pages.page).toHaveURL(/.*checkout-step-two.html/);
    await pages.checkoutPage.finishCheckout();
    await expect(pages.checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('Negative: Validation errors in checkout form', async ({pages}) => {
    // Attempting to continue without entering required data
    await pages.checkoutPage.fillShippingInfo('', '', '');
    await expect(pages.checkoutPage.errorMessage).toBeVisible();
    await expect(pages.checkoutPage.errorMessage).toContainText('Error: First Name is required');
  });
});