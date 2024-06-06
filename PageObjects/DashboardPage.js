const { expect } = require("@playwright/test");

exports.DashboardPage = class DashboardPage{

    constructor(page){
        this.page = page;
        this.acceptCookiesBtn = page.getByRole('button', {name: ' Allow all cookies '});    
        this.countryBtn = page.locator('.v-btn__content .mr-3');
        this.CABtn = page.locator('.v-list-item__icon');
        this.productsBtn = page.getByRole('button', {name: ' Products '});
        this.termlifeBtn = page.getByRole('menu').getByRole('option', { name: 'Term Life' });
        
        //this.termlifeBtn =  page.getByText('Term Life');
    }

    async acceptCookies(){
        await this.acceptCookiesBtn.first().isVisible();
        await this.acceptCookiesBtn.first().click();
    }

    async selectCACountry(){
        await this.countryBtn.click();
        await this.CABtn.last().click();
    }

    async navigateToTermLifeCA(){
        await this.productsBtn.click();
        await this.termlifeBtn.click();
        await this.page.waitForLoadState('domcontentloaded');
    }


}

