import { POManager } from '../PageObjects/POManager';

async function verifyPersonalStatementPageHeader(page) {
    const pomanager = new POManager(page);
    const personalstatmentpage = pomanager.getPersonalStatementPage();
    const header_ps = await personalstatmentpage.getPersonalStatementPageHeader();
    return header_ps;
}

async function verifyUserName(page) {
    const pomanager = new POManager(page);
    const personalstatmentpage = pomanager.getPersonalStatementPage();
    const username_text = await personalstatmentpage.getUsername();
    return username_text;
}

async function verifyKnockoutMsg(page) {
    const pomanager = new POManager(page);
    const personalstatmentpage = pomanager.getPersonalStatementPage();
    const knockoutMsg_text = await personalstatmentpage.getKnockoutMsg();
    return knockoutMsg_text;
}

async function navigateToBeneficiryPage(page) {
    const pomanager = new POManager(page);
    const personalstatmentpage = pomanager.getPersonalStatementPage();
    await personalstatmentpage.clickCheckboxes();
    await personalstatmentpage.clickAgreeBtn();
}

async function getLastStatementText(page) {
    const pomanager = new POManager(page);
    const personalstatmentpage = pomanager.getPersonalStatementPage();
    await personalstatmentpage.clickCheckboxes();
    const text_last = await personalstatmentpage.getLastStatementText();
    return text_last;
}

module.exports = {verifyPersonalStatementPageHeader, verifyUserName, verifyKnockoutMsg, navigateToBeneficiryPage, getLastStatementText };