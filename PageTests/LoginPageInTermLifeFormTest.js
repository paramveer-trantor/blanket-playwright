import { POManager } from '../PageObjects/POManager';

async function getLoginPageHeader(page) {

    const pomanager = new POManager(page);
    const termlifeloginpage = pomanager.getTermLifeLoginPage();
    return await termlifeloginpage.getInFormLoginPageHeder();

}

module.exports = { getLoginPageHeader };