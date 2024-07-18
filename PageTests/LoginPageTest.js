import { POManager } from '../PageObjects/POManager';

async function loginIntoApp(page, urlLogin, username, password) {

    const pomanager = new POManager(page);
    const loginpage = pomanager.getLoginPage();
    await loginpage.navigateToURL(urlLogin);
    await loginpage.login(username, password);

}

async function loginWithValidUser(page, username, password) {
    const pomanager = new POManager(page);
    const loginpage = pomanager.getLoginPage();
    await loginpage.enterLoginDetails(username, password);
}

module.exports = { loginIntoApp, loginWithValidUser };