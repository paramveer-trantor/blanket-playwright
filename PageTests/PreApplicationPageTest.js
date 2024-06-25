import { POManager } from '../PageObjects/POManager';

async function verifyPreApplicationPageHeader(page) {

    const pomanager = new POManager(page);
    const preapplicationpage = pomanager.getPreApplicationPage();
    await preapplicationpage.acceptPopWindow();
    const header_pa = await preapplicationpage.getPreApplicationPageHeader()
    return header_pa;
}

async function navigateToNeedsAssessmentPage(page,firstname, lastname, houseaddress, phonenumber, Option) {

    const pomanager = new POManager(page);
    const preapplicationpage = pomanager.getPreApplicationPage();
    await preapplicationpage.acceptPopWindow();
    await preapplicationpage.enterUserName(firstname, lastname);
    await preapplicationpage.enterAddress(houseaddress);
    await preapplicationpage.enterPhoneNumber(phonenumber);
    await preapplicationpage.last3Questions(Option);
    await preapplicationpage.clickConitnueBtn();

}

async function verifyInvalidDateErrorMsg(page,firstname, lastname, date) {
    const pomanager = new POManager(page);
    const preapplicationpage = pomanager.getPreApplicationPage();
    await preapplicationpage.acceptPopWindow();
    await preapplicationpage.enterUserName(firstname, lastname);
    const date_error =  await preapplicationpage.getIncorrectDateErrorMsg(date);
    return date_error;
}

async function verifyInvalidPhoneError(page,firstname, lastname, houseaddress, phone) {
    const pomanager = new POManager(page);
    const preapplicationpage = pomanager.getPreApplicationPage();
    await preapplicationpage.acceptPopWindow();
    await preapplicationpage.enterUserName(firstname, lastname);
    await preapplicationpage.enterAddress(houseaddress);
    const phone_error = await preapplicationpage.getIncorrectPhoneErrorMsg(phone);
    return phone_error;
}

module.exports = { verifyPreApplicationPageHeader, navigateToNeedsAssessmentPage, verifyInvalidDateErrorMsg, verifyInvalidPhoneError };