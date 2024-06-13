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
        await premiunquotepage.getQuoteValue(gender, date);
        await premiunquotepage.clickContinueBtn();
        const termlifeloginpage = pomanager.getTermLifeLoginPage();
        expect(await termlifeloginpage.getInFormLoginPageHeder()).toContain('In order to continue ');
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
        await premiunquotepage.getQuoteValue(gender, date);
        await premiunquotepage.clickContinueBtn();
        const preapplicationpage = pomanager.getPreApplicationPage();
        expect(await preapplicationpage.getPreApplicationPageHeader()).toBe(' Pre Application ');
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
        const invalidDOBError = await premiunquotepage.getIncorrectDateErrorMsg(gender, "02/02/2029");
        expect(invalidDOBError).toContain('Date of birth must be on or before');
        await premiunquotepage.getQuoteValue(gender, date);
        await premiunquotepage.clickContinueBtn();
        const preapplicationpage = pomanager.getPreApplicationPage();
        await preapplicationpage.acceptPopWindow();
        await preapplicationpage.enterUserName(firstname, lastname);
        const invalidDOBError1 = await preapplicationpage.getIncorrectDateErrorMsg("02/02/2029");
        expect(invalidDOBError1).toContain('Date of birth must be on or before');
    });

    test('BL-T7: Application shall throw an error message if user enters invalid phone number.', async ({ page }) => {
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
        await premiunquotepage.getQuoteValue(gender, date);
        await premiunquotepage.clickContinueBtn();
        const preapplicationpage = pomanager.getPreApplicationPage();
        await preapplicationpage.acceptPopWindow();
        await preapplicationpage.enterUserName(firstname, lastname);
        await preapplicationpage.enterAddress(houseaddress);
        const invalidPhoneError = await preapplicationpage.getIncorrectPhoneErrorMsg("33333");
        expect(invalidPhoneError).toContain('Field format is invalid');
    });

    test('BL-T9: User shall be redirected to Needs Assessment page after pre application page..', async ({ page }) => {
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
        await premiunquotepage.getQuoteValue(gender, date);
        await premiunquotepage.clickContinueBtn();
        const preapplicationpage = pomanager.getPreApplicationPage();
        await preapplicationpage.acceptPopWindow();
        await preapplicationpage.enterUserName(firstname, lastname);
        await preapplicationpage.enterAddress(houseaddress);
        await preapplicationpage.enterPhoneNumber(phonenumber);
        await preapplicationpage.last3Questions(OptionYes);
        await preapplicationpage.clickConitnueBtn();
        const needsassessmentpage = pomanager.getNeedsAssessmentPage();
        expect(await needsassessmentpage.getNeedsAssessmentPageHeader()).toContain('How Much Term Insurance');
    });

    test('BL-T11: User with age < 18 or > 80 shall not be allowed to buy a CA term plan.', async ({ page }) => {
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
        const invalidDOBError = await premiunquotepage.getIncorrectDateErrorMsg(gender, "02/02/2010");
        expect(invalidDOBError).toContain('Date of birth must be on or before');
        await premiunquotepage.getQuoteValue(gender, date);
        await premiunquotepage.clickContinueBtn();
        const preapplicationpage = pomanager.getPreApplicationPage();
        await preapplicationpage.acceptPopWindow();
        await preapplicationpage.enterUserName(firstname, lastname);
        const invalidDOBError1 = await preapplicationpage.getIncorrectDateErrorMsg("02/02/1949");
        expect(invalidDOBError1).toContain('Date of birth must be on or after');
    });

    test('BL-T12: User with age between 18 & 50 shall able to buy plan of term period and face amount upto $1M.', async ({ page }) => {
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
        await premiunquotepage.getQuoteValue(gender, date);
        await premiunquotepage.clickContinueBtn();
        const preapplicationpage = pomanager.getPreApplicationPage();
        await preapplicationpage.acceptPopWindow();
        await preapplicationpage.enterUserName(firstname, lastname);
        await preapplicationpage.enterAddress(houseaddress);
        await preapplicationpage.enterPhoneNumber(phonenumber);
        await preapplicationpage.last3Questions(OptionNo);
        await preapplicationpage.clickConitnueBtn();
        const needsassessmentpage = pomanager.getNeedsAssessmentPage();
        await needsassessmentpage.enterGrossIncome(income,saving,mortgageBal,debt);
        await needsassessmentpage.clickContinueBtn();
        const confirmpremiumpage = pomanager.getConfirmPremiumPage();
        expect(await confirmpremiumpage.getTermsOptions()).toContain('10','15','20');
        expect(await confirmpremiumpage.getCoverageAmountOptions()).toContain('1M');
    });

    test.only('BL-T13: User with age above 50 shall able to buy plan with face amount upto $500k.', async ({ page }) => {
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
        await premiunquotepage.getQuoteValue(gender, "01/01/1963");
        await premiunquotepage.clickContinueBtn();
        const preapplicationpage = pomanager.getPreApplicationPage();
        await preapplicationpage.acceptPopWindow();
        await preapplicationpage.enterUserName(firstname, lastname);
        await preapplicationpage.enterAddress(houseaddress);
        await preapplicationpage.enterPhoneNumber(phonenumber);
        await preapplicationpage.last3Questions(OptionNo);
        await preapplicationpage.clickConitnueBtn();
        const needsassessmentpage = pomanager.getNeedsAssessmentPage();
        await needsassessmentpage.enterGrossIncome(income,saving,mortgageBal,debt);
        await needsassessmentpage.clickContinueBtn();
        const confirmpremiumpage = pomanager.getConfirmPremiumPage();
        //expect(await confirmpremiumpage.getCoverageAmountOptions()).
        await confirmpremiumpage.getCoverageAmountOptions();
    });


});