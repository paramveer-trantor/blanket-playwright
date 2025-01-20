export class PremiumQuotePage {

    constructor(page) {
        this.page = page;
        this.header = page.locator("//div[text()=' Term Life Insurance Premium Quote ']");
        this.genderMale = page.getByText('Male', { exact: true });
        this.genderFemale = page.getByText('Female', { exact: true });
        this.dateOfBirth = page.getByLabel('MM/DD/YYYY', { exact: true });
        this.heightFeet = page.locator("[name = 'feet']");
        this.heightInches = page.locator("[name = 'inches']");
        this.weight = page.getByLabel('Pounds'); 
        this.optionYes = page.getByText('Yes');
        this.optionNo = page.getByText('No');
        this.nonSmoker = page.getByText('No');
        this.dateErrorMsg = page.locator('.v-messages__message');
        this.getQuoteBtn = page.getByRole('button', { name: ' GET QUOTE ' });
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
        this.dialogBox = page.getByRole('dialog');
        this.warningMsgText = this.dialogBox.locator("//div[@class='v-card__text justify-center text-center']/div/div");
        this.closeBtn = this.dialogBox.getByRole('button', { name: ' Close '});
        this.premiumValue = page.locator('.estimate-subtitle .font-weight-bold ');
        this.errorPopUp = page.getByTestId('globalErrorMessage');
        this.closeBtnPopUp = page.getByTestId('globalErrorCloseBtn');
    }

    async getPremiumQuotePageHeader() {
        return (await this.header.textContent()).trim();
    }

    async fillQuotePage(gender, date, feet, inches, weight) {
        if (gender == "Male") {
            await this.genderMale.first().click();
        }
        else {
            await this.genderFemale.first().click(); 
        }
        await this.dateOfBirth.click();
        await this.dateOfBirth.clear();
        await this.dateOfBirth.fill(date);
        await this.heightFeet.click();
        await this.heightFeet.fill(feet);
        await this.heightInches.click();
        await this.heightInches.fill(inches);
        await this.weight.click();
        await this.weight.type(weight.toString());  
        await this.optionYes.first().click();
        await this.nonSmoker.nth(1).click();
    }

    async clickGetQuoteBtn() {
        await this.getQuoteBtn.click();       
    }

    async getQuoteValueNonSmoker(gender, date, feet, inches, weight) {
        if (gender == "Male") {
            await this.genderMale.first().click();
        }
        else {
            await this.genderFemale.first().click();
        }
        await this.dateOfBirth.click();
        await this.dateOfBirth.clear();
        await this.dateOfBirth.fill(date);
        await this.heightFeet.click();
        await this.heightFeet.clear();
        await this.heightFeet.fill(feet);
        await this.heightInches.click();
        await this.heightInches.clear();
        await this.heightInches.fill(inches);
        await this.weight.click();
        await this.weight.clear();
        await this.weight.fill(weight);  
        await this.optionYes.first().click();
        await this.nonSmoker.nth(1).click();
        await this.getQuoteBtn.click();       
    }

    async getQuoteValueAsSmoker(gender, date, feet, inches, weight) {
        if (gender == "Male") {
            await this.genderMale.first().click();
        }
        else {
            await this.genderFemale.first().click();
        }
        await this.dateOfBirth.click();
        await this.dateOfBirth.clear();
        await this.dateOfBirth.fill(date);
        await this.heightFeet.click();
        await this.heightFeet.clear();
        await this.heightFeet.fill(feet);
        await this.heightInches.click();
        await this.heightInches.clear();
        await this.heightInches.fill(inches);
        await this.weight.click();
        await this.weight.clear();
        await this.weight.fill(weight); 
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

    async getQuotePremiumRateValue() {
        const value_quotepremium = (await this.premiumValue.textContent()).trim();
        return value_quotepremium;
    }

    async getNumericPremiumRateValue() {
        const text = (await this.premiumValue.textContent()).trim();
        const match = text.match(/(\d+\.\d+)/); 

        let premiumrate_numericValue = null;
        if (match) {
        premiumrate_numericValue = parseFloat(match[1]);
        }
        return premiumrate_numericValue;
    }

    async getErrorPopUp() {
        return await this.errorPopUp.textContent();
    }

    async closeErrorPopUp() {
        await this.closeBtnPopUp.click();
    }

    async clickContinueBtn() {
        await this.continueBtn.click();          
    }
}




