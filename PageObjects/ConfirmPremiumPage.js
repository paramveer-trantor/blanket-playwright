const{ expect, request } = require("@playwright/test");

class ConfirmPremiumPage {

    constructor(page) {
        this.page = page;
        this.header = page.locator("//div[text()=' Premium Quote ']");
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
        this.quoteValue = page.locator('.estimate-subtitle .font-weight-bold');
        this.policyOptions = page.locator('.chip-text');
        this.list = page.locator("//div[@class='v-menu__content theme--light menuable__content__active']/div/div");
    }

    async getConfirmPremiumPageHeader() {
        retun (await this.header.textContent()).trim();
    }

    async getTermsOptions() {
        await this.page.locator("//label[text()='Term']").click();
        let termsOptions = [];
    
        const menuContentElement = await this.page.waitForSelector("//div[@class='v-menu__content theme--light menuable__content__active']");
        const count_terms = await menuContentElement.$$eval('div[role="option"]', options => options.length);
        termsOptions[0] = await this.list.first().textContent();
        for (let i = 1; i <= (count_terms-1); i++) {
            termsOptions[i] = await this.list.nth(i).textContent();
        }
        return termsOptions;
    }

    async getCoverageAmountOptions() {
        await this.page.locator("//label[text()='Coverage Amount']").click();
        let coverageOptions = [];
        const menuContentElement = await this.page.waitForSelector("//div[@class='v-menu__content theme--light menuable__content__active']");
        const count_coverage = await menuContentElement.$$eval('div[role="option"]', options => options.length);
        coverageOptions[0] = await this.list.first().textContent();
        for (let i = 1; i <= (count_coverage-1); i++) {
            coverageOptions[i] = await this.list.nth(i).textContent();
        }
        return coverageOptions;
    }

    async getQuoteValue() {
        await this.quoteValue.waitFor();
        const quotevalue = await this.quoteValue.textContent();
        return quotevalue;  
    }

    async getPremiumValue() {
        return (await this.policyOptions.first().textContent()).trim();
    }

    async getTermLength() {
        return (await this.policyOptions.nth(1).textContent()).trim();  
    }

    async getCoverageAmountValue() {
        return (await this.policyOptions.last().textContent()).trim();
    }

    async getTermLength() {
        return await this.policyOptions.nth(1).textContent();
    }

    async getCoverageAmountValue() {
        return await this.policyOptions.last().textContent();
    }

    async clickContinueBtn() {
        await this.continueBtn.click();     
}

}

module.exports = { ConfirmPremiumPage };


