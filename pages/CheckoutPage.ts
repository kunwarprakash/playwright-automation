import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import allLocators from '../locators/locators.json';

export class CheckoutPage extends BasePage{
  readonly checkoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly errorMessage: Locator;
  private locators = allLocators.CheckoutPage;

  constructor(page: Page) {
    super(page);
    this.checkoutButton =  page.locator(this.locators.checkoutButton);
    this.firstNameInput = page.locator(this.locators.firstNameInput);
    this.lastNameInput = page.locator(this.locators.lastNameInput);
    this.postalCodeInput = page.locator(this.locators.postalCodeInput);
    this.continueButton = page.locator(this.locators.continueButton);
    this.finishButton = page.locator(this.locators.finishButton);
    this.completeHeader = page.locator(this.locators.completeHeader);
    this.errorMessage = page.locator(this.locators.errorMessage);
  }

  async startCheckout() {
    await this.clickElement(this.checkoutButton);
  }

  async fillShippingInfo(firstName: string, lastName: string, zip: string) {
    if (firstName) await this.typeText(this.firstNameInput, firstName);
    if (lastName) await this.typeText(this.lastNameInput, lastName);
    if (zip) await this.typeText(this.postalCodeInput, zip);
    await this.clickElement(this.continueButton);
  }

  async finishCheckout() {
    await this.clickElement(this.finishButton);
  }
}