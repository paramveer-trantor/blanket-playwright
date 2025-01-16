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
const { username, password, cookiestext, tagline, date, gender, genderMale, firstname, lastname, houseaddress, phonenumber, income, saving, mortgageBal, debt, quotevalue, feet, inches, weight, marijuana, drinks, drinksKnock, OptionYes, OptionNo } = require('../Utils/TestData');

test.afterEach('Close the browser', async ({ page }) => {
    await page.close(); 
});
test.describe('BL-T21: Lifestyle Questions knockout scenarios', async () => {

    test.beforeEach('Run flow till TL landing page', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('/pages/login', username, password);

        const dashboardPage = new DashboardPage(page);
        await dashboardPage.navigateToCATLProduct();

        const landingpage = new TLProductLandingPage(page);
        await landingpage.clickApplyNowBtn();
    }); 
    
    test('Verify knockout with BMI > 35 Declined lifestyle question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, "5", "8", 235);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn(); 
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(OptionNo, drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(OptionNo);
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(OptionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('BMI > 35 is not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");
    });
    
    test('Verify knockout with BMI < 17.5 Declined lifestyle question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, "5", "1", 83);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(OptionNo, drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(OptionNo);
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(OptionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('BMI < 17.5 is not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });

    test('Verify knockout with Company Declined lifestyle question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerCompanyDeclinedAsYesandRestNo(drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(OptionNo);
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(OptionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Candidates whose policies have been declined / rescinded are not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });

    test('Verify knockout with Risky Occupation lifestyle question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerRiskyOccupationAsYesandRestNo(drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(OptionNo);
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(OptionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Candidates with risky occupations are not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });
        
    test('Verify knockout with Criminal Offence lifestyle question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerCriminalOffenceAsYesandRestNo(drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(OptionNo);
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(OptionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Candidates with a criminal history are not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });

    test('Verify knockout with Extreme Sports lifestyle question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerExtremeSportsAsYesandRestNo(drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(OptionNo);
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(OptionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Customers which engage in extreme sports are not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });

    test('Verify knockout with Marijuana lifestyle question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerMarijuanaValueAsHighandRestNo("8",drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(OptionNo);
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(OptionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Candidates who use marijuana 7 or more times a week are not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });

    test('Verify knockout with Drinks lifestyle question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerDrinksValueAsHighandRestNo(drinksKnock);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(OptionNo);
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);  
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(OptionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Candidates which consume alcohol 15 times or more per week are not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });

    test('Verify knockout with Drugs Use 5Y lifestyle question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerDrugsUse5YAsYesandRestNo(drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(OptionNo);
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(OptionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Use of recreational drugs in the last 5 years is not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });

    test('Verify knockout with Drugs Use 10Y lifestyle question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerDrugsUse10YAsYesandRestNo(drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(OptionNo);
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(OptionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Candidates with substance history in the last 10 years are not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });

    test('Verify knockout with Outside CA lifestyle question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerOutsideCaAsYesandRestNo(drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(OptionNo);
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(OptionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('You have lived outside for more then 30+ days consecutive');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });

});

test.describe('BL-T22: Medical Questions knockout scenarios', async () => {

    test.beforeEach('Run flow till TL landing page', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('/pages/login', username, password);

        const dashboardPage = new DashboardPage(page);
        await dashboardPage.navigateToCATLProduct();

        const landingpage = new TLProductLandingPage(page);
        await landingpage.clickApplyNowBtn();
    }); 
    
    test('Verify knockout with Cancer medical page 1 question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(OptionNo, drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answerCancerAsYesandRestNo();
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(OptionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Cancer is not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });

    test('Verify knockout with Heart Attack medical page 1 question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(OptionNo, drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answerHeartAttackAsYesandRestNo();
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(OptionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Heart issues are not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });

    test('Verify knockout with Fibrosis medical page 1 question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(OptionNo, drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answerFibrosisAsYesandRestNo();
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(OptionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Fibrosis is not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });

    test('Verify knockout with Sleep Apnea medical page 1 question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(OptionNo, drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answerSleepApneaAsYesandRestNo();
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(OptionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Sleep Apnea is not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });

    test('BL-T153: User shall be knocked out if selects an inappropriate answer for Sleep Apnea or related medical questions.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(gender, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(OptionNo, "8");
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answerSleepApneaAndAdditionQuesAsYes();
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(OptionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Sleep apnea with more than 7 drinks is not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });

    test('Verify knockout with AIDS HIV medical page 1 question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(OptionNo, drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answerAIDSHIVAsYesandRestNo();
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(OptionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Immunity issues are not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });

    test('Verify knockout with Brain Disorder medical page 1 question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(OptionNo, drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answerBrainDisorderAsYesandRestNo();
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(OptionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Brain disorders are not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });

    test('Verify knockout with Memory Disorder medical page 1 question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(OptionNo, drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answerMemoryDisorderAsYesandRestNo();
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(OptionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Cognitive issues are not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });

    test('Verify knockout with Rheumatoid Arthritis medical page 1 question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(OptionNo, drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answerRheumatoidArthritisAsYesandRestNo();
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(OptionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Musculoskeletal issues are not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });

    test('Verify knockout with Schizophrenia medical page 1 question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(OptionNo, drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answerSchizophreniaAsYesandRestNo();
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(OptionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Psychological issues like schizophrenia are not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });

    test('Verify knockout with Depression medical page 1 question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(OptionNo, drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answerDepressionAsYes();
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(OptionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Time off work due to psychological issues like depression is not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });

    test('Verify knockout with Anxiety medical page 1 question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(OptionNo, drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answerAnxietyAsYes();
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(OptionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Anxiety issues are not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });

    test('Verify knockout with Hepatitis medical page 2 question.', async ({ page }) => {  
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(OptionNo, drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(OptionNo);
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerHepatitisAsYesandRestNo();
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('General health issues are not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });

    test('Verify knockout with Medical Condition 4 W medical page 2 question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(OptionNo, drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(OptionNo);
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedicalCondition4WAsYesandRestNo();
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Injuries/illness leading to extended time off work are not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });

    test('Verify knockout with Mamogram medical page 2 question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(OptionNo, drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(OptionNo);
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMamogramAsYesandRestNo();
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Abnormal mamograms in the last 2 years are not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });

    test('Verify knockout with Medical Followups medical page 2 question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(OptionNo, drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(OptionNo);
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedicalFollowupsAsYesandRestNo();
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Uncompleted follow-ups are not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });

    test('Verify knockout with Last 3 Months Symptoms medical page 2 question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(OptionNo, drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(OptionNo);
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerLast3MonthSymptomsAsYesandRestNo();
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('Unconsulted symptoms are not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });

    test('Verify knockout with 2 or More Parents Diagnosed medical page 2 question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(OptionNo, drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(OptionNo);
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answer2orMoreParentsDiagnosedAsYesandRestNo();
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('2 or more family members diagnosed with these conditions is not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });

    test('Verify knockout with 1 or More Parents Diagnosed medical page 2 question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(OptionNo, drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(OptionNo);
        await medicalQuestionnaire1Page.clickConitnueBtn();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answer1orMoreParentsDiagnosedAsYesandRestNo();
        await medicalQuestionnaire2Page.clickConitnueBtn();

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        expect(await personalStatementPage.clickAgreeBtn()).toContain('1 or more family members diagnosed with these conditions is not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("A licensed insurance agent will contact you shortly. Alternatively, please contact us at 1-833-625-4353 or customerservice@blanket.com");await page.goto('/pages/login');
    });


});


