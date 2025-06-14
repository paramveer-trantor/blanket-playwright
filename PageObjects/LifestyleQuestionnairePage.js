export class LifestyleQuestionnairePage {

    constructor(page) {
        this.page = page;
        this.header = page.locator("(//div[text()=' Lifestyle Questionnaire '])[2]");
        this.questionCompanyDeclineOptionYes = page.locator("[name = 'declinedOrRescinded0'] + div.v-input--selection-controls__ripple");
        this.questionCompanyDeclineOptionNo = page.locator("[name = 'declinedOrRescinded1'] + div.v-input--selection-controls__ripple");
        this.questionCompanyDeclineAddition = page.locator("//input[@name='conditionalQuestion0']/following-sibling::div[1]");
        this.questionRiskOccupationOptionYes = page.locator("[name = 'riskyOccupation0'] + div.v-input--selection-controls__ripple");
        this.questionRiskOccupationOptionNo = page.locator("[name = 'riskyOccupation1'] + div.v-input--selection-controls__ripple");
        this.questionCriminalOptionYes = page.locator("[name = 'criminalOffences0'] + div.v-input--selection-controls__ripple");
        this.questionCriminalOptionNo = page.locator("[name = 'criminalOffences1'] + div.v-input--selection-controls__ripple");
        this.questionExtremeSportsOptionYes = page.locator("[name = 'extremeSports0'] + div.v-input--selection-controls__ripple");
        this.questionExtremeSportsOptionNo = page.locator("[name = 'extremeSports1'] + div.v-input--selection-controls__ripple");
        this.questionMarijuanaUseOptionYes = page.locator("[name = 'marijuanaUse0'] + div.v-input--selection-controls__ripple");
        this.questionMarijuanaUseOptionNo = page.locator("[name = 'marijuanaUse1'] + div.v-input--selection-controls__ripple");
        this.questionMarijuanaUseValue = page.locator("[name = 'frequency']");
        this.drinksValue = page.locator("[name = 'amount']");
        this.questionDrugsUse5YOptionYes = page.locator("[name = 'recreationalDrugsPast5Y0'] + div.v-input--selection-controls__ripple");
        this.questionDrugsUse5YOptionNo = page.locator("[name = 'recreationalDrugsPast5Y1'] + div.v-input--selection-controls__ripple");
        this.questionDrugsUse10YOptionYes = page.locator("[name = 'alcoholUsePast10Y0'] + div.v-input--selection-controls__ripple");
        this.questionDrugsUse10YOptionNo = page.locator("[name = 'alcoholUsePast10Y1'] + div.v-input--selection-controls__ripple");
        this.questionOutsideCAOptionYes = page.locator("[name = 'outsideCa0'] + div.v-input--selection-controls__ripple");
        this.questionOutsideCAOptionNo = page.locator("[name = 'outsideCa1'] + div.v-input--selection-controls__ripple");
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
        this.continueBtn_Fr = page.getByRole('button', { name: ' Continuer ' });
    }

    async getLifestylePageHeader() {
        return (await this.header.textContent()).trim();
    }

    async answerLifestyleQuestions(option, drinksvalue, marijuanavalue=0) {
        if (option == "Yes") {
            await this.page.waitForLoadState('domcontentloaded');
            await this.questionCompanyDeclineOptionYes.click();
            await this.questionCompanyDeclineAddition.click();
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

    async answerCompanyDeclinedAsYesandRestNo(drinksvalue) {
            await this.questionCompanyDeclineOptionYes.click();
            await this.questionCompanyDeclineAddition.click();
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

    async answerRiskyOccupationAsYesandRestNo(drinksvalue) {
            await this.questionCompanyDeclineOptionNo.click();
            await this.questionRiskOccupationOptionYes.click();
            await this.questionCriminalOptionNo.click();
            await this.questionExtremeSportsOptionNo.click();
            await this.questionMarijuanaUseOptionNo.click();
            await this.drinksValue.click();
            await this.drinksValue.fill(drinksvalue);
            await this.questionDrugsUse5YOptionNo.click();
            await this.questionDrugsUse10YOptionNo.click();
            await this.questionOutsideCAOptionNo.click();
    }

    async answerCriminalOffenceAsYesandRestNo(drinksvalue) {
            await this.questionCompanyDeclineOptionNo.click();
            await this.questionRiskOccupationOptionNo.click();
            await this.questionCriminalOptionYes.click();
            await this.questionExtremeSportsOptionNo.click();
            await this.questionMarijuanaUseOptionNo.click();
            await this.drinksValue.click();
            await this.drinksValue.fill(drinksvalue);
            await this.questionDrugsUse5YOptionNo.click();
            await this.questionDrugsUse10YOptionNo.click();
            await this.questionOutsideCAOptionNo.click();
    }

    async answerExtremeSportsAsYesandRestNo(drinksvalue) {
            await this.questionCompanyDeclineOptionNo.click();
            await this.questionRiskOccupationOptionNo.click();
            await this.questionCriminalOptionNo.click();
            await this.questionExtremeSportsOptionYes.click();
            await this.questionMarijuanaUseOptionNo.click();
            await this.drinksValue.click();
            await this.drinksValue.fill(drinksvalue);
            await this.questionDrugsUse5YOptionNo.click();
            await this.questionDrugsUse10YOptionNo.click();
            await this.questionOutsideCAOptionNo.click();
    }

    async answerMarijuanaValueAsHighandRestNo(marijuanavalue, drinksvalue) {
            await this.questionCompanyDeclineOptionNo.click();
            await this.questionRiskOccupationOptionNo.click();
            await this.questionCriminalOptionNo.click();
            await this.questionExtremeSportsOptionNo.click();
            await this.questionMarijuanaUseOptionYes.click();
            await this.questionMarijuanaUseValue.fill(marijuanavalue);
            await this.drinksValue.click();
            await this.drinksValue.fill(drinksvalue);
            await this.questionDrugsUse5YOptionNo.click();
            await this.questionDrugsUse10YOptionNo.click();
            await this.questionOutsideCAOptionNo.click();
    }

    async answerDrinksValueAsHighandRestNo(drinksvalue) {
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

    async answerDrugsUse5YAsYesandRestNo(drinksvalue) {
            await this.questionCompanyDeclineOptionNo.click();
            await this.questionRiskOccupationOptionNo.click();
            await this.questionCriminalOptionNo.click();
            await this.questionExtremeSportsOptionNo.click();
            await this.questionMarijuanaUseOptionNo.click();
            await this.drinksValue.click();
            await this.drinksValue.fill(drinksvalue);
            await this.questionDrugsUse5YOptionYes.click();
            await this.questionDrugsUse10YOptionNo.click();
            await this.questionOutsideCAOptionNo.click();
    }

    async answerDrugsUse10YAsYesandRestNo(drinksvalue) {
            await this.questionCompanyDeclineOptionNo.click();
            await this.questionRiskOccupationOptionNo.click();
            await this.questionCriminalOptionNo.click();
            await this.questionExtremeSportsOptionNo.click();
            await this.questionMarijuanaUseOptionNo.click();
            await this.drinksValue.click();
            await this.drinksValue.fill(drinksvalue);
            await this.questionDrugsUse5YOptionNo.click();
            await this.questionDrugsUse10YOptionYes.click();
            await this.questionOutsideCAOptionNo.click();
    }

    async answerOutsideCaAsYesandRestNo(drinksvalue) {
            await this.questionCompanyDeclineOptionNo.click();
            await this.questionRiskOccupationOptionNo.click();
            await this.questionCriminalOptionNo.click();
            await this.questionExtremeSportsOptionNo.click();
            await this.questionMarijuanaUseOptionNo.click();
            await this.drinksValue.click();
            await this.drinksValue.fill(drinksvalue);
            await this.questionDrugsUse5YOptionNo.click();
            await this.questionDrugsUse10YOptionNo.click();
            await this.questionOutsideCAOptionYes.click();
    }

    async clickContinueBtn() {
        await this.continueBtn.isEnabled();
        await this.continueBtn.click();
    }

    async clickContinueBtn_Fr() {
        await this.continueBtn_Fr.click();
    }
  
}


