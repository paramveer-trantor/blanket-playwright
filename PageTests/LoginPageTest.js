import { POManager } from '../PageObjects/POManager';

async function login(page, username, password) {

    const pomanager = new POManager(page);
    const loginpage = pomanager.getLoginPage();
    await loginpage.loginIntoApp(username, password);

}

module.exports = { login };