import { POManager } from '../PageObjects/POManager';

async function verifyInFormLoginPageHeader(page) {
    const pomanager = new POManager(page);
    const termlifelogin = pomanager.getLoginPageInTermLifeForm();
    return await termlifelogin.getInFormLoginPageHeder();

}

async function createAccountInForm(page,username,password) {
    const pomanager = new POManager(page);
    const termlifelogin = pomanager.getLoginPageInTermLifeForm();
    const OTP_Text = (await termlifelogin.createAccount(username,password)).trim();
    return OTP_Text;
}

async function loginInForm(page,username,password) {
    const pomanager = new POManager(page);
    const termlifelogin = pomanager.getLoginPageInTermLifeForm();
    await termlifelogin.loginIntoAccount(username,password);
}

module.exports = { verifyInFormLoginPageHeader, createAccountInForm, loginInForm };