import { test, expect, request } from '@playwright/test';
import { loginIntoApp } from '../PageTests/LoginPageTest';
import { verifyProductList, verifyCookieBannerIsVisible, verifyMenuMenu, navigateToProductPage, navigateToTermLifeByLifeBanner } from '../PageTests/DashboardTest';
import { verifyProductPageHeader, navigateToPolicyForm } from '../PageTests/TLProductPageTest';
import { verifyPremiumQuotePageHeader, navigateToPreApplicationPage, verifyInvalidDateError } from '../PageTests/PremiumQuotePageTest';
import { getLoginPageHeader } from '../PageTests/LoginPageInTermLifeFormTest';
import { verifyPreApplicationPageHeader, navigateToNeedsAssessmentPage, verifyInvalidDateErrorMsg, verifyInvalidPhoneError } from '../PageTests/PreApplicationPageTest';
import { verifyNeedsAssessmentPageHeader, navigateToConfirmPremiumPage, verifyCoverageAmountMsg, verifyNoMsgDisplayed, returnTotalValue } from '../PageTests/NeedsAssessmentPageTest';
import { verifyConfirmPremiumPageHeader, verifyTermOptions, verifyCoverageAmountOptions, verifyQuoteValue, navigateToLifeStyleQuestionsPage } from '../PageTests/ConfirmPremiumPageTest';
import { verifyLifestyleQuestionsPageHeader, navigateToMedicalQuestion1Page } from '../PageTests/LifestyleQuestionsPageTest';
import { verifyMed1PageHeader, navigateToMedicalQuestion2Page } from '../PageTests/MedicalQuestionnaire1PageTest';
import { verifyMed2PageHeader, navigateToReviewYourAnswersPage } from '../PageTests/MedicalQuestionnaire2PageTest';
import { verifyReviewPageHeader, navigateToPersonalStatementPage } from '../PageTests/ReviewYourAnswersPageTest';
import { verifyPersonalStatementPageHeader, verifyUserName, verifyKnockoutMsg, navigateToBeneficiryPage } from '../PageTests/PersonalStatementPageTest';
import { verifyBenecificaryPageHeader, addBeneficiary, verifyAddedBenDetails, navigateToConfirmIdentityPage, verifyShareErrorMessage, proceedWithoutBeneficiry } from '../PageTests/BeneficiaryPageTest';
import { verifyConfirmIdentityPageHeader, verifyMonthlyPremiumSelected, verifyAnnualPremiumSelected, verifyPassportInputFieldVisible, verifyHealthInputFieldVisible, verifyLicenseInputFieldVisible, verifyInvalidPassportError, verifyInvalidHealthError, verifyInvalidLicenseError, getIdTypeList, navigateToPaymentPage, navigateToPaymentPageUsingHealthNumber } from '../PageTests/ConfirmIdentityPageTest';
import { verifyPaymentPageHeader, verifyAmountDue, verifyPurchasePolicyWithCC, verifyPurchasePolicyWithAch } from '../PageTests/PaymentPageTest';
import { verifyPolicyInfoColumns, verifyProviderName, verifyEffectiveDate, verifyPolicyNumber, verifyPayment } from '../PageTests/CongratulationsPageTest';
import exp from 'constants';
import { Console } from 'console';
const { url, username, password, tagline, date, gender, firstname, lastname, houseaddress, phonenumber, income, saving, mortgageBal, debt, quotevalue, feet, inches, weight, marijuana, drinks, drinksKnock, OptionYes, OptionNo, benfirstname, benlastname, bendob, benshare, passportno, healthno, cardname, cardnumber, expirydate, cvv, accountholdername, transitnumber, institutionnumber, accountnumber, bankname } = require('../Utils/TestData');

test.describe('App Flow TCs', async () => {

    test('BL-T1: Product Term life shall be visible under CA products list.', async ({ page }) => {
        await loginIntoApp(page, username, password);
        expect(await verifyProductList(page)).toContain("Term Life");
    });

});

test.describe('CA Term Life Flow TCs', async () => {

    test('BL-T2: User shall be redirect to Login page from Quote page in CA Term policy form if user is not logged in blanket application.', async ({ page }) => {
        await page.goto(url);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        expect(await getLoginPageHeader(page)).toContain('In order to continue ');
    });

    test('BL-T3: User shall be redirect to Pre Application page from Quote page in CA Term policy form if user is already logged in blanket application.', async ({ page }) => {
        await loginIntoApp(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        expect(await verifyPreApplicationPageHeader(page)).toBe(' Pre Application ');
    });

    test('BL-T5: User shall not be allowed to future date in DOB field.', async ({ page }) => {
        await loginIntoApp(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        expect(await verifyInvalidDateError(page, gender, "02/02/2029")).toContain('Date of birth must be on or before');
        await navigateToPreApplicationPage(page, gender, date);
        expect(await verifyInvalidDateErrorMsg(page, firstname, lastname, "02/02/2029")).toContain('Date of birth must be on or before');
    });

    test('BL-T7: Application shall throw an error message if user enters invalid phone number.', async ({ page }) => {
        await loginIntoApp(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        expect(await verifyInvalidPhoneError(page, firstname, lastname, houseaddress, "33333")).toContain('Field format is invalid');
    });

    test('BL-T9: User shall be redirected to Needs Assessment page after pre application page..', async ({ page }) => {
        await loginIntoApp(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        expect(await verifyNeedsAssessmentPageHeader(page)).toContain('How Much Term Insurance');
    });

    test('BL-T11: User with age < 18 or > 80 shall not be allowed to buy a CA term plan.', async ({ page }) => {
        await loginIntoApp(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        expect(await verifyInvalidDateError(page, gender, "02/02/2010")).toContain('Date of birth must be on or before');
        await navigateToPreApplicationPage(page, gender, date);
        expect(await verifyInvalidDateErrorMsg(page, firstname, lastname, "02/02/1949")).toContain('Date of birth must be on or after');
    });

    test('BL-T12: User with age between 18 & 50 shall able to buy plan of term period and face amount upto $1M.', async ({ page }) => {
        await loginIntoApp(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        expect(await verifyTermOptions(page)).toContain('10', '20');
        expect(await verifyCoverageAmountOptions(page)).toContain('$1M');
    });

    test('BL-T13: User with age above 50 shall able to buy plan with face amount upto $500k.', async ({ page }) => {
        await loginIntoApp(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, "01/01/1963");
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        expect(await verifyCoverageAmountOptions(page)).not.toContain('$600K', '$750K', '$1M');
    });

    test('BL-T14: User with age in between 66 & 70 shall be allowed to buy only T10 plan.', async ({ page }) => {
        await loginIntoApp(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, "01/01/1957");
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        expect(await verifyTermOptions(page)).not.toContain('15', '20');
    });

    test('BL-T15: User with age in between 61 & 65 shall be allowed to buy only T10 & T15 plans.', async ({ page }) => {
        await loginIntoApp(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, "01/01/1961");
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        expect(await verifyTermOptions(page)).not.toContain('20');
    });

    test('BL-T16: User with age 60 or less shall be allowed to buy any plan.', async ({ page }) => {
        await loginIntoApp(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, "01/01/1980");
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        expect(await verifyTermOptions(page)).toContain('10','15','20');
    });

    test('BL-T18: App shall display a message if recommended coverage amount is more than maximum face amount.', async ({ page }) => {
        await loginIntoApp(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        const total = await returnTotalValue(page, "40000", saving, mortgageBal, debt);
        expect(await verifyCoverageAmountMsg(page, "40000", saving, mortgageBal, debt)).toBe('Based on the information provided, your life insurance need appears to be' + total + '. You can apply for up to $1,000,000 now. ');
    });

    test('BL-T19: App shall not display a message if recommended coverage amount is less than maximum face amount.', async ({ page }) => {
        await loginIntoApp(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, "01/01/1957");
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        expect(await verifyNoMsgDisplayed(page, "50000", saving, mortgageBal, debt)).toBeFalsy();
    });

    test('BL-T23: User name and statements shall be properly displayed on personal statement page.', async ({ page }) => {
        await loginIntoApp(page, username, password);
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
        expect(await verifyUserName(page)).toContain("I, Test");
    });

    test('BL-T24: User shall be able to add beneficiaries.', async ({ page }) => {
        await loginIntoApp(page, username, password);
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
        expect(await verifyAddedBenDetails(page)).toContain('Individual', 'Revocable', 'Brother', '100', 'Test', 'Beneficiary', '01/01/2010');
    });

    test('BL-T25: Total share of beneficiaries shall not increase by 100%.', async ({ page }) => {
        await loginIntoApp(page, username, password);
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
        expect(await verifyShareErrorMessage(page)).toContain("Total Percentage of Beneficiaries must be 100");
    });
    
    test('BL-T26: User shall be able to proceed without adding beneficiary.', async ({ page }) => {
        await loginIntoApp(page, username, password);
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
        await proceedWithoutBeneficiry(page);
        await verifyConfirmIdentityPageHeader(page);
    });

    test('BL-T27: Application shall display 3 options to user to confirm the identity on offer summary screen.', async ({ page }) => {
        await loginIntoApp(page, username, password);
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
        expect(await getIdTypeList(page)).toContain('Passport', 'Provincial health card', "Driver's licence");
    });

    test('BL-T28: Application shall ask passport number from user if user selects the passport option.', async ({ page }) => {
        await loginIntoApp(page, username, password);
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
        await loginIntoApp(page, username, password);
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
        expect(await verifyInvalidPassportError(page, "a123456b")).toContain('Invalid passport number. It should begin with two letters and end with six  numbers. Please remove any spaces or special characters (-, *).');
    });

    test('BL-T31: Application shall ask province and DL number from user if user selects the DL option.', async ({ page }) => {
        await loginIntoApp(page, username, password);
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
        await loginIntoApp(page, username, password);
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
        expect(await verifyInvalidLicenseError(page, "AAA123")).toContain("Invalid driver's license format. Please remove any spaces or special characters (-, *).");
    });

    test('BL-T34: Application shall ask province and health number from user if user selects the Provincial health card option.', async ({ page }) => {
        await loginIntoApp(page, username, password);
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
        await loginIntoApp(page, username, password);
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
        await loginIntoApp(page, username, password);
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
        expect(await verifyInvalidHealthError(page, "123456")).toContain('Invalid health card format. Please remove any spaces or special characters (-, *).');
    });

    test('BL-T37: User shall able to move forward after entering all valid details on confirm identity page.', async ({ page }) => {
        await loginIntoApp(page, username, password);
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
        expect(await verifyPaymentPageHeader(page)).toContain("Payment");
    });

    test('BL-T40: Purchased policy details shall be displayed properly on congratulations screen.', async ({ page }) => {
        await loginIntoApp(page, username, password);
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
        expect(await verifyPolicyInfoColumns(page)).toContain(' Provider ' , ' Effective Date ' , ' Payment ' , ' Policy No. ');
        expect(await verifyProviderName(page)).toContain('Blanket Life underwritten by Humania Assurance Inc.');
        const todays_date = new Date().toISOString().slice(0, 10);
        expect (await verifyEffectiveDate(page)).toContain(todays_date);
        expect(await verifyPayment(page)).toContain(myArray_monthly[3]);
    });

    test('BL-T42: Term life banner shall be visible on home screen.', async ({ page }) => {
        await loginIntoApp(page, username, password);
        await navigateToTermLifeByLifeBanner(page);
        expect(await verifyProductPageHeader(page)).toContain(tagline);
    });

    test('BL-T43: Premium rates should be different for smoker & non smokers users.', async ({ page }) => {
        await loginIntoApp(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        //console.log("Non S R: " + await verifyQuoteValue(page) );
        const non_smoker_quote = await verifyQuoteValue(page);
        //await page.getByText(' Initial Info ').click();  
        await page.getByRole('button', { name: ' Back ' }).click();
        await page.getByRole('button', { name: ' Back ' }).click();
        await page.getByText('Yes', { exact: true }).nth(1).click();
        await page.getByRole('button', { name: ' Continue ' }).click();
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        //console.log("S R: " + await verifyQuoteValue(page) );
        expect(await verifyQuoteValue(page)).not.toBe(non_smoker_quote);
    });

    test('BL-T45: My policies menu option shall be visible in menu on desktop browser.', async ({ page }) => {
        await loginIntoApp(page, username, password);
        expect(await verifyMenuMenu(page)).toContain('My Policies');
    });

    test.only('BL-T49: App shall display cookie pop-up banner whenever user accesses the application.', async ({ page }) => {
        await loginIntoApp(page, username, password);
        expect(await verifyCookieBannerIsVisible(page)).toContain('We value your privacy');
    });
});