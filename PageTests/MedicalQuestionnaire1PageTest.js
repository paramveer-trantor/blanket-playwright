import { POManager } from '../PageObjects/POManager';

async function verifyMed1PageHeader(page) {
    const pomanager = new POManager(page);
    const medical1page = pomanager.getMedicalQuestionnaire1Page();
    const header_med1 = await medical1page.getMedicalQuestionsPageHeader();
    return header_med1;
}

async function navigateToMedicalQuestion2Page(page, option) {
    const pomanager = new POManager(page);
    const medical1 = pomanager.getMedicalQuestionnaire1Page();
    await medical1.medicalQuestionsPage1(option);
    await medical1.clickConitnueBtn();
}

module.exports = { verifyMed1PageHeader, navigateToMedicalQuestion2Page };