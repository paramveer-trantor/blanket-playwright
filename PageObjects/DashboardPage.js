const { expect } = require("@playwright/test");

class DashboardPage{

    constructor(page){
        this.page = page;
        this.cookieBanner = page.locator('.v-banner__text .text-content')
        this.acceptCookiesBtn = page.getByRole('button', {name: ' Allow all cookies '});    
        this.countryBtn = page.locator('.v-btn__content .mr-3');
        this.CABtn = page.locator('.v-list-item__icon');
        this.langBtn = page.locator('.v-btn__content .currentLang');
        this.langFR = page.getByRole('menuitem');
        this.dialogBox =  page.getByRole('dialog');
        this.warningMsg = this.dialogBox.locator("//div[@class='v-dialog v-dialog--active v-dialog--persistent']//p");
        this.menuOptions = page.locator("//div[@class='row d-flex justify-end pt-3']/div");
        this.productsBtn = page.getByRole('button', {name: ' Products '});
        this.myPoliciesBtn = page.locator("//span[text()=' My Policies ']");
        this.productList = page.locator("//a[@role='option']");
        this.termlifeBtn = page.getByRole('menu').getByRole('option', { name: 'Term Life' });
        this.lifebanner = page.locator("//div[@class='d-inline-flex col col-10']//div[@class='prd-card-title col']").filter({ hasText: ' Life ' });
    }

    async getCookieBannerHeading() {    
        return (await this.cookieBanner.textContent()).trim();
    }

    async acceptCookies(){
        await this.acceptCookiesBtn.first().isVisible();
        await this.acceptCookiesBtn.first().click();
    }

    async selectCACountry(){
        await this.countryBtn.click();
        await this.CABtn.last().click();
    }

    async getMenuOptions(){
        console.log(await this.menuOptions.textContent());
        return await this.menuOptions.textContent();
    }

    async navigateToTermLifeCA(){
        await this.productsBtn.click();
        await this.termlifeBtn.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async getTLProductName() {
        await this.productsBtn.click();
        const tl_products = (await this.termlifeBtn.textContent()).trim();
        return tl_products;
    }

    async clickLifeBanner() {
        await this.lifebanner.isVisible();    
        await this.lifebanner.click();
    }

    async clickMyPoliciesBtn() {  
        await this.myPoliciesBtn.click();
    }

    async selectFRLangInForm() {
        await this.langBtn.click();
        await this.langFR.last().click();
        return (await this.warningMsg.textContent()).trim();
    }

}

module.exports = { DashboardPage };
