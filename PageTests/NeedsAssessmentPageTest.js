import { POManager } from '../PageObjects/POManager';

async function verifyNeedsAssessmentPageHeader(page) {

    const pomanager = new POManager(page);
    const needsassessmentpage = pomanager.getNeedsAssessmentPage();
    const header_na = await needsassessmentpage.getNeedsAssessmentPageHeader();
    return header_na;
}

async function navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt) {
    const pomanager = new POManager(page);
    const needsassessmentpage = pomanager.getNeedsAssessmentPage();
    await needsassessmentpage.enterGrossIncome(income, saving, mortgageBal, debt);
    await needsassessmentpage.clickContinueBtn();
}

async function verifyCoverageAmountMsg(page, income, saving, mortgageBal, debt) {
    const pomanager = new POManager(page);
    const needsassessmentpage = pomanager.getNeedsAssessmentPage();
    await needsassessmentpage.enterGrossIncome(income, saving, mortgageBal, debt);
    const coveragemoremsg = await needsassessmentpage.getCoverageAmountMoreMessage();
    return coveragemoremsg;
}

async function returnTotalValue(page, income, saving, mortgageBal, debt) {
    const pomanager = new POManager(page);
    const needsassessmentpage = pomanager.getNeedsAssessmentPage();
    await needsassessmentpage.enterGrossIncome(income, saving, mortgageBal, debt);
    const total = await needsassessmentpage.getTotalValue();
    return total;
}

async function verifyNoMsgDisplayed(page, income, saving, mortgageBal, debt) {
    const pomanager = new POManager(page);
    const needsassessmentpage = pomanager.getNeedsAssessmentPage();
    await needsassessmentpage.enterGrossIncome(income, saving, mortgageBal, debt);
    const nomessage = await needsassessmentpage.checkIfAnyMessageAppears();
    return nomessage;
}

module.exports = { verifyNeedsAssessmentPageHeader, navigateToConfirmPremiumPage, verifyCoverageAmountMsg, verifyNoMsgDisplayed, returnTotalValue };