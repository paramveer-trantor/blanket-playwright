export class NeedsAssessmentPage {

    constructor(page) {
        this.page = page;
        this.header = page.locator("//div[text()=' How Much Term Insurance Do I Need? ']");
        this.annualIncome = page.locator("[name = 'annualIncome']");
        this.saving = page.locator("[name = 'savings']");
        this.mortgageBalance = page.locator("[name = 'mortgageBalance']");
        this.loansAndDebts = page.locator("[name = 'loansAndDebts']");
        this.message = page.locator("//div[@class='col']//p[1]");
        this.totalvalue = page.locator("//div[@class='col-sm-8 col-md-4 col-11']/p");
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
        this.backBtn = page.getByRole('button', { name: ' Back ' });
        this.errorPopUp = page.getByTestId('globalErrorMessage');
        this.closeBtnPopUp = page.getByTestId('globalErrorCloseBtn');
    }

    async getNeedsAssessmentPageHeader() {
        return (await this.header.textContent()).trim();
    }

    async enterAnnualIncome(income) {
        await this.annualIncome.click();
        await this.annualIncome.fill(income);
    }

    async clickSavings() {
        await this.saving.click();
    }

    async enterGrossIncome(income, saving, mortgageBal, debt) {
        //await this.page.waitForTimeout(2500);
        await this.annualIncome.click();
        await this.annualIncome.fill(income);
        await this.saving.click();
        // const promise =  this.page.waitForResponse("**/CATermNeedsAssessment", async route => {
        //      expect(await route.request().method()).toBe('POST');
        //      const response = await this.page.request.fetch(route.request());
        //  });
        // const response = await promise;
        // expect(response.status()).toBe(200);
        await this.saving.fill(saving);
        await this.mortgageBalance.click();
        await this.mortgageBalance.fill(mortgageBal);
        await this.loansAndDebts.click();
        await this.loansAndDebts.fill(debt);
    }

    async checkIfAnyMessageAppears() {
        const condition = await this.message.isVisible();
        return condition;
    }

    async getTotalValue() {
        return (await this.totalvalue.textContent()).trim();
    }

    async getCoverageAmountMoreMessage() {
        return (await this.message.textContent()).trim(); 
    }

    async getErrorPopUp() {
        return await this.errorPopUp.textContent();
    }

    async closeErrorPopUp() {
        await this.closeBtnPopUp.click();
    }

    async clickContinueBtn() {
        await this.continueBtn.isEnabled();
        await this.continueBtn.click();
    }

    async clickBackBtn() {
        await this.backBtn.click();     
    }

}

