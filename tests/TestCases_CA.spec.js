import { test, expect, request } from '@playwright/test';
import { login } from '../PageTests/LoginPageTest';
import { logoutFromApplication, goToMyApplicationsPage, verifyWarningMsgOnLangChangeInForm, verifyIfNotificationMsgForOpenApplication, verifyTLProductIsVisible, verifyCookieBannerIsVisible, verifyMyPoliciesInMenu, navigateToProductPage, navigateToMyPoliciesPage, navigateToTermLifeByLifeBanner, navigateToMyApplicationsPage } from '../PageTests/DashboardTest';
import { verifyProductPageHeader, navigateToPolicyForm } from '../PageTests/TLProductPageTest';
import { verifyNonCanadianWarning, verifyPremiumQuotePageHeader, navigateToPreApplicationPage, verifyInvalidDateError, navigateToPreApplicationPageAsSmoker, getQuotePremiumRateValue } from '../PageTests/PremiumQuotePageTest';
import {  verifyInFormLoginPageHeader, createAccountInForm, loginInForm } from '../PageTests/LoginPageInTermLifeFormTest';
import { verifyNonCanadianWarningOnPreAppPage, verifyAddressValidateFailureError, enterAddressManually, acceptAfterHoursMsg, verifyPreApplicationPageHeader, navigateToNeedsAssessmentPage, verifyInvalidDateErrorMsg, verifyInvalidPhoneError, verifyAfterHoursMsg, verifyProductNotAvailableMsg, clickPreAppPageContinueBtn, fillPreApplicationFormPage, answerYesOnPreAppQues, verifyPolicyPurchaseOnReplacePolicyQues, verifyScrollingToErrorMsg, navigateBackToQuotePage } from '../PageTests/PreApplicationPageTest';
import { verifyNeedsAssessmentPageHeader, navigateToConfirmPremiumPage, verifyCoverageAmountMsg, verifyNoMsgDisplayed, returnTotalValue } from '../PageTests/NeedsAssessmentPageTest';
import { verifyConfirmPremiumPageHeader, verifyTermOptions, verifyCoverageAmountOptions, verifyQuoteValue, navigateToLifeStyleQuestionsPage, getpremiumAmount, getTermLength, getCoverageAmount, getQuoteValueOnChangingTermLength, getQuoteValueOnChangingCoverage, selectTermlength, selectCoverageAmount, getPremiumRateValue } from '../PageTests/ConfirmPremiumPageTest';
import { verifyLifestyleQuestionsPageHeader, navigateToMedicalQuestion1Page, verifyCompanyDeclinedKnockout, verifyRiskyOccupationKnockout, verifyCriminalOffenceKnockout, verifyExtremeSportsKnockout, verifyMarijuanaKnockout, verifyDrugsUse5YKnockout, verifyDrugsUse10YKnockout, verifyOutsideCaKnockout } from '../PageTests/LifestyleQuestionsPageTest';
import { verifyMed1PageHeader, navigateToMedicalQuestion2Page, moveToNextPageSleepApneaYes } from '../PageTests/MedicalQuestionnaire1PageTest';
import { verifyMed2PageHeader, navigateToReviewYourAnswersPage } from '../PageTests/MedicalQuestionnaire2PageTest';
import { verifyReviewPageHeader, clickMakeAnEditButton, navigateToPersonalStatementPage } from '../PageTests/ReviewYourAnswersPageTest';
import { verifyPersonalStatementPageHeader, verifyUserName, verifyKnockoutMsg, navigateToBeneficiryPage, getLastStatementText } from '../PageTests/PersonalStatementPageTest';
import { verifyBenecificaryPageHeader, addBeneficiary, navigateToConfirmIdentityPage, verifyAddedBenDetails, verifyShareErrorMessage, checkWithoutBeneficiryCheckbox, verifyIncorrectDateErrorMessage } from '../PageTests/BeneficiaryPageTest';
import { verifyConfirmIdentityPageHeader, verifyMonthlyPremiumSelected, verifyAnnualPremiumSelected, verifyPassportInputFieldVisible, verifyHealthInputFieldVisible, verifyLicenseInputFieldVisible, verifyInvalidPassportError, verifyInvalidHealthError, verifyInvalidLicenseError, getIdTypeList, navigateToPaymentPageUsingPassportNumber, navigateToPaymentPageUsingHealthNumber, navigateToPaymentPageUsingLicenseNumber } from '../PageTests/ConfirmIdentityPageTest';
import { verifyPaymentPageHeader, verifyAmountDue, verifyPurchasePolicyWithCC, verifyPurchasePolicyWithAch, verifyIconTransitNumberIsVisible, verifyIconRoutingNumberIsVisible, verifyIconAccountNumberIsVisible, enterBillingAddress } from '../PageTests/PaymentPageTest';
import { verifyPolicyInfoColumns, verifyProviderName, verifyEffectiveDate, verifyPolicyNumber, verifyPayment, verifyThankYouMsg } from '../PageTests/CongratulationsPageTest';
import { verifyMyPoliciesPageHeader, verifyPolicySendingOverEmail, verifyPoliciesDetails } from '../PageTests/MyPoliciesPageTest';
import { verifyMyApplicationsPageHeader, resumeLatestLeftApplication, verifyMaxOpenApplicationsCount } from '../PageTests/MyApplicationsPageTest';
import { verifyStep1IsCompleted, verifyStep2IsCompleted, verifyStep4IsInactive, verifyStep5IsInactive, verifyStep6IsInactive, verifyStep7IsInactive } from '../PageTests/ProgressBarTest';
import exp from 'constants';
const { username, password, cookiestext, tagline, date, gender, genderMale, firstname, lastname, houseaddress, phonenumber, income, saving, mortgageBal, debt, quotevalue, feet, inches, weight, marijuana, drinks, drinksKnock, OptionYes, OptionNo, benfirstname, benlastname, bendob, benshare, passportno, healthno, licenseno, cardname, cardnumber, expirydate, cvv, accountholdername, transitnumber, institutionnumber, accountnumber, bankname } = require('../Utils/TestData');

