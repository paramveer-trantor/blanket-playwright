class MedicalQuestionnaire2Page {

    constructor(page) {
        //this.optionNo = page.getByRole('radio').filter().getByLabel('No', { exact: true });
        //this.optionNo = page.locator('.p-style > span > .v-input > .v-input__control > .v-input__slot > .v-input--radio-group__input > div:nth-child(2) > .v-label');
        this.questionHepatitisOptionYes = page.locator("//input[@name='generalHealth0']/following-sibling::div[1]");
        this.questionHepatitisOptionNo = page.locator("//input[@name='generalHealth1']/following-sibling::div[1]");
        this.questionMedicalCondition4WOptionYes = page.locator("//input[@name='fourWeekTreatment0']/following-sibling::div[1]");
        this.questionMedicalCondition4WOptionNo = page.locator("//input[@name='fourWeekTreatment1']/following-sibling::div[1]");
        this.questionMamogramOptionYes = page.locator("//input[@name='mamograms0']/following-sibling::div[1]");
        this.questionMamogramOptionNo = page.locator("//input[@name='mamograms1']/following-sibling::div[1]");
        this.questionMedicalFollowupsOptionYes = page.locator("//input[@name='followups0']/following-sibling::div[1]");
        this.questionMedicalFollowupsOptionNo = page.locator("//input[@name='followups1']/following-sibling::div[1]");
        this.questionLast3MonthSymptomsOptionYes = page.locator("//input[@name='threeMonthSymptoms0']/following-sibling::div[1]");
        this.questionLast3MonthSymptomsOptionNo = page.locator("//input[@name='threeMonthSymptoms1']/following-sibling::div[1]");
        this.questionLast2ParentsDiagnosedOptionYes = page.locator("//input[@name='twoDiagnosed0']/following-sibling::div[1]");
        this.questionLast2ParentsDiagnosedOptionNo = page.locator("//input[@name='twoDiagnosed1']/following-sibling::div[1]");
        this.questionLast1ParentsDiagnosedOptionYes = page.locator("//input[@name='oneDiagnosed0']/following-sibling::div[1]");
        this.questionLast1ParentsDiagnosedOptionNo = page.locator("//input[@name='oneDiagnosed1']/following-sibling::div[1]");
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
