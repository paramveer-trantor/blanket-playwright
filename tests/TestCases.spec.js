import { test, expect, request } from '@playwright/test';
import { POManager } from '../PageObjects/POManager';
const { url, username, password, tagline, date, gender, firstname, lastname, houseaddress, phonenumber, income, saving, mortgageBal, debt, quotevalue, feet, inches, weight, marijuana, drinks, drinksKnock, OptionYes, OptionNo, benfirstname, benlastname, bendob, benshare, passportno, cardname, cardnumber, expirydate, cvv, accountholdername, transitnumber, institutionnumber, accountnumber, bankname } = require('../Utils/TestData');

test.describe('Test cases', async () => {

    test('BL-T1: Product Term life shall be visible under CA products list.', async ({ page }) => {
        const pomanager = new POManager(page);
        const loginpage = pomanager.getLoginPage();
        await loginpage.navigateToURL();
        await loginpage.login(username, password);
        const dashboardpage = pomanager.getDashboardPage();
        await dashboardpage.acceptCookies();
        await dashboardpage.selectCACountry();
        const productlist = await dashboardpage.getProductsList();
        expect(productlist).toContain("Term Life");
    });

});

test.describe('CA Term Life Form Test cases', async () => {

    test('BL-T2: User shall be redirect to Login page from Quote page in CA Term policy form if user is not logged in blanket application.', async ({ page }) => {
        const pomanager = new POManager(page);
        await page.goto(url);
        const dashboardpage = pomanager.getDashboardPage();
        await dashboardpage.acceptCookies();
        await dashboardpage.selectCACountry();
        await dashboardpage.navigateToTermLifeCA();
        const termlifeCApage = pomanager.getTermLifeCAPage();
        await termlifeCApage.getHeaderText(tagline);
        await termlifeCApage.clickApplyNowBtn();
        const premiunquotepage = pomanager.getPremiumQuotePage();
        await premiunquotepage.verifyPremiumPageHeader();
        await premiunquotepage.getQuoteValue(gender, date);
        await premiunquotepage.clickContinueBtn();
        const termlifeloginpage = pomanager.getTermLifeLoginPage();
        const Login_header = await termlifeloginpage.getPageHeder();
        expect(Login_header).toContain(' In order to continue ');
    });

    test('BL-T3: User shall be redirect to Pre Application page from Quote page in CA Term policy form if user is already logged in blanket application.', async ({ page }) => {
        const pomanager = new POManager(page);
        const loginpage = pomanager.getLoginPage();
        await loginpage.navigateToURL();
        await loginpage.login(username, password);
        const dashboardpage = pomanager.getDashboardPage();
        await dashboardpage.acceptCookies();
        await dashboardpage.selectCACountry();
        await dashboardpage.navigateToTermLifeCA();
        const termlifeCApage = pomanager.getTermLifeCAPage();
        await termlifeCApage.getHeaderText(tagline);
        await termlifeCApage.clickApplyNowBtn();
        const premiunquotepage = pomanager.getPremiumQuotePage();
        await premiunquotepage.verifyPremiumPageHeader();
        await premiunquotepage.getQuoteValue(gender, date);
        await premiunquotepage.clickContinueBtn();
        const preapplicationpage = pomanager.getPreApplicationPage();
        const PreApp_header = await preapplicationpage.getPreApplicationPageHeader();
        expect(PreApp_header).toBe(' Pre Application ');
    });

    test('BL-T5: User shall not be allowed to future date in DOB field.', async ({ page }) => {
        const pomanager = new POManager(page);
        const loginpage = pomanager.getLoginPage();
        await loginpage.navigateToURL();
        await loginpage.login(username, password);
        const dashboardpage = pomanager.getDashboardPage();
        await dashboardpage.acceptCookies();
        await dashboardpage.selectCACountry();
        await dashboardpage.navigateToTermLifeCA();
        const termlifeCApage = pomanager.getTermLifeCAPage();
        await termlifeCApage.getHeaderText(tagline);
        await termlifeCApage.clickApplyNowBtn();
        const premiunquotepage = pomanager.getPremiumQuotePage();
        const errorMsg1 = await premiunquotepage.getIncorrectDateErrorMsg(gender, "02/02/2029");
        expect(errorMsg1).toContain('Date of birth must be on or before');
        await premiunquotepage.getQuoteValue(gender, date);
        await premiunquotepage.clickContinueBtn();
        const preapplicationpage = pomanager.getPreApplicationPage();
        await preapplicationpage.acceptPopWindow();
        await preapplicationpage.enterUserName(firstname, lastname);
        const errorMsg2 = await preapplicationpage.getIncorrectDateErrorMsg("02/02/2029");
        expect(errorMsg2).toContain('Date of birth must be on or before');
    });



});