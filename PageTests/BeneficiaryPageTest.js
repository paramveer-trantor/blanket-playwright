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

async function verifyErrorMessage(page) {
    const pomanager = new POManager(page);
    const beneficiarypage = pomanager.getBeneficiaryPage();
    const percentageerror = await beneficiarypage.getErrorMessage();
    return percentageerror;
}

async function proceedWithoutBeneficiry(page) {
    const pomanager = new POManager(page);
    const beneficiarypage = pomanager.getBeneficiaryPage();
    await beneficiarypage.checkWithoutBenCheckbox();
    await beneficiarypage.clickConitnueBtn();
}

module.exports = { verifyBenecificaryPageHeader, addBeneficiary, navigateToConfirmIdentityPage, verifyAddedBenDetails, verifyErrorMessage, proceedWithoutBeneficiry };