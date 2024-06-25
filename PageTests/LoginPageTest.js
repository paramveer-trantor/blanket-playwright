import { POManager } from '../PageObjects/POManager';

async function loginIntoApp(page, username, password) {

    const pomanager = new POManager(page);
    const loginpage = pomanager.getLoginPage();
    await loginpage.navigateToURL();
    await loginpage.login(username, password);

}

module.exports = { loginIntoApp };