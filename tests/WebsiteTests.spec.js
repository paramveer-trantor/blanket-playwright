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

test.describe('Login page Tests', () => {

    test.beforeEach('Open login page URL', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.openURL('/pages/login');
    });

    test('User should be able to login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(username, password);        
    });

    test('User should not be able to login with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(username, invalidpassword);  
        expect(await loginPage.getErrorMessage()).toEqual('The password is invalid or the user does not have a password.');
    });

    test('User should not be able to login with non registered user', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(invalidusername, password);     
        expect(await loginPage.getErrorMessage()).toEqual('There is no user record corresponding to this identifier. The user may have been deleted.');
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
        await dashboardPage.clickMyPoliciesBtn();

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
        await dashboardPage.clickMyPoliciesBtn();

        const myPoliciesPage = new MyPoliciesPage(page);
        expect(await myPoliciesPage.getMyPoliciesPageHeader()).toEqual('My Policies');
    });

    test('BL-T51: User shall have an option to send policy over email.', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('/pages/login', username, password);

        const dashboardPage = new DashboardPage(page);
        await dashboardPage.clickMyPoliciesBtn();

        const myPoliciesPage = new MyPoliciesPage(page);
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
        expect(await myApplicationsPage.verifyNoOpenApplicationMsg()).not.toBeVisible();
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
        expect(await dashboardPage.clickAndVerifyOpenApplicationsMsg()).toEqual("There is no open application");
        await dashboardPage.goToMyApplicationsPage();

        const myApplicationsPage = new MyApplicationsPage(page);
        expect(await myApplicationsPage.verifyNoOpenApplicationMsg()).toBeVisible();
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


}); 
