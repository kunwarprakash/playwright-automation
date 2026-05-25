import { Page, Locator } from '@playwright/test';
import {BasePage} from './BasePage';
import allLocators from '../locators/locators.json';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  private locators = allLocators.LoginPage;

  constructor(page: Page) {
    super(page);  
    this.usernameInput = page.locator(this.locators.usernameInput);
    this.passwordInput = page.locator(this.locators.passwordInput);
    this.loginButton = page.locator(this.locators.loginButton); 
    this.errorMessage = page.locator(this.locators.errorMessage);
  }

  async login(username: string, password: string = 'secret_sauce') {
    await this.typeText(this.usernameInput,username);
    await this.typeText(this.passwordInput,password);
    await this.clickElement(this.loginButton);
  }
}