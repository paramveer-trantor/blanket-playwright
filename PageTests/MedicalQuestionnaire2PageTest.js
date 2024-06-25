import { POManager } from '../PageObjects/POManager';

async function verifyMed2PageHeader(page) {
    const pomanager = new POManager(page);
    const medical2page = pomanager.getMedicalQuestionnaire1Page();
    const header_med2 = await medical2page.getMedicalQuestionsPageHeader();
    return header_med2;
}

async function navigateToReviewYourAnswersPage(page, option) {
    const pomanager = new POManager(page);
    const medical2 = pomanager.getMedicalQuestionnaire2Page();
    await medical2.medcialQuestionsPage2(option);
    await medical2.clickConitnueBtn();
}

module.exports = { verifyMed2PageHeader, navigateToReviewYourAnswersPage };