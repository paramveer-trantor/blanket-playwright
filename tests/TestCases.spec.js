import { test, expect, request } from '@playwright/test';
import { loginIntoApp, loginWithValidUser } from '../PageTests/LoginPageTest';
import { logoutFromApplication, goToMyApplicationsPage, verifyWarningMsgOnLangChangeInForm, verifyIfNotificationMsgForOpenApplication, verifyTLProductIsVisible, verifyCookieBannerIsVisible, verifyMyPoliciesInMenu, navigateToProductPage, navigateToMyPoliciesPage, navigateToTermLifeByLifeBanner } from '../PageTests/DashboardTest';
import { verifyProductPageHeader, navigateToPolicyForm } from '../PageTests/TLProductPageTest';
import { verifyNonCanadianWarning, verifyPremiumQuotePageHeader, navigateToPreApplicationPage, verifyInvalidDateError } from '../PageTests/PremiumQuotePageTest';
import {  verifyInFormLoginPageHeader, createAccountInForm, loginInForm } from '../PageTests/LoginPageInTermLifeFormTest';
import { verifyNonCanadianWarningOnPreAppPage, verifyPreApplicationPageHeader, navigateToNeedsAssessmentPage, verifyInvalidDateErrorMsg, verifyInvalidPhoneError, verifyAfterHoursMsg, verifyProductNotAvailableMsg, fillPreApplicationFormPage, answerYesOnPreAppQues } from '../PageTests/PreApplicationPageTest';
import { verifyNeedsAssessmentPageHeader, navigateToConfirmPremiumPage, verifyCoverageAmountMsg, verifyNoMsgDisplayed, returnTotalValue } from '../PageTests/NeedsAssessmentPageTest';
import { verifyConfirmPremiumPageHeader, verifyTermOptions, verifyCoverageAmountOptions, verifyQuoteValue, navigateToLifeStyleQuestionsPage } from '../PageTests/ConfirmPremiumPageTest';
import { verifyLifestyleQuestionsPageHeader, navigateToMedicalQuestion1Page } from '../PageTests/LifestyleQuestionsPageTest';
import { verifyMed1PageHeader, navigateToMedicalQuestion2Page } from '../PageTests/MedicalQuestionnaire1PageTest';
import { verifyMed2PageHeader, navigateToReviewYourAnswersPage } from '../PageTests/MedicalQuestionnaire2PageTest';
import { verifyReviewPageHeader, navigateToPersonalStatementPage } from '../PageTests/ReviewYourAnswersPageTest';
import { verifyPersonalStatementPageHeader, verifyUserName, verifyKnockoutMsg, navigateToBeneficiryPage, getLastStatementText } from '../PageTests/PersonalStatementPageTest';
import { verifyBenecificaryPageHeader, addBeneficiary, navigateToConfirmIdentityPage, verifyAddedBenDetails, verifyShareErrorMessage, checkWithoutBeneficiryCheckbox, verifyIncorrectDateErrorMessage } from '../PageTests/BeneficiaryPageTest';
import { verifyConfirmIdentityPageHeader, verifyMonthlyPremiumSelected, verifyAnnualPremiumSelected, verifyPassportInputFieldVisible, verifyHealthInputFieldVisible, verifyLicenseInputFieldVisible, verifyInvalidPassportError, verifyInvalidHealthError, verifyInvalidLicenseError, getIdTypeList, navigateToPaymentPage, navigateToPaymentPageUsingHealthNumber, navigateToPaymentPageUsingLicenseNumber } from '../PageTests/ConfirmIdentityPageTest';
import { verifyPaymentPageHeader, verifyAmountDue, verifyPurchasePolicyWithCC, verifyPurchasePolicyWithAch } from '../PageTests/PaymentPageTest';
import { verifyPolicyInfoColumns, verifyProviderName, verifyEffectiveDate, verifyPolicyNumber, verifyPayment, verifyThankYouMsg } from '../PageTests/CongratulationsPageTest';
import { verifyMyPoliciesPageHeader, verifyPolicySendingOverEmail, verifyPoliciesDetails } from '../PageTests/MyPoliciesPageTest';
import exp from 'constants';
import { Console } from 'console';
const { url, urlLogin, username, password, cookiestext, tagline, date, gender, firstname, lastname, houseaddress, phonenumber, income, saving, mortgageBal, debt, quotevalue, feet, inches, weight, marijuana, drinks, drinksKnock, OptionYes, OptionNo, benfirstname, benlastname, bendob, benshare, passportno, healthno, licenseno, cardname, cardnumber, expirydate, cvv, accountholdername, transitnumber, institutionnumber, accountnumber, bankname } = require('../Utils/TestData');

