import { BasePage } from "./BasePage";

export class PremiumQuotePage extends BasePage {

    constructor(page) {
        super(page);
        this.header = page.locator('.v-card__text .row .text-h2');
        this.genderMale = page.getByText('Male', { exact: true });
        this.genderMale_Fr = page.getByText('Homme', { exact: true });
        this.genderFemale = page.getByText('Female', { exact: true });
        this.genderFemale_Fr = page.getByText('Femme', { exact: true });
        this.dateOfBirth = page.getByLabel('MM/DD/YYYY', { exact: true });
        this.dateOfBirth_Fr = page.getByLabel('MM/JJ/AAAA', { exact: true });
        this.heightFeet = page.locator("[name = 'feet']");
        this.heightInches = page.locator("[name = 'inches']");
        this.weight = page.getByLabel('Pounds'); 
        this.metricUnits = page.getByText('Metric');
        this.heightCenti = page.locator("[name = 'centimeters']");
        this.weightKg = page.getByLabel('Kilograms'); 
        this.weight_Fr = page.getByLabel('Livres');
        this.optionYes = page.getByText('Yes');
        this.optionYes_Fr = page.getByText('Oui');
        this.optionNo = page.getByText('No');
        this.optionNo_Fr = page.getByText('Non');
        this.nonSmoker = page.getByText('No');
        this.nonSmoker_Fr = page.getByText('Non');
        this.dateErrorMsg = page.locator('.v-messages__message');
        this.getQuoteBtn = page.getByRole('button', { name: ' GET QUOTE ' });
        this.getQuoteBtn_Fr = page.getByRole('button', { name: ' OBTENIR UN DEVIS ' });
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
        this.continueBtn_Fr = page.getByRole('button', { name: ' Continuer ' }); 
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

    async fillQuotePage_Fr(gender, date, feet, inches, weight) {
        if (gender == "Male") {
            await this.genderMale_Fr.first().click();
        }
        else {
            await this.genderFemale_Fr.first().click(); 
        }
        await this.dateOfBirth_Fr.click();
        await this.dateOfBirth_Fr.clear();
        await this.dateOfBirth_Fr.fill(date);
        await this.heightFeet.click();
        await this.heightFeet.fill(feet);
        await this.heightInches.click();
        await this.heightInches.fill(inches);
        await this.weight_Fr.click();
        await this.weight_Fr.type(weight.toString());  
        await this.optionYes_Fr.first().click();
        await this.nonSmoker_Fr.nth(1).click();
    }

    async clickGetQuoteBtn() {
        await this.getQuoteBtn.click();       
    }

    async clickGetQuoteBtn_Fr() {
        await this.getQuoteBtn_Fr.click();       
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

    async getQuoteValueNonSmoker_Fr(gender, date, feet, inches, weight) {
        if (gender == "Male") {
            await this.genderMale_Fr.first().click();
        }
        else {
            await this.genderFemale_Fr.first().click();
        }
        await this.dateOfBirth_Fr.click();
        await this.dateOfBirth_Fr.clear();
        await this.dateOfBirth_Fr.fill(date);
        await this.heightFeet.click();
        await this.heightFeet.clear();
        await this.heightFeet.fill(feet);
        await this.heightInches.click();
        await this.heightInches.clear();
        await this.heightInches.fill(inches);
        await this.weight_Fr.click();
        await this.weight_Fr.clear();
        await this.weight_Fr.fill(weight);  
        await this.optionYes_Fr.first().click();
        await this.nonSmoker_Fr.nth(1).click();
        await this.getQuoteBtn_Fr.click();       
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

    async getQuoteValueWithMetric(gender, date, centi, weight_kg) {
        if (gender == "Male") {
            await this.genderMale.first().click();
        }
        else {
            await this.genderFemale.first().click();
        }
        await this.dateOfBirth.click();
        await this.dateOfBirth.clear();
        await this.dateOfBirth.fill(date);
        await this.metricUnits.click();
        await this.heightCenti.click();
        await this.heightCenti.clear();
        await this.heightCenti.fill(centi);
        await this.weightKg.click();
        await this.weightKg.clear();
        await this.weightKg.fill(weight_kg); 
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

    async getInputDOBValue() {
        return await this.dateOfBirth.inputValue();
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

    async clickContinueBtn_Fr() {
        await this.continueBtn_Fr.click();          
    }

    async verifyDOBFieldValue(){  
        return await this.dateOfBirth.inputValue();
    }

    async verifyHeightFieldValue(){  
        const height_feet = await this.heightFeet.inputValue();
        const height_inches = await this.heightInches.inputValue();
        const height_value = height_feet + "." + height_inches;
        return height_value;
    }

    async verifyWeightFieldValue(){  
        return await this.weight.inputValue();
    }

    async navigateToPreAppPageWithPreFilledValues() {
        await this.optionYes.first().click();
        await this.optionYes.last().click();
        await this.getQuoteBtn.click();
        await this.continueBtn.click();          
    }

}




