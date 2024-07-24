const { expect } = require("@playwright/test");

class DashboardPage{

    constructor(page){
        this.page = page;
        this.cookieBanner = page.locator('.v-banner__text .text-content')
        this.acceptCookiesBtn = page.getByRole('button', {name: ' Allow all cookies '});    
        this.countryBtn = page.locator('.v-btn__content .mr-3');
        this.CABtn = page.locator('.v-list-item__icon');
        this.menuOptions = page.locator("//div[@class='row d-flex justify-end pt-3']/div");
        this.productsBtn = page.getByRole('button', {name: ' Products '});
        this.myPoliciesBtn = page.locator("//span[text()=' My Policies ']");
        this.productList = page.locator("//a[@role='option']");
        this.termlifeBtn = page.getByRole('menu').getByRole('option', { name: 'Term Life' });
        this.lifebanner = page.locator("//div[@class='d-inline-flex col col-10']//div[@class='prd-card-title col']").filter({ hasText: ' Life ' });
        this.myProfileBtn = page.locator("//div[@class='v-toolbar__content']/button[2]");
        this.profileOptions = page.getByRole('menuitem');
        this.openApplicationMsg = page.getByRole('status');
        this.langBtn = page.locator('.v-btn__content .currentLang');
        this.langFR = page.getByRole('menuitem');
        this.dialogBox =  page.getByRole('dialog');
        this.langChangeWarningMsg = this.dialogBox.locator("//div[@class='v-dialog v-dialog--active v-dialog--persistent']//p");
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

    async selectFRLang(){
        await this.langBtn.click();
        await this.langFR.last().click();
    }

    async getLangChangeWarningMsg() {
        return (await this.langChangeWarningMsg.textContent()).trim();
    }

    async getMenuOptions(){
        return await this.menuOptions.allTextContents();
    }

    async openTermLifeCAProduct(){
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

    async clickMyProfileBtn() {
        await this.myProfileBtn.click();
    }

    async clickMyApplicationsBtn() {
        await this.profileOptions.nth(1).click();
    }

    async clickLogoutBtn() {
        await this.profileOptions.last().click();
    }

    async getOpenApplicationsMsg() {
      const msg_openapps =  (await this.openApplicationMsg.textContent()).trim();
      await this.openApplicationMsg.click();
      return msg_openapps;
    }

    async clickMyApplicationsPage() {
        await this.myProfileBtn.click();
        await this.profileOptions.nth(1).click();
    }

}

module.exports = { DashboardPage };
