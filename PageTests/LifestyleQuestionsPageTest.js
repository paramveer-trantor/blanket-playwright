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

async function verifyBMIDeclinedKnockout(page, feet, inches, weight, drinksvalue) {
    const pomanager = new POManager(page);
    const lifestylepage = pomanager.getLifestyleQuestionnairePage();
    await lifestylepage.answerOutsideBMIRange(feet, inches, weight, drinksvalue);
    await lifestylepage.clickContinueBtn();
}

async function verifyCompanyDeclinedKnockout(page, feet, inches, weight, drinksvalue) {
    const pomanager = new POManager(page);
    const lifestylepage = pomanager.getLifestyleQuestionnairePage();
    await lifestylepage.answerCompanyDeclinedAsYesandRestNo(feet, inches, weight, drinksvalue);
    await lifestylepage.clickContinueBtn();
}

async function verifyRiskyOccupationKnockout(page, feet, inches, weight, drinksvalue) {
    const pomanager = new POManager(page);
    const lifestylepage = pomanager.getLifestyleQuestionnairePage();
    await lifestylepage.answerRiskyOccupationAsYesandRestNo(feet, inches, weight, drinksvalue);
    await lifestylepage.clickContinueBtn();
}

async function verifyCriminalOffenceKnockout(page, feet, inches, weight, drinksvalue) {
    const pomanager = new POManager(page);
    const lifestylepage = pomanager.getLifestyleQuestionnairePage();
    await lifestylepage.answerCriminalOffenceAsYesandRestNo(feet, inches, weight, drinksvalue);
    await lifestylepage.clickContinueBtn();
}

async function verifyExtremeSportsKnockout(page, feet, inches, weight, drinksvalue) {
    const pomanager = new POManager(page);
    const lifestylepage = pomanager.getLifestyleQuestionnairePage();
    await lifestylepage.answerExtremeSportsAsYesandRestNo(feet, inches, weight, drinksvalue);
    await lifestylepage.clickContinueBtn();
}

async function verifyMarijuanaKnockout(page, feet, inches, weight, marijuanavalue, drinksvalue) {
    const pomanager = new POManager(page);
    const lifestylepage = pomanager.getLifestyleQuestionnairePage();
    await lifestylepage.answerMarijuanaValueAsHighandRestNo(feet, inches, weight, marijuanavalue, drinksvalue);
    await lifestylepage.clickContinueBtn();
}

async function verifyDrinksKnockout(page, feet, inches, weight, drinksvalue) {
    const pomanager = new POManager(page);
    const lifestylepage = pomanager.getLifestyleQuestionnairePage();
    await lifestylepage.answerDrinksValueAsHighandRestNo(feet, inches, weight, drinksvalue);
    await lifestylepage.clickContinueBtn();
}

async function verifyDrugsUse5YKnockout(page, feet, inches, weight, drinksvalue) {
    const pomanager = new POManager(page);
    const lifestylepage = pomanager.getLifestyleQuestionnairePage();
    await lifestylepage.answerDrugsUse5YAsYesandRestNo(feet, inches, weight, drinksvalue);
    await lifestylepage.clickContinueBtn();
}

async function verifyDrugsUse10YKnockout(page, feet, inches, weight, drinksvalue) {
    const pomanager = new POManager(page);
    const lifestylepage = pomanager.getLifestyleQuestionnairePage();
    await lifestylepage.answerDrugsUse10YAsYesandRestNo(feet, inches, weight, drinksvalue);
    await lifestylepage.clickContinueBtn();
}

async function verifyOutsideCaKnockout(page, feet, inches, weight, drinksvalue) {
    const pomanager = new POManager(page);
    const lifestylepage = pomanager.getLifestyleQuestionnairePage();
    await lifestylepage.answerOutsideCaAsYesandRestNo(feet, inches, weight, drinksvalue);
    await lifestylepage.clickContinueBtn();
}

module.exports = { verifyLifestyleQuestionsPageHeader, navigateToMedicalQuestion1Page, verifyBMIDeclinedKnockout, verifyCompanyDeclinedKnockout, verifyRiskyOccupationKnockout, verifyCriminalOffenceKnockout, verifyExtremeSportsKnockout, verifyMarijuanaKnockout, verifyDrinksKnockout, verifyDrugsUse5YKnockout, verifyDrugsUse10YKnockout, verifyOutsideCaKnockout };