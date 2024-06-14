const{ expect, request } = require("@playwright/test");

class ConfirmPremiumPage {

    constructor(page) {
        this.page = page;
        this.header = page.locator("//div[text()=' Premium Quote ']");
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
        this.quoteValue = page.locator('.estimate-subtitle .font-weight-bold');
        this.list = page.getByRole('listbox');
    }

    async getConfirmPremiumPageHeader() {
        const confirmPremium_header = await this.header.textContent();
        return confirmPremium_header;
    }

    async getTermsOptions() {
        await this.page.locator("//label[text()='Term']").click();
        let termsOptions = [];
        termsOptions[0] = await this.page.locator('.menuable__content__active').getByRole('option').first().textContent();
        for (let i = 1; i <= (termsOptions.length - 1); i++) {
            termsOptions[i] = await this.page.locator('.menuable__content__active').getByRole('option').nth(i).textContent();
        }
        return termsOptions;
    }

    async getCoverageAmountOptions() {
        await this.page.locator("//label[text()='Coverage Amount']").click();
        let coverageOptions = [];
        coverageOptions[0] = await this.page.locator('.menuable__content__active').getByRole('option').first().textContent(); 
        coverageOptions[1] = await this.page.locator('.menuable__content__active').getByRole('option').last().textContent(); 
        // for (let i = 1; i <= 3; i++) {
        //     coverageOptions[i] = await this.page.locator('.menuable__content__active').getByRole('option').nth(i).textContent();
        // }
        //console.log(coverageOptions);
        return coverageOptions;
    }

    async comfirmQuoteValue() {
        await this.quoteValue.waitFor();
        const quotevalue = await this.quoteValue.textContent();
        return quotevalue;
    }

    async clickContinueBtn() {
        await this.continueBtn.click();     
}

}

module.exports = { ConfirmPremiumPage };


