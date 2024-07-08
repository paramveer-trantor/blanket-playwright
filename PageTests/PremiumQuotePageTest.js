import { POManager } from '../PageObjects/POManager';

async function verifyPremiumQuotePageHeader(page) {
    const pomanager = new POManager(page);
    const premiunquotepage = pomanager.getPremiumQuotePage();
    return await premiunquotepage.getPremiumQuotePageHeader;
}

async function navigateToPreApplicationPage(page, gender, date) {
    const pomanager = new POManager(page);
    const premiunquotepage = pomanager.getPremiumQuotePage();
    await premiunquotepage.getQuoteValue(gender, date);
    await premiunquotepage.clickContinueBtn();
}

async function verifyInvalidDateError(page, gender, date) {
    const pomanager = new POManager(page);
    const premiunquotepage = pomanager.getPremiumQuotePage();
    const error_date = await premiunquotepage.getIncorrectDateErrorMsg(gender, date);
    return error_date;
}

module.exports = { verifyPremiumQuotePageHeader, navigateToPreApplicationPage, verifyInvalidDateError };