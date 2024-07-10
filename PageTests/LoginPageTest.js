import { POManager } from '../PageObjects/POManager';

async function loginIntoApp(page, urlLogin, username, password) {

    const pomanager = new POManager(page);
    const loginpage = pomanager.getLoginPage();
    await loginpage.navigateToURL(urlLogin);
    await loginpage.login(username, password);

}

module.exports = { loginIntoApp };