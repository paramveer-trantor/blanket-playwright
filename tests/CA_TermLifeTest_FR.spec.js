import { test, expect } from '@playwright/test';
import { LoginPage } from '../PageObjects/LoginPage';
import { LoginPageInTLForm } from '../PageObjects/LoginPageInTLForm'
import { DashboardPage } from '../PageObjects/DashboardPage';
import { TLProductLandingPage } from '../PageObjects/TLProductLandingPage';
import { ProgressBar } from '../PageObjects/ProgressBar';
import { PremiumQuotePage } from '../PageObjects/PremiumQuotePage'
import { PreApplicationPage } from '../PageObjects/PreApplicationPage'
import { NeedsAssessmentPage } from '../PageObjects/NeedsAssessmentPage'
import { ConfirmPremiumPage } from '../PageObjects/ConfirmPremiumPage'
import { LifestyleQuestionnairePage } from '../PageObjects/LifestyleQuestionnairePage'
import { MedicalQuestionnaire1Page } from '../PageObjects/MedialQuestionnaire1Page'
import { MedicalQuestionnaire2Page } from '../PageObjects/MedialQuestionnaire2Page'
import { ReviewYourAnswersPage } from '../PageObjects/ReviewYourAnswersPage'
import { PersonalStatementPage } from '../PageObjects/PersonalStatemenPage'
import { BeneficiaryPage } from '../PageObjects/BeneficiaryPage'
import { ConfirmIdentityPage } from '../PageObjects/ConfirmIdentityPage'
import { PaymentPage } from '../PageObjects/PaymentPage'
import { CongratulationsPage } from '../PageObjects/CongratulationsPage'
import { MyApplicationsPage } from '../PageObjects/MyApplicationsPage'
const { username, password, cookiestext, tagline, date, gender, genderMale, firstname, lastname, houseaddress, phonenumber, income, saving, mortgageBal, debt, quotevalue, feet, inches, weight, marijuana, drinks, drinksKnock, OptionYes, OptionNo, benfirstname, benlastname, bendob, benshare, passportno, healthno, licenseno, cardname, cardnumber, expirydate, cvv, accountholdername, transitnumber, institutionnumber, accountnumber, bankname } = require('../Utils/TestData');

test.describe('CA Term Life Test Cases in FR Language', () => { 
    
    test.beforeEach('Run flow till TL landing page', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('/pages/login', username, password);

        const dashboardPage = new DashboardPage(page); 
        await dashboardPage.navigateToCATLProduct_FR();

        const landingpage = new TLProductLandingPage(page);
        await landingpage.clickApplyNowBtn();
    }); 

    test('User shall able to purchase policy using CC payment method successfully in FR language.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker_Fr(genderMale, date, feet, inches, weight);
        await premiumQuotePage.clickContinueBtn_Fr();
        
        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage_Fr(firstname, lastname, houseaddress, phonenumber, OptionNo); 
        await preApplicationPage.clickContinueBtn_Fr();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(income, saving, mortgageBal, debt);
        await needsAssessmentPage.clickContinueBtn_Fr();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn_Fr();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(OptionNo, drinks);
        await lifestyleQuestionnairePage.clickContinueBtn_Fr();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(OptionNo);
        await medicalQuestionnaire1Page.clickContinueBtn_Fr();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2_Fr(OptionNo);
        await medicalQuestionnaire2Page.clickContinueBtn_Fr(); 

        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickContinueBtn_Fr();

        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        await personalStatementPage.clickAgreeBtn_Fr();

        const beneficiaryPage = new BeneficiaryPage(page);
        await beneficiaryPage.checkWithoutBenCheckbox_Fr();
        await beneficiaryPage.clickContinueBtn_Fr();

        const confirmIdentityPage = new ConfirmIdentityPage(page);
        await confirmIdentityPage.goToPaymentPageWithPassport_Fr(passportno);

        const paymentPage = new PaymentPage(page);
        await paymentPage.clickBillingAddressCheckBox_Fr();
        await paymentPage.purchasePolicyWithCC_Fr(cardname, cardnumber, expirydate, cvv);
        
        const congratulationsPage = new CongratulationsPage(page);
        expect(await congratulationsPage.getThanksMsg()).toEqual("Nous vous remercions de votre achat! Votre police d'assurance vous seront envoyés par courrier électronique. Vous pouvez consulter votre police  ici.");
    });




});