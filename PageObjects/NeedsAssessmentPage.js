exports.NeedsAssessmentPage = class NeedsAssessmentPage {

    constructor(page) {
        this.page = page;
        this.annualIncome = page.locator("[name = 'annualIncome']");
        this.saving = page.locator("[name = 'savings']"); 
        this.mortgageBalance = page.locator("[name = 'mortgageBalance']");
        this.loansAndDebts = page.locator("[name = 'loansAndDebts']");
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
    }

    async enterGrossIncome(income,saving,mortgageBal,debt) {
        await this.annualIncome.click();
        await this.annualIncome.fill(income);
        await this.page.route('**CATermNeedsAssessment', (route) => {
            const request = route.request();
            expect(request.method()).toBe('POST');
            route.continue();
        })
        await this.saving.click();
        await this.saving.fill(saving);
        await this.mortgageBalance.click();
        await this.mortgageBalance.fill(mortgageBal);
        await this.loansAndDebts.click();
        await this.loansAndDebts.fill(debt);
    }

    async clickContinueBtn() {
        await this.page.route('**getCATermPremium', (route) => {
            const request = route.request();
            expect(request.method()).toBe('POST');
            route.continue();
        })
        await this.continueBtn.isEnabled();
        await this.continueBtn.click();
    }

}
