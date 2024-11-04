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

async function getpremiumAmount(page) {
    const pomanager = new POManager(page);
    const confirmpremiumpage = pomanager.getConfirmPremiumPage();
    const premium_amount = await confirmpremiumpage.getPremiumValue();
    return premium_amount;
}

async function getTermLength(page) {
    const pomanager = new POManager(page);
    const confirmpremiumpage = pomanager.getConfirmPremiumPage();
    const term_length = await confirmpremiumpage.getTermLength();
    return term_length;
}

async function getCoverageAmount(page) {
    const pomanager = new POManager(page);
    const confirmpremiumpage = pomanager.getConfirmPremiumPage();
    const coverage_amount = await confirmpremiumpage.getCoverageAmountValue();
    return coverage_amount;  
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

async function getQuoteValueOnChangingTermLength(page,termlength) {
    const pomanager = new POManager(page);
    const confirmpremiumpage = pomanager.getConfirmPremiumPage();
    const quotevalue_rec = await confirmpremiumpage.getQuoteOnTermSelected(termlength);
    return quotevalue_rec;
}

async function getQuoteValueOnChangingCoverage(page,coverage) {
    const pomanager = new POManager(page);
    const confirmpremiumpage = pomanager.getConfirmPremiumPage();
    const quotevalue_rec = await confirmpremiumpage.getQuoteOnCoverageAmountSelected(coverage);
    return quotevalue_rec;
}

module.exports = { verifyConfirmPremiumPageHeader, verifyTermOptions, verifyCoverageAmountOptions, verifyQuoteValue, navigateToLifeStyleQuestionsPage, getpremiumAmount, getTermLength, getCoverageAmount, getQuoteValueOnChangingTermLength, getQuoteValueOnChangingCoverage };