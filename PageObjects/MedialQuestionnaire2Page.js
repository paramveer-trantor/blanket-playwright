class MedicalQuestionnaire2Page {

    constructor(page) {
        //this.optionNo = page.getByRole('radio').filter().getByLabel('No', { exact: true });
        //this.optionNo = page.locator('.p-style > span > .v-input > .v-input__control > .v-input__slot > .v-input--radio-group__input > div:nth-child(2) > .v-label');
        this.questionHepatitisOptionYes = page.locator("[name='generalHealth0'] + div.v-input--selection-controls__ripple");
        this.questionHepatitisOptionNo = page.locator("[name='generalHealth1'] + div.v-input--selection-controls__ripple");
        this.questionMedicalCondition4WOptionYes = page.locator("[name='fourWeekTreatment0'] + div.v-input--selection-controls__ripple");
        this.questionMedicalCondition4WOptionNo = page.locator("[name='fourWeekTreatment1'] + div.v-input--selection-controls__ripple");
        this.questionMamogramOptionYes = page.locator("[name='mamograms0'] + div.v-input--selection-controls__ripple");
        this.questionMamogramOptionNo = page.locator("[name='mamograms1'] + div.v-input--selection-controls__ripple");
        this.questionMedicalFollowupsOptionYes = page.locator("[name='followups0'] + div.v-input--selection-controls__ripple");
        this.questionMedicalFollowupsOptionNo = page.locator("[name='followups1'] + div.v-input--selection-controls__ripple");
        this.questionLast3MonthSymptomsOptionYes = page.locator("[name='threeMonthSymptoms0'] + div.v-input--selection-controls__ripple");
        this.questionLast3MonthSymptomsOptionNo = page.locator("[name='threeMonthSymptoms1'] + div.v-input--selection-controls__ripple");
        this.questionLast2ParentsDiagnosedOptionYes = page.locator("[name='twoDiagnosed0'] + div.v-input--selection-controls__ripple");
        this.questionLast2ParentsDiagnosedOptionNo = page.locator("[name='twoDiagnosed1'] + div.v-input--selection-controls__ripple");
        this.questionLast1ParentsDiagnosedOptionYes = page.locator("[name='oneDiagnosed0'] + div.v-input--selection-controls__ripple");
        this.questionLast1ParentsDiagnosedOptionNo = page.locator("[name='oneDiagnosed1'] + div.v-input--selection-controls__ripple");
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
    }

    async medcialQuestionsPage2(option) {
        if (option == "Yes") {
            await this.questionHepatitisOptionYes.click();
            await this.questionMedicalCondition4WOptionYes.click();
            await this.questionMamogramOptionYes.click();
            await this.questionMedicalFollowupsOptionYes.click();
            await this.questionLast3MonthSymptomsOptionYes.click();
            await this.questionLast2ParentsDiagnosedOptionYes.click();
            await this.questionLast1ParentsDiagnosedOptionYes.click();
        }
        else {
            await this.questionHepatitisOptionNo.click();
            await this.questionMedicalCondition4WOptionNo.click();
            await this.questionMamogramOptionNo.click();
            await this.questionMedicalFollowupsOptionNo.click();
            await this.questionLast3MonthSymptomsOptionNo.click();
            await this.questionLast2ParentsDiagnosedOptionNo.click();
            await this.questionLast1ParentsDiagnosedOptionNo.click();
        }
    }

    async clickConitnueBtn() {
        await this.continueBtn.isEnabled();
        await this.continueBtn.click();
    }

}

module.exports = { MedicalQuestionnaire2Page };
