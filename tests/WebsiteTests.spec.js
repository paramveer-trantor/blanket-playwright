import { test, expect } from '@playwright/test';
import { LoginPage } from '../PageObjects/LoginPage';
import { RegisterPage } from '../PageObjects/RegisterPage';
import { DashboardPage } from '../PageObjects/DashboardPage';
import { TLProductLandingPage } from '../PageObjects/TLProductLandingPage';
import { MyPoliciesPage } from '../PageObjects/MyPoliciesPage';
import { MyApplicationsPage } from '../PageObjects/MyApplicationsPage';
const { username, password, invalidusername, invalidpassword, tagline, cookiestext } = require('../Utils/TestData');

test.afterEach('Close the browser', async ({ page }) => {
    await page.close(); 
});

test.describe('Login & Register page Tests', () => {

    test('BL-T114 - User should be able to login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('/pages/login',username, password);       
        
        const dashboardPage = new DashboardPage(page);
        expect(await dashboardPage.getCookieBannerHeading()).toEqual(cookiestext);
    });

    test('User should not be able to login with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('/pages/login',username, invalidpassword);  
        expect(await loginPage.getErrorMessage()).toEqual('The password is invalid or the user does not have a password.');
    });

    test('User should not be able to login with non registered user', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('/pages/login',invalidusername, password);     
        expect(await loginPage.getErrorMessage()).toEqual('There is no user record corresponding to this identifier. The user may have been deleted.');
    });

    test('BL-T85 - Application should ask user to enter OTP while creating an account', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await registerPage.goToRegisterPage('/pages/register');
        await registerPage.enterUserDetails("gagandeep.singla+createaccount@trantorinc.com", "123456");
        expect(await registerPage.clickCreateAccBtnAndGetAPIStatus()).toBe(200);
        expect(await registerPage.getOTPSentMsg()).toEqual("Please enter the 6 digit One time password sent to");  
    });

    test('BL-T88 - Application shall throw an error message if user enters incorrect OTP.', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await registerPage.goToRegisterPage('/pages/register');
        await registerPage.enterUserDetails("gagandeep.singla+createaccount@trantorinc.com", "123456");
        expect(await registerPage.clickCreateAccBtnAndGetAPIStatus()).toBe(200); 
        expect(await registerPage.getIncorrectOTPMsg()).toEqual("Invalid One time password. Please enter the correct One time password.");  
    });

});

test.describe('Website pages Tests', () => { 
    test('BL-T1: Product Term life shall be visible under CA products list.', async ({ page }) => {
        await page.goto('');
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.acceptCookies();
        await dashboardPage.selectCACountry();
        expect(await dashboardPage.getTLProductName()).toEqual('Term Life');
    });  

    test('BL-T42: Term life banner shall be visible on dasboard screen.', async ({ page }) => {
        await page.goto('');
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.acceptCookies();
        await dashboardPage.selectCACountry();
        await dashboardPage.clickLifeBanner();

        const tlProductLandingPage = new TLProductLandingPage(page);
        expect(await tlProductLandingPage.getHeaderText()).toEqual(tagline);
    });

    test('BL-T45: My policies menu option shall be visible in menu on desktop browser.', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('/pages/login', username, password);

        const dashboardPage = new DashboardPage(page);
        await dashboardPage.acceptCookies();
        await dashboardPage.goToMyPoliciesPage();

        const myPoliciesPage = new MyPoliciesPage(page);
        expect(await myPoliciesPage.getMyPoliciesPageHeader()).toEqual('My Policies');
    });

    test('BL-T49: App shall display cookie pop-up banner whenever user accesses the application.', async ({ page }) => {
        await page.goto('');

        const dashboardPage = new DashboardPage(page);
        expect(await dashboardPage.getCookieBannerHeading()).toEqual(cookiestext);
    });

    test('BL-T50: App shall display purchased policy details under My policies page.', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('/pages/login', username, password);

        const dashboardPage = new DashboardPage(page);
        await dashboardPage.acceptCookies();
        await dashboardPage.goToMyPoliciesPage();

        const myPoliciesPage = new MyPoliciesPage(page);
        expect(await myPoliciesPage.getMyPoliciesPageHeader()).toEqual('My Policies');
    });

    test('BL-T51: User shall have an option to send policy over email.', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('/pages/login', username, password);

        const dashboardPage = new DashboardPage(page);
        await dashboardPage.acceptCookies();
        await dashboardPage.goToMyPoliciesPage();

        const myPoliciesPage = new MyPoliciesPage(page);
        await myPoliciesPage.clickEyeBtn(); 
        await myPoliciesPage.clickEmailPolicyBtn();
        expect(await myPoliciesPage.getSuccessMsg()).toEqual('Success!');
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

    test('BL-T128: Application shall display notification message to user if user has any open CA TL application. ', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('/pages/login',username, password);
        
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.acceptCookies();
        await dashboardPage.clickLogoutBtn();
          
        await loginPage.userLogin(username, password);
        expect(await dashboardPage.clickAndVerifyOpenApplicationsMsg()).toEqual("You have an application in progress, would you like to continue?");
        const myApplicationsPage = new MyApplicationsPage(page);
        expect(await myApplicationsPage.getMyAppPageHeader()).toEqual("My Applications");
    });
 
    test("BL-T129: Application shall display user's open applications on My application page.", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('/pages/login',username, password);
        
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.acceptCookies();
        await dashboardPage.goToMyApplicationsPage();
        
        const myApplicationsPage = new MyApplicationsPage(page);
        expect(await myApplicationsPage.verifyNoApplicationMsgIsVisisble()).not.toBeVisible();
        const count_apps = await myApplicationsPage.getOpenApplicationsCount();
        expect(await myApplicationsPage.getOpenApplicationsCount()).toBeLessThanOrEqual(7);
        await myApplicationsPage.deleteFirstRowApplication();
        const new_count_apps = count_apps - 1;
        expect(await myApplicationsPage.getOpenApplicationsCount()).toBe(new_count_apps);
    });

    test("BL-T130: Application shall not display notification message to user if user has no open application", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('/pages/login',"gagandeep.singla+autouser2@trantorinc.com", "Test@1");
        
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.acceptCookies();
        await dashboardPage.goToMyApplicationsPage();

        const myApplicationsPage = new MyApplicationsPage(page);
        expect(await myApplicationsPage.getNoApplicationMsg()).toEqual('No data available');
    });

    test('BL-T159: Application shall store upto 7 open application on My application page.', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('/pages/login',username, password);
        
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.acceptCookies();
        await dashboardPage.goToMyApplicationsPage();
        
        const myApplicationsPage = new MyApplicationsPage(page);
        expect(await myApplicationsPage.getOpenApplicationsCount()).toBeLessThanOrEqual(7);
    });

    test('BL-T190: User shall land on same page after refreshing any page of Blanket application.', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('/pages/login',username, password);
        
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.acceptCookies();
        await dashboardPage.goToMyApplicationsPage();
        const url_current = await page.url();
        await page.reload();
        expect(await page.url()).toEqual(url_current);
        await dashboardPage.goToMyPoliciesPage();
        const url_current1 = await page.url();
        await page.reload();
        expect(await page.url()).toEqual(url_current1);
        await dashboardPage.goToMyProfilePage();
        const url_current2 = await page.url();
        await page.reload();
        expect(await page.url()).toEqual(url_current2);
    });


}); 
