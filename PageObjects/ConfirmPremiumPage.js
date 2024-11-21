const{ expect, request } = require("@playwright/test");

class ConfirmPremiumPage {

    constructor(page) {
        this.page = page;
        this.header = page.locator("//div[text()=' Premium Quote ']");
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
        this.quoteValue = page.locator('.estimate-subtitle .font-weight-bold');
        this.policyOptions = page.locator('.chip-text');
        this.list = page.locator("//div[@class='v-menu__content theme--light menuable__content__active']/div/div");
        this.term = page.locator("//label[text()='Term']");
        this.coverage = page.locator("//label[text()='Coverage Amount']");
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

    async getQuoteOnTermSelected(termvalue) {
        await this.page.locator("//label[text()='Term']").click();
        if (termvalue == 10) {
            await this.page.getByRole('listbox').getByRole('option').first().click();
            const quotevalue_10 = await this.quoteValue.textContent();
            return quotevalue_10; 
        }
        if (termvalue == 15) {
            await this.page.getByRole('listbox').getByRole('option').nth(1).click();
            const quotevalue_15 = await this.quoteValue.textContent();
            return quotevalue_15; 
        }
        if (termvalue == 20) {
            await this.page.getByRole('listbox').getByRole('option').last().click();
            const quotevalue_20 = await this.quoteValue.textContent();
            return quotevalue_20; 
        }
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

    async getQuoteOnCoverageAmountSelected(coveragevalue) {
        await this.page.locator("//label[text()='Coverage Amount']").click();
        if (coveragevalue == "$100K") {
            await this.page.getByRole('listbox').getByRole('option').first().click();
            const quotevalue_100k = await this.quoteValue.textContent();
            return quotevalue_100k;  
        }
        if (coveragevalue == "$500K") {
            await this.page.getByRole('listbox').getByRole('option').nth(3).click();
            const quotevalue_500k = await this.quoteValue.textContent();
            return quotevalue_500k;  
        }
        if (coveragevalue == "$1M") {
            await this.page.getByRole('listbox').getByRole('option').last().click();
            const quotevalue_1M = await this.quoteValue.textContent();
            return quotevalue_1M;
        }
    }

    async getQuoteValue() {
        await this.quoteValue.waitFor();
        const premiumrate_value = await this.quoteValue.textContent();
        const numericValue = parseFloat(premiumrate_value.replace(/[^0-9.]/g, ''));
        const addedValue = numericValue + 2.70;
        const premiumrate = parseFloat(addedValue.toFixed(2));
        return premiumrate;  
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

    async changeTermLength(length) {
        await this.term.click();
        await this.page.getByRole('listbox').getByRole('option', { name: length }).click();
    }

    async changeCoverageAmount(amount) {
        await this.coverage.click();
        await this.page.getByRole('listbox').getByRole('option', { name: amount }).click();
    }

    async clickContinueBtn() {
        await this.continueBtn.isVisible();
        await this.continueBtn.click();     
    }

}

module.exports = { ConfirmPremiumPage };


