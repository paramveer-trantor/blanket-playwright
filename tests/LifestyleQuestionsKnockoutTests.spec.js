import { json } from 'stream/consumers';
import { runInContext } from 'vm';
import { POManager } from '../PageObjects/POManager';
import { test, expect, request } from '@playwright/test';
import { login } from '../PageTests/LoginPageTest';
import { logoutFromApplication, goToMyApplicationsPage, verifyWarningMsgOnLangChangeInForm, verifyIfNotificationMsgForOpenApplication, verifyTLProductIsVisible, verifyCookieBannerIsVisible, verifyMyPoliciesInMenu, navigateToProductPage, navigateToMyPoliciesPage, navigateToTermLifeByLifeBanner, navigateToMyApplicationsPage } from '../PageTests/DashboardTest';
import { verifyProductPageHeader, navigateToPolicyForm } from '../PageTests/TLProductPageTest';
import { verifyNonCanadianWarning, verifyPremiumQuotePageHeader, navigateToPreApplicationPage, verifyInvalidDateError } from '../PageTests/PremiumQuotePageTest';
import {  verifyInFormLoginPageHeader, createAccountInForm, loginInForm } from '../PageTests/LoginPageInTermLifeFormTest';
import { verifyNonCanadianWarningOnPreAppPage, verifyAddressValidateFailureError, enterAddressManually, acceptAfterHoursMsg, verifyPreApplicationPageHeader, navigateToNeedsAssessmentPage, verifyInvalidDateErrorMsg, verifyInvalidPhoneError, verifyAfterHoursMsg, verifyProductNotAvailableMsg, clickPreAppPageContinueBtn, fillPreApplicationFormPage, answerYesOnPreAppQues, verifyScrollingToErrorMsg } from '../PageTests/PreApplicationPageTest';
import { verifyNeedsAssessmentPageHeader, navigateToConfirmPremiumPage, verifyCoverageAmountMsg, verifyNoMsgDisplayed, returnTotalValue } from '../PageTests/NeedsAssessmentPageTest';
import { verifyConfirmPremiumPageHeader, verifyTermOptions, verifyCoverageAmountOptions, verifyQuoteValue, navigateToLifeStyleQuestionsPage, getpremiumAmount, getTermLength, getCoverageAmount } from '../PageTests/ConfirmPremiumPageTest';
import { verifyLifestyleQuestionsPageHeader, navigateToMedicalQuestion1Page, verifyBMIDeclinedKnockout, verifyCompanyDeclinedKnockout, verifyRiskyOccupationKnockout, verifyCriminalOffenceKnockout, verifyExtremeSportsKnockout, verifyMarijuanaKnockout, verifyDrinksKnockout, verifyDrugsUse5YKnockout, verifyDrugsUse10YKnockout, verifyOutsideCaKnockout } from '../PageTests/LifestyleQuestionsPageTest';
import { verifyMed1PageHeader, navigateToMedicalQuestion2Page, moveToNextPageSleepApneaYes } from '../PageTests/MedicalQuestionnaire1PageTest';
import { verifyMed2PageHeader, navigateToReviewYourAnswersPage } from '../PageTests/MedicalQuestionnaire2PageTest';
import { verifyReviewPageHeader, clickMakeAnEditButton, navigateToPersonalStatementPage } from '../PageTests/ReviewYourAnswersPageTest';
import { verifyPersonalStatementPageHeader, verifyUserName, verifyKnockoutMsg, navigateToBeneficiryPage, getLastStatementText } from '../PageTests/PersonalStatementPageTest';
const { username, password, cookiestext, tagline, date, gender, firstname, lastname, houseaddress, phonenumber, income, saving, mortgageBal, debt, quotevalue, feet, inches, weight, marijuana, drinks, drinksKnock, OptionYes, OptionNo, benfirstname, benlastname, bendob, benshare, passportno, healthno, licenseno, cardname, cardnumber, expirydate, cvv, accountholdername, transitnumber, institutionnumber, accountnumber, bankname } = require('../Utils/TestData');

test.describe('BL-T21: Lifestyle Questions knockout scenarios', async () => {

    test('Verify knockout with BMI > 32 Declined lifestyle question.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await navigateToLifeStyleQuestionsPage(page);
        await verifyBMIDeclinedKnockout(page, "5", "1", "300", drinks) ;
        await navigateToMedicalQuestion2Page(page, OptionNo);
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await navigateToPersonalStatementPage(page);
        expect(await navigateToBeneficiryPage(page)).toContain('BMI > 32 is not allowed');
        expect(await verifyKnockoutMsg(page)).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");
    });
    
    test('Verify knockout with BMI < 17.5 Declined lifestyle question.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await navigateToLifeStyleQuestionsPage(page);
        await verifyBMIDeclinedKnockout(page, "5", "1", "83", drinks) ;
        await navigateToMedicalQuestion2Page(page, OptionNo);
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await navigateToPersonalStatementPage(page);
        expect(await navigateToBeneficiryPage(page)).toContain('BMI < 17.5 is not allowed');
        expect(await verifyKnockoutMsg(page)).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");
    });

    test('Verify knockout with Company Declined lifestyle question.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await navigateToLifeStyleQuestionsPage(page);
        await verifyCompanyDeclinedKnockout(page, feet, inches, weight, drinks) ;
        await navigateToMedicalQuestion2Page(page, OptionNo);
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await navigateToPersonalStatementPage(page);
        expect(await navigateToBeneficiryPage(page)).toEqual('Candidates whose policies have been declined / rescinded are not allowed');
        expect(await verifyKnockoutMsg(page)).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");
    });

    test('Verify knockout with Risky Occupation lifestyle question.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await navigateToLifeStyleQuestionsPage(page);
        await verifyRiskyOccupationKnockout(page, feet, inches, weight, drinks) ;
        await navigateToMedicalQuestion2Page(page, OptionNo);
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await navigateToPersonalStatementPage(page);
        expect(await navigateToBeneficiryPage(page)).toEqual('Candidates with risky occupations are not allowed');
        expect(await verifyKnockoutMsg(page)).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");
    });

    test('Verify knockout with Criminal Offence lifestyle question.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await navigateToLifeStyleQuestionsPage(page);
        await verifyCriminalOffenceKnockout(page, feet, inches, weight, drinks) ;
        await navigateToMedicalQuestion2Page(page, OptionNo);
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await navigateToPersonalStatementPage(page);
        expect(await navigateToBeneficiryPage(page)).toEqual('Candidates with a criminal history are not allowed');
        expect(await verifyKnockoutMsg(page)).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");
    });

    test('Verify knockout with Extreme Sports lifestyle question.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await navigateToLifeStyleQuestionsPage(page);
        await verifyExtremeSportsKnockout(page, feet, inches, weight, drinks) ;
        await navigateToMedicalQuestion2Page(page, OptionNo);
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await navigateToPersonalStatementPage(page);
        expect(await navigateToBeneficiryPage(page)).toEqual('Customers which engage in extreme sports are not allowed');
        expect(await verifyKnockoutMsg(page)).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");
    });

    test('Verify knockout with Marijuana lifestyle question.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await navigateToLifeStyleQuestionsPage(page);
        await verifyMarijuanaKnockout(page, feet, inches, weight, "8", drinks) ;
        await navigateToMedicalQuestion2Page(page, OptionNo);
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await navigateToPersonalStatementPage(page);
        expect(await navigateToBeneficiryPage(page)).toEqual('Candidates who use marijuana 7 or more times a week are not allowed');
        expect(await verifyKnockoutMsg(page)).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");
    });

    test('Verify knockout with Drinks lifestyle question.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await navigateToLifeStyleQuestionsPage(page);
        await verifyDrinksKnockout(page, feet, inches, weight, "16") ;
        await navigateToMedicalQuestion2Page(page, OptionNo);
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await navigateToPersonalStatementPage(page);
        expect(await navigateToBeneficiryPage(page)).toEqual('Candidates which consume alcohol 15 times or more per week are not allowed');
        expect(await verifyKnockoutMsg(page)).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");
    });

    test('Verify knockout with Drugs Use 5Y lifestyle question.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await navigateToLifeStyleQuestionsPage(page);
        await verifyDrugsUse5YKnockout(page, feet, inches, weight, drinks) ;
        await navigateToMedicalQuestion2Page(page, OptionNo);
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await navigateToPersonalStatementPage(page);
        expect(await navigateToBeneficiryPage(page)).toEqual('Use of recreational drugs in the last 5 years is not allowed');
        expect(await verifyKnockoutMsg(page)).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");
    });

    test('Verify knockout with Drugs Use 10Y lifestyle question.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await navigateToLifeStyleQuestionsPage(page);
        await verifyDrugsUse10YKnockout(page, feet, inches, weight, drinks) ;
        await navigateToMedicalQuestion2Page(page, OptionNo);
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await navigateToPersonalStatementPage(page);
        expect(await navigateToBeneficiryPage(page)).toEqual('Candidates with substance history in the last 10 years are not allowed');
        expect(await verifyKnockoutMsg(page)).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");
    });

    test('Verify knockout with Outside CA lifestyle question.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await navigateToLifeStyleQuestionsPage(page);
        await verifyOutsideCaKnockout(page, feet, inches, weight, drinks) ;
        await navigateToMedicalQuestion2Page(page, OptionNo);
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await navigateToPersonalStatementPage(page);
        expect(await navigateToBeneficiryPage(page)).toEqual('You have lived outside for more then 30+ days consecutive');
        expect(await verifyKnockoutMsg(page)).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");
    });

});


