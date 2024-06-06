exports.MedicalQuestionnaire2Page = class MedicalQuestionnaire2Page {

    constructor(page) {
        //this.optionNo = page.getByRole('radio').filter().getByLabel('No', { exact: true });
        //this.optionNo = page.locator('.p-style > span > .v-input > .v-input__control > .v-input__slot > .v-input--radio-group__input > div:nth-child(2) > .v-label');
        this.questionHepatitisOptionYes = page.locator("[name='generalHealth0']");
        this.questionHepatitisOptionNo = page.locator("[name='generalHealth1']");
        this.questionMedicalCondition4WOptionYes = page.locator("[name='fourWeekTreatment0']");
        this.questionMedicalCondition4WOptionNo = page.locator("[name='fourWeekTreatment1']");
        this.questionMamogramOptionYes = page.locator("[name='mamograms0']");
        this.questionMamogramOptionNo = page.locator("[name='mamograms1']");
        this.questionMedicalFollowupsOptionYes = page.locator("[name='followups0']");
        this.questionMedicalFollowupsOptionNo = page.locator("[name='followups1']");
        this.questionLast3MonthSymptomsOptionYes = page.locator("[name='threeMonthSymptoms0']");
        this.questionLast3MonthSymptomsOptionNo = page.locator("[name='threeMonthSymptoms1']");
        this.questionLast2ParentsDiagnosedOptionYes = page.locator("[name='twoDiagnosed0']");
        this.questionLast2ParentsDiagnosedOptionNo = page.locator("[name='twoDiagnosed1']");
        this.questionLast1ParentsDiagnosedOptionYes = page.locator("[name='oneDiagnosed0']");
        this.questionLast1ParentsDiagnosedOptionNo = page.locator("[name='oneDiagnosed1']");
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
    }

    async questionHepatitis(option) {
        if (option == "Yes") {
            await this.questionHepatitisOptionYes.click();
        }
        else {
            await this.questionHepatitisOptionNo.click();
        }
    }

    async questionMedicalCondition4W(option) {
        if (option == "Yes") {
            await this.questionMedicalCondition4WOptionYes.click();
        }
        else {
            await this.questionMedicalCondition4WOptionNo.click();
        }
    }

    async questionMamogram(option) {
        if (option == "Yes") {
            await this.questionMamogramOptionYes.click();
        }
        else {
            await this.questionMamogramOptionNo.click();
        }
    }

    async questionMedicalFollowups(option) {
        if (option == "Yes") {
            await this.questionMedicalFollowupsOptionYes.click();
        }
        else {
            await this.questionMedicalFollowupsOptionNo.click();
        }
    }

    async questionLast3MonthSymptoms(option) {
        if (option == "Yes") {
            await this.questionLast3MonthSymptomsOptionYes.click();
        }
        else {
            await this.questionLast3MonthSymptomsOptionNo.click();
        }
    }

    async questionLast2ParentsDiagnosed(option) {
        if (option == "Yes") {
            await this.questionLast2ParentsDiagnosedOptionYes.click();
        }
        else {
            await this.questionLast2ParentsDiagnosedOptionNo.click();
        }
    }

    async questionLast1ParentsDiagnosed(option) {
        if (option == "Yes") {
            await this.questionLast1ParentsDiagnosedOptionYes.click();
        }
        else {
            await this.questionLast1ParentsDiagnosedOptionNo.click();
        }
    }

    async clickConitnueBtn() {
        await this.continueBtn.click();
    }

}
