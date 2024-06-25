import { POManager } from '../PageObjects/POManager';

async function verifyLifestyleQuestionsPageHeader(page) {
    const pomanager = new POManager(page);
    const lifestylepage = pomanager.getLifestyleQuestionnairePage();
    const header_life = await lifestylepage.getLifestylePageHeader();
    return header_life;
}

async function navigateToMedicalQuestion1Page(page, option, feet, inches, weight, drinksvalue, marijuanavalue=0) {
    const pomanager = new POManager(page);
    const lifestylepage = pomanager.getLifestyleQuestionnairePage();
    await lifestylepage.lifestyleQuestions(option, feet, inches, weight, drinksvalue, marijuanavalue=0);
    await lifestylepage.clickContinueBtn();
}

module.exports = { verifyLifestyleQuestionsPageHeader, navigateToMedicalQuestion1Page };