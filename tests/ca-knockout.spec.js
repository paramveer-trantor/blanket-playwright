import { test, expect } from '@playwright/test';
import { LoginPage } from '../PageObjects/LoginPage';
import { DashboardPage } from '../PageObjects/DashboardPage';
import { TLProductLandingPage } from '../PageObjects/TLProductLandingPage';
import { PremiumQuotePage } from '../PageObjects/PremiumQuotePage'
import { PreApplicationPage } from '../PageObjects/PreApplicationPage'
import { NeedsAssessmentPage } from '../PageObjects/NeedsAssessmentPage'
import { ConfirmPremiumPage } from '../PageObjects/ConfirmPremiumPage'
import { LifestyleQuestionnairePage } from '../PageObjects/LifestyleQuestionnairePage'
import { MedicalQuestionnaire1Page } from '../PageObjects/MedialQuestionnaire1Page'
import { MedicalQuestionnaire2Page } from '../PageObjects/MedialQuestionnaire2Page'
import { ReviewYourAnswersPage } from '../PageObjects/ReviewYourAnswersPage'
import { PersonalStatementPage } from '../PageObjects/PersonalStatemenPage'
import { userData, loginData } from '../Utils/TestData'

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

test.afterEach('Close the browser', async ({ page }) => {
    await page.close(); 
});

