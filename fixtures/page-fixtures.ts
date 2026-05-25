import {Page} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {InventoryPage} from '../pages/InventoryPage';
import {CheckoutPage} from '../pages/CheckoutPage';

export class PageFixture{

    readonly loginPage: LoginPage;
    readonly inventoryPage: InventoryPage;
    readonly checkoutPage: CheckoutPage;
    readonly page: Page;

    constructor(page: Page){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.inventoryPage = new InventoryPage(page);
        this.checkoutPage = new CheckoutPage(page);
    }

    get basePage(): Page{
        return this.page;
    }


}