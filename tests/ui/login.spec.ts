import { test, expect } from '../../utils/test-base';

test.describe('1. Login Module', () => {

  test.beforeEach(async ({ pages }) => {
    await pages.loginPage.goto();
  });

  test('Positive: Successful login with valid credentials', async ({ pages }) => {
    await pages.loginPage.login('standard_user');
    await expect(pages.page).toHaveURL('/inventory.html');
    
  });

  test('Negative: Login failure with invalid credentials', async ({pages}) => {
    await pages.loginPage.login('invalid_user', 'wrong_password');
    await expect(pages.loginPage.errorMessage).toBeVisible();
    await expect(pages.loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match');
  });
});