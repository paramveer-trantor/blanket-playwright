import { POManager } from '../PageObjects/POManager';

async function verifyBenecificaryPageHeader(page) {
    const pomanager = new POManager(page);
    const beneficiarypage = pomanager.getBeneficiaryPage();
    const header_ben = await beneficiarypage.getBenecificaryPageHeader();
    return header_ben;
}

async function addBeneficiary(page, benfirstname, benlastname, bendob, benshare) {
    const pomanager = new POManager(page);
    const beneficiarypage = pomanager.getBeneficiaryPage();
    await beneficiarypage.clickAddBeneficiryBtn();
    await beneficiarypage.enterBeneficiaryDetails(benfirstname, benlastname, bendob, benshare)
    //await beneficiarypage.clickConitnueBtn();
}

async function verifyAddedBenDetails(page) {
    const pomanager = new POManager(page);
    const beneficiarypage = pomanager.getBeneficiaryPage();
    const bendetails = await beneficiarypage.getAddedBenDetails();
    return bendetails;
}

async function navigateToConfirmIdentityPage(page) {
    const pomanager = new POManager(page);
    const beneficiarypage = pomanager.getBeneficiaryPage();
    await beneficiarypage.clickConitnueBtn();
}

async function verifyShareErrorMessage(page) {
    const pomanager = new POManager(page);
    const beneficiarypage = pomanager.getBeneficiaryPage();
    const percentageerror = await beneficiarypage.getErrorMessage();
    return percentageerror;
}

async function checkWithoutBeneficiryCheckbox(page) {
    const pomanager = new POManager(page);
    const beneficiarypage = pomanager.getBeneficiaryPage();
    await beneficiarypage.checkWithoutBenCheckbox();
}

async function verifyIncorrectDateErrorMessage(page, bendob) {
    const pomanager = new POManager(page);
    const beneficiarypage = pomanager.getBeneficiaryPage();
    await beneficiarypage.clickAddBeneficiryBtn();
    const error_date = await beneficiarypage.getIncorrectDateError(bendob);
    return error_date;
}

module.exports = { verifyBenecificaryPageHeader, verifyIncorrectDateErrorMessage, addBeneficiary, navigateToConfirmIdentityPage, verifyAddedBenDetails, verifyShareErrorMessage, checkWithoutBeneficiryCheckbox };