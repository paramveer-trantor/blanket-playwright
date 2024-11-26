import { POManager } from '../PageObjects/POManager';

async function verifyPremiumQuotePageHeader(page) {
    const pomanager = new POManager(page);
    const premiunquotepage = pomanager.getPremiumQuotePage();
    const premiumquote_header = await premiunquotepage.getPremiumQuotePageHeader();
    return premiumquote_header;
}

async function navigateToPreApplicationPage(page, gender, date) {
    const pomanager = new POManager(page);
    const premiunquotepage = pomanager.getPremiumQuotePage();
    await premiunquotepage.getQuoteValueNonSmoker(gender, date);
    await premiunquotepage.clickContinueBtn();
}

async function navigateToPreApplicationPageAsSmoker(page, gender, date) {
    const pomanager = new POManager(page);
    const premiunquotepage = pomanager.getPremiumQuotePage();
    await premiunquotepage.getQuoteValueAsSmoker(gender, date);
    await premiunquotepage.clickContinueBtn();
}

async function verifyInvalidDateError(page, gender, date) {
    const pomanager = new POManager(page);
    const premiunquotepage = pomanager.getPremiumQuotePage();
    const error_date = await premiunquotepage.getIncorrectDateErrorMsg(gender, date);
    return error_date;  
}

async function verifyNonCanadianWarning(page) {
    const pomanager = new POManager(page);
    const premiunquotepage = pomanager.getPremiumQuotePage();
    const Warning_NonCA = await premiunquotepage.getNonCandianWarningMsg();
    return Warning_NonCA;
}

async function getQuotePremiumRateValue(page, gender, date) {
    const pomanager = new POManager(page);
    const premiunquotepage = pomanager.getPremiumQuotePage();
    await premiunquotepage.getQuoteValueNonSmoker(gender, date);
    const premiumrate = await premiunquotepage.getQuotePremiumRateValue();  
    return premiumrate;
}

module.exports = { verifyNonCanadianWarning, verifyPremiumQuotePageHeader, navigateToPreApplicationPage, verifyInvalidDateError, navigateToPreApplicationPageAsSmoker, getQuotePremiumRateValue };