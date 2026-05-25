import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import allLocators from '../locators/locators.json';

export class InventoryPage extends BasePage {
  readonly title: Locator;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;
  private locators =  allLocators.InventoryPage;

  constructor(page: Page) {
    super(page)
    this.title = page.locator(this.locators.title);
    this.cartIcon = page.locator(this.locators.cartIcon);
    this.cartBadge = page.locator(this.locators.cartBadge);
  }

  async addToCart(productName: string) {
    // Format product name to match data-test attribute (e.g., "Sauce Labs Backpack" -> "sauce-labs-backpack")
    const formattedName = productName.toLowerCase().replace(/ /g, '-');
    await this.page.locator(`[data-test="add-to-cart-${formattedName}"]`).click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }
}