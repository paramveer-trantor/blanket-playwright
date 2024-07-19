import { POManager } from '../PageObjects/POManager';

async function verifyMyApplicationsPageHeader(page) {
    const pomanager = new POManager(page);
    const myapplicationspage = pomanager.getMyApplicationsPage();
    const header_myapp = await myapplicationspage.getMyAppPageHeader();
    return header_myapp;
}

async function resumeLatestLeftApplication(page) {
    const pomanager = new POManager(page);
    const myapplicationspage = pomanager.getMyApplicationsPage();
    await myapplicationspage.clickEditBtnFirstApp();
}

module.exports = {verifyMyApplicationsPageHeader, resumeLatestLeftApplication };