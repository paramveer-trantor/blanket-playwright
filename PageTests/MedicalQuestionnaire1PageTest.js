import { POManager } from '../PageObjects/POManager';

async function verifyMed1PageHeader(page) {
    const pomanager = new POManager(page);
    const medical1page = pomanager.getMedicalQuestionnaire1Page();
    const header_med1 = await medical1page.getMedicalQuestionsPageHeader();
    return header_med1;
}

async function moveToNextPageSleepApneaYes(page) {  
    const pomanager = new POManager(page);
    const medical1 = pomanager.getMedicalQuestionnaire1Page();
    await medical1.answerSleepApneaAsYesandAdditionAsYes();
    await medical1.clickConitnueBtn();
}

async function navigateToMedicalQuestion2Page(page, option) {
    const pomanager = new POManager(page);
    const medical1 = pomanager.getMedicalQuestionnaire1Page();
    await medical1.medicalQuestionsPage1(option);
    await medical1.clickConitnueBtn();  
}

async function verifyCancerKnockout(page) {
    const pomanager = new POManager(page);
    const medical1 = pomanager.getMedicalQuestionnaire1Page();
    await medical1.answerCancerAsYesandRestNo();
    await medical1.clickConitnueBtn();
}

async function verifyHeartAttackKnockout(page) {
    const pomanager = new POManager(page);
    const medical1 = pomanager.getMedicalQuestionnaire1Page();
    await medical1.answerHeartAttackAsYesandRestNo();
    await medical1.clickConitnueBtn();
}

async function verifyFibrosisKnockout(page) {
    const pomanager = new POManager(page);
    const medical1 = pomanager.getMedicalQuestionnaire1Page();
    await medical1.answerFibrosisAsYesandRestNo();
    await medical1.clickConitnueBtn();
}

async function verifySleepApneaKnockout(page) {
    const pomanager = new POManager(page);
    const medical1 = pomanager.getMedicalQuestionnaire1Page();
    await medical1.answerSleepApneaAsYesandRestNo();
    await medical1.clickConitnueBtn();
}

async function verifyAIDSHIVKnockout(page) {
    const pomanager = new POManager(page);
    const medical1 = pomanager.getMedicalQuestionnaire1Page();
    await medical1.answerAIDSHIVAsYesandRestNo();
    await medical1.clickConitnueBtn();
}

async function verifyBrainDisorderKnockout(page) {
    const pomanager = new POManager(page);
    const medical1 = pomanager.getMedicalQuestionnaire1Page();
    await medical1.answerBrainDisorderAsYesandRestNo();
    await medical1.clickConitnueBtn();
}

async function verifyMemoryDisorderKnockout(page) {
    const pomanager = new POManager(page);
    const medical1 = pomanager.getMedicalQuestionnaire1Page();
    await medical1.answerMemoryDisorderAsYesandRestNo();
    await medical1.clickConitnueBtn();
}

async function verifyRheumatoidArthritisKnockout(page) {
    const pomanager = new POManager(page);
    const medical1 = pomanager.getMedicalQuestionnaire1Page();
    await medical1.answerRheumatoidArthritisAsYesandRestNo();
    await medical1.clickConitnueBtn();
}

async function verifySchizophreniaKnockout(page) {
    const pomanager = new POManager(page);
    const medical1 = pomanager.getMedicalQuestionnaire1Page();
    await medical1.answerSchizophreniaAsYesandRestNo();
    await medical1.clickConitnueBtn();
}

async function verifyDepressionKnockout(page) {
    const pomanager = new POManager(page);
    const medical1 = pomanager.getMedicalQuestionnaire1Page();
    await medical1.answerDepressionAsYes();
    await medical1.clickConitnueBtn();
}

async function verifyAnxietyKnockout(page) {
    const pomanager = new POManager(page);
    const medical1 = pomanager.getMedicalQuestionnaire1Page();
    await medical1.answerAnxietyAsYes();
    await medical1.clickConitnueBtn();
}

module.exports = { verifyMed1PageHeader, navigateToMedicalQuestion2Page, moveToNextPageSleepApneaYes, verifyCancerKnockout, verifyHeartAttackKnockout, verifyFibrosisKnockout, verifySleepApneaKnockout, verifyAIDSHIVKnockout, verifyBrainDisorderKnockout, verifyMemoryDisorderKnockout, verifyRheumatoidArthritisKnockout, verifySchizophreniaKnockout, verifyDepressionKnockout, verifyAnxietyKnockout };