test.describe('Pre application page knockout cases', async () => {
    
    test('BL-T10(1): Verify knockout with currently absent from work question', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderMale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillUserInfoWithCurrentlyAbsentFromWorkAsYes(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber);
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(userData.income, userData.saving, userData.mortgageBal, userData.debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
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
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Candidate is currently absent from work for more than 14 days');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

    test('BL-T10(2): Verify knockout with past absent from work question', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillUserInfoWithPastAbsentFromWorkAsYes(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber);
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(userData.income, userData.saving, userData.mortgageBal, userData.debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
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
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Candidates absent for more than 14 days in last 2 years are not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

});

test.describe('BL-T21: Lifestyle page knockout cases', async () => {
    
    test('Verify knockout with BMI > 35 Declined lifestyle question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, "5", "8", "235");
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(userData.income, userData.saving, userData.mortgageBal, userData.debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
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
        expect(await personalStatementPage.clickAgreeBtn()).toContain('>35');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });
    
    test('Verify knockout with BMI < 17.5 Declined lifestyle question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderMale, userData.date, "5", "1", "83");
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(userData.income, userData.saving, userData.mortgageBal, userData.debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
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
        expect(await personalStatementPage.clickAgreeBtn()).toContain('<17.5');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

    test('Verify knockout with Company Declined lifestyle question.', async ({ page }) => {
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerCompanyDeclinedAsYesandRestNo(userData.drinks);
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
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Candidates whose policies were declined or rescinded are not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

    test('Verify knockout with Risky Occupation lifestyle question.', async ({ page }) => {
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerRiskyOccupationAsYesandRestNo(userData.drinks);
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
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Candidates with risky occupations are not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });
        
    test('Verify knockout with Criminal Offence lifestyle question.', async ({ page }) => {
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerCriminalOffenceAsYesandRestNo(userData.drinks);
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
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Candidates with a criminal history are not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

    test('Verify knockout with Extreme Sports lifestyle question.', async ({ page }) => {
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerExtremeSportsAsYesandRestNo(userData.drinks);
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
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Candidates who engage in extreme sports are not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

    test('Verify knockout with Marijuana lifestyle question.', async ({ page }) => {
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerMarijuanaValueAsHighandRestNo(userData.marijuanaKnock,userData.drinks);
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
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Candidates who use marijuana 7+ times a week are not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

    test('Verify knockout with Drinks lifestyle question.', async ({ page }) => {
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerDrinksValueAsHighandRestNo(userData.drinksKnock);
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
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Candidates consuming 15 or more alcoholic drinks per week are not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

    test('Verify knockout with Drugs Use 5Y lifestyle question.', async ({ page }) => {
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerDrugsUse5YAsYesandRestNo(userData.drinks);
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
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Use of recreational drugs in the past 5 years is not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

    test('Verify knockout with Drugs Use 10Y lifestyle question.', async ({ page }) => {
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerDrugsUse10YAsYesandRestNo(userData.drinks);
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
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Substance history in the last 10 years is not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

    test('Verify knockout with Outside CA lifestyle question.', async ({ page }) => {
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerOutsideCaAsYesandRestNo(userData.drinks);
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
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Applicant has resided outside Canada for 30+ consecutive days in past year or plans to');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

});

test.describe('BL-T22: Medical page knockout cases', async () => {
    
    test('Verify knockout with Cancer medical page 1 question.', async ({ page }) => {
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(userData.optionNo, userData.drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answerCancerAsYesandRestNo();
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(userData.optionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Medical concerns: Cancer');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

    test('Verify knockout with Heart Attack medical page 1 question.', async ({ page }) => {
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(userData.optionNo, userData.drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answerHeartAttackAsYesandRestNo();
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(userData.optionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Medical concerns: Heart Disease');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

    test('Verify knockout with Fibrosis medical page 1 question.', async ({ page }) => {
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(userData.optionNo, userData.drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answerFibrosisAsYesandRestNo();
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(userData.optionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Medical concerns: Fibrosis');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

    test('Verify knockout with No for Sleep Apnea additional medical question', async ({ page }) => {
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(userData.optionNo, userData.drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answerSleepApneaAsYesandRestNo();
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(userData.optionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Medical concerns: Unmanaged Sleep Apnea');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

    test('Verify knockout with drink value > 7 & selects Yes for Sleep Apnea additional medical question.', async ({ page }) => {
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(userData.optionNo, userData.drinks_7_P);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answerSleepApneaAndAdditionQuesAsYes();
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(userData.optionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Medical concerns: Sleep Apnea with > 7 drinks');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

    test('Verify knockout with AIDS HIV medical page 1 question.', async ({ page }) => {
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(userData.optionNo, userData.drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answerAIDSHIVAsYesandRestNo();
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(userData.optionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Medical concerns: Autoimmune Conditions');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

    test('Verify knockout with Brain Disorder medical page 1 question.', async ({ page }) => {
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(userData.optionNo, userData.drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answerBrainDisorderAsYesandRestNo();
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(userData.optionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Medical concerns: Brain Disorder');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

    test('Verify knockout with Memory Disorder medical page 1 question.', async ({ page }) => {
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(userData.optionNo, userData.drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answerMemoryDisorderAsYesandRestNo();
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(userData.optionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Medical concerns: Cognitive Impairment');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

    test('Verify knockout with Rheumatoid Arthritis medical page 1 question.', async ({ page }) => {
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(userData.optionNo, userData.drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answerRheumatoidArthritisAsYesandRestNo();
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(userData.optionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Medical concerns: Musculoskeletal Issues');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

    test('Verify knockout with Schizophrenia medical page 1 question.', async ({ page }) => {
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(userData.optionNo, userData.drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answerSchizophreniaAsYesandRestNo();
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(userData.optionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Medical concerns: Schizophrenia');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

    test('Verify knockout with Depression medical page 1 question.', async ({ page }) => {
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(userData.optionNo, userData.drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answerDepressionAsYes();
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(userData.optionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Medical concerns: Depression with time off work');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });
    
    test('Verify knockout with Anxiety medical page 1 question.', async ({ page }) => {
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(userData.optionNo, userData.drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answerAnxietyAsYes();
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(userData.optionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Medical concerns: Anxiety with hospitalization');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

    test('Verify knockout with Hepatitis medical page 2 question.', async ({ page }) => {  
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(userData.optionNo, userData.drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(userData.optionNo);
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerHepatitisAsYesandRestNo();
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Medical concerns: Unspecified general health condition');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

    test('Verify knockout with Medical Condition 4 W medical page 2 question.', async ({ page }) => {
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(userData.optionNo, userData.drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(userData.optionNo);
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedicalCondition4WAsYesandRestNo();
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Medical concerns: Extended treatment in last 12 months');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

    test('Verify knockout with Mamogram medical page 2 question.', async ({ page }) => {
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(userData.optionNo, userData.drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(userData.optionNo);
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMamogramAsYesandRestNo();
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Medical concerns: Abnormal mammograms');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

    test('Verify knockout with Medical Followups medical page 2 question.', async ({ page }) => {
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(userData.optionNo, userData.drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(userData.optionNo);
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedicalFollowupsAsYesandRestNo();
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Medical concerns: Uncompleted follow-ups');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

    test('Verify knockout with Last 3 Months Symptoms medical page 2 question.', async ({ page }) => {
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(userData.optionNo, userData.drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(userData.optionNo);
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerLast3MonthSymptomsAsYesandRestNo();
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Medical concerns: Recent unexplored symptoms');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

    test('Verify knockout with 2 or More Parents Diagnosed medical page 2 question.', async ({ page }) => {
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(userData.optionNo, userData.drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(userData.optionNo);
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answer2orMoreParentsDiagnosedAsYesandRestNo();
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Significant family history of critical illness before age 60');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });

    test('Verify knockout with 1 or More Parents Diagnosed medical page 2 question.', async ({ page }) => {
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
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(userData.optionNo, userData.drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(userData.optionNo);
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answer1orMoreParentsDiagnosedAsYesandRestNo();
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Significant family history of critical illness before age 60');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or service@blanket.com");
    });


});


