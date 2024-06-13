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
        return await this.list.textContent();
    }

    async getCoverageAmountOptions() {
        await this.page.locator("//label[text()='Coverage Amount']").click();
        return await this.list.last().textContent();
        // let newArr = [];
        // for (let i = 1; i <= 5; i++) {
        //     let coverageList = await this.page.getByRole('option').nth(i).textContent();
        //     newArr.push(coverageList);
        // }
        // console.log(newArr);
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


