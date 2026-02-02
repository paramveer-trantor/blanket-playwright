/* 
import { test, expect } from '@playwright/test';
import { InterceptorAPIs } from '../Utils/InterceptorAPIs';
import { LoginPage } from '../PageObjects/LoginPage';
import { RegisterPage } from '../PageObjects/RegisterPage';
import { MyPoliciesPage } from '../PageObjects/MyPoliciesPage';
import { DashboardPage } from '../PageObjects/DashboardPage';
import { TLProductLandingPage } from '../PageObjects/TLProductLandingPage';
import { PremiumQuotePage } from '../PageObjects/PremiumQuotePage';
import { PreApplicationPage } from '../PageObjects/PreApplicationPage';
import { NeedsAssessmentPage } from '../PageObjects/NeedsAssessmentPage';
import { ConfirmPremiumPage } from '../PageObjects/ConfirmPremiumPage';
import { LifestyleQuestionnairePage } from '../PageObjects/LifestyleQuestionnairePage';
import { MedicalQuestionnaire1Page } from '../PageObjects/MedialQuestionnaire1Page';
import { MedicalQuestionnaire2Page } from '../PageObjects/MedialQuestionnaire2Page';
import { ReviewYourAnswersPage } from '../PageObjects/ReviewYourAnswersPage';
import { PersonalStatementPage } from '../PageObjects/PersonalStatemenPage';
import { BeneficiaryPage } from '../PageObjects/BeneficiaryPage';
import { ConfirmIdentityPage } from '../PageObjects/ConfirmIdentityPage';
import { PaymentPage } from '../PageObjects/PaymentPage';
import { CongratulationsPage } from '../PageObjects/CongratulationsPage';
import { userData, loginData } from '../Utils/TestData';

test.afterEach('Close the browser', async ({ page }) => {
    await page.close(); 
});

test.describe('API test cases without Login', async () => {

    test.skip('BL-T186: Application shall throw an error if CA Term Get Premium Quote API response is not 200 or 201', async ({ page }) => {
        await page.goto(''); 
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.navigateToCATLProduct();

        const landingpage = new TLProductLandingPage(page);
        await landingpage.clickApplyNowBtn();

        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.fillQuotePage(userData.genderMale, userData.date, userData.feet, userData.inches, userData.weight);
        const codes = [400, 403, 408, 429, 500, 503, 504];
        let message = "Oops! Something went wrong. Please try again or contact us for assistance.";
        for(let i = 0; i < codes.length; i++) {
            const interceptorAPIs = new InterceptorAPIs(page);
            await interceptorAPIs.sendFakeStatusCodeToApiResponse(codes[i]);
            await premiumQuotePage.clickGetQuoteBtn();  
            expect(await premiumQuotePage.getErrorPopUp()).toEqual(message);  
            await premiumQuotePage.closeErrorPopUp();
        }
    });

    test('BL-T141(1): Application shall throw an error if login API response is not 200 or 201', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate('/pages/login');
        await loginPage.enterCredentials(loginData.validUser.username, loginData.validUser.password);
        const codes = [400, 403, 408, 429, 500, 503, 504];
        let message = "Oops! Something went wrong. Please try again or contact us for assistance.";
        for(let i = 0; i < codes.length; i++) {
        await page.route("https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=**", (route) => {  
        const fakeResponse = {
                status: codes[i],
            }
            route.fulfill({
                status: fakeResponse.status,
            });
        });
        await loginPage.clickLoginBtn();
        expect(await loginPage.getErrorPopUp()).toEqual(message);  
        await loginPage.closeErrorPopUp();
    }
    });

    test('BL-T141(2): Application shall throw an error if forgot password API response is not 200 or 201', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate('/pages/login');
        await loginPage.goToForgotPasswordPage();
        await loginPage.fillEmailForgotPassword("Test@testaccount.com");
        const codes = [400, 403, 408, 429, 500, 503, 504];
        let message = "Oops! Something went wrong. Please try again or contact us for assistance.";
        for(let i = 0; i < codes.length; i++) {
        await page.route("https://www.googleapis.com/identitytoolkit/v3/relyingparty/getOobConfirmationCode?key=**", (route) => {  
        const fakeResponse = {
                status: codes[i],
            }
            route.fulfill({
                status: fakeResponse.status,
            });
        });
        await loginPage.clickLoginBtn();
        expect(await loginPage.getErrorPopUp()).toEqual(message);  
        await loginPage.closeErrorPopUp();
    }
    });

    test('BL-T141(3): Application shall throw an error if create account API response is not 200 or 201', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await registerPage.goToRegisterPage('/pages/register');
        await registerPage.enterUserDetails("gagandeep.singla+createaccount@trantorinc.com", "123456");
        const codes = [400, 403, 408, 429, 500, 503, 504];
        let message = "Oops! Something went wrong. Please try again or contact us for assistance.";
        for(let i = 0; i < codes.length; i++) {
        await page.route("https://us-central1-blanket-development.cloudfunctions.net/getAccountKeybyEmail", (route) => {  
        const fakeResponse = {
                status: codes[i],
            }
            route.fulfill({ 
                status: fakeResponse.status,
            });
        });
        await registerPage.clickCreateAccBtn();
        expect(await registerPage.getErrorPopUp()).toEqual(message);  
        await registerPage.closeErrorPopUp();
    }
    });

    test('BL-T141: Application shall throw an error if send email policy API response is not 200 or 201', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate('/pages/login');
        await loginPage.login(loginData.validUser.username, loginData.validUser.password);

        const dashboardPage = new DashboardPage(page);
        await dashboardPage.acceptCookies();
        await dashboardPage.goToMyPoliciesPage();

        const myPoliciesPage = new MyPoliciesPage(page);
        await myPoliciesPage.clickEyeBtn();
        const codes = [400, 403, 408, 429, 500, 503, 504];
        let message = "Oops! Something went wrong. Please try again or contact us for assistance.";
        for(let i = 0; i < codes.length; i++) {
            const interceptorAPIs = new InterceptorAPIs(page);
            await interceptorAPIs.sendFakeStatusCodeToApiResponse(codes[i]);
            await myPoliciesPage.clickEmailPolicyBtn();
            expect(await myPoliciesPage.getErrorPopUp()).toEqual(message); 
            await myPoliciesPage.closeEmailSuccessPopUp();
            await myPoliciesPage.closeErrorPopUp();
        }
    });

});

test.describe('API test cases with Login', async () => {

    test.beforeEach('Login and navigate user to CA Term Life Premium Quote page', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate('/pages/login');
        await loginPage.login(loginData.validUser.username, loginData.validUser.password);

        const dashboardPage = new DashboardPage(page); 
        await dashboardPage.acceptCookies();
        await dashboardPage.navigateToCATLProduct();

        const landingpage = new TLProductLandingPage(page);
        await landingpage.clickApplyNowBtn();
    }); 

    test('BL-T186(1): Application shall throw an error if CA Term Assessment API response is not 200 or 201', async ({ page }) => {

        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderMale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo); 
        await preApplicationPage.clickConitnueBtn();

        const codes = [400, 403, 408, 429, 500, 503, 504];
        const income = ["10000","20000","30000","40000","50000","60000","70000"];
        let message = "Oops! Something went wrong. Please try again or contact us for assistance.";
        for(let i = 0; i < codes.length; i++) {
            const needsAssessmentPage = new NeedsAssessmentPage(page);
            await needsAssessmentPage.enterAnnualIncome(income[i]);
            const interceptorAPIs = new InterceptorAPIs(page);
            await interceptorAPIs.sendFakeStatusCodeToApiResponse(codes[i]);
            await needsAssessmentPage.clickSavings();
            expect(await needsAssessmentPage.getErrorPopUp()).toEqual(message);  
            await needsAssessmentPage.closeErrorPopUp();
        }
    });

    test('BL-T186(2): Application shall throw an error if CA Term Get Premium API response is not 200 or 201', async ({ page }) => {

        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderMale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo); 
        await preApplicationPage.clickConitnueBtn();

        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterAnnualIncome(userData.income);
        await needsAssessmentPage.clickSavings();
        const codes = [400, 403, 408, 429, 500, 503, 504];
        let message = "Oops! Something went wrong. Please try again or contact us for assistance.";
        for(let i = 0; i < codes.length; i++) {
            const interceptorAPIs = new InterceptorAPIs(page);
            await interceptorAPIs.sendFakeStatusCodeToApiResponse(codes[i]);
            await needsAssessmentPage.clickContinueBtn();
            expect(await needsAssessmentPage.getErrorPopUp()).toEqual(message);  
            await needsAssessmentPage.closeErrorPopUp();
        }
    });

    test('BL-T186(3): Application shall throw an error if CA Term Decission API response is not 200 or 201', async ({ page }) => {

        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderMale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(userData.income, userData.saving, userData.mortgageBal, userData.debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        const premium_rate_value = await confirmPremiumPage.getQuoteValueWithFee();
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(userData.optionNo, userData.drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(userData.optionNo);
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(userData.optionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        const codes = [400, 403, 408, 429, 500, 503, 504];
        let message = "Oops! Something went wrong. Please try again or contact us for assistance.";
        for(let i = 0; i < codes.length; i++) {
            const interceptorAPIs = new InterceptorAPIs(page);
            await interceptorAPIs.sendFakeStatusCodeToApiResponse(codes[i]);
            await personalStatementPage.agreeBtnClick();
            expect(await personalStatementPage.getErrorPopUp()).toEqual(message);  
            await personalStatementPage.closeErrorPopUp();
        }
    });

});




//Unused code

test('Application shall throw an error if api response is not 200 or 201 in CA Term Create Customer API ', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, loginData.validUser.username, loginData.validUser.password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await navigateToLifeStyleQuestionsPage(page);
        await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
        await navigateToMedicalQuestion2Page(page, OptionNo);
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await navigateToPersonalStatementPage(page);
        await navigateToBeneficiryPage(page);  
        await checkWithoutBeneficiryCheckbox(page);
        await navigateToConfirmIdentityPage(page);
        await navigateToPaymentPageUsingLicenseNumber(page, licenseno);
        await page.getByLabel('Name on Card', { exact: true }).fill(cardname);
        await page.getByLabel('Card Number', { exact: true }).fill(cardnumber);
        await page.getByLabel('Expiration Date (MM/YYYY)', { exact: true }).fill(expirydate);
        await page.getByLabel('CVV', { exact: true }).fill(cvv);   
        //await sendFakeStatusCodeToApI(page, 500);
        const response = page.route("https://us-central1-blanket-development.cloudfunctions.net/createCATermCustomer", (route) => {
            const fakeResponse = {
                status: 500,
            }
            route.fulfill({
                status: fakeResponse.status,
            });
        });
        await page.getByRole('button', { name: ' Pay now ' }).click();
        await response;
        await page.waitForTimeout(100000000000);
        //expect(page.getByRole('dialog')).toBeVisible();
    });

    test('Application shall throw an error if api response is not 200 or 201 in CA Term Store Credit Card API ', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, loginData.validUser.username, loginData.validUser.password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await navigateToLifeStyleQuestionsPage(page);
        await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
        await navigateToMedicalQuestion2Page(page, OptionNo);
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await navigateToPersonalStatementPage(page);
        await navigateToBeneficiryPage(page);  
        await checkWithoutBeneficiryCheckbox(page);
        await navigateToConfirmIdentityPage(page);
        await navigateToPaymentPageUsingLicenseNumber(page, licenseno);
        await page.getByLabel('Name on Card', { exact: true }).fill(cardname);
        await page.getByLabel('Card Number', { exact: true }).fill(cardnumber);
        await page.getByLabel('Expiration Date (MM/YYYY)', { exact: true }).fill(expirydate);
        await page.getByLabel('CVV', { exact: true }).fill(cvv);   
        await page.route("https://us-central1-blanket-development.cloudfunctions.net/storeCATermCreditCard", (route) => {
            const fakeResponse = {
                status: 500,
            }
            route.fulfill({
                status: fakeResponse.status,
            });
        });
        await page.getByRole('button', { name: ' Pay now ' }).click();
        //expect(page.getByRole('dialog')).toBeVisible();
    });

    test('Application shall throw an error if api response is not 200 or 201 in CA Term Subscribe API ', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, loginData.validUser.username, loginData.validUser.password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await navigateToLifeStyleQuestionsPage(page);
        await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
        await navigateToMedicalQuestion2Page(page, OptionNo);
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await navigateToPersonalStatementPage(page);
        await navigateToBeneficiryPage(page);  
        await checkWithoutBeneficiryCheckbox(page);
        await navigateToConfirmIdentityPage(page);
        await navigateToPaymentPageUsingLicenseNumber(page, licenseno);
        await page.getByLabel('Name on Card', { exact: true }).fill(cardname);
        await page.getByLabel('Card Number', { exact: true }).fill(cardnumber);
        await page.getByLabel('Expiration Date (MM/YYYY)', { exact: true }).fill(expirydate);
        await page.getByLabel('CVV', { exact: true }).fill(cvv);   
        await page.route("https://us-central1-blanket-development.cloudfunctions.net/subscribeCATerm", (route) => {
            const fakeResponse = {
                status: 500,
            }
            route.fulfill({
                status: fakeResponse.status,
            });
        });
        await page.getByRole('button', { name: ' Pay now ' }).click();
        //expect(page.getByRole('dialog')).toBeVisible();
    });

    test('Application shall throw an error if api response is not 200 or 201 in CA Term Bind Policy API ', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, loginData.validUser.username, loginData.validUser.password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await navigateToLifeStyleQuestionsPage(page);
        await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
        await navigateToMedicalQuestion2Page(page, OptionNo);
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await navigateToPersonalStatementPage(page);
        await navigateToBeneficiryPage(page);  
        await checkWithoutBeneficiryCheckbox(page);
        await navigateToConfirmIdentityPage(page);
        await navigateToPaymentPageUsingLicenseNumber(page, licenseno);
        await page.getByLabel('Name on Card', { exact: true }).fill(cardname);
        await page.getByLabel('Card Number', { exact: true }).fill(cardnumber);
        await page.getByLabel('Expiration Date (MM/YYYY)', { exact: true }).fill(expirydate);
        await page.getByLabel('CVV', { exact: true }).fill(cvv);   
        await page.route("https://us-central1-blanket-development.cloudfunctions.net/CATermBindPolicy", (route) => {
            const fakeResponse = {
                status: 500,
            }
            route.fulfill({
                status: fakeResponse.status,
            });
        });
        await page.getByRole('button', { name: ' Pay now ' }).click();
        //expect(page.getByRole('dialog')).toBeVisible();
    });

    test('Application shall throw an error if api response is not 200 or 201 in CA Term Send Policy Pdf API ', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, loginData.validUser.username, loginData.validUser.password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await navigateToLifeStyleQuestionsPage(page);
        await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
        await navigateToMedicalQuestion2Page(page, OptionNo);
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await navigateToPersonalStatementPage(page);
        await navigateToBeneficiryPage(page);  
        await checkWithoutBeneficiryCheckbox(page);
        await navigateToConfirmIdentityPage(page);
        await navigateToPaymentPageUsingLicenseNumber(page, licenseno);
        await page.getByLabel('Name on Card', { exact: true }).fill(cardname);
        await page.getByLabel('Card Number', { exact: true }).fill(cardnumber);
        await page.getByLabel('Expiration Date (MM/YYYY)', { exact: true }).fill(expirydate);
        await page.getByLabel('CVV', { exact: true }).fill(cvv);   
        await page.route("https://us-central1-blanket-development.cloudfunctions.net/sendCATermPolicyPdf", (route) => {
            const fakeResponse = {
                status: 500,
            }
            route.fulfill({
                status: fakeResponse.status,
            });
        });
        await page.getByRole('button', { name: ' Pay now ' }).click();
        //expect(page.getByRole('dialog')).toBeVisible();
    });

*/

