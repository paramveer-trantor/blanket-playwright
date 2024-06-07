const{ expect, request } = require("@playwright/test");

class PremiumQuotePage {

    constructor(page) {
        this.header = page.locator("//div[text()=' Premium Quote ']");
        this.genderMale = page.getByText('Male', { exact: true });
        this.genderFemale = page.getByText('Female', { exact: true });
        this.dateOfBirth = page.getByLabel('MM/DD/YYYY');
        this.canadianCitizen = page.getByText('Yes');
        this.nonSmoker = page.getByText('No');
        this.getQuoteBtn = page.getByRole('button', { name: ' GET QUOTE ' });
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
    }

    async verifyPremiumPageHeader() {
        expect(await this.header.textContent()).toContain('Premium');
    }

    async getQuoteValue(gender, date) {
        if (gender == "Male") {
            await this.genderMale.first().click();
        }
        else {
            await this.genderFemale.first().click();
        }
        await this.dateOfBirth.click();
        await this.dateOfBirth.fill(date);
        await this.canadianCitizen.first().click();
        await this.nonSmoker.nth(1).click();
        await this.getQuoteBtn.click();
    }

    async clickContinueBtn() {

        // await this.page.route("*getCATermPremium", async route => {
        //     expect(route.request().method()).toBe('POST');
        //     const response = await this.page.request.fetch(route.request());  
        //     expect(response.status()).toBe(200);
        // });
        
        await this.continueBtn.click();
    }
}

module.exports = { PremiumQuotePage };



