import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickElement(locator: Locator) {
    await locator.waitFor({ state: "visible" });
    await locator.click();
  }
  
  async goto() {
    await this.page.goto('/');
  }

  async typeText(locator: Locator, text: string) {
    await locator.waitFor({ state: "visible" });
    await locator.fill(text);
  }

  async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: "visible" });
    return (await locator.textContent()) || "";
  }

  async isElementVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState("networkidle");
  }

  async selectDropdownByText(locator: Locator, value: string) {
    await locator.selectOption({ label: value });
  }

  async hoverElement(locator: Locator) {
    await locator.hover();
  }

  async pressKeyboard(key: string) {
    await this.page.keyboard.press(key);
  }

  async uploadFile(locator: Locator, filePath: string) {
    await locator.setInputFiles(filePath);
  }

  async scrollIntoView(locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
  }
}
