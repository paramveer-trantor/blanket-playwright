import { POManager } from '../PageObjects/POManager';

async function verifyPreApplicationPageHeader(page) {
    const pomanager = new POManager(page);
    const preapplicationpage = pomanager.getPreApplicationPage();
    const header_pa = await preapplicationpage.getPreApplicationPageHeader();
    return header_pa;
}

async function navigateToNeedsAssessmentPage(page,firstname, lastname, houseaddress, phonenumber, option) {
    const pomanager = new POManager(page);
    const preapplicationpage = pomanager.getPreApplicationPage();
    await preapplicationpage.acceptPopWindow();
    await preapplicationpage.enterUserName(firstname, lastname);
    await preapplicationpage.enterAddress(houseaddress);
    await preapplicationpage.enterPhoneNumber(phonenumber);
    await preapplicationpage.last3Questions(option);
    await preapplicationpage.clickConitnueBtn();
}

async function verifyInvalidDateErrorMsg(page, date) {
    const pomanager = new POManager(page);
    const preapplicationpage = pomanager.getPreApplicationPage();
    await preapplicationpage.acceptPopWindow();
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

async function verifyAfterHoursMsg(page) {
    const pomanager = new POManager(page);
    const preapplicationpage = pomanager.getPreApplicationPage();
    const afterhours_msg = await preapplicationpage.getAfterHoursMsg();
    return afterhours_msg;
}

async function verifyProductNotAvailableMsg(page) {
    const pomanager = new POManager(page);
    const preapplicationpage = pomanager.getPreApplicationPage();
    await preapplicationpage.acceptPopWindow();
    const productNotAvailable_msg = await preapplicationpage.getProductNotAvailableMsg();
    return productNotAvailable_msg;
}

async function verifyNonCanadianWarningOnPreAppPage(page, firstname, lastname, houseaddress, phonenumber) {
    const pomanager = new POManager(page);
    const preapplicationpage = pomanager.getPreApplicationPage();
    await preapplicationpage.acceptPopWindow();
    await preapplicationpage.enterUserName(firstname, lastname);
    await preapplicationpage.enterAddress(houseaddress);
    await preapplicationpage.enterPhoneNumber(phonenumber);
    const Warning_NonCA = await preapplicationpage.getNonCandianWarningMsg();
    return Warning_NonCA;
}

async function answerYesOnPreAppQues(page, option) {
    const pomanager = new POManager(page);
    const preapplicationpage = pomanager.getPreApplicationPage();
    await preapplicationpage.last3Questions(option);
    await preapplicationpage.clickConitnueBtn();
}

async function fillPreApplicationFormPage(page, firstname, lastname, date, houseaddress, phonenumber, option) {
    const pomanager = new POManager(page);
    const preapplicationpage = pomanager.getPreApplicationPage();
    await preapplicationpage.enterUserName(firstname, lastname);
    await preapplicationpage.enterDOB(date);
    await preapplicationpage.enterAddress(houseaddress);
    await preapplicationpage.enterPhoneNumber(phonenumber);
    await preapplicationpage.last3Questions(option);
}

async function enterAddressManually(page, firstname, lastname, houseaddress, city, zipcode, phonenumber, option) {
    const pomanager = new POManager(page);
    const preapplicationpage = pomanager.getPreApplicationPage();
    await preapplicationpage.enterUserName(firstname, lastname);
    await preapplicationpage.enterAddressManually(houseaddress, city, zipcode)
    await preapplicationpage.enterPhoneNumber(phonenumber);
    await preapplicationpage.last3Questions(option);
}

async function acceptAfterHoursMsg(page) {
    const pomanager = new POManager(page);
    const preapplicationpage = pomanager.getPreApplicationPage();
    await preapplicationpage.acceptPopWindow();
}

async function clickPreAppPageContinueBtn(page) {
    const pomanager = new POManager(page);
    const preapplicationpage = pomanager.getPreApplicationPage();
    await preapplicationpage.clickConitnueBtn();
}

async function verifyAddressValidateFailureError(page) {
    const pomanager = new POManager(page);
    const preapplicationpage = pomanager.getPreApplicationPage();
    const address_validate = await preapplicationpage.getAddressValidateFailureErrorMsg();
    return address_validate;
}

async function verifyScrollingToErrorMsg(page, firstname, lastname, houseaddress, option) {
    const pomanager = new POManager(page);
    const preapplicationpage = pomanager.getPreApplicationPage();
    await preapplicationpage.acceptPopWindow();
    await preapplicationpage.enterUserName(firstname, lastname);
    await preapplicationpage.enterAddress(houseaddress);
    await preapplicationpage.last3Questions(option);
    await preapplicationpage.clickConitnueBtn();
}

async function verifyPolicyPurchaseOnReplacePolicyQues(page, firstname, lastname, houseaddress, phonenumber) {
    const pomanager = new POManager(page);
    const preapplicationpage = pomanager.getPreApplicationPage();
    await preapplicationpage.acceptPopWindow();
    await preapplicationpage.enterUserName(firstname, lastname);
    await preapplicationpage.enterAddress(houseaddress);
    await preapplicationpage.enterPhoneNumber(phonenumber);
    await preapplicationpage.answerReplacePolicyAsYes();
}

async function verifyKnockoutScenarioCurrentlyAbsentFromWorkQues(page, firstname, lastname, houseaddress, phonenumber) {
    const pomanager = new POManager(page);
    const preapplicationpage = pomanager.getPreApplicationPage();
    await preapplicationpage.acceptPopWindow();
    await preapplicationpage.enterUserName(firstname, lastname);
    await preapplicationpage.enterAddress(houseaddress);
    await preapplicationpage.enterPhoneNumber(phonenumber);
    await preapplicationpage.answerCurrentAbsentFromWorkAsYes();
}

async function verifyKnockoutScenarioPastAbsentFromWorkQues(page, firstname, lastname, houseaddress, phonenumber) {
    const pomanager = new POManager(page);
    const preapplicationpage = pomanager.getPreApplicationPage();
    await preapplicationpage.acceptPopWindow();
    await preapplicationpage.enterUserName(firstname, lastname);
    await preapplicationpage.enterAddress(houseaddress);
    await preapplicationpage.enterPhoneNumber(phonenumber);
    await preapplicationpage.answerPastAbsentFromWorkAsYes();
}



module.exports = { verifyNonCanadianWarningOnPreAppPage, acceptAfterHoursMsg, verifyAddressValidateFailureError, clickPreAppPageContinueBtn, fillPreApplicationFormPage, answerYesOnPreAppQues, verifyPreApplicationPageHeader, verifyAfterHoursMsg, navigateToNeedsAssessmentPage, enterAddressManually, verifyInvalidDateErrorMsg, verifyInvalidPhoneError, verifyProductNotAvailableMsg, verifyScrollingToErrorMsg, verifyKnockoutScenarioCurrentlyAbsentFromWorkQues, verifyKnockoutScenarioPastAbsentFromWorkQues, verifyPolicyPurchaseOnReplacePolicyQues };