import { test, expect } from '@playwright/test';
import { BasePage } from '../PageObjects/BasePage';
import { LoginPage } from '../PageObjects/LoginPage';
import { RegisterPage } from '../PageObjects/RegisterPage';
import { DashboardPage } from '../PageObjects/DashboardPage';
import { TLProductLandingPage } from '../PageObjects/TLProductLandingPage';
import { MyPoliciesPage } from '../PageObjects/MyPoliciesPage';
import { MyApplicationsPage } from '../PageObjects/MyApplicationsPage';
import { userData, loginData } from '../Utils/TestData'

test.afterEach('Close the browser', async ({ page }) => {
    await page.close(); 
});

test.describe('Login & Register cases', () => {

    test('BL-T114 - User should be able to login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate('/pages/login');
        await loginPage.login(loginData.validUser.username, loginData.validUser.password);
        await page.waitForTimeout(5000);
        await expect(page).toHaveURL('https://staging.blanket.com/');
    });

    test('BL-T251 - User should not be able to login with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate('/pages/login');
        await loginPage.login(loginData.validUser.username, loginData.invalidUser.invalidPassword);  
        expect(await loginPage.getErrorMessage()).toEqual('Invalid credentials');
        await loginPage.closeErrorPopUp();
        await loginPage.login(loginData.invalidUser.invalidUsername, loginData.validUser.password);   
        expect(await loginPage.getErrorMessage()).toEqual('Invalid credentials');
    });

    test.skip('BL-T85 - Application should ask user to enter OTP while creating an account', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await registerPage.goToRegisterPage('/pages/register');
        await registerPage.enterUserDetails("gagandeep.singla+createaccount@trantorinc.com", "123456");
        expect(await registerPage.clickCreateAccBtnAndGetAPIStatus()).toBe(201);
        expect(await registerPage.getOTPSentMsg()).toEqual("Please enter the 6 digit One time password sent to");  
    });

    test.skip('BL-T88 - Application shall throw an error message if user enters incorrect OTP.', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await registerPage.goToRegisterPage('/pages/register');
        await registerPage.enterUserDetails("gagandeep.singla+createaccount@trantorinc.com", "123456");
        expect(await registerPage.clickCreateAccBtnAndGetAPIStatus()).toBe(201); 
        expect(await registerPage.getIncorrectOTPMsg()).toEqual("Invalid One time password. Please enter the correct One time password.");  
    });

    test('BL-T123: Application shall block some particular email addresses to register on Blanket website.', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await registerPage.goToRegisterPage('/pages/register');
        await registerPage.enterEmail("userone@maildrop.cc");
        expect(await registerPage.getErrorMessage()).toEqual("Please enter valid email");
        await registerPage.enterEmail("usertwo@tempmail.com");
        expect(await registerPage.getErrorMessage()).toEqual("Please enter valid email");    
        await registerPage.enterEmail("userone@maildrop.cc");
        expect(await registerPage.getErrorMessage()).toEqual("Please enter valid email");
        await registerPage.enterEmail("userthree@emailtemporal.org");
        expect(await registerPage.getErrorMessage()).toEqual("Please enter valid email");
        await registerPage.enterEmail("userfour@fakemailgenerator.com");
        expect(await registerPage.getErrorMessage()).toEqual("Please enter valid email");
    });

});