test.describe('CA Term Life TCs', async () => {

    test('BL-T1: Product Term life shall be visible under CA products list.', async ({ page }) => {
        await page.goto('');
        expect(await verifyTLProductIsVisible(page)).toEqual('Term Life');
    });

    test('BL-T2: User shall be redirect to Login page from Quote page in CA Term policy form if user is not logged in blanket application.', async ({ page }) => {
        await page.goto('');
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        expect(await verifyInFormLoginPageHeader(page)).toEqual('In order to continue with the application, please log in or create a Blanket account.');
    });

    test('BL-T3: User shall be redirect to Pre Application page from Quote page in CA Term policy form if user is already logged in blanket application.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        expect(await verifyPreApplicationPageHeader(page)).toEqual('Pre Application');
    });

    test('BL-T4: User shall be able to buy the term life policy successfully.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        const premiumrate_value = await verifyQuoteValue(page);
        await navigateToLifeStyleQuestionsPage(page);
        await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
        await navigateToMedicalQuestion2Page(page, OptionNo);
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await navigateToPersonalStatementPage(page);
        await navigateToBeneficiryPage(page);  
        await addBeneficiary(page, benfirstname, benlastname, bendob, benshare);
        await navigateToConfirmIdentityPage(page);
        await navigateToPaymentPageUsingLicenseNumber(page, licenseno);
        expect(await (verifyAmountDue(page))).toEqual(premiumrate_value.toString()); 
        await verifyPurchasePolicyWithCC(page,cardname, cardnumber, expirydate, cvv);
        expect(await verifyThankYouMsg(page)).toEqual('Thank you for your purchase! Your policy documents will be sent to you by email. You can view your policy  here.');
    });

    test('BL-T5: User shall not be allowed to future date in DOB field.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        const today = new Date();
        const cutoffDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        const formattedDate = cutoffDate.toLocaleDateString('en-US');
        const expectedErrorMessage = `Date of birth must be on or before ${formattedDate}`;
        expect(await verifyInvalidDateError(page, gender, "02/02/2029")).toEqual(expectedErrorMessage);
    });

    test('BL-T7: Application shall throw an error message if user enters invalid phone number.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        expect(await verifyInvalidPhoneError(page, firstname, lastname, houseaddress, "33333")).toEqual('Field format is invalid');
    });

    test('BL-T8: Premium rate shall get update if user changes term length or coverage amount value on confirm premium page.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await page.locator('.estimate-subtitle .font-weight-bold').waitFor();
        const orginal_quoteValue = await page.locator('.estimate-subtitle .font-weight-bold').textContent();
        expect(await getQuoteValueOnChangingTermLength(page, 10)).toBe(orginal_quoteValue);
        expect(await getQuoteValueOnChangingTermLength(page, 15)).not.toBe(orginal_quoteValue);
        expect(await getQuoteValueOnChangingTermLength(page, 20)).not.toBe(orginal_quoteValue);
        expect(await getQuoteValueOnChangingCoverage(page, "$100K")).not.toBe(orginal_quoteValue);
        expect(await getQuoteValueOnChangingCoverage(page, "$500K")).not.toBe(orginal_quoteValue);
        expect(await getQuoteValueOnChangingCoverage(page, "$1M")).not.toBe(orginal_quoteValue);
    });

    test('BL-T9: User shall be redirected to Needs Assessment page after pre application page..', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        expect(await verifyNeedsAssessmentPageHeader(page)).toEqual('How Much Term Insurance Do I Need?');
    });

    test('BL-T10: User shall be knocked out if selects inappropriate answer on Pre Application page.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
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
        expect(await verifyKnockoutMsg(page)).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");
    });

    test('BL-T11: Application shall not allow user with age < 18 or > 70 to purchase a CA term plan', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        const today = new Date();
        const cutoffDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        const formattedDate = cutoffDate.toLocaleDateString('en-US');
        const expectedErrorMessage = `Date of birth must be on or before ${formattedDate}`;
        expect(await verifyInvalidDateError(page, gender, "02/02/2010")).toEqual(expectedErrorMessage);
        const cutoffDate1 = new Date(today.getFullYear() - 70, today.getMonth(), today.getDate());
        const formattedDate1 = cutoffDate1.toLocaleDateString('en-US');
        const expectedErrorMessage1 = `Date of birth must be on or after ${formattedDate1}`;
        expect(await verifyInvalidDateError(page, gender, "02/02/1949")).toEqual(expectedErrorMessage1);
    });

    test('BL-T12: Application shall allow user with age in between 18 & 50 to purchase the policy with any term period and coverage amount upto $1M.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt); 
        expect(await verifyTermOptions(page)).toContainEqual('10', '15', '20');
        expect(await verifyCoverageAmountOptions(page)).toContainEqual('$100K', '$250K', '$400K', '$500K', '$600K', '$750K', '$1M');
    });

    test('BL-T13: Application shall allow user with age above 50 to purchase the policy with coverage amount upto $500k.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, "01/01/1963");
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        expect(await verifyCoverageAmountOptions(page)).toContainEqual('$100K', '$250K', '$400K', '$500K');
    });

    test('BL-T14: Application shall allow user with age in between 66 & 70 to purchase only T10 plan.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, "01/01/1957");
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        expect(await verifyTermOptions(page)).toContainEqual('10');
    });

    test('BL-T15: Application shall allow user with age in between 61 & 65 to purchase T10 & T15 plans.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, "01/01/1961");
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        expect(await verifyTermOptions(page)).toContainEqual('10', '15');
    });

    test('BL-T16: Application shall allow user with age 60 or less to purchase plan with any term length.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, "01/01/1980");
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        expect(await verifyTermOptions(page)).toContainEqual('10', '15', '20');
    });

    test('BL-T18: App shall display a message if recommended coverage amount is more than maximum face amount.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        const total = await returnTotalValue(page, "40000", saving, mortgageBal, debt);
        const message = await verifyCoverageAmountMsg(page);
        expect(message).toEqual('Based on the information provided, your life insurance need appears to be ' + total + ' . You can apply for up to $1,000,000 now.');
    });

    test('BL-T19: App shall not display a message if recommended coverage amount is less than maximum face amount.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, "01/01/1957");
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        expect(await verifyNoMsgDisplayed(page, "50000", saving, mortgageBal, debt)).toBeFalsy();
    });

    test('BL-T23: User name and statements shall be properly displayed on personal statement page.', async ({ page }) => {
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
        expect(await verifyUserName(page)).toEqual('I, ' + firstname + ' ' + lastname + '');
    });

    test('BL-T24: User shall be able to add beneficiaries.', async ({ page }) => {
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
        await addBeneficiary(page, benfirstname, benlastname, bendob, benshare);
        expect(await verifyAddedBenDetails(page)).toContainEqual('Individual', 'Revocable', 'Brother', '100', 'Test', 'Beneficiary', '01/01/2010');
    });
 
    test('BL-T25: Total share of beneficiaries shall not increase by 100%.', async ({ page }) => {
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
        await addBeneficiary(page, benfirstname, benlastname, bendob, benshare);
        await addBeneficiary(page, benfirstname, benlastname, bendob, benshare);
        expect(await verifyShareErrorMessage(page)).toEqual("Total Percentage of Beneficiaries must be 100");
    });
    
    test('BL-T26: User shall be able to proceed without adding beneficiary.', async ({ page }) => {
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
        await navigateToConfirmIdentityPage(page)
        await expect(page.getByText("Congratulations, you're Approved!")).toBeVisible();
    });

    test('BL-T27: Application shall display 3 options to user to confirm the identity on Confirm Identity page.', async ({ page }) => {
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
        await addBeneficiary(page, benfirstname, benlastname, bendob, benshare);
        await navigateToConfirmIdentityPage(page);
        expect(await getIdTypeList(page)).toContainEqual('Passport', 'Provincial health card', "Driver's licence");
    });

    test('BL-T28: Application shall ask passport number from user if user selects the passport option.', async ({ page }) => {
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
        await addBeneficiary(page, benfirstname, benlastname, bendob, benshare);
        await navigateToConfirmIdentityPage(page);
        expect(await verifyPassportInputFieldVisible(page)).toBeTruthy();
    });

    test('BL-T29: Passport number shall have 8 characters including 2 letters in starting and 6 numbers in the end.', async ({ page }) => {
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
        await addBeneficiary(page, benfirstname, benlastname, bendob, benshare);
        await navigateToConfirmIdentityPage(page);
        expect(await verifyInvalidPassportError(page, "a123456b")).toEqual('Invalid passport number. It should begin with two letters and end with six  numbers. Please remove any spaces or special characters (-, *).');
        await page.getByLabel('Passport number', { exact: true }).fill("AB123123");
        expect(page.locator('.v-messages__message')).not.toBeVisible();
    });

    test('BL-T30: Application shall throw an error message if user enters invalid passport number.', async ({ page }) => {
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
        await addBeneficiary(page, benfirstname, benlastname, bendob, benshare);
        await navigateToConfirmIdentityPage(page);
        expect(await verifyInvalidPassportError(page, "a123456b")).toEqual('Invalid passport number. It should begin with two letters and end with six  numbers. Please remove any spaces or special characters (-, *).');
    });

    test('BL-T31: Application shall ask province and DL number from user if user selects the DL option.', async ({ page }) => {
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
        await addBeneficiary(page, benfirstname, benlastname, bendob, benshare);
        await navigateToConfirmIdentityPage(page);
        expect(await verifyLicenseInputFieldVisible(page)).toBeTruthy();
    });

    test('BL-T32: Application shall accept DL number only if entered in proper format.', async ({ page }) => {
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
        expect(await verifyInvalidLicenseError(page, "AAA123")).toEqual("Invalid driver's license format. Please remove any spaces or special characters (-, *).");
        await page.getByLabel("Driver's licence  number", { exact: true }).fill("123456789");
        expect(await page.locator('.v-messages__message')).not.toBeVisible();
    });

    test('BL-T33: Application shall throw an error message if user enters invalid DL number.', async ({ page }) => {
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
        await addBeneficiary(page, benfirstname, benlastname, bendob, benshare);
        await navigateToConfirmIdentityPage(page);
        expect(await verifyInvalidLicenseError(page, "AAA123")).toEqual("Invalid driver's license format. Please remove any spaces or special characters (-, *).");
    });

    test('BL-T34: Application shall ask province and health number from user if user selects the Provincial health card option.', async ({ page }) => {
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
        await addBeneficiary(page, benfirstname, benlastname, bendob, benshare);
        await navigateToConfirmIdentityPage(page);
        expect(await verifyHealthInputFieldVisible(page)).toBeTruthy();
    });

    test('BL-T35: Check payment frequency options displaying to user', async ({ page }) => {
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
        const monthly = await verifyMonthlyPremiumSelected(page);
        await navigateToPaymentPageUsingPassportNumber(page,passportno);
        await verifyPaymentPageHeader(page);
        let amountdue_monthly = await verifyAmountDue(page);
        const  amountdue_monthly_str=amountdue_monthly.toString();
        expect(monthly).toContain(amountdue_monthly_str);
        await page.waitForTimeout(1000);
        await page.locator("//div[@class='v-stepper__items']/div[6]//button").click();
        const Annually = await verifyAnnualPremiumSelected(page);
        await page.getByRole('button', { name: ' Accept and pay '}).click();
        let amountdue_annually = await verifyAmountDue(page);
        const amountdue_annually_str = amountdue_annually.toString();
        expect(Annually).toContain(amountdue_annually_str);
    });

    test('BL-T36: Application shall throw an error message if user enters invalid health card number.', async ({ page }) => {
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
        expect(await verifyInvalidHealthError(page, "123456")).toEqual('Invalid health card format. Please remove any spaces or special characters (-, *).');
    });

    test('BL-T37: User shall able to move forward after entering all valid details on confirm identity page.', async ({ page }) => {
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
        await addBeneficiary(page, benfirstname, benlastname, bendob, benshare);
        await navigateToConfirmIdentityPage(page);
        await navigateToPaymentPageUsingHealthNumber(page, healthno);
        expect(await verifyPaymentPageHeader(page)).toEqual("Payment");
    });
    test('BL-T38: Term plan details shall be displayed properly on confirm identity page.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        const pa_value = await getpremiumAmount(page);
        const tl_value = await getTermLength(page);
        const ca_value = await getCoverageAmount(page); 
        await navigateToLifeStyleQuestionsPage(page);
        await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
        await navigateToMedicalQuestion2Page(page, OptionNo);
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await navigateToPersonalStatementPage(page);
        await navigateToBeneficiryPage(page);
        await checkWithoutBeneficiryCheckbox(page);
        await navigateToConfirmIdentityPage(page);
        const confirm_term1 = await page.locator('.offer-term').textContent();
        const confirm_term = confirm_term1.trim();
        const confirm_coverage = await page.locator('.offer-coverage').textContent();
        const monthly_premium = await page.locator('.offer-monthly-premium').textContent();
        expect(confirm_term).toEqual(tl_value);
        expect(confirm_coverage).toEqual(ca_value);
        expect(monthly_premium).toEqual(pa_value);
    });

    test('BL-T39: User shall have 2 options (CC & ACH) to pay the policy premium on payment page.', async ({ page }) => {
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
        await addBeneficiary(page, benfirstname, benlastname, bendob, benshare);
        await navigateToConfirmIdentityPage(page);
        await navigateToPaymentPageUsingHealthNumber(page, healthno);
        await expect(page.getByRole('radiogroup').filter({ hasText: 'Credit Card' })).toBeVisible();
        await expect(page.getByRole('radiogroup').filter({ hasText: 'Pre-Authorized Debit' })).toBeVisible();
    });

    test('BL-T40: Purchased policy details shall be displayed properly on congratulations screen.', async ({ page }) => {
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
        await page.goto('');
        await navigateToTermLifeByLifeBanner(page);
        expect(await verifyProductPageHeader(page)).toEqual(tagline);
    });

    test('BL-T43: Premium rates should be different for smoker & non smokers users.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        const non_smoker_quote = await verifyQuoteValue(page);
        await page.getByRole('button', { name: ' Back ' }).click();
        await page.getByRole('button', { name: ' Back ' }).click();
        await page.getByRole('button', { name: ' Back to quote ' }).click();
        await navigateToPreApplicationPageAsSmoker(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        expect(await verifyQuoteValue(page)).not.toBe(non_smoker_quote);
    });

    test('BL-T45: My policies menu option shall be visible in menu on desktop browser.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToMyPoliciesPage(page);
        expect(await verifyMyPoliciesPageHeader(page)).toEqual('My Policies');
        
    });
    
    test('BL-T49: App shall display cookie pop-up banner whenever user accesses the application.', async ({ page }) => {
        await page.goto('');
        expect(await verifyCookieBannerIsVisible(page)).toEqual(cookiestext);
    });

    test('BL-T50: App shall display purchased policy details under My policies page.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToMyPoliciesPage(page);
        expect(await verifyPoliciesDetails(page)).toEqual('Provider: Blanket Life underwritten by Humania Assurance Inc.');
    });

    test('BL-T51: User shall have an option to send policy over email.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToMyPoliciesPage(page);
        expect(await verifyPolicySendingOverEmail(page)).toEqual('Success!');
    });

    test('BL-T52: Application shall accept health number only if entered in proper format.', async ({ page }) => {
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
        expect(await verifyInvalidHealthError(page, "123456")).toEqual('Invalid health card format. Please remove any spaces or special characters (-, *).');
        await page.getByLabel('Health number', { exact: true }).fill("123456789");
        expect(page.locator('.v-messages__message')).not.toBeVisible();
    });

    test('BL-T53: After hours message shall be displayed if user access the application in odd hours.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        const CurrentTimeEst = await page.evaluate(() => {
            const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: 'America/New_York', 
            hour: '2-digit',
            hour12: false,
            });
            return formatter.format(new Date());
            });
        if (CurrentTimeEst > 21 || CurrentTimeEst < 9) {
            expect(await verifyAfterHoursMsg(page)).toEqual('After hours');
        }
        else {
            expect(page.getByRole('dialog')).not.toBeVisible();
        }
    });

    test('BL-T55: User shall able to do premium payment successfully.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, genderMale, "01/01/1990");
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await selectTermlength(page, "15");
        const premiumrate_value = await verifyQuoteValue(page);
        await navigateToLifeStyleQuestionsPage(page);
        await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
        await navigateToMedicalQuestion2Page(page, OptionNo);
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await navigateToPersonalStatementPage(page);
        await navigateToBeneficiryPage(page);
        await checkWithoutBeneficiryCheckbox(page);
        await navigateToConfirmIdentityPage(page)
        await navigateToPaymentPageUsingHealthNumber(page, healthno);
        expect(await (verifyAmountDue(page))).toBe(premiumrate_value.toString()); 
        await verifyPurchasePolicyWithAch(page,accountholdername, transitnumber, institutionnumber, accountnumber, bankname);
        expect(await verifyThankYouMsg(page)).toEqual('Thank you for your purchase! Your policy documents will be sent to you by email. You can view your policy  here.');
    });

    test('BL-T86: Application shall valiate the first time user email id through OTP in CA product policy form.', async ({ page }) => {
        await page.goto('');
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        expect(await createAccountInForm(page,"test+qa1@mailnator.com","Test@1")).toEqual("Please enter the 6 digit One time password sent to");
    });

    test('BL-T91: An info icon & helper image for some fields shall be displayed to user on payment screen.', async ({ page }) => {
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
        await navigateToPaymentPageUsingHealthNumber(page, healthno);
        await expect(verifyIconTransitNumberIsVisible(page)).toBeTruthy;
        await page.locator("//div[@class='v-dialog__content v-dialog__content--active']").click();
        await expect(verifyIconTransitNumberIsVisible(page)).toBeTruthy;
        await page.locator("//div[@class='v-dialog__content v-dialog__content--active']").click();
        await expect(verifyIconTransitNumberIsVisible(page)).toBeTruthy;
    });

    test('BL-T103: Application shall display a special statement for Quebec residents on personal statement page if user is filling form in EN.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
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

    test('BL-T107: User shall be allowed to review & modify answers before confirmation page.', async ({ page }) => {
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
        expect(await verifyReviewPageHeader(page)).toEqual("Review Your Answers");
        await clickMakeAnEditButton(page, "Medical1");
        expect(await verifyMed1PageHeader(page)).toEqual("Medical Questionnaire");
    });
    
    test('BL-T109: Application shall display a pop-up message if user selects any province other than AB, ON & QC.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        expect(await verifyProductNotAvailableMsg(page)).toEqual("This product is unavailable in your province at this time. Please contact us for an alternative that meets your needs.");
    });

    test('BL-T112: User shall be able to continue CA term flow where has left off.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await navigateToLifeStyleQuestionsPage(page);
        await goToMyApplicationsPage(page);
        await resumeLatestLeftApplication(page);
        await expect(page.getByText('Choose Units of Measurement')).toBeVisible();
    });

    test('BL-T117: User shall land on Premium quote page of CA term life policy form on clicking Apply now or Get your term life today button.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        expect(await verifyPremiumQuotePageHeader(page)).toEqual("Term Life Insurance Premium Quote");
    });

    test('BL-T118: User information filled on quote page shall be pre filled on pre application page.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await acceptAfterHoursMsg(page);
        await expect(page.locator("[name='dob']")).toHaveValue(date);
        await expect(page.locator("[name='isCanadian0']")).toBeChecked();
        await expect(page.locator("[name='tobaccoFor12Month1']")).toBeChecked();
    });

    test('BL-T119: User shall be directed to Pre application page directly from quote page if user is logged in already.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        expect(await verifyPreApplicationPageHeader(page)).toEqual("Pre Application");
    });

    test('BL-T120: User shall be directed to Sign in/Sign up page from quote page if user is not logged in.', async ({ page }) => {
        await page.goto('');
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        expect(await verifyInFormLoginPageHeader(page)).toEqual("In order to continue with the application, please log in or create a Blanket account.");
        await loginInForm(page,username,password);
        expect(await verifyPreApplicationPageHeader(page)).toEqual("Pre Application");
    });

    test('BL-T122: Application shall show user a warning message if user tries to change the language while filling CA term form.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await navigateToLifeStyleQuestionsPage(page);
        expect(await verifyWarningMsgOnLangChangeInForm(page)).toEqual("Please note that changing the language will reload the page and your information will be lost.");
    });

    test('BL-T123: Application shall block some particular email addresses to register on Blanket website.', async ({ page }) => {
        await page.goto('/pages/register');
        await page.getByLabel('Email', { exact: true }).fill("userone@maildrop.cc");
        await expect(page.getByText('Please enter valid email')).toBeVisible();
        await page.getByLabel('Email', { exact: true }).clear();
        await page.getByLabel('Email', { exact: true }).fill("usertwo@tempmail.com");
        await expect(page.getByText('Please enter valid email')).toBeVisible();
        await page.getByLabel('Email', { exact: true }).clear();
        await page.getByLabel('Email', { exact: true }).fill("userthree@emailtemporal.org");
        await expect(page.getByText('Please enter valid email')).toBeVisible();
        await page.getByLabel('Email', { exact: true }).clear();
        await page.getByLabel('Email', { exact: true }).fill("userfour@fakemailgenerator.com");
        await expect(page.getByText('Please enter valid email')).toBeVisible();
    });

    test('BL-T127: DOB field shall not accept invalid date on quote & beneficiary page.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        expect(await verifyInvalidDateError(page, gender, "13/01/2000")).toEqual("Date of birth is not a valid date");
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
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
        await page.goto('/pages/login');
        await login(page, username, password);
        await logoutFromApplication(page);
        await login(page, username, password);
        expect(await verifyIfNotificationMsgForOpenApplication(page)).toEqual("You have an application in progress, would you like to continue?");
        expect(await verifyMyApplicationsPageHeader(page)).toEqual("My Applications");
    });

    test("BL-T129: Application shall display user's open applications on My application page.", async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToMyApplicationsPage(page);
        const count_apps = await verifyMaxOpenApplicationsCount(page);
        await expect(page.getByText('No data available')).not.toBeVisible();
        expect(await verifyMaxOpenApplicationsCount(page)).toBeLessThanOrEqual(7);
        await page.locator("tbody > tr:first-of-type > td:nth-of-type(5) > button:nth-of-type(2)").click();
        const new_count_apps = count_apps - 1;
        expect(await verifyMaxOpenApplicationsCount(page)).toBe(new_count_apps);
    });

    test("BL-T130: Application shall not display notification message to user if user has no open application", async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, "gagandeep.singla+autouser2@trantorinc.com", "Test@1");
        await expect(page.getByRole('status')).not.toBeVisible();
        await navigateToMyApplicationsPage(page);
        await expect(page.getByText('No data available')).toBeVisible();
    });

    test('BL-T139: Application shall display address options to select from to auto complete address after user enters 3 or more characters in address field.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await acceptAfterHoursMsg(page);
        await page.getByLabel('Address', { exact: true }).pressSequentially("12");
        await expect(page.locator('.address-list')).not.toBeVisible();
        await page.getByLabel('Address', { exact: true }).pressSequentially("3");
        await expect(page.locator('.address-list')).toBeVisible();
    });

    test('BL-T140 User shall be allowed to enter address manually and application shall not validate address on continue button of pre application page.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPageAsSmoker(page, gender, date);  
        await acceptAfterHoursMsg(page);
        await enterAddressManually(page, "Test", "Manual Address", "Dummy Address", "Dummy", "A1A 1A1", phonenumber, OptionNo);
        await clickPreAppPageContinueBtn(page);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await selectTermlength(page, "20");
        await selectCoverageAmount(page, "$100K");
        await navigateToLifeStyleQuestionsPage(page);
        await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
        await navigateToMedicalQuestion2Page(page, OptionNo);
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await navigateToPersonalStatementPage(page);
        await navigateToBeneficiryPage(page);  
        await checkWithoutBeneficiryCheckbox(page);
        await navigateToConfirmIdentityPage(page);
        await navigateToPaymentPageUsingPassportNumber(page,passportno);
        await verifyPurchasePolicyWithCC(page,cardname, cardnumber, expirydate, cvv);
        expect(await verifyThankYouMsg(page)).toEqual('Thank you for your purchase! Your policy documents will be sent to you by email. You can view your policy  here.');
    });

    test('BL-T147: The completed sections shall be checked and uncompleted sections shall be greyed out in CA term policy form progress bar in web view.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await navigateToLifeStyleQuestionsPage(page);
        expect(await verifyStep1IsCompleted(page)).toBeVisible();
        expect(await verifyStep2IsCompleted(page)).toBeVisible();
        expect(await verifyStep4IsInactive(page)).toBeVisible();
        expect(await verifyStep5IsInactive(page)).toBeVisible();
        expect(await verifyStep6IsInactive(page)).toBeVisible();
        expect(await verifyStep7IsInactive(page)).toBeVisible();
    });

    test('BL-T152: User email address shall be pre populated in email field on pre application page of CA term policy form.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await acceptAfterHoursMsg(page);
        await expect(page.locator("[name='emailAddress']")).toHaveValue(username);
    });

    test('BL-T153: User shall be knocked out if selects an inappropriate answer for Sleep Apnea or related medical questions.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await navigateToLifeStyleQuestionsPage(page);
        await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, "8");
        await moveToNextPageSleepApneaYes(page);
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await navigateToPersonalStatementPage(page);
        expect(await navigateToBeneficiryPage(page)).toEqual('Sleep apnea with more than 7 drinks is not allowed');
        expect(await verifyKnockoutMsg(page)).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");
    });
    
    test('BL-T159: Application shall store upto 7 open application on My application page.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToMyApplicationsPage(page);
        expect(await verifyMaxOpenApplicationsCount(page)).toBeLessThanOrEqual(7);
    });

    test('BL-T171: Application shall show the current step name in URL as user proceed with CA term life policy form.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await page.waitForTimeout(2000);
        expect(page.url()).toContain("quote");
        await navigateToPreApplicationPage(page, gender, date);   
        await page.waitForTimeout(2000);  
        expect(page.url()).toContain("pre-application");
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await page.waitForTimeout(2000);
        expect(page.url()).toContain("policy-options");
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await page.waitForTimeout(2000);
        expect(page.url()).toContain("policy-options");
        await navigateToLifeStyleQuestionsPage(page);
        await page.waitForTimeout(2000);
        expect(page.url()).toContain("underwritting");
        await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
        await page.waitForTimeout(2000);
        expect(page.url()).toContain("underwritting");
        await navigateToMedicalQuestion2Page(page, OptionNo);
        await page.waitForTimeout(2000);
        expect(page.url()).toContain("underwritting");
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await page.waitForTimeout(2000);
        expect(page.url()).toContain("underwritting");
        await navigateToPersonalStatementPage(page);
        await page.waitForTimeout(2000);
        expect(page.url()).toContain("personal-statements");
        await navigateToBeneficiryPage(page);
        await page.waitForTimeout(2000);
        expect(page.url()).toContain("beneficiary");
        await checkWithoutBeneficiryCheckbox(page);
        await navigateToConfirmIdentityPage(page);
        await page.waitForTimeout(2000);
        expect(page.url()).toContain("your-policy");
        await navigateToPaymentPageUsingHealthNumber(page, healthno);
        await page.waitForTimeout(2000);
        expect(page.url()).toContain("payment");
    });

    test('BL-T181: User shall be allowed to purchase policy on answering YES to replacement question on Pre Application page.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await verifyPolicyPurchaseOnReplacePolicyQues(page, firstname, lastname, houseaddress, phonenumber);
        await clickPreAppPageContinueBtn(page);
        await navigateToConfirmPremiumPage(page, "1000", saving, mortgageBal, debt);
        await navigateToLifeStyleQuestionsPage(page);
        await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
        await navigateToMedicalQuestion2Page(page, OptionNo);
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await navigateToPersonalStatementPage(page);
        await navigateToBeneficiryPage(page);  
        await checkWithoutBeneficiryCheckbox(page);
        await navigateToConfirmIdentityPage(page);
        await page.locator("//input[@value='annual']/following-sibling::div[1]").click();
        await navigateToPaymentPageUsingPassportNumber(page,passportno);
        await verifyPurchasePolicyWithCC(page,cardname, cardnumber, expirydate, cvv);
        expect(await verifyThankYouMsg(page)).toEqual('Thank you for your purchase! Your policy documents will be sent to you by email. You can view your policy  here.');
    });

    test('BL-T187: User shall be able to fill different billing address on payment screen.', async ({ page }) => {
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
        await navigateToPaymentPageUsingPassportNumber(page,passportno);
        await enterBillingAddress(page, "Test", "User", "15 Filton Rd", "Caledon East", "L7C 1R5");
    });

    test('BL-T193: Premium rate selected on "Get quote" page shall be displayed same on "Confirm premium" page.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        const premiumrate_quotepage = await getQuotePremiumRateValue(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        expect(await getPremiumRateValue(page)).toEqual(premiumrate_quotepage);
    });

    test('BL-T194: User shall not be allowed to change values in gender, DOB & Smoke status questions on pre application page.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await expect(page.getByLabel('Female')).toBeDisabled();
        await expect(page.locator('[name="dob"]')).toBeDisabled();
        await expect(page.getByLabel('Yes').nth(1)).toBeDisabled();
    });

    test('BL-T195: User shall have option to go back to "Get TL Premium Quote" page from pre application page.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        if (await page.getByRole('dialog').isVisible()) {
            await page.getByRole('dialog').getByRole('button', { name: 'Continue' }).click();
        }    
        await navigateBackToQuotePage(page);
        await expect(page.getByText(' Term Life Insurance Premium Quote ')).toBeVisible();
    });

    test('BL-T196: Existing application shall be closed if user goes back to Get quote page from pre application.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await page.waitForTimeout(2000);
        const preapp_url = await page.url();
        await page.getByText(' Initial Info ',{exact: true }).click();
        await page.waitForTimeout(2000);
        await navigateBackToQuotePage(page);
        expect(page.url()).not.toEqual(preapp_url);
    });

});