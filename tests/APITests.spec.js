import { test, expect, request } from '@playwright/test';
import { login } from '../PageTests/LoginPageTest';
import { sendFakeStatusCodeToApI, getAPIResponseStatus, verifyErrorMessage } from '../PageTests/CallAPI_Interceptor';
import { logoutFromApplication, goToMyApplicationsPage, verifyWarningMsgOnLangChangeInForm, verifyIfNotificationMsgForOpenApplication, verifyTLProductIsVisible, verifyCookieBannerIsVisible, verifyMyPoliciesInMenu, navigateToProductPage, navigateToMyPoliciesPage, navigateToTermLifeByLifeBanner, navigateToMyApplicationsPage } from '../PageTests/DashboardTest';
import { verifyProductPageHeader, navigateToPolicyForm } from '../PageTests/TLProductPageTest';
import { verifyNonCanadianWarning, verifyPremiumQuotePageHeader, navigateToPreApplicationPage, verifyInvalidDateError } from '../PageTests/PremiumQuotePageTest';
import {  verifyInFormLoginPageHeader, createAccountInForm, loginInForm } from '../PageTests/LoginPageInTermLifeFormTest';
import { verifyNonCanadianWarningOnPreAppPage, verifyAddressValidateFailureError, enterAddressManually, acceptAfterHoursMsg, verifyPreApplicationPageHeader, navigateToNeedsAssessmentPage, verifyInvalidDateErrorMsg, verifyInvalidPhoneError, verifyAfterHoursMsg, verifyProductNotAvailableMsg, clickPreAppPageContinueBtn, fillPreApplicationFormPage, answerYesOnPreAppQues, verifyScrollingToErrorMsg } from '../PageTests/PreApplicationPageTest';
import { verifyNeedsAssessmentPageHeader, navigateToConfirmPremiumPage, verifyCoverageAmountMsg, verifyNoMsgDisplayed, returnTotalValue } from '../PageTests/NeedsAssessmentPageTest';
import { verifyConfirmPremiumPageHeader, verifyTermOptions, verifyCoverageAmountOptions, verifyQuoteValue, navigateToLifeStyleQuestionsPage, getpremiumAmount, getTermLength, getCoverageAmount } from '../PageTests/ConfirmPremiumPageTest';
import { verifyLifestyleQuestionsPageHeader, navigateToMedicalQuestion1Page, verifyCompanyDeclinedKnockout, verifyRiskyOccupationKnockout, verifyCriminalOffenceKnockout, verifyExtremeSportsKnockout, verifyMarijuanaKnockout, verifyDrugsUse5YKnockout, verifyDrugsUse10YKnockout, verifyOutsideCaKnockout } from '../PageTests/LifestyleQuestionsPageTest';
import { verifyMed1PageHeader, navigateToMedicalQuestion2Page, moveToNextPageSleepApneaYes } from '../PageTests/MedicalQuestionnaire1PageTest';
import { verifyMed2PageHeader, navigateToReviewYourAnswersPage } from '../PageTests/MedicalQuestionnaire2PageTest';
import { verifyReviewPageHeader, clickMakeAnEditButton, navigateToPersonalStatementPage } from '../PageTests/ReviewYourAnswersPageTest';
import { verifyPersonalStatementPageHeader, verifyUserName, verifyKnockoutMsg, navigateToBeneficiryPage, getLastStatementText } from '../PageTests/PersonalStatementPageTest';
import { verifyBenecificaryPageHeader, addBeneficiary, navigateToConfirmIdentityPage, verifyAddedBenDetails, verifyShareErrorMessage, checkWithoutBeneficiryCheckbox, verifyIncorrectDateErrorMessage } from '../PageTests/BeneficiaryPageTest';
import { verifyConfirmIdentityPageHeader, verifyMonthlyPremiumSelected, verifyAnnualPremiumSelected, verifyPassportInputFieldVisible, verifyHealthInputFieldVisible, verifyLicenseInputFieldVisible, verifyInvalidPassportError, verifyInvalidHealthError, verifyInvalidLicenseError, getIdTypeList, navigateToPaymentPageUsingPassportNumber, navigateToPaymentPageUsingHealthNumber, navigateToPaymentPageUsingLicenseNumber } from '../PageTests/ConfirmIdentityPageTest';
import { verifyPaymentPageHeader, verifyAmountDue, verifyPurchasePolicyWithCC, verifyPurchasePolicyWithAch, verifyIconTransitNumberIsVisible, verifyIconRoutingNumberIsVisible, verifyIconAccountNumberIsVisible } from '../PageTests/PaymentPageTest';
import { verifyPolicyInfoColumns, verifyProviderName, verifyEffectiveDate, verifyPolicyNumber, verifyPayment, verifyThankYouMsg } from '../PageTests/CongratulationsPageTest';
import { verifyMyPoliciesPageHeader, verifyPolicySendingOverEmail, verifyPoliciesDetails } from '../PageTests/MyPoliciesPageTest';
import { verifyMyApplicationsPageHeader, resumeLatestLeftApplication, verifyMaxOpenApplicationsCount } from '../PageTests/MyApplicationsPageTest';
import { verifyStep1IsCompleted, verifyStep2IsCompleted, verifyStep4IsInactive, verifyStep5IsInactive, verifyStep6IsInactive, verifyStep7IsInactive } from '../PageTests/ProgressBarTest';
const { username, password, cookiestext, tagline, date, gender, firstname, lastname, houseaddress, phonenumber, income, saving, mortgageBal, debt, quotevalue, feet, inches, weight, marijuana, drinks, drinksKnock, OptionYes, OptionNo, benfirstname, benlastname, bendob, benshare, passportno, healthno, licenseno, cardname, cardnumber, expirydate, cvv, accountholdername, transitnumber, institutionnumber, accountnumber, bankname } = require('../Utils/TestData');

test.describe('CA Term API status codes handling TCs', async () => {

    //Prod parameters = (page, "https://www.blanket.com/pages/login", "tester@blanket.com", "123456");
    test('Application shall throw an error if api response is not 200 or 201 in CA Term Get Premium Quote API', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await page.getByText('Male', { exact: true }).first().click();
        await page.getByLabel('MM/DD/YYYY').click();
        await page.getByLabel('MM/DD/YYYY').fill(date);
        await page.getByText('Yes').first().click();
        await page.getByText('No').nth(1).click();
        const codes = [400, 403, 408, 429, 500, 503, 504];
        let message = "We are unable to complete the application at this time. A member of our customer service team will contact you shortly. You can contact us anytime at 1(833) 625-4353.";
        for(let i = 0; i < codes.length; i++) {
                await sendFakeStatusCodeToApI(page, codes[i]);
                await page.getByRole('button', { name: ' GET QUOTE ' }).click();  
                expect(await verifyErrorMessage(page)).toEqual(message);  
                await page.getByTestId('globalErrorCloseBtn').click();
        }
    });

    test('Application shall throw an error if api response is not 200 or 201 in CA Term Assessment API', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        const codes = [400, 403, 408, 429, 500, 503, 504];
        const income = ["10000","20000","30000","40000","50000","60000","70000"];
        let message = "We are unable to complete the application at this time. A member of our customer service team will contact you shortly. You can contact us anytime at 1(833) 625-4353.";
        for(let i = 0; i < codes.length; i++) {
            await page.locator("[name = 'annualIncome']").click();
            await page.locator("[name = 'annualIncome']").fill(income[i]);
            await sendFakeStatusCodeToApI(page, codes[i]);
            await page.locator("[name = 'savings']").click();
            expect(await verifyErrorMessage(page)).toEqual(message);  
            await page.getByTestId('globalErrorCloseBtn').click();
        }
    });

    test('Application shall throw an error if api response is not 200 or 201 in CA Term Get Premium API', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await page.locator("[name = 'annualIncome']").click();
        await page.locator("[name = 'annualIncome']").fill(income);
        await page.locator("[name = 'savings']").click();
        await page.locator("[name = 'mortgageBalance']").click();
        const codes = [400, 403, 408, 429, 500, 503, 504];
        let message = "We are unable to complete the application at this time. A member of our customer service team will contact you shortly. You can contact us anytime at 1(833) 625-4353.";
        for(let i = 0; i < codes.length; i++) {
                await sendFakeStatusCodeToApI(page, codes[i]);
                await page.getByRole('button', { name: ' Continue ' }).click(); 
                expect(await verifyErrorMessage(page)).toEqual(message);  
                await page.getByTestId('globalErrorCloseBtn').click();
        }
    });

    test('Application shall throw an error if api response is not 200 or 201 in CA Term Decission API', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
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
        await page.locator("[name='termCheckbox0'] + div.v-input--selection-controls__ripple").click();
        await page.locator("[name='termCheckbox1'] + div.v-input--selection-controls__ripple").click();
        await page.locator("[name='termCheckbox2'] + div.v-input--selection-controls__ripple").click();
        await page.locator("[name='termCheckbox3'] + div.v-input--selection-controls__ripple").click();
        await page.locator("[name='termCheckbox4'] + div.v-input--selection-controls__ripple").click();
        await page.locator("[name='termCheckbox5'] + div.v-input--selection-controls__ripple").click();
        await page.locator("[name='termCheckbox6'] + div.v-input--selection-controls__ripple").click();
        await page.locator("[name='termCheckbox7'] + div.v-input--selection-controls__ripple").click();
        await page.locator("[name='termCheckbox8'] + div.v-input--selection-controls__ripple").click();
        const codes = [400, 403, 408, 429, 500, 503, 504];
        let message = "We are unable to complete the application at this time. A member of our customer service team will contact you shortly. You can contact us anytime at 1(833) 625-4353.";
        for(let i = 0; i < codes.length; i++) {
                await sendFakeStatusCodeToApI(page, codes[i]);
                await page.getByRole('button', { name: ' I Agree ' }).click();
                expect(await verifyErrorMessage(page)).toEqual(message);  
                await page.getByTestId('globalErrorCloseBtn').click();
        }
    });

    /*
    test('Application shall throw an error if api response is not 200 or 201 in CA Term Create Customer API ', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
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
        await login(page, username, password);
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
        await login(page, username, password);
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
        await login(page, username, password);
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
        await login(page, username, password);
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

    test('Application shall throw an error if api response is not 200 or 201 in send email policy API', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await page.getByRole('button', {name: ' Allow all cookies '}).first().click();
        await page.locator("//div[@class='v-toolbar__content']/button[2]").click();
        await page.getByRole('menuitem').nth(2).click();
        await page.locator("//div[@class='v-data-table__wrapper']//tbody/tr/td[5]/button").first().click();
        const codes = [400, 403, 408, 429, 500, 503, 504];
        let message = "We are unable to complete the application at this time. A member of our customer service team will contact you shortly. You can contact us anytime at 1(833) 625-4353.";
        for(let i = 0; i < codes.length; i++) {
                await sendFakeStatusCodeToApI(page, codes[i]);
                await page.getByRole('button', { name: ' Email Policy ' }).click();
                expect(await verifyErrorMessage(page)).toEqual(message);  
                await page.locator('.pa-0').filter({ hasText: ' Success! ' }).getByRole('button', { name: ' Close ' }).click();
                await page.getByTestId('globalErrorCloseBtn').click();
        }
    });

    test('Application shall throw an error if api response is not 200 or 201 in login API', async ({ page }) => {
        await page.goto('/pages/login');
        await page.locator("[name='email']").fill(username);
        await page.locator("[name='password']").fill(password);
        const codes = [400, 403, 408, 429, 500, 503, 504];
        let message = "We are unable to complete the application at this time. A member of our customer service team will contact you shortly. You can contact us anytime at 1(833) 625-4353.";
        for(let i = 0; i < codes.length; i++) {
        //await page.route("https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=**", (route) => {
        await page.route("https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=**", (route) => {  
        const fakeResponse = {
                status: codes[i],
            }
            route.fulfill({
                status: fakeResponse.status,
            });
        });
        await page.locator('.login-btn').click();
        expect(await verifyErrorMessage(page)).toEqual(message);  
        await page.getByTestId('globalErrorCloseBtn').click();
    }
    });

    test('Application shall throw an error if api response is not 200 or 201 in forgot password API', async ({ page }) => {
        await page.goto('/pages/login');
        await page.locator(".signup-text").first().click();
        await page.getByLabel('Email').fill("Test@testaccount.com");
        const codes = [400, 403, 408, 429, 500, 503, 504];
        let message = "We are unable to complete the application at this time. A member of our customer service team will contact you shortly. You can contact us anytime at 1(833) 625-4353.";
        for(let i = 0; i < codes.length; i++) {
        await page.route("https://www.googleapis.com/identitytoolkit/v3/relyingparty/getOobConfirmationCode?key=**", (route) => {  
        const fakeResponse = {
                status: codes[i],
            }
            route.fulfill({
                status: fakeResponse.status,
            });
        });
        await page.locator('.login-btn').click();
        expect(await verifyErrorMessage(page)).toEqual(message);  
        await page.getByTestId('globalErrorCloseBtn').click();
    }
    });

    test('Application shall throw an error if api response is not 200 or 201 in create account API', async ({ page }) => {
        await page.goto('/pages/register');
        await page.getByLabel('Email').fill("Test@testaccount.com");
        await page.locator("[name='password']").fill("Test@1");
        await page.locator("[type='password']").last().fill("Test@1");
        const codes = [400, 403, 408, 429, 500, 503, 504];
        let message = "We are unable to complete the application at this time. A member of our customer service team will contact you shortly. You can contact us anytime at 1(833) 625-4353.";
        for(let i = 0; i < codes.length; i++) {
        await page.route("https://us-central1-blanket-development.cloudfunctions.net/getAccountKeybyEmail", (route) => {  
        const fakeResponse = {
                status: codes[i],
            }
            route.fulfill({
                status: fakeResponse.status,
            });
        });
        await page.getByRole('button', { name: ' Create Account ' }).click();
        await page.waitForTimeout(20000);
        expect(await verifyErrorMessage(page)).toEqual(message);  
        await page.getByTestId('globalErrorCloseBtn').click();
    }
    });

});