test.describe('App Flow TCs', async () => {

    test('BL-T1: Product Term life shall be visible under CA products list.', async ({ page }) => {
        await page.goto(url);
        expect(await verifyTLProductIsVisible(page)).toEqual('Term Life');
    });

});

test.describe('CA Term Life Flow TCs', async () => {

    test('BL-T2: User shall be redirect to Login page from Quote page in CA Term policy form if user is not logged in blanket application.', async ({ page }) => {
        await page.goto(url);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        expect(await verifyInFormLoginPageHeader(page)).toEqual('In order to continue with the application, please log in or create a Blanket account.');
    });

    test('BL-T3: User shall be redirect to Pre Application page from Quote page in CA Term policy form if user is already logged in blanket application.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        expect(await verifyPreApplicationPageHeader(page)).toEqual('Pre Application');
    });

    test('BL-T4: User shall be able to buy the term life policy successfully.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
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
        await addBeneficiary(page, benfirstname, benlastname, bendob, benshare);
        await navigateToConfirmIdentityPage(page);
        await navigateToPaymentPageUsingLicenseNumber(page, licenseno);
        await verifyPurchasePolicyWithCC(page,cardname, cardnumber, expirydate, cvv);
        console.log(await verifyThankYouMsg(page));
        expect(await verifyThankYouMsg(page)).toEqual('Thank you for your purchase! Your policy documents will be sent to you by email. You can view your policy  here.');
    });

    test('BL-T5: User shall not be allowed to future date in DOB field.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        expect(await verifyInvalidDateError(page, gender, "02/02/2029")).toMatch(/\bDate of birth must be on or before (\d{2}\/\d{2}\/\d{4})\b/);
        await navigateToPreApplicationPage(page, gender, date);
        expect(await verifyInvalidDateErrorMsg(page, firstname, lastname, "02/02/2029")).toMatch(/\bDate of birth must be on or before (\d{2}\/\d{2}\/\d{4})\b/);
    });

    test('BL-T7: Application shall throw an error message if user enters invalid phone number.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        expect(await verifyInvalidPhoneError(page, firstname, lastname, houseaddress, "33333")).toEqual('Field format is invalid');
    });

    test('BL-T9: User shall be redirected to Needs Assessment page after pre application page..', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        expect(await verifyNeedsAssessmentPageHeader(page)).toEqual('How Much Term Insurance Do I Need?');
    });

    test('BL-T10: User shall be knocked out if selects inappropriate answer on Pre Application page.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password)
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        expect(await verifyNonCanadianWarning(page)).toEqual('You must be a Canadian Citizen or permanent resident to be eligible for this coverage');
        await navigateToPreApplicationPage(page, gender, date);
        expect(await verifyNonCanadianWarningOnPreAppPage(page, firstname, lastname, houseaddress, phonenumber)).toEqual('You must be a Canadian Citizen or permanent resident to be eligible for this coverage');
        await answerYesOnPreAppQues(page, OptionYes);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await navigateToLifeStyleQuestionsPage(page);
        await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
        await navigateToMedicalQuestion2Page(page, OptionNo);
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await navigateToPersonalStatementPage(page);
        await navigateToBeneficiryPage(page);
        expect(await verifyKnockoutMsg(page)).toContain("A licensed insurance agent will contact you shortly.");
    });
    
    test('BL-T11: User with age < 18 or > 80 shall not be allowed to buy a CA term plan.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        expect(await verifyInvalidDateError(page, gender, "02/02/2010")).toMatch(/\bDate of birth must be on or before (\d{2}\/\d{2}\/\d{4})\b/);
        await navigateToPreApplicationPage(page, gender, date);
        expect(await verifyInvalidDateErrorMsg(page, firstname, lastname, "02/02/1949")).toMatch(/\bDate of birth must be on or after (\d{2}\/\d{2}\/\d{4})\b/);
    });

    test('BL-T12: User with age between 18 & 50 shall able to buy plan of term period and face amount upto $1M.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt); 
        expect(await verifyTermOptions(page)).toContainEqual('10', '15', '20');
        expect(await verifyCoverageAmountOptions(page)).toContainEqual('$100K', '$250K', '$400K', '$500K', '$600K', '$750K', '$1M');
    });

    test('BL-T13: User with age above 50 shall able to buy plan with face amount upto $500k.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, "01/01/1963");
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        expect(await verifyCoverageAmountOptions(page)).toContainEqual('$100K', '$250K', '$400K', '$500K');
    });

    test('BL-T14: User with age in between 66 & 70 shall be allowed to buy only T10 plan.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, "01/01/1957");
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        expect(await verifyTermOptions(page)).toContainEqual('10');
    });

    test('BL-T15: User with age in between 61 & 65 shall be allowed to buy only T10 & T15 plans.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, "01/01/1961");
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        expect(await verifyTermOptions(page)).toContainEqual('10', '15');
    });

    test('BL-T16: User with age 60 or less shall be allowed to buy any plan.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, "01/01/1980");
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        expect(await verifyTermOptions(page)).toContainEqual('10', '15', '20');
    });

    test('BL-T18: App shall display a message if recommended coverage amount is more than maximum face amount.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        const total = await returnTotalValue(page, "40000", saving, mortgageBal, debt);
        expect(await verifyCoverageAmountMsg(page, "40000", saving, mortgageBal, debt)).toEqual('Based on the information provided, your life insurance need appears to be ' + total + ' . You can apply for up to $1,000,000 now.');
    });

    test('BL-T19: App shall not display a message if recommended coverage amount is less than maximum face amount.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, "01/01/1957");
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        expect(await verifyNoMsgDisplayed(page, "50000", saving, mortgageBal, debt)).toBeFalsy();
    });

    test('BL-T23: User name and statements shall be properly displayed on personal statement page.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
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
        expect(await verifyUserName(page)).toEqual('I, ' + firstname + ' ' + lastname + '');
    });

    test('BL-T24: User shall be able to add beneficiaries.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
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
        await addBeneficiary(page, benfirstname, benlastname, bendob, benshare);
        expect(await verifyAddedBenDetails(page)).toContainEqual('Individual', 'Revocable', 'Brother', '100', 'Test', 'Beneficiary', '01/01/2010');
    });

    test('BL-T25: Total share of beneficiaries shall not increase by 100%.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
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
        await addBeneficiary(page, benfirstname, benlastname, bendob, benshare);
        await addBeneficiary(page, benfirstname, benlastname, bendob, benshare);
        expect(await verifyShareErrorMessage(page)).toEqual("Total Percentage of Beneficiaries must be 100");
    });
    
    test('BL-T26: User shall be able to proceed without adding beneficiary.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
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
        await navigateToConfirmIdentityPage(page)
        await verifyConfirmIdentityPageHeader(page);
    });

    test('BL-T27: Application shall display 3 options to user to confirm the identity on Confirm Identity page.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
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
        await addBeneficiary(page, benfirstname, benlastname, bendob, benshare);
        await navigateToConfirmIdentityPage(page);
        expect(await getIdTypeList(page)).toContainEqual('Passport', 'Provincial health card', "Driver's licence");
    });

    test('BL-T28: Application shall ask passport number from user if user selects the passport option.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
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
        await addBeneficiary(page, benfirstname, benlastname, bendob, benshare);
        await navigateToConfirmIdentityPage(page);
        expect(await verifyPassportInputFieldVisible(page)).toBeTruthy();
    });

    test('BL-T30: Application shall throw an error message if user enters invalid passport number.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
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
        await addBeneficiary(page, benfirstname, benlastname, bendob, benshare);
        await navigateToConfirmIdentityPage(page);
        console.log(await verifyInvalidPassportError(page, "a123456b"));
        expect(await verifyInvalidPassportError(page, "a123456b")).toEqual('Invalid passport number. It should begin with two letters and end with six  numbers. Please remove any spaces or special characters (-, *).');
    });

    test('BL-T31: Application shall ask province and DL number from user if user selects the DL option.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
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
        await addBeneficiary(page, benfirstname, benlastname, bendob, benshare);
        await navigateToConfirmIdentityPage(page);
        expect(await verifyLicenseInputFieldVisible(page)).toBeTruthy();
    });

    test('BL-T33: Application shall throw an error message if user enters invalid DL number.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
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
        await addBeneficiary(page, benfirstname, benlastname, bendob, benshare);
        await navigateToConfirmIdentityPage(page);
        expect(await verifyInvalidLicenseError(page, "AAA123")).toEqual("Invalid driver's license format. Please remove any spaces or special characters (-, *).");
    });

    test('BL-T34: Application shall ask province and health number from user if user selects the Provincial health card option.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
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
        await addBeneficiary(page, benfirstname, benlastname, bendob, benshare);
        await navigateToConfirmIdentityPage(page);
        expect(await verifyHealthInputFieldVisible(page)).toBeTruthy();
    });

    test('BL-T35: Check payment frequency options displaying to user', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
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
        await addBeneficiary(page, benfirstname, benlastname, bendob, benshare);
        await navigateToConfirmIdentityPage(page);
        const monthly = await verifyMonthlyPremiumSelected(page);
        await navigateToPaymentPage(page,passportno);
        let amountdue_monthly = await verifyAmountDue(page);
        const myArray_monthly = amountdue_monthly.split(" ");
        expect(monthly).toContain(myArray_monthly[3]);
        await page.getByRole('button', { name: ' Back ' }).click();
        const Annually = await verifyAnnualPremiumSelected(page);
        await page.getByRole('button', { name: ' Accept and pay '}).click();
        let amountdue_annually = await verifyAmountDue(page);
        const myArray_annually = amountdue_annually.split(" ");
        expect(Annually).toContain(myArray_annually[3]);
    });

    test('BL-T36: Application shall throw an error message if user enters invalid health card number.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
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
        await addBeneficiary(page, benfirstname, benlastname, bendob, benshare);
        await navigateToConfirmIdentityPage(page);
        expect(await verifyInvalidHealthError(page, "123456")).toEqual('Invalid health card format. Please remove any spaces or special characters (-, *).');
    });

    test('BL-T37: User shall able to move forward after entering all valid details on confirm identity page.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
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
        await addBeneficiary(page, benfirstname, benlastname, bendob, benshare);
        await navigateToConfirmIdentityPage(page);
        await navigateToPaymentPageUsingHealthNumber(page, healthno);
        expect(await verifyPaymentPageHeader(page)).toEqual("Payment");
    });

    test('BL-T40: Purchased policy details shall be displayed properly on congratulations screen.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
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
        await addBeneficiary(page, benfirstname, benlastname, bendob, benshare);
        await navigateToConfirmIdentityPage(page);
        const monthly = await verifyMonthlyPremiumSelected(page);
        const myArray_monthly = monthly.split(" ");
        await navigateToPaymentPageUsingHealthNumber(page, healthno);
        await verifyPurchasePolicyWithCC(page,cardname, cardnumber, expirydate, cvv);
        expect(await verifyPolicyInfoColumns(page)).toContainEqual(' Provider ' , ' Effective Date ' , ' Payment ' , ' Policy No. ');
        expect(await verifyProviderName(page)).toEqual('Blanket Life underwritten by Humania Assurance Inc.');
        const todays_date = new Date().toISOString().slice(0, 10);
        expect (await verifyEffectiveDate(page)).toEqual(todays_date);
        expect(await verifyPayment(page)).toContain(myArray_monthly[3]);
    });

    test('BL-T42: Term life banner shall be visible on home screen.', async ({ page }) => {
        await page.goto(url);
        await navigateToTermLifeByLifeBanner(page);
        expect(await verifyProductPageHeader(page)).toEqual(tagline);
    });

    test('BL-T43: Premium rates should be different for smoker & non smokers users.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        const non_smoker_quote = await verifyQuoteValue(page);
        await page.getByRole('button', { name: ' Back ' }).click();
        await page.getByRole('button', { name: ' Back ' }).click();
        await page.getByText('Yes', { exact: true }).nth(1).click();
        await page.getByRole('button', { name: ' Continue ' }).click();
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        expect(await verifyQuoteValue(page)).not.toBe(non_smoker_quote);
    });

    test('BL-T45: My policies menu option shall be visible in menu on desktop browser.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
        //NEED TO BE DONE
    });

    test('BL-T49: App shall display cookie pop-up banner whenever user accesses the application.', async ({ page }) => {
        await page.goto(url);
        expect(await verifyCookieBannerIsVisible(page)).toEqual(cookiestext);
    });

    test('BL-T50: App shall display purchased policy details under My policies page.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
        await navigateToMyPoliciesPage(page);
        expect(await verifyPoliciesDetails(page)).toEqual('Provider: Blanket Life underwritten by Humania Assurance Inc.');
    });

    test('BL-T51: User shall have an option to send policy over email.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
        await navigateToMyPoliciesPage(page);
        expect(await verifyPolicySendingOverEmail(page)).toEqual('Success!');
    });

    test('BL-T53: After hours message shall be displayed if user access the application in odd hours.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        expect(await verifyAfterHoursMsg(page)).toEqual('After hours');
       
    });

    test('BL-T55: User shall able to do premium payment successfully.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
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
        await navigateToConfirmIdentityPage(page)
        await navigateToPaymentPageUsingHealthNumber(page, healthno);
        await verifyPurchasePolicyWithAch(page,accountholdername, transitnumber, institutionnumber, accountnumber, bankname);
        expect(await verifyThankYouMsg(page)).toEqual('Thank you for your purchase! Your policy documents will be sent to you by email. You can view your policy  here.');
    });

    test('BL-T86: Application shall valiate the first time user email id through OTP in CA product policy form.', async ({ page }) => {
        await page.goto(url);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        expect(await createAccountInForm(page,"test@mailnator.com","Test@1")).toEqual("Please enter the 6 digit One time password sent to");
    });

    test('BL-T103: Application shall display a special statement for Quebec residents on personal statement page if user is filling form in EN.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, "990-450 Boul Poliquin", phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await navigateToLifeStyleQuestionsPage(page);
        await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
        await navigateToMedicalQuestion2Page(page, OptionNo);
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await navigateToPersonalStatementPage(page);
        expect(await getLastStatementText(page)).toEqual("Confirm that I completed my insurance application in English and that I chose this language for my insurance policy and any further communications unless otherwise advised.");
    });
    
    test('BL-T109: Application shall display a pop-up message if user selects any province other than AB, ON & QC.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        expect(await verifyProductNotAvailableMsg(page)).toEqual("This product is unavailable in your province at this time. Please contact us for an alternative that meets your needs.");
    });

    test('BL-T117: User shall land on Premium quote page of CA term life policy form on clicking Apply now or Get your term life today button.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password)
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        expect(await verifyPremiumQuotePageHeader(page)).toEqual("Term Life Insurance Premium Quote");
    });

    test('BL-T119: User shall be directed to Pre application page directly from quote page if user is logged in already.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password)
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        expect(await verifyPreApplicationPageHeader(page)).toEqual("Pre Application");
    });

    test('BL-T120: User shall be directed to Sign in/Sign up page from quote page if user is not logged in.', async ({ page }) => {
        await page.goto(url);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        expect(await verifyInFormLoginPageHeader(page)).toEqual("In order to continue with the application, please log in or create a Blanket account.");
        await loginInForm(page,username,password);
        expect(await verifyPreApplicationPageHeader(page)).toEqual("Pre Application");
    });

    test('BL-T122: Application shall show user a warning message if user tries to change the language while filling CA term form.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password)
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await navigateToLifeStyleQuestionsPage(page);
        expect(await verifyWarningMsgOnLangChangeInForm(page)).toEqual("Please note that changing the language will reload the page and your information will be lost.");
    });

    test.only('BL-T127: DOB field shall not accept invalid date on quote, pre application & beneficiary page.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        expect(await verifyInvalidDateError(page, gender, "13/01/2000")).toEqual("Date of birth is not a valid date");
        await navigateToPreApplicationPage(page, gender, date);
        expect(await verifyInvalidDateErrorMsg(page, firstname, lastname, "13/01/2000")).toEqual("Date of birth is not a valid date");
        await fillPreApplicationFormPage(page, date, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await navigateToLifeStyleQuestionsPage(page);
        await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
        await navigateToMedicalQuestion2Page(page, OptionNo);
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await navigateToPersonalStatementPage(page);
        await navigateToBeneficiryPage(page);
        expect(await verifyIncorrectDateErrorMessage(page, "13/01/2000")).toEqual("Date of birth is not a valid date");
    });

    test('BL-T128: Application shall display notification message to user if user has any open application.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
        await logoutFromApplication(page);
        await loginWithValidUser(page, username, password);
        expect(await verifyIfNotificationMsgForOpenApplication(page)).toEqual("You have an application in progress, would you like to continue?");
    });
    
    test('BL-T171: Application shall show the current step name in URL as user proceed with CA term life policy form.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password)
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await verifyPremiumQuotePageHeader(page);
        expect(await page.url()).toContain("quote");
        await navigateToPreApplicationPage(page, gender, date);   
        await verifyPreApplicationPageHeader(page);  
        expect(await page.url()).toContain("pre-application");
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await verifyNeedsAssessmentPageHeader(page);
        page.waitForTimeout(30000);
        //expect(await page.url()).toContain("policy-options");
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await verifyConfirmIdentityPageHeader(page);
        expect(await page.url()).toContain("policy-options");
        await navigateToLifeStyleQuestionsPage(page);
        await verifyLifestyleQuestionsPageHeader(page);
        page.waitForTimeout(5000);
        expect(await page.url()).toContain("underwritting");
        await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
        expect(await page.url()).toContain("underwritting");
        await navigateToMedicalQuestion2Page(page, OptionNo);
        expect(await page.url()).toContain("underwritting");
        await navigateToReviewYourAnswersPage(page, OptionNo);
        expect(await page.url()).toContain("underwritting");
        await navigateToPersonalStatementPage(page);
        await verifyPersonalStatementPageHeader(page);
        page.waitForTimeout(5000);
        expect(await page.url()).toContain("personal-statements");
        await navigateToBeneficiryPage(page);
        await verifyBenecificaryPageHeader(page);
        page.waitForTimeout(5000);
        expect(await page.url()).toContain("beneficiary");
        await checkWithoutBeneficiryCheckbox(page);
        await navigateToConfirmIdentityPage(page);
        await verifyConfirmIdentityPageHeader(page);
        page.waitForTimeout(5000);
        expect(await page.url()).toContain("your-policy");
        await navigateToPaymentPageUsingHealthNumber(page, healthno);
        await verifyPaymentPageHeader(page);
        page.waitForTimeout(5000);
        expect(await page.url()).toContain("payment");
    });

    

});