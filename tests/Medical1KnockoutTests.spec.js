import { json } from 'stream/consumers';
import { runInContext } from 'vm';
import { POManager } from '../PageObjects/POManager';
import { test, expect, request } from '@playwright/test';
import { loginIntoApp, loginWithValidUser } from '../PageTests/LoginPageTest';
import { logoutFromApplication, goToMyApplicationsPage, verifyWarningMsgOnLangChangeInForm, verifyIfNotificationMsgForOpenApplication, verifyTLProductIsVisible, verifyCookieBannerIsVisible, verifyMyPoliciesInMenu, navigateToProductPage, navigateToMyPoliciesPage, navigateToTermLifeByLifeBanner, navigateToMyApplicationsPage } from '../PageTests/DashboardTest';
import { verifyProductPageHeader, navigateToPolicyForm } from '../PageTests/TLProductPageTest';
import { verifyNonCanadianWarning, verifyPremiumQuotePageHeader, navigateToPreApplicationPage, verifyInvalidDateError } from '../PageTests/PremiumQuotePageTest';
import { verifyInFormLoginPageHeader, createAccountInForm, loginInForm } from '../PageTests/LoginPageInTermLifeFormTest';
import { verifyNonCanadianWarningOnPreAppPage, verifyAddressValidateFailureError, enterAddressManually, acceptAfterHoursMsg, verifyPreApplicationPageHeader, navigateToNeedsAssessmentPage, verifyInvalidDateErrorMsg, verifyInvalidPhoneError, verifyAfterHoursMsg, verifyProductNotAvailableMsg, clickPreAppPageContinueBtn, fillPreApplicationFormPage, answerYesOnPreAppQues, verifyScrollingToErrorMsg } from '../PageTests/PreApplicationPageTest';
import { verifyNeedsAssessmentPageHeader, navigateToConfirmPremiumPage, verifyCoverageAmountMsg, verifyNoMsgDisplayed, returnTotalValue } from '../PageTests/NeedsAssessmentPageTest';
import { verifyConfirmPremiumPageHeader, verifyTermOptions, verifyCoverageAmountOptions, verifyQuoteValue, navigateToLifeStyleQuestionsPage, getpremiumAmount, getTermLength, getCoverageAmount } from '../PageTests/ConfirmPremiumPageTest';
import { verifyLifestyleQuestionsPageHeader, navigateToMedicalQuestion1Page, verifyCompanyDeclinedKnockout, verifyRiskyOccupationKnockout, verifyCriminalOffenceKnockout, verifyExtremeSportsKnockout, verifyMarijuanaKnockout, verifyDrinksKnockout, verifyDrugsUse5YKnockout, verifyDrugsUse10YKnockout, verifyOutsideCaKnockout } from '../PageTests/LifestyleQuestionsPageTest';
import { verifyMed1PageHeader, navigateToMedicalQuestion2Page, moveToNextPageSleepApneaYes, verifyCancerKnockout, verifyHeartAttackKnockout, verifyFibrosisKnockout, verifySleepApneaKnockout, verifyAIDSHIVKnockout, verifyBrainDisorderKnockout, verifyMemoryDisorderKnockout, verifyRheumatoidArthritisKnockout, verifySchizophreniaKnockout, verifyDepressionKnockout, verifyAnxietyKnockout } from '../PageTests/MedicalQuestionnaire1PageTest';
import { verifyMed2PageHeader, navigateToReviewYourAnswersPage } from '../PageTests/MedicalQuestionnaire2PageTest';
import { verifyReviewPageHeader, clickMakeAnEditButton, navigateToPersonalStatementPage } from '../PageTests/ReviewYourAnswersPageTest';
import { verifyPersonalStatementPageHeader, verifyUserName, verifyKnockoutMsg, navigateToBeneficiryPage, getLastStatementText } from '../PageTests/PersonalStatementPageTest';
const { url, urlLogin, username, password, cookiestext, tagline, date, gender, firstname, lastname, houseaddress, phonenumber, income, saving, mortgageBal, debt, quotevalue, feet, inches, weight, marijuana, drinks, drinksKnock, OptionYes, OptionNo, benfirstname, benlastname, bendob, benshare, passportno, healthno, licenseno, cardname, cardnumber, expirydate, cvv, accountholdername, transitnumber, institutionnumber, accountnumber, bankname } = require('../Utils/TestData');


test('Verify knockout with Cancer medical page 1 question.', async ({ page }) => {
    await loginIntoApp(page, urlLogin, username, password);
    await navigateToProductPage(page);
    await navigateToPolicyForm(page);
    await navigateToPreApplicationPage(page, gender, date);
    await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
    await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
    await navigateToLifeStyleQuestionsPage(page);
    await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
    await verifyCancerKnockout(page);
    await navigateToReviewYourAnswersPage(page, OptionNo);
    await navigateToPersonalStatementPage(page);
    expect(await navigateToBeneficiryPage(page)).toEqual('Cancer is not allowed');
    expect(await verifyKnockoutMsg(page)).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");
});

test('Verify knockout with Heart Attack medical page 1 question.', async ({ page }) => {
    await loginIntoApp(page, urlLogin, username, password);
    await navigateToProductPage(page);
    await navigateToPolicyForm(page);
    await navigateToPreApplicationPage(page, gender, date);
    await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
    await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
    await navigateToLifeStyleQuestionsPage(page);
    await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
    await verifyHeartAttackKnockout(page);
    await navigateToReviewYourAnswersPage(page, OptionNo);
    await navigateToPersonalStatementPage(page);
    expect(await navigateToBeneficiryPage(page)).toEqual('Heart issues are not allowed');
    expect(await verifyKnockoutMsg(page)).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");
});

test('Verify knockout with Fibrosis medical page 1 question.', async ({ page }) => {
    await loginIntoApp(page, urlLogin, username, password);
    await navigateToProductPage(page);
    await navigateToPolicyForm(page);
    await navigateToPreApplicationPage(page, gender, date);
    await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
    await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
    await navigateToLifeStyleQuestionsPage(page);
    await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
    await verifyFibrosisKnockout(page);
    await navigateToReviewYourAnswersPage(page, OptionNo);
    await navigateToPersonalStatementPage(page);
    expect(await navigateToBeneficiryPage(page)).toEqual('Fibrosis is not allowed');
    expect(await verifyKnockoutMsg(page)).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");
});

test('Verify knockout with Sleep Apnea medical page 1 question.', async ({ page }) => {
    await loginIntoApp(page, urlLogin, username, password);
    await navigateToProductPage(page);
    await navigateToPolicyForm(page);
    await navigateToPreApplicationPage(page, gender, date);
    await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
    await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
    await navigateToLifeStyleQuestionsPage(page);
    await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
    await verifySleepApneaKnockout(page);
    await navigateToReviewYourAnswersPage(page, OptionNo);
    await navigateToPersonalStatementPage(page);
    expect(await navigateToBeneficiryPage(page)).toEqual('Sleep Apnea is not allowed');
    expect(await verifyKnockoutMsg(page)).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");
});

test('Verify knockout with AIDS HIV medical page 1 question.', async ({ page }) => {
    await loginIntoApp(page, urlLogin, username, password);
    await navigateToProductPage(page);
    await navigateToPolicyForm(page);
    await navigateToPreApplicationPage(page, gender, date);
    await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
    await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
    await navigateToLifeStyleQuestionsPage(page);
    await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
    await verifyAIDSHIVKnockout(page);
    await navigateToReviewYourAnswersPage(page, OptionNo);
    await navigateToPersonalStatementPage(page);
    expect(await navigateToBeneficiryPage(page)).toEqual('Immunity issues are not allowed');
    expect(await verifyKnockoutMsg(page)).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");
});

test('Verify knockout with Brain Disorder medical page 1 question.', async ({ page }) => {
    await loginIntoApp(page, urlLogin, username, password);
    await navigateToProductPage(page);
    await navigateToPolicyForm(page);
    await navigateToPreApplicationPage(page, gender, date);
    await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
    await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
    await navigateToLifeStyleQuestionsPage(page);
    await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
    await verifyBrainDisorderKnockout(page);
    await navigateToReviewYourAnswersPage(page, OptionNo);
    await navigateToPersonalStatementPage(page);
    expect(await navigateToBeneficiryPage(page)).toEqual('Brain disorders are not allowed');
    expect(await verifyKnockoutMsg(page)).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");
});

test('Verify knockout with Memory Disorder medical page 1 question.', async ({ page }) => {
    await loginIntoApp(page, urlLogin, username, password);
    await navigateToProductPage(page);
    await navigateToPolicyForm(page);
    await navigateToPreApplicationPage(page, gender, date);
    await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
    await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
    await navigateToLifeStyleQuestionsPage(page);
    await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
    await verifyMemoryDisorderKnockout(page);
    await navigateToReviewYourAnswersPage(page, OptionNo);
    await navigateToPersonalStatementPage(page);
    expect(await navigateToBeneficiryPage(page)).toEqual('Cognitive issues are not allowed');
    expect(await verifyKnockoutMsg(page)).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");
});

test('Verify knockout with Rheumatoid Arthritis medical page 1 question.', async ({ page }) => {
    await loginIntoApp(page, urlLogin, username, password);
    await navigateToProductPage(page);
    await navigateToPolicyForm(page);
    await navigateToPreApplicationPage(page, gender, date);
    await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
    await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
    await navigateToLifeStyleQuestionsPage(page);
    await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
    await verifyRheumatoidArthritisKnockout(page);
    await navigateToReviewYourAnswersPage(page, OptionNo);
    await navigateToPersonalStatementPage(page);
    expect(await navigateToBeneficiryPage(page)).toEqual('Musculoskeletal issues are not allowed');
    expect(await verifyKnockoutMsg(page)).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");
});

test('Verify knockout with Schizophrenia medical page 1 question.', async ({ page }) => {
    await loginIntoApp(page, urlLogin, username, password);
    await navigateToProductPage(page);
    await navigateToPolicyForm(page);
    await navigateToPreApplicationPage(page, gender, date);
    await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
    await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
    await navigateToLifeStyleQuestionsPage(page);
    await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
    await verifySchizophreniaKnockout(page);
    await navigateToReviewYourAnswersPage(page, OptionNo);
    await navigateToPersonalStatementPage(page);
    expect(await navigateToBeneficiryPage(page)).toEqual('Psychological issues like schizophrenia are not allowed');
    expect(await verifyKnockoutMsg(page)).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");
});

test('Verify knockout with Depression medical page 1 question.', async ({ page }) => {
    await loginIntoApp(page, urlLogin, username, password);
    await navigateToProductPage(page);
    await navigateToPolicyForm(page);
    await navigateToPreApplicationPage(page, gender, date);
    await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
    await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
    await navigateToLifeStyleQuestionsPage(page);
    await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
    await verifyDepressionKnockout(page);
    await navigateToReviewYourAnswersPage(page, OptionNo);
    await navigateToPersonalStatementPage(page);
    expect(await navigateToBeneficiryPage(page)).toEqual('Time off work due to psychological issues like depression is not allowed');
    expect(await verifyKnockoutMsg(page)).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");
});

test('Verify knockout with Anxiety medical page 1 question.', async ({ page }) => {
    await loginIntoApp(page, urlLogin, username, password);
    await navigateToProductPage(page);
    await navigateToPolicyForm(page);
    await navigateToPreApplicationPage(page, gender, date);
    await navigateToNeedsAssessmentPage(page, firstname, lastname, houseaddress, phonenumber, OptionNo);
    await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
    await navigateToLifeStyleQuestionsPage(page);
    await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
    await verifyAnxietyKnockout(page);
    await navigateToReviewYourAnswersPage(page, OptionNo);
    await navigateToPersonalStatementPage(page);
    expect(await navigateToBeneficiryPage(page)).toEqual('Anxiety issues are not allowed');
    expect(await verifyKnockoutMsg(page)).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");
});