import { POManager } from '../PageObjects/POManager';

async function verifyCookieBannerIsVisible(page){
    const pomanager = new POManager(page);
    const dashboardpage = pomanager.getDashboardPage();
    const cookie_status = await dashboardpage.getCookieBannerHeading();
    return cookie_status;
}

async function verifyProductList(page) {

    const pomanager = new POManager(page);
    const dashboardpage = pomanager.getDashboardPage();
    await dashboardpage.acceptCookies();
    await dashboardpage.selectCACountry();
    return await dashboardpage.getProductsList();
}

async function verifyMenuMenu(page) {

    const pomanager = new POManager(page);
    const dashboardpage = pomanager.getDashboardPage();
    await dashboardpage.acceptCookies();
    await dashboardpage.selectCACountry();
    const menu_optons = await dashboardpage.getMenuOptions();
    return menu_optons;
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

module.exports = { verifyProductList, verifyCookieBannerIsVisible, verifyMenuMenu, navigateToProductPage, navigateToTermLifeByLifeBanner };