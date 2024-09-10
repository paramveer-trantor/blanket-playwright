import { POManager } from '../PageObjects/POManager';

async function verifyMed2PageHeader(page) {
    const pomanager = new POManager(page);
    const medical2page = pomanager.getMedicalQuestionnaire2Page();
    const header_med2 = await medical2page.getMedicalQuestionsPageHeader();
    return header_med2;
}

async function navigateToReviewYourAnswersPage(page, option) {
    const pomanager = new POManager(page);
    const medical2 = pomanager.getMedicalQuestionnaire2Page();
    await medical2.medcialQuestionsPage2(option);
    await medical2.clickConitnueBtn();  
}

async function verifyHepatitisKnockout(page) {
    const pomanager = new POManager(page);
    const medical2 = pomanager.getMedicalQuestionnaire2Page();
    await medical2.answerHepatitisAsYesandRestNo();
    await medical2.clickConitnueBtn();
}

async function verifyMedicalCondition4WKnockout(page) {
    const pomanager = new POManager(page);
    const medical2 = pomanager.getMedicalQuestionnaire2Page();
    await medical2.answerMedicalCondition4WAsYesandRestNo();
    await medical2.clickConitnueBtn();
}

async function verifyMamogramKnockout(page) {
    const pomanager = new POManager(page);
    const medical2 = pomanager.getMedicalQuestionnaire2Page();
    await medical2.answerMamogramAsYesandRestNo();
    await medical2.clickConitnueBtn();
}

async function verifyMedicalFollowupsKnockout(page) {
    const pomanager = new POManager(page);
    const medical2 = pomanager.getMedicalQuestionnaire2Page();
    await medical2.answerMedicalFollowupsAsYesandRestNo();
    await medical2.clickConitnueBtn();
}

async function verifyLast3MonthSymptomsKnockout(page) {
    const pomanager = new POManager(page);
    const medical2 = pomanager.getMedicalQuestionnaire2Page();
    await medical2.answerLast3MonthSymptomsAsYesandRestNo();
    await medical2.clickConitnueBtn();
}

async function verify2orMoreParentsDiagnosedKnockout(page) {
    const pomanager = new POManager(page);
    const medical2 = pomanager.getMedicalQuestionnaire2Page();
    await medical2.answer2orMoreParentsDiagnosedAsYesandRestNo();
    await medical2.clickConitnueBtn();
}

async function verify1orMoreParentsDiagnosedKnockout(page) {
    const pomanager = new POManager(page);
    const medical2 = pomanager.getMedicalQuestionnaire2Page();
    await medical2.answer1orMoreParentsDiagnosedAsYesandRestNo();
    await medical2.clickConitnueBtn();
}

module.exports = { verifyMed2PageHeader, navigateToReviewYourAnswersPage, verifyHepatitisKnockout, verifyMedicalCondition4WKnockout, verifyMamogramKnockout, verifyMedicalFollowupsKnockout, verifyLast3MonthSymptomsKnockout, verify2orMoreParentsDiagnosedKnockout, verify1orMoreParentsDiagnosedKnockout };