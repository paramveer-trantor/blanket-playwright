import { json } from 'stream/consumers';
import { runInContext } from 'vm';
import { POManager } from '../PageObjects/POManager';
import { test, expect, request } from '@playwright/test';
import { loginIntoApp, loginWithValidUser } from '../PageTests/LoginPageTest';
import { logoutFromApplication, goToMyApplicationsPage, verifyWarningMsgOnLangChangeInForm, verifyIfNotificationMsgForOpenApplication, verifyTLProductIsVisible, verifyCookieBannerIsVisible, verifyMyPoliciesInMenu, navigateToProductPage, navigateToMyPoliciesPage, navigateToTermLifeByLifeBanner, navigateToMyApplicationsPage } from '../PageTests/DashboardTest';
import { verifyProductPageHeader, navigateToPolicyForm } from '../PageTests/TLProductPageTest';
import { verifyNonCanadianWarning, verifyPremiumQuotePageHeader, navigateToPreApplicationPage, verifyInvalidDateError } from '../PageTests/PremiumQuotePageTest';
import {  verifyInFormLoginPageHeader, createAccountInForm, loginInForm } from '../PageTests/LoginPageInTermLifeFormTest';
import { verifyNonCanadianWarningOnPreAppPage, acceptAfterHoursMsg, verifyAddressValidateFailureError, clickPreAppPageContinueBtn, fillPreApplicationFormPage, answerYesOnPreAppQues, verifyPreApplicationPageHeader, verifyAfterHoursMsg, navigateToNeedsAssessmentPage, enterAddressManually, verifyInvalidDateErrorMsg, verifyInvalidPhoneError, verifyProductNotAvailableMsg, verifyScrollingToErrorMsg, verifyKnockoutScenarioCurrentlyAbsentFromWorkQues, verifyKnockoutScenarioPastAbsentFromWorkQues } from '../PageTests/PreApplicationPageTest';
import { verifyNeedsAssessmentPageHeader, navigateToConfirmPremiumPage, verifyCoverageAmountMsg, verifyNoMsgDisplayed, returnTotalValue } from '../PageTests/NeedsAssessmentPageTest';
import { verifyConfirmPremiumPageHeader, verifyTermOptions, verifyCoverageAmountOptions, verifyQuoteValue, navigateToLifeStyleQuestionsPage, getpremiumAmount, getTermLength, getCoverageAmount } from '../PageTests/ConfirmPremiumPageTest';
import { verifyLifestyleQuestionsPageHeader, navigateToMedicalQuestion1Page, verifyBMIDeclinedKnockout, verifyCompanyDeclinedKnockout, verifyRiskyOccupationKnockout, verifyCriminalOffenceKnockout, verifyExtremeSportsKnockout, verifyMarijuanaKnockout, verifyDrinksKnockout, verifyDrugsUse5YKnockout, verifyDrugsUse10YKnockout, verifyOutsideCaKnockout } from '../PageTests/LifestyleQuestionsPageTest';
import { verifyMed1PageHeader, navigateToMedicalQuestion2Page, moveToNextPageSleepApneaYes } from '../PageTests/MedicalQuestionnaire1PageTest';
import { verifyMed2PageHeader, navigateToReviewYourAnswersPage } from '../PageTests/MedicalQuestionnaire2PageTest';
import { verifyReviewPageHeader, clickMakeAnEditButton, navigateToPersonalStatementPage } from '../PageTests/ReviewYourAnswersPageTest';
import { verifyPersonalStatementPageHeader, verifyUserName, verifyKnockoutMsg, navigateToBeneficiryPage, getLastStatementText } from '../PageTests/PersonalStatementPageTest';
const { url, urlLogin, username, password, cookiestext, tagline, date, gender, firstname, lastname, houseaddress, phonenumber, income, saving, mortgageBal, debt, quotevalue, feet, inches, weight, marijuana, drinks, drinksKnock, OptionYes, OptionNo, benfirstname, benlastname, bendob, benshare, passportno, healthno, licenseno, cardname, cardnumber, expirydate, cvv, accountholdername, transitnumber, institutionnumber, accountnumber, bankname } = require('../Utils/TestData');

test.describe('Pre Application page knockout scenarios', async () => {

    test('Verify knockout with currently absent from work question', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await verifyKnockoutScenarioCurrentlyAbsentFromWorkQues(page, firstname, lastname, houseaddress, phonenumber);
        await clickPreAppPageContinueBtn(page);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await navigateToLifeStyleQuestionsPage(page);
        await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
        await navigateToMedicalQuestion2Page(page, OptionNo);
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await navigateToPersonalStatementPage(page);
        expect(await navigateToBeneficiryPage(page)).toContain('Candidates who have been absent from work for more than 14 consecutive days are not allowed');
        expect(await verifyKnockoutMsg(page)).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");
    });

    test('Verify knockout with past absent from work question', async ({ page }) => {
        await loginIntoApp(page, urlLogin, username, password);
        await navigateToProductPage(page);
        await navigateToPolicyForm(page);
        await navigateToPreApplicationPage(page, gender, date);
        await verifyKnockoutScenarioPastAbsentFromWorkQues(page, firstname, lastname, houseaddress, phonenumber);
        await clickPreAppPageContinueBtn(page);
        await navigateToConfirmPremiumPage(page, income, saving, mortgageBal, debt);
        await navigateToLifeStyleQuestionsPage(page);
        await navigateToMedicalQuestion1Page(page, OptionNo, feet, inches, weight, drinks);
        await navigateToMedicalQuestion2Page(page, OptionNo);
        await navigateToReviewYourAnswersPage(page, OptionNo);
        await navigateToPersonalStatementPage(page);
        expect(await navigateToBeneficiryPage(page)).toContain('Candidates who have been absent from work for more than 14 consecutive days in the last 2 years are not allowed');
        expect(await verifyKnockoutMsg(page)).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");
    });













});