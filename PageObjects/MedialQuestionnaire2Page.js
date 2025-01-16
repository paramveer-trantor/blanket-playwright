export class MedicalQuestionnaire2Page {

    constructor(page) {
        this.header = page.locator("(//div[text()=' Medical Questionnaire '])[2]");
        //this.questionHepatitisOptionYes = page.locator("name='generalHealth0'");
        //this.questionHepatitisOptionNo = page.locator("name='generalHealth1'");
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
        this.question2orMoreParentsDiagnosedOptionYes = page.locator("//input[@name='twoDiagnosed0']/following-sibling::div[1]");
        this.question2orMoreParentsDiagnosedOptionNo = page.locator("//input[@name='twoDiagnosed1']/following-sibling::div[1]");
        this.question1orMoreParentsDiagnosedOptionYes = page.locator("//input[@name='oneDiagnosed0']/following-sibling::div[1]");
        this.question1orMoreParentsDiagnosedOptionNo = page.locator("//input[@name='oneDiagnosed1']/following-sibling::div[1]");
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
    }
    
    async getMedicalQuestionsPageHeader() {
        return (await this.header.textContent()).trim();
    }

    async answerMedcialQuestionsPage2(option) {
        if (option == "Yes") {
            await this.questionHepatitisOptionYes.click();
            await this.questionMedicalCondition4WOptionYes.click();
            await this.questionMamogramOptionYes.click();
            await this.questionMedicalFollowupsOptionYes.click();
            await this.questionLast3MonthSymptomsOptionYes.click();
            await this.question2orMoreParentsDiagnosedOptionYes.click();
            await this.question1orMoreParentsDiagnosedOptionYes.click();
        }
        else {
            await this.questionHepatitisOptionNo.click();
            await this.questionMedicalCondition4WOptionNo.click();
            await this.questionMamogramOptionNo.click();
            await this.questionMedicalFollowupsOptionNo.click();
            await this.questionLast3MonthSymptomsOptionNo.click();
            await this.question2orMoreParentsDiagnosedOptionNo.click();
            await this.question1orMoreParentsDiagnosedOptionNo.click();
        }  
    }

    async answerHepatitisAsYesandRestNo() {
        await this.questionHepatitisOptionYes.click();  
        await this.questionMedicalCondition4WOptionNo.click();
        await this.questionMamogramOptionNo.click();
        await this.questionMedicalFollowupsOptionNo.click();
        await this.questionLast3MonthSymptomsOptionNo.click();
        await this.question2orMoreParentsDiagnosedOptionNo.click();
        await this.question1orMoreParentsDiagnosedOptionNo.click();
    }

    async answerMedicalCondition4WAsYesandRestNo() {
        await this.questionHepatitisOptionNo.click();  
        await this.questionMedicalCondition4WOptionYes.click();
        await this.questionMamogramOptionNo.click();
        await this.questionMedicalFollowupsOptionNo.click();
        await this.questionLast3MonthSymptomsOptionNo.click();
        await this.question2orMoreParentsDiagnosedOptionNo.click();
        await this.question1orMoreParentsDiagnosedOptionNo.click();
    }

    async answerMamogramAsYesandRestNo() {
        await this.questionHepatitisOptionNo.click();  
        await this.questionMedicalCondition4WOptionNo.click();
        await this.questionMamogramOptionYes.click();
        await this.questionMedicalFollowupsOptionNo.click();
        await this.questionLast3MonthSymptomsOptionNo.click();
        await this.question2orMoreParentsDiagnosedOptionNo.click();
        await this.question1orMoreParentsDiagnosedOptionNo.click();
    }

    async answerMedicalFollowupsAsYesandRestNo() {
        await this.questionHepatitisOptionNo.click();  
        await this.questionMedicalCondition4WOptionNo.click();
        await this.questionMamogramOptionNo.click();
        await this.questionMedicalFollowupsOptionYes.click();
        await this.questionLast3MonthSymptomsOptionNo.click();
        await this.question2orMoreParentsDiagnosedOptionNo.click();
        await this.question1orMoreParentsDiagnosedOptionNo.click();
    }

    async answerLast3MonthSymptomsAsYesandRestNo() {
        await this.questionHepatitisOptionNo.click();  
        await this.questionMedicalCondition4WOptionNo.click();
        await this.questionMamogramOptionNo.click();
        await this.questionMedicalFollowupsOptionNo.click();
        await this.questionLast3MonthSymptomsOptionYes.click();
        await this.question2orMoreParentsDiagnosedOptionNo.click();
        await this.question1orMoreParentsDiagnosedOptionNo.click();
    }
    
    async answer2orMoreParentsDiagnosedAsYesandRestNo() {
        await this.questionHepatitisOptionNo.click();  
        await this.questionMedicalCondition4WOptionNo.click();
        await this.questionMamogramOptionNo.click();
        await this.questionMedicalFollowupsOptionNo.click();
        await this.questionLast3MonthSymptomsOptionNo.click();
        await this.question2orMoreParentsDiagnosedOptionYes.click();
        await this.question1orMoreParentsDiagnosedOptionNo.click();
    }

    async answer1orMoreParentsDiagnosedAsYesandRestNo() {
        await this.questionHepatitisOptionNo.click();  
        await this.questionMedicalCondition4WOptionNo.click();
        await this.questionMamogramOptionNo.click();
        await this.questionMedicalFollowupsOptionNo.click();
        await this.questionLast3MonthSymptomsOptionNo.click();
        await this.question2orMoreParentsDiagnosedOptionNo.click();
        await this.question1orMoreParentsDiagnosedOptionYes.click();
    }

    async clickConitnueBtn() {
        await this.continueBtn.isEnabled();
        await this.continueBtn.click();
    }

}


