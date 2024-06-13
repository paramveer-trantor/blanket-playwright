const{ expect, request } = require("@playwright/test");
//const { callAPI } = require('../api');
//import { needAssessmentApiData, getCaPremiumData } from '../Utils/TestData';
class NeedsAssessmentPage {

    constructor(page) {
        this.page = page;
        this.header = page.locator("//div[text()=' How Much Term Insurance Do I Need? ']");
        this.annualIncome = page.locator("[name = 'annualIncome']");
        this.saving = page.locator("[name = 'savings']");
        this.mortgageBalance = page.locator("[name = 'mortgageBalance']");
        this.loansAndDebts = page.locator("[name = 'loansAndDebts']");
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
    }

    async getNeedsAssessmentPageHeader() {
        return await this.header.textContent();
    }

    async enterGrossIncome(income, saving, mortgageBal, debt) {
        await this.annualIncome.click();
        await this.annualIncome.fill(income);
        await this.saving.click();
        const promise =  this.page.waitForResponse("https://us-central1-blanket-development.cloudfunctions.net/CATermNeedsAssessment", async route => {
             expect(await route.request().method()).toBe('POST');
             const response = await this.page.request.fetch(route.request());
         });
        const response = await promise;
        expect(response.status()).toBe(200);
        
        await this.saving.fill(saving);
        await this.mortgageBalance.click();
        await this.mortgageBalance.fill(mortgageBal);
        await this.loansAndDebts.click();
        await this.loansAndDebts.fill(debt);
    }

    async clickContinueBtn() {
        await this.continueBtn.isEnabled();

        const promise =  this.page.waitForResponse("https://us-central1-blanket-development.cloudfunctions.net/getCATermPremium", async route => {
             expect(await route.request().method()).toBe('POST');
             const response = await this.page.request.fetch(route.request());
         });
        await this.continueBtn.click();
        const response = await promise;
        expect(response.status()).toBe(200);
    }

}

module.exports = { NeedsAssessmentPage };
