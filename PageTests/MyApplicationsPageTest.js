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
  
async function verifyMaxOpenApplicationsCount(page) {
    const pomanager = new POManager(page);
    const myapplicationspage = pomanager.getMyApplicationsPage();
    const openApp_count = await myapplicationspage.getOpenApplicationsCount();
    return openApp_count;  
}

module.exports = {verifyMyApplicationsPageHeader, resumeLatestLeftApplication, verifyMaxOpenApplicationsCount };