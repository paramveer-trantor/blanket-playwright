export class NeedsAssessmentPage {

    constructor(page) {
        this.page = page;
        this.header = page.locator("//div[text()=' How much term insurance do i need? ']");
        this.annualIncome = page.locator("[name = 'annualIncome']");
        this.saving = page.locator("[name = 'savings']");
        this.mortgageBalance = page.locator("[name = 'mortgageBalance']");
        this.loansAndDebts = page.locator("[name = 'loansAndDebts']");
        this.message = page.locator(".v-form .row .col .text-h4");
        this.totalvalue = page.locator("//div[@class='col-sm-8 col-md-4 col-11']/p");
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
        this.continueBtn_Fr = page.getByRole('button', { name: ' Continuer ' });
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
        await this.page.waitForURL(/\/canadianterm\/survey\/policy-options\/BK-\d+/);
        await this.annualIncome.click();
        await this.annualIncome.fill(income);
        await this.saving.click();
    }
    async enterDebtValue(debt) {
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
        const promise = this.page.waitForResponse("**/assessment", async route => {
            const res = await this.page.request.fetch(route.request());
        });
        await this.continueBtn.click();
        const response = await promise;
    }

    async clickContinueBtn_Fr() {
        await this.continueBtn_Fr.isEnabled();
        await this.continueBtn_Fr.click();
    }

    async clickBackBtn() {
        await this.backBtn.click();
    }

}

