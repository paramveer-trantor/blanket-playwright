import { POManager } from '../PageObjects/POManager';

async function verifyConfirmIdentityPageHeader(page) {
    const pomanager = new POManager(page);
    const identitypage = pomanager.getConfirmIdentityPage();
    const header_identity = await identitypage.getConfirmIdentityPageHeader();
    return header_identity;
}

async function verifyPassportInputFieldVisible(page) {
    const pomanager = new POManager(page);
    const identitypage = pomanager.getConfirmIdentityPage();
    const status_pass = await identitypage.checkPassportInputFieldVisible();
    return status_pass;
}

async function verifyHealthInputFieldVisible(page) {
    const pomanager = new POManager(page);
    const identitypage = pomanager.getConfirmIdentityPage();
    const status_health = await identitypage.checkHealthCardInputFieldVisible();
    return status_health;
}

async function verifyLicenseInputFieldVisible(page) {
    const pomanager = new POManager(page);
    const identitypage = pomanager.getConfirmIdentityPage();
    const status_license = await identitypage.checkLicenseInputFieldVisible();
    return status_license;
}

async function verifyInvalidPassportError(page, passportno) {
    const pomanager = new POManager(page);
    const identitypage = pomanager.getConfirmIdentityPage();
    await identitypage.enterIdentificationDetailsWithPassport(passportno);
    const invalid_Passport_error = await identitypage.getErrorMsg();
    return invalid_Passport_error;
}

async function verifyInvalidHealthError(page, healthno) {
    const pomanager = new POManager(page);
    const identitypage = pomanager.getConfirmIdentityPage();
    await identitypage.enterIdentificationDetailsWithHealth(healthno);
    const invalid_health_error = await identitypage.getErrorMsg();
    return invalid_health_error;
}

async function verifyInvalidLicenseError(page, licenseno) {
    const pomanager = new POManager(page);
    const identitypage = pomanager.getConfirmIdentityPage();
    await identitypage.enterIdentificationDetailsWithLicense(licenseno) ;
    const invalid_license_error = await identitypage.getErrorMsg();
    return invalid_license_error;
}

async function getIdTypeList(page) {         
    const pomanager = new POManager(page);
    const identitypage = pomanager.getConfirmIdentityPage();
    const list = await identitypage.getIdTypeList();
    return list;
}

async function navigateToPaymentPage(page,passportno) {
    const pomanager = new POManager(page);
    const identitypage = pomanager.getConfirmIdentityPage();
    await identitypage.enterIdentificationDetailsWithPassport(passportno);
    await identitypage.clickCheckBox();
    await identitypage.clickAcceptandPayBtn();
}

async function navigateToPaymentPageUsingHealthNumber(page,healthno) {
    const pomanager = new POManager(page);
    const identitypage = pomanager.getConfirmIdentityPage();
    await identitypage.enterIdentificationDetailsWithHealth(healthno);
    await identitypage.clickCheckBox();
    await identitypage.clickAcceptandPayBtn();
}

async function navigateToPaymentPageUsingLicenseNumber(page,licenseno) {
    const pomanager = new POManager(page);
    const identitypage = pomanager.getConfirmIdentityPage();
    await identitypage.enterIdentificationDetailsWithLicense(licenseno);
    await identitypage.clickCheckBox();
    await identitypage.clickAcceptandPayBtn();
}

async function verifyMonthlyPremiumSelected(page) {
    const pomanager = new POManager(page);
    const identitypage = pomanager.getConfirmIdentityPage();
    const premium_monthly = await identitypage.getMonthlyPremiumValue();
    return premium_monthly;
}

async function verifyAnnualPremiumSelected(page) {
    const pomanager = new POManager(page);
    const identitypage = pomanager.getConfirmIdentityPage();
    await identitypage.selectAnnualPremiumOption();
    const premium_annual = await identitypage.getAnnualPremiumValue();
    return premium_annual;
}

module.exports = { verifyConfirmIdentityPageHeader, verifyMonthlyPremiumSelected, verifyAnnualPremiumSelected, verifyPassportInputFieldVisible, verifyHealthInputFieldVisible, verifyLicenseInputFieldVisible, verifyInvalidPassportError, verifyInvalidHealthError, verifyInvalidLicenseError, getIdTypeList, navigateToPaymentPage, navigateToPaymentPageUsingHealthNumber, navigateToPaymentPageUsingLicenseNumber };