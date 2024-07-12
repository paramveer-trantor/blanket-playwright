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
    const MyPolicies_Status = await dashboardpage.checkMyPoliciesButtonInMenu();
    console.log("Status :" + MyPolicies_Status);
    return MyPolicies_Status;
}

async function navigateToProductPage(page) {

    const pomanager = new POManager(page);
    const dashboardpage = pomanager.getDashboardPage();
    await dashboardpage.acceptCookies();
    await dashboardpage.selectCACountry();
    await dashboardpage.navigateToTermLifeCA();
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

module.exports = { verifyTLProductIsVisible, verifyCookieBannerIsVisible, verifyMyPoliciesInMenu, navigateToProductPage, navigateToMyPoliciesPage, navigateToTermLifeByLifeBanner };