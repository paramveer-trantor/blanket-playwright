import { POManager } from '../PageObjects/POManager';

async function verifyConfirmPremiumPageHeader(page) {

    const pomanager = new POManager(page);
    const confirmpremiumpage = pomanager.getConfirmPremiumPage();
    const header_cp = await confirmpremiumpage.getConfirmPremiumPageHeader();
    return header_cp;
}

async function verifyTermOptions(page) {
    const pomanager = new POManager(page);
    const confirmpremiumpage = pomanager.getConfirmPremiumPage();
    const terms = await confirmpremiumpage.getTermsOptions();
    return terms;
}

async function verifyCoverageAmountOptions(page) {
    const pomanager = new POManager(page);
    const confirmpremiumpage = pomanager.getConfirmPremiumPage();
    const coverage = await confirmpremiumpage.getCoverageAmountOptions();
    return coverage;
}

async function navigateToLifeStyleQuestionsPage(page) {
    const pomanager = new POManager(page);
    const confirmpremiumpage = pomanager.getConfirmPremiumPage();
    await confirmpremiumpage.clickContinueBtn();
}

async function verifyQuoteValue(page) {
    const pomanager = new POManager(page);
    const confirmpremiumpage = pomanager.getConfirmPremiumPage();
    const quote_value = await confirmpremiumpage.getQuoteValue();
    return quote_value;
}

module.exports = { verifyConfirmPremiumPageHeader, verifyTermOptions, verifyCoverageAmountOptions, verifyQuoteValue, navigateToLifeStyleQuestionsPage };