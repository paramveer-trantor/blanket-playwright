import { POManager } from '../PageObjects/POManager';

async function verifyCookieBannerIsVisible(page){
    const pomanager = new POManager(page);
    const dashboardpage = pomanager.getDashboardPage();
    const cookie_status = await dashboardpage.getCookieBannerHeading();
    return cookie_status;
}

async function verifyTLProductIsVisible(page) {
    const pomanager = new POManager(page);
    const dashboardpage = pomanager.getDashboardPage();
    await dashboardpage.acceptCookies();
    await dashboardpage.selectCACountry();
    return await dashboardpage.getTLProductName();
}

async function verifyMyPoliciesInMenu(page) {
    const pomanager = new POManager(page);
    const dashboardpage = pomanager.getDashboardPage();
    await dashboardpage.acceptCookies();
    const name = await dashboardpage.getMenuOptions();
    await dashboardpage.clickMyPoliciesBtn();
}

async function navigateToProductPage(page) {
    const pomanager = new POManager(page);
    const dashboardpage = pomanager.getDashboardPage();
    await dashboardpage.acceptCookies();
    await dashboardpage.selectCACountry();
    await dashboardpage.openTermLifeCAProduct();
}

async function navigateToTermLifeByLifeBanner(page) {
    const pomanager = new POManager(page);
    const dashboardpage = pomanager.getDashboardPage();
    await dashboardpage.acceptCookies();
    await dashboardpage.selectCACountry();
    await dashboardpage.clickLifeBanner();
}

async function navigateToMyPoliciesPage(page) {
    const pomanager = new POManager(page);
    const dashboardpage = pomanager.getDashboardPage();
    await dashboardpage.acceptCookies();
    await dashboardpage.clickMyPoliciesBtn();
}

async function navigateToMyApplicationsPage(page) {
    const pomanager = new POManager(page);
    const dashboardpage = pomanager.getDashboardPage();
    await dashboardpage.acceptCookies();
    await dashboardpage.clickMyProfileBtn();
    await dashboardpage.clickMyApplicationsBtn();
}
// async function verifyWarningMsgOnLangChangeInForm(page) {
//     const pomanager = new POManager(page);
//     const dashboardpage = pomanager.getDashboardPage();
//     const warning_msg = await dashboardpage.selectFRLangInForm();
//     return warning_msg;
// }
async function logoutFromApplication(page) {
    const pomanager = new POManager(page);
    const dashboardpage = pomanager.getDashboardPage();
    await dashboardpage.acceptCookies();
    await dashboardpage.clickMyProfileBtn();
    await dashboardpage.clickLogoutBtn();
}

async function goToMyApplicationsPage(page) {
    const pomanager = new POManager(page);
    const dashboardpage = pomanager.getDashboardPage();
    await dashboardpage.acceptCookies();
    await dashboardpage.clickMyProfileBtn();
    await dashboardpage.clickMyApplicationsBtn();
}

async function verifyIfNotificationMsgForOpenApplication(page) {
    const pomanager = new POManager(page);
    const dashboardpage = pomanager.getDashboardPage();
    const openApp_msg = await dashboardpage.getOpenApplicationsMsg();   
    return openApp_msg;
}

async function verifyWarningMsgOnLangChangeInForm(page) {
    const pomanager = new POManager(page);
    const dashboardpage = pomanager.getDashboardPage();
    await dashboardpage.selectFRLang();
    const warn_langChange = await dashboardpage.getLangChangeWarningMsg();
    return warn_langChange;
}

async function navigateToAdminPartnershipPage(page) {
    const pomanager = new POManager(page);
    const dashboardpage = pomanager.getDashboardPage();
    await dashboardpage.acceptCookies();
    await dashboardpage.clickAdminPartnershipsBtn();
}

async function navigateToAdminReportsPage(page) {
    const pomanager = new POManager(page);
    const dashboardpage = pomanager.getDashboardPage();
    await dashboardpage.acceptCookies();
    await dashboardpage.clickAdminReportsBtn();
}

async function navigateToPartnershipsPage(page) {
    const pomanager = new POManager(page);
    const dashboardpage = pomanager.getDashboardPage();
    await dashboardpage.clickPartnershipsBtn();
}

module.exports = { logoutFromApplication, navigateToMyApplicationsPage, navigateToAdminPartnershipPage, navigateToPartnershipsPage, navigateToAdminReportsPage, verifyWarningMsgOnLangChangeInForm, goToMyApplicationsPage, verifyIfNotificationMsgForOpenApplication, verifyTLProductIsVisible, verifyCookieBannerIsVisible, verifyMyPoliciesInMenu, navigateToProductPage, navigateToMyPoliciesPage, navigateToTermLifeByLifeBanner };
