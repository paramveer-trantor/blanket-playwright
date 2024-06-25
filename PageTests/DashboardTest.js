import { POManager } from '../PageObjects/POManager';

async function verifyProductList(page) {

    const pomanager = new POManager(page);
    const dashboardpage = pomanager.getDashboardPage();
    await dashboardpage.acceptCookies();
    await dashboardpage.selectCACountry();
    return await dashboardpage.getProductsList();

}

async function navigateToProductPage(page) {

    const pomanager = new POManager(page);
    const dashboardpage = pomanager.getDashboardPage();
    await dashboardpage.acceptCookies();
    await dashboardpage.selectCACountry();
    await dashboardpage.navigateToTermLifeCA();

}

module.exports = { verifyProductList, navigateToProductPage };