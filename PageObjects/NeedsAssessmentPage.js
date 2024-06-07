const{ expect, request } = require("@playwright/test");
const { callAPI } = require('../api');
import { needAssessmentApiData, getCaPremiumData } from '../Utils/TestData';
class NeedsAssessmentPage {

    constructor(page) {
        this.page = page;
        this.annualIncome = page.locator("[name = 'annualIncome']");
        this.saving = page.locator("[name = 'savings']");
        this.mortgageBalance = page.locator("[name = 'mortgageBalance']");
        this.loansAndDebts = page.locator("[name = 'loansAndDebts']");
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
    }

    async enterGrossIncome(income, saving, mortgageBal, debt) {
        await this.annualIncome.click();
        await this.annualIncome.fill(income);

        // await this.page.route("*CATermNeedsAssessment", async route => {
        //     expect(route.request().method()).toBe('POST');
        //     const response = await this.page.request.fetch(route.request());
        //     expect(response.status()).toBe(200);
        // });

        await this.saving.click();
        await this.saving.fill(saving);
        await this.mortgageBalance.click();
        await this.mortgageBalance.fill(mortgageBal);
        await this.loansAndDebts.click();
        await this.loansAndDebts.fill(debt);
        const response1 = await callAPI('/CATermNeedsAssessment', needAssessmentApiData);
        const response2 = await callAPI('/getCATermPremium', getCaPremiumData);
        expect(response2.status).toBe(200);
    }

    async clickContinueBtn() {

        // await this.page.route("*getCATermPremium", async route => {
        //     expect(route.request().method()).toBe('POST');
        //     const response = await this.page.request.fetch(route.request());
        //     expect(response.status()).toBe(200);
        // });

        await this.continueBtn.isEnabled();
        await this.continueBtn.click();
    }

}

module.exports = { NeedsAssessmentPage };
