class LifestyleQuestionnairePage {

    constructor(page) {
        this.page = page;
        this.heightFeet = page.locator("[name = 'feet']");
        this.heightInches = page.locator("[name = 'inches']");
        this.weight = page.locator("[name = 'lbs']");
        //this.question =  page.locator('.p-style > span > .v-input > .v-input__control > .v-input__slot > .v-input--radio-group__input > div:nth-child(2) > .v-label');
        //this.questionCompanyDeclineOptionNo = page.getByRole('radio', { name: 'declinedOrRescinded1' });
        this.questionCompanyDeclineOptionYes = page.locator("[name = 'declinedOrRescinded0'] + div.v-input--selection-controls__ripple");
        this.questionCompanyDeclineOptionNo = page.locator("[name = 'declinedOrRescinded1'] + div.v-input--selection-controls__ripple");
        this.questionRiskOccupationOptionYes = page.locator("[name = 'riskyOccupation0'] + div.v-input--selection-controls__ripple");
        this.questionRiskOccupationOptionNo = page.locator("[name = 'riskyOccupation1'] + div.v-input--selection-controls__ripple");
        this.questionCriminalOptionYes = page.locator("[name = 'criminalOffences0'] + div.v-input--selection-controls__ripple");
        this.questionCriminalOptionNo = page.locator("[name = 'criminalOffences1'] + div.v-input--selection-controls__ripple");
        this.questionExtremeSportsOptionYes = page.locator("[name = 'extremeSports0'] + div.v-input--selection-controls__ripple");
        this.questionExtremeSportsOptionNo = page.locator("[name = 'extremeSports1'] + div.v-input--selection-controls__ripple");
        this.questionMarijuanaUseOptionYes = page.locator("[name = 'marijuanaUse0'] + div.v-input--selection-controls__ripple");
        this.questionMarijuanaUseOptionNo = page.locator("[name = 'marijuanaUse1'] + div.v-input--selection-controls__ripple");
        this.questionMarijuanaUseValue = page.locator("[name = 'frequency'] + div.v-input--selection-controls__ripple");
        this.drinksValue = page.locator("[name = 'amount']");
        this.questionDrugsUse5YOptionYes = page.locator("[name = 'recreationalDrugsPast5Y0'] + div.v-input--selection-controls__ripple");
        this.questionDrugsUse5YOptionNo = page.locator("[name = 'recreationalDrugsPast5Y1'] + div.v-input--selection-controls__ripple");
        this.questionDrugsUse10YOptionYes = page.locator("[name = 'alcoholUsePast10Y0'] + div.v-input--selection-controls__ripple");
        this.questionDrugsUse10YOptionNo = page.locator("[name = 'alcoholUsePast10Y1'] + div.v-input--selection-controls__ripple");
        this.questionOutsideCAOptionYes = page.locator("[name = 'outsideCa0'] + div.v-input--selection-controls__ripple");
        this.questionOutsideCAOptionNo = page.locator("[name = 'outsideCa1'] + div.v-input--selection-controls__ripple");
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
    }

    async lifestyleQuestions(option, feet, inches, weight, drinksvalue, marijuanavalue=0) {
        if (option == "Yes") {
            await this.page.waitForLoadState('domcontentloaded');
            await this.heightFeet.click();
            await this.heightFeet.fill(feet);
            await this.heightInches.click();
            await this.heightInches.fill(inches);
            await this.weight.click();
            await this.weight.fill(weight);
            await this.questionCompanyDeclineOptionYes.click();
            await this.questionRiskOccupationOptionYes.click();
            await this.questionCriminalOptionYes.click();
            await this.questionExtremeSportsOptionYes.click();
            await this.questionMarijuanaUseOptionYes.click();
            await this.questionMarijuanaUseValue.click();
            await this.questionMarijuanaUseValue.fill(marijuanavalue);
            await this.drinksValue.click();
            await this.drinksValue.fill(drinksvalue);
            await this.questionDrugsUse5YOptionYes.click();
            await this.questionDrugsUse10YOptionYes.click();
            await this.questionOutsideCAOptionYes.click();
        }
        else {
            await this.page.waitForLoadState('domcontentloaded');
            await this.heightFeet.click();
            await this.heightFeet.fill(feet);
            await this.heightInches.click();
            await this.heightInches.fill(inches);
            await this.weight.click();
            await this.weight.fill(weight);
            await this.questionCompanyDeclineOptionNo.click();
            await this.questionRiskOccupationOptionNo.click();
            await this.questionCriminalOptionNo.click();
            await this.questionExtremeSportsOptionNo.click();
            await this.questionMarijuanaUseOptionNo.click();
            await this.drinksValue.click();
            await this.drinksValue.fill(drinksvalue);
            await this.questionDrugsUse5YOptionNo.click();
            await this.questionDrugsUse10YOptionNo.click();
            await this.questionOutsideCAOptionNo.click();
        }
    }

    async clickContinueBtn() {
        await this.continueBtn.isEnabled();
        await this.continueBtn.click();
    }

}

module.exports = { LifestyleQuestionnairePage };
