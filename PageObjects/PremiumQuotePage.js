import { expect } from "@playwright/test";

class PremiumQuotePage {

    constructor(page) {
        this.page = page;
        this.header = page.locator("//div[text()=' Term Life Insurance Premium Quote ']");
        this.genderMale = page.getByText('Male', { exact: true });
        this.genderFemale = page.getByText('Female', { exact: true });
        this.dateOfBirth = page.getByLabel('MM/DD/YYYY');
        this.optionYes = page.getByText('Yes');
        this.optionNo = page.getByText('No');
        this.nonSmoker = page.getByText('No');
        this.dateErrorMsg = page.locator('.v-messages__message');
        this.getQuoteBtn = page.getByRole('button', { name: ' GET QUOTE ' });
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
        this.dialogBox = page.getByRole('dialog');
        this.warningMsgText = this.dialogBox.locator("//div[@class='v-card__text justify-center text-center']/div/div");
        this.closeBtn = this.dialogBox.getByRole('button', { name: ' Close '});
    }

    async getPremiumQuotePageHeader() {
        return (await this.header.textContent()).trim();
    }

    async getQuoteValueNonSmoker(gender, date) {
        if (gender == "Male") {
            await this.genderMale.first().click();
        }
        else {
            await this.genderFemale.first().click();
        }
        await this.dateOfBirth.click();
        await this.dateOfBirth.clear();
        await this.dateOfBirth.fill(date);
        await this.optionYes.first().click();
        await this.nonSmoker.nth(1).click();
        await this.getQuoteBtn.click();       
    }

    async getQuoteValueAsSmoker(gender, date) {
        if (gender == "Male") {
            await this.genderMale.first().click();
        }
        else {
            await this.genderFemale.first().click();
        }
        await this.dateOfBirth.click();
        await this.dateOfBirth.clear();
        await this.dateOfBirth.fill(date);
        await this.optionYes.first().click();
        await this.optionYes.last().click();
        await this.getQuoteBtn.click();       
    }

    async getNonCandianWarningMsg() {
        await this.optionNo.first().click();
        const msg_warning = (await this.warningMsgText.textContent()).trim();
        await this.closeBtn.click();
        return msg_warning;  
    }

    async getIncorrectDateErrorMsg(gender, date) {
        if (gender == "Male") {
            await this.genderMale.first().click();
        }
        else {
            await this.genderFemale.first().click();
        }
        await this.dateOfBirth.click();
        await this.dateOfBirth.fill(date);
        const errorMsg = await this.dateErrorMsg.textContent();
        await this.page.locator("//button[@aria-label='Clear MM/DD/YYYY']").click();
        return errorMsg;
    }

    async clickContinueBtn() {
        await this.continueBtn.click();          
    }
}

module.exports = { PremiumQuotePage };