test.describe('Website cases without login', () => { 

    test('BL-T1: Product Term life shall be visible under CA products list.', async ({ page }) => {
        const basePage = new BasePage(page);
        await basePage.navigate(' ');
        
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.acceptCookies();
        expect(await dashboardPage.getTLProductName()).toEqual('Term Life');
    });  

    test('BL-T29 : User shall able to switch between FR & EN languages.', async ({ page }) => {
        const basePage = new BasePage(page);
        await basePage.navigate(' ');
        
        const dashboard = new DashboardPage(page);
        await dashboard.acceptCookies();
        await basePage.changeLanguageToFR();
        expect(await dashboard.getDashboardPageHeader()).toEqual("Toute la protection dont vous avez besoin sous une seule couverture");
        
        await basePage.changeLanguageToEN();
        expect(await dashboard.getDashboardPageHeader()).toEqual("All your coverage under one blanket");
    }); 

    test('BL-T42: Term life banner shall be visible on dasboard screen.', async ({ page }) => {
        const basePage = new BasePage(page);
        await basePage.navigate(' ');
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.acceptCookies();
        await dashboardPage.clickLifeBanner();

        const tlProductLandingPage = new TLProductLandingPage(page);
        expect(await tlProductLandingPage.getHeaderText()).toEqual("We’ve got what matters most covered.");
    });

    test('BL-T49: App shall display cookie pop-up banner whenever user accesses the application.', async ({ page }) => {
        const basePage = new BasePage(page);
        await basePage.navigate(' ');

        const dashboardPage = new DashboardPage(page);
        expect(await dashboardPage.getCookieBannerHeading()).toEqual("We value your privacy  For us, cookies are more than just a sweet treat. They are essential to providing you with an optimal and customized online experience. These little bits of data let us adapt the content and ads you see, while analyzing our traffic to better meet your needs. Enjoy our website, knowing that we do our utmost to offer you a tasty online experience. Check out our privacy policy  for more information.");
    });

    test("BL-T130: Application shall not display notification message to user if user has no open application", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate('/pages/login');
        await loginPage.login("gagandeep.singla+sqlqa_nouse@trantorinc.com", "Test@123");
        
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.acceptCookies();
        await dashboardPage.goToMyApplicationsPage();

        const myApplicationsPage = new MyApplicationsPage(page);
        expect(await myApplicationsPage.getNoApplicationMsg()).toEqual('No data available');
    });

});

test.describe('Website cases with login', () => { 

    test.beforeEach('Login and navigate user to dashboad page', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate('/pages/login');
        await loginPage.login(loginData.validUser.username, loginData.validUser.password);
    }); 
    
    test('BL-T45: My policies menu option shall be visible in menu on desktop browser.', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.acceptCookies();
        await dashboardPage.goToMyPoliciesPage();

        const myPoliciesPage = new MyPoliciesPage(page);
        expect(await myPoliciesPage.getMyPoliciesPageHeader()).toEqual('My Policies');
    });

    test('BL-T50: App shall display purchased policy details under My policies page.', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.acceptCookies();
        await dashboardPage.goToMyPoliciesPage();

        const myPoliciesPage = new MyPoliciesPage(page);
        expect(await myPoliciesPage.getMyPoliciesPageHeader()).toEqual('My Policies');
    });

    test('BL-T51: User shall have an option to send policy over email.', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.acceptCookies();
        await dashboardPage.goToMyPoliciesPage();

        const myPoliciesPage = new MyPoliciesPage(page);
        await myPoliciesPage.clickEyeBtn(); 
        await myPoliciesPage.clickEmailPolicyBtn();
        expect(await myPoliciesPage.getSuccessMsg()).toEqual('Success!');
    });

    test('BL-T128: Application shall display notification message to user if user has any open CA TL application. ', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.acceptCookies();
        expect(await dashboardPage.clickAndVerifyOpenApplicationsMsg()).toEqual("You have an application in progress, would you like to continue?");
        const myApplicationsPage = new MyApplicationsPage(page);
        expect(await myApplicationsPage.getMyAppPageHeader()).toEqual("My Applications");
    });
 
    test("BL-T129: Application shall display user's open applications on My application page.", async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.acceptCookies();
        await dashboardPage.goToMyApplicationsPage();
        
        const myApplicationsPage = new MyApplicationsPage(page);
        expect(await myApplicationsPage.verifyNoApplicationMsgIsVisisble()).not.toBeVisible();
        const count_apps = await myApplicationsPage.getOpenApplicationsCount();
        await myApplicationsPage.deleteFirstRowApplication();
        const new_count_apps = count_apps - 1;
        expect(await myApplicationsPage.getOpenApplicationsCount()).toBe(new_count_apps);
    });

    test.skip('BL-T159: Application shall store upto 7 open application on My application page.', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.acceptCookies();
        await dashboardPage.goToMyApplicationsPage();
        
        const myApplicationsPage = new MyApplicationsPage(page);
        expect(await myApplicationsPage.getOpenApplicationsCount()).toBeLessThanOrEqual(7);
    });

    test('BL-T190: User shall land on same page after refreshing any page of Blanket application.', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.acceptCookies();
        await dashboardPage.goToMyApplicationsPage();
        const url_current = page.url();
        await page.reload();
        expect(page.url()).toEqual(url_current);
        await dashboardPage.goToMyPoliciesPage();
        const url_current1 = page.url();
        await page.reload();
        expect(page.url()).toEqual(url_current1);
        await dashboardPage.goToMyProfilePage();
        const url_current2 = page.url();
        await page.reload();
        expect(page.url()).toEqual(url_current2);
    });
}); 