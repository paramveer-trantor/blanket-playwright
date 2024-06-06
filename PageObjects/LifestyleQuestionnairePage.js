exports.LifestyleQuestionnairePage = class LifestyleQuestionnairePage {

    constructor(page) {
        this.page = page;
        this.heightFeet = page.locator("[name = 'feet']");
        this.heightInches = page.locator("[name = 'inches']");
        this.weight = page.locator("[name = 'lbs']");
        //this.question =  page.locator('.p-style > span > .v-input > .v-input__control > .v-input__slot > .v-input--radio-group__input > div:nth-child(2) > .v-label');
        this.questionCompanyDeclineOptionYes = page.locator("[name = 'declinedOrRescinded0'] + div.v-input--selection-controls__ripple");
        this.questionCompanyDeclineOptionNo = page.locator("[name = 'declinedOrRescinded1'] + div.v-input--selection-controls__ripple");
        this.questionRiskOccupationOptionYes = page.locator("[name = 'riskyOccupation0']");
        this.questionRiskOccupationOptionNo = page.locator("[name = 'riskyOccupation1']");
        this.questionCriminalOptionYes = page.locator("[name = 'criminalOffences0']");
        this.questionCriminalOptionNo = page.locator("[name = 'criminalOffences1']");
        this.questionExtremeSportsOptionYes = page.locator("[name = 'extremeSports0']");
        this.questionExtremeSportsOptionNo = page.locator("[name = 'extremeSports1']");
        this.questionMarijuanaUseOptionYes = page.locator("[name = 'marijuanaUse0']");
        this.questionMarijuanaUseOptionNo = page.locator("[name = 'marijuanaUse1']");
        this.questionMarijuanaUseValue = page.locator("[name = 'frequency']");
        this.drinksValue = page.locator("[name = 'amount']");
        this.questionDrugsUse5YOptionYes = page.locator("[name = 'recreationalDrugsPast5Y0']");
        this.questionDrugsUse5YOptionNo = page.locator("[name = 'recreationalDrugsPast5Y1']");
        this.questionDrugsUse10YOptionYes = page.locator("[name = 'alcoholUsePast10Y0']");
        this.questionDrugsUse10YOptionNo = page.locator("[name = 'alcoholUsePast10Y1']");
        this.questionOutsideCAOptionYes = page.locator("[name = 'outsideCa0']");
        this.questionOutsideCAOptionNo = page.locator("[name = 'outsideCa1']");
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
    }

    async enterHeight(feet, inches, weight) {       
  
        await this.heightFeet.click();
        await this.heightFeet.fill(feet);
        await this.heightInches.click();
        await this.heightInches.fill(inches);
        await this.weight.click();
        await this.weight.fill(weight);
    }

    // async questionCompanyDecline(option) {
    //     this.questionCompanyDeclineOptionYes.click();
    // }

    // async questionCompanyAccept () {
    //     await this.questionCompanyDeclineOptionYes.fill(true);
    // }
     async questionCompanyDecline () {
        await this.questionCompanyDeclineOptionNo.click()
    }

    async questionRiskOccupation(option) {
        if (option == "Yes") {
            await this.questionRiskOccupationOptionYes.click();
        }
        else {
            await this.questionRiskOccupationOptionNo.click();
        }
    }

    async questionCriminalCase(option) {
        if (option == "Yes") {
            await this.questionCriminalOptionYes.click();
        }
        else {
            await this.questionCriminalOptionNo.click();
        }
    }
    

    async questionExtremeSports(option) {
        if (option == "Yes") {
            await this.questionExtremeSportsOptionYes.click();
        }
        else {
            await this.questionExtremeSportsOptionNo.click();
        }
    }

    async questionMarijuanaUse(option) {
        if (option == "Yes") {
            await this.questionMarijuanaUseOptionYes.click();
        }
        else {
            await this.questionMarijuanaUseOptionNo.click();
        }
    }

    async questionMarijuanaUseValue(marijuanavalue) {
        await this.questionMarijuanaUseValue.click();
        await this.questionMarijuanaUseValue.fill(marijuanavalue);
    }

    async enterDrinksValue(drinksvalue) {
        await this.drinksValue.click();
        await this.drinksValue.fill(drinksvalue);
    }

    async questionDrugsUse5Y(option) {
        if (option == "Yes") {
            await this.questionDrugsUse5YOptionYes.click();
        }
        else {
            await this.questionDrugsUse5YOptionNo.click();
        }
    }

    async questionDrugsUse10Y(option) {
        if (option == "Yes") {
            await this.questionDrugsUse10YOptionYes.click();
        }
        else {
            await this.questionDrugsUse10YOptionNo.click();
        }
    }

    async questionOutsideCA(option) {
        if (option == "Yes") {
            await this.questionOutsideCAOptionYes.click();
        }
        else {
            await this.questionOutsideCAOptionNo.click();
        }
    }

    async clickContinueBtn() {
        await this.continueBtn.isEnabled();
        await this.continueBtn.click();
    }

}
