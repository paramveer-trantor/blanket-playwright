import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
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
import { userData, loginData } from '../Utils/TestData'

test.afterEach('Close the browser', async ({ page }) => {
    await page.close();   
});

test.describe('CA Term Life Test Cases without Login', () => { 

    test.beforeEach('Run flow till TL landing page', async ({ page }) => {
        await page.goto(''); 
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.acceptCookies();
        await dashboardPage.navigateToCATLProduct();

        const landingpage = new TLProductLandingPage(page);
        await landingpage.clickApplyNowBtn();
    }); 

    test('BL-T2: User shall be redirect to Login page from Quote page in CA Term policy form if user is not logged in blanket application.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const loginPageInTLForm = new LoginPageInTLForm(page);
        expect(await loginPageInTLForm.getInFormLoginPageHeder()).toEqual('In order to continue with the application, please log in or create a Blanket account.');
    }); 

    test('BL-T10: App shall throw warning message on selecting NO to residence question', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        expect(await premiumQuotePage.getNonCandianWarningMsg()).toEqual('You must be a Canadian Citizen or permanent resident to be eligible for this coverage'); 
    });

    test('BL-T11: Application shall not allow user with age < 18 or > 70 to purchase a CA term plan', async ({ page }) => {
        const today = new Date();
        const cutoffDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        const formattedDate = cutoffDate.toLocaleDateString(('en-US'), {year:'numeric', month:'2-digit', day:'2-digit'});
        const expectedErrorMessage = `Date of birth must be on or before ${formattedDate}`;
        const cutoffDate1 = new Date(today.getFullYear() - 70, today.getMonth(), today.getDate());
        const formattedDate1 = cutoffDate1.toLocaleDateString(('en-US'), {year:'numeric', month:'2-digit', day:'2-digit'});
        const expectedErrorMessage1 = `Date of birth must be on or after ${formattedDate1}`;

        const premiumQuotePage = new PremiumQuotePage(page);
        expect(await premiumQuotePage.getIncorrectDateErrorMsg(userData.genderFemale, "02/02/2010")).toEqual(expectedErrorMessage);
        expect(await premiumQuotePage.getIncorrectDateErrorMsg(userData.genderMale, "02/02/1949")).toEqual(expectedErrorMessage1);
    });

    test.skip('BL-T86: Application shall valiate the first time user email id through OTP in CA product policy form.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const loginPageInTLForm = new LoginPageInTLForm(page);
        expect(await loginPageInTLForm.createAccount("gagandeep.singla+createaccount1@trantorinc.com","Test@123")).toBe(201);
        expect(await loginPageInTLForm.getOTPSentMsg()).toEqual("Please enter the 6 digit One time password sent to");  
    });

    test('BL-T117: User shall land on Premium quote page of CA term life policy form on clicking Apply now or Get your term life today button.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        expect(await premiumQuotePage.getPremiumQuotePageHeader()).toEqual("Term Life Insurance Premium Quote");
    });

    test('BL-T120: User shall be directed to Sign in/Sign up page from quote page if user is not logged in.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const loginPageInTLForm = new LoginPageInTLForm(page);
        expect(await loginPageInTLForm.getInFormLoginPageHeder()).toEqual("In order to continue with the application, please log in or create a Blanket account.");
        await loginPageInTLForm.loginIntoAccount(loginData.validUser.username, loginData.validUser.password);

        const preApplicationPage = new PreApplicationPage(page);
        expect(await preApplicationPage.getPreApplicationPageHeader()).toEqual('Pre Application');
    });
 
});     

test.describe('CA Term Life Test Cases with Login', () => { 
    
    test.beforeEach('Run flow till TL landing page', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('/pages/login', loginData.validUser.username, loginData.validUser.password);

        const dashboardPage = new DashboardPage(page); 
        await dashboardPage.acceptCookies();
        await dashboardPage.navigateToCATLProduct();

        const landingpage = new TLProductLandingPage(page);
        await landingpage.clickApplyNowBtn();
    }); 
    
    test('BL-T3: User shall be redirect to Pre Application page from Quote page in CA Term policy form if user is already logged in blanket application.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        expect(await preApplicationPage.getPreApplicationPageHeader()).toEqual('Pre Application');
    });

    test('BL-T4: User shall able to purchase policy using CC payment method successfully.', async ({ page }) => {
        test.setTimeout(120000);
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
        const premium_rate_value = await confirmPremiumPage.getQuoteValueWithFee();
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
        await personalStatementPage.clickAgreeBtn();

        const beneficiaryPage = new BeneficiaryPage(page);
        await beneficiaryPage.enterIndividualBeneficiaryDetails(userData.benFirstName, userData.benLastName, userData.benDob, userData.benShare);
        await beneficiaryPage.clickConitnueBtn();  

        const confirmIdentityPage = new ConfirmIdentityPage(page);
        await confirmIdentityPage.goToPaymentPageWithPassport(userData.passportNo);

        const paymentPage = new PaymentPage(page);
        await paymentPage.clickBillingAddressCheckBox();
        expect(await paymentPage.getTotalAmountDue()).toEqual(premium_rate_value);
        await paymentPage.purchasePolicyWithCC(userData.cardName, userData.cardNo, userData.expiryDate, userData.cvv);
        
        const congratulationsPage = new CongratulationsPage(page);
        page.waitForTimeout(3000);
        expect(await congratulationsPage.getThanksMsg()).toEqual('Thank you for your purchase! Your policy documents will be sent to you by email. You can view your policy  here.');
    });

    test('BL-T5: User shall not be allowed to future date in DOB field.', async ({ page }) => {
        const today = new Date();
        const cutoffDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        const formattedDate = cutoffDate.toLocaleDateString(('en-US'), {year:'numeric', month:'2-digit', day:'2-digit'});
        const expectedErrorMessage = `Date of birth must be on or before ${formattedDate}`;
        
        const premiumQuotePage = new PremiumQuotePage(page);
        expect(await premiumQuotePage.getIncorrectDateErrorMsg(userData.genderFemale, "02/02/2029")).toEqual(expectedErrorMessage);
    });
    
    test('BL-T7: Application shall throw an error message if user enters invalid phone number.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.acceptPopWindow();
        expect(await preApplicationPage.getIncorrectPhoneErrorMsg("33333")).toEqual('Field format is invalid');
    });

    test('BL-T8: Premium rate shall get update if user changes term length or coverage amount value on confirm premium page.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(userData.income, userData.saving, userData.mortgageBal, userData.debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        const org_quoteValue = await confirmPremiumPage.getQuoteValue();
        expect(await confirmPremiumPage.getQuoteOnTermSelected(10)).toBe(org_quoteValue);
        expect(await confirmPremiumPage.getQuoteOnTermSelected(15)).not.toBe(org_quoteValue);
        expect(await confirmPremiumPage.getQuoteOnTermSelected(20)).not.toBe(org_quoteValue);
        expect(await confirmPremiumPage.getQuoteOnCoverageAmountSelected("$100K")).not.toBe(org_quoteValue);
        expect(await confirmPremiumPage.getQuoteOnCoverageAmountSelected("$500K")).not.toBe(org_quoteValue);
        expect(await confirmPremiumPage.getQuoteOnCoverageAmountSelected("$1M")).not.toBe(org_quoteValue);
    });

    test('BL-T9: User shall be redirected to Needs Assessment page after pre application page..', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        expect(await needsAssessmentPage.getNeedsAssessmentPageHeader()).toEqual('How Much Term Insurance Do I Need?');
    });
    test('BL-T12: Application shall allow user with age in between 18 & 50 to purchase the policy with any term period and coverage amount upto $1M.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date_18_50, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(userData.income, userData.saving, userData.mortgageBal, userData.debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        expect(await confirmPremiumPage.getTermsOptions()).toContainEqual('10', '15', '20');
        expect(await confirmPremiumPage.getCoverageAmountOptions()).toContainEqual('$100K', '$250K', '$400K', '$500K', '$600K', '$750K', '$1M');
    });

    test('BL-T13: Application shall allow user with age above 50 to purchase the policy with coverage amount upto $500k.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date_50_60, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(userData.income, userData.saving, userData.mortgageBal, userData.debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        expect(await confirmPremiumPage.getTermsOptions()).toContainEqual('10', '15', '20');
        expect(await confirmPremiumPage.getCoverageAmountOptions()).toContainEqual('$100K', '$250K', '$400K', '$500K');
    });

    test('BL-T14: Application shall allow user with age in between 66 & 70 to purchase only T10 plan.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date_66_70, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(userData.income, userData.saving, userData.mortgageBal, userData.debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        expect(await confirmPremiumPage.getTermsOptions()).toContainEqual('10');
        expect(await confirmPremiumPage.getCoverageAmountOptions()).toContainEqual('$100K', '$250K', '$400K', '$500K');
    });

    test('BL-T15: Application shall allow user with age in between 61 & 65 to purchase T10 & T15 plans.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date_61_65, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(userData.income, userData.saving, userData.mortgageBal, userData.debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        expect(await confirmPremiumPage.getTermsOptions()).toContainEqual('10', '15');
        expect(await confirmPremiumPage.getCoverageAmountOptions()).toContainEqual('$100K', '$250K', '$400K', '$500K');
    });

    test('BL-T16: Application shall allow user with age 60 or less to purchase plan with any term length.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn(); 

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(userData.income, userData.saving, userData.mortgageBal, userData.debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        expect(await confirmPremiumPage.getTermsOptions()).toContainEqual('10', '15', '20');
    });

    test('BL-T18: App shall display a message if recommended coverage amount is more than maximum face amount.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome("40000", userData.saving, userData.mortgageBal, userData.debt);
        const total = await needsAssessmentPage.getTotalValue();
        const message = await needsAssessmentPage.getCoverageAmountMoreMessage();
        expect(message).toEqual(`Based on the information provided, your life insurance need appears to be ${total} . You can apply for up to $1,000,000 now.`);
    });

    test('BL-T19: App shall not display a message if recommended coverage amount is less than maximum face amount.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, "01/01/1957", userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome("40000", userData.saving, userData.mortgageBal, userData.debt);
        expect(await needsAssessmentPage.checkIfAnyMessageAppears()).toBeFalsy();
    });

    test('BL-T20: App shall not display a message if recommended coverage amount returns total amount as $0.', async ({ page }) => {
        const today = new Date();
        const cutoffDate = new Date(today.getFullYear() - 70, today.getMonth(), today.getDate());
        const formattedDate = cutoffDate.toLocaleDateString(('en-US'), {year:'numeric', month:'2-digit', day:'2-digit'});

        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, formattedDate , userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome("50000", userData.saving, userData.mortgageBal, userData.debt);
        expect(await needsAssessmentPage.checkIfAnyMessageAppears()).toBeFalsy();
    });

    test('BL-T23: User name and statements shall be properly displayed on personal statement page.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
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
        expect(await personalStatementPage.getUsername()).toEqual(`I, ${userData.firstName} ${userData.lastName}`);
    });

    test('BL-T24: User shall be able to add beneficiaries.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
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
        await personalStatementPage.clickAgreeBtn();

        const beneficiaryPage = new BeneficiaryPage(page);
        await beneficiaryPage.enterIndividualBeneficiaryDetails(userData.benFirstName, userData.benLastName, userData.benDob, userData.benShare);
        expect(await beneficiaryPage.getAddedBenDetails()).toContain('Individual', 'Revocable', 'Brother', '100', 'Beneficiary');
    });

    test('BL-T25: Total share of beneficiaries shall not increase by 100%.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
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
        await personalStatementPage.clickAgreeBtn();

        const beneficiaryPage = new BeneficiaryPage(page);
        await beneficiaryPage.enterIndividualBeneficiaryDetails(userData.benFirstName, userData.benLastName, userData.benDob, userData.benShare);
        await beneficiaryPage.enterLegalBeneficiaryDetails(userData.benFirstName, userData.benLastName, userData.benCompany, userData.benShare);
        expect(await beneficiaryPage.getErrorMessage()).toEqual("Total Percentage of Beneficiaries must be 100");
    });
    
    test('BL-T26: User shall be able to proceed without adding beneficiary.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
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
        await personalStatementPage.clickAgreeBtn();

        const beneficiaryPage = new BeneficiaryPage(page);
        await beneficiaryPage.checkWithoutBenCheckbox();
        await beneficiaryPage.clickConitnueBtn();
        await expect(page.getByText("Congratulations, you're Approved!")).toBeVisible();
    });

    test('BL-T27: Application shall display 3 options to user to confirm the identity on Confirm Identity page.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
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
        await personalStatementPage.clickAgreeBtn();

        const beneficiaryPage = new BeneficiaryPage(page);
        await beneficiaryPage.checkWithoutBenCheckbox();
        await beneficiaryPage.clickConitnueBtn();
        
        const confirmIdentityPage = new ConfirmIdentityPage(page);
        expect(await confirmIdentityPage.getIdTypeList()).toContainEqual('Passport', 'Provincial health card', "Driver's licence");
    });

    test('BL-T28: Application shall ask passport number from user if user selects the passport option.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
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
        await personalStatementPage.clickAgreeBtn();

        const beneficiaryPage = new BeneficiaryPage(page);
        await beneficiaryPage.checkWithoutBenCheckbox();
        await beneficiaryPage.clickConitnueBtn();
        
        const confirmIdentityPage = new ConfirmIdentityPage(page);
        expect(await confirmIdentityPage.checkPassportInputFieldVisible()).toBeTruthy();
        await confirmIdentityPage.enterPassportNumber(userData.passportNo);
        expect(await confirmIdentityPage.checkErrorIsVisible()).toBeFalsy();      
    });

    test('BL-T30: Application shall throw an error message if user enters invalid passport number.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
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
        await personalStatementPage.clickAgreeBtn();

        const beneficiaryPage = new BeneficiaryPage(page);
        await beneficiaryPage.checkWithoutBenCheckbox();
        await beneficiaryPage.clickConitnueBtn();
        
        const confirmIdentityPage = new ConfirmIdentityPage(page);
        await confirmIdentityPage.selectIdentityAsPassport();
        await confirmIdentityPage.enterPassportNumber("a123456b");
        expect(await confirmIdentityPage.getErrorMsg()).toEqual('Invalid passport number. It should begin with two letters and end with six  numbers. Please remove any spaces or special characters (-, *).');
    });

    test('BL-T31: Application shall ask province and DL number from user if user selects the DL option.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
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
        await personalStatementPage.clickAgreeBtn();

        const beneficiaryPage = new BeneficiaryPage(page);
        await beneficiaryPage.checkWithoutBenCheckbox();
        await beneficiaryPage.clickConitnueBtn();
        
        const confirmIdentityPage = new ConfirmIdentityPage(page);
        expect(await confirmIdentityPage.checkLicenseInputFieldVisible()).toBeTruthy();
        await confirmIdentityPage.enterLicenseNumber(userData.licenseNo);
        expect(await confirmIdentityPage.checkErrorIsVisible()).toBeFalsy(); 
    });

    test('BL-T33: Application shall throw an error message if user enters invalid DL number.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
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
        await personalStatementPage.clickAgreeBtn();

        const beneficiaryPage = new BeneficiaryPage(page);
        await beneficiaryPage.checkWithoutBenCheckbox();
        await beneficiaryPage.clickConitnueBtn();
        
        const confirmIdentityPage = new ConfirmIdentityPage(page);
        await confirmIdentityPage.selectIdentityAsDrivingLicense();
        await confirmIdentityPage.enterLicenseNumber("AAA123");
        expect(await confirmIdentityPage.getErrorMsg()).toEqual("Invalid driver's license format. Please remove any spaces or special characters (-, *).");
    });

    test('BL-T34: Application shall ask province and health number from user if user selects the Provincial health card option.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
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
        await personalStatementPage.clickAgreeBtn();

        const beneficiaryPage = new BeneficiaryPage(page);
        await beneficiaryPage.checkWithoutBenCheckbox();
        await beneficiaryPage.clickConitnueBtn();
        
        const confirmIdentityPage = new ConfirmIdentityPage(page);
        expect(await confirmIdentityPage.checkHealthCardInputFieldVisible()).toBeTruthy();
        await confirmIdentityPage.enterHealthCardNumber(userData.healthNo);
        expect(await confirmIdentityPage.checkErrorIsVisible()).toBeFalsy(); 
    });

    test('BL-T35: Check payment frequency options displaying to user', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
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
        await personalStatementPage.clickAgreeBtn();

        const beneficiaryPage = new BeneficiaryPage(page);
        await beneficiaryPage.checkWithoutBenCheckbox();
        await beneficiaryPage.clickConitnueBtn();
        
        const confirmIdentityPage = new ConfirmIdentityPage(page);
        const monthly = await confirmIdentityPage.getMonthlyPremiumWithFeeValue();
        await confirmIdentityPage.goToPaymentPageWithLicense(userData.licenseNo);

        const paymentPage = new PaymentPage(page);
        await paymentPage.getPaymentPageHeader();
        const amountdue_monthly = (await paymentPage.getTotalAmountDue()).toString();
        expect(monthly).toContain(amountdue_monthly);
        await page.waitForTimeout(1000);
        await paymentPage.goBackToConfirmIdentityPage();
        
        await confirmIdentityPage.selectAnnualPremiumOption();
        const Annually = await confirmIdentityPage.getAnnualPremiumWithFeeValue();
        await confirmIdentityPage.clickAcceptandPayBtn();
        await paymentPage.getPaymentPageHeader();
        const amountdue_annually = (await paymentPage.getTotalAmountDue()).toString();
        expect(Annually).toContain(amountdue_annually);
    });

    test('BL-T36: Application shall throw an error message if user enters invalid health card number.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
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
        await personalStatementPage.clickAgreeBtn();

        const beneficiaryPage = new BeneficiaryPage(page);
        await beneficiaryPage.checkWithoutBenCheckbox();
        await beneficiaryPage.clickConitnueBtn();
        
        const confirmIdentityPage = new ConfirmIdentityPage(page);
        await confirmIdentityPage.selectIdentityAsHealthCard();
        await confirmIdentityPage.enterHealthCardNumber("123456");
        expect(await confirmIdentityPage.getErrorMsg()).toEqual('Invalid health card format. Please remove any spaces or special characters (-, *).');
    });
        
    test('BL-T37: User shall able to move forward after entering all valid details on confirm identity page.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
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
        await personalStatementPage.clickAgreeBtn();

        const beneficiaryPage = new BeneficiaryPage(page);
        await beneficiaryPage.checkWithoutBenCheckbox();
        await beneficiaryPage.clickConitnueBtn();
        
        const confirmIdentityPage = new ConfirmIdentityPage(page);
        await confirmIdentityPage.goToPaymentPageWithHealthCard(userData.healthNo);

        const paymentPage = new PaymentPage(page);
        expect(await paymentPage.getPaymentPageHeader()).toEqual("Payment");
    });

    test('BL-T38: Term plan details shall be displayed properly on confirm identity page.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(userData.income, userData.saving, userData.mortgageBal, userData.debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        const pa_value = await confirmPremiumPage.getPremiumValue();
        const tl_value = await confirmPremiumPage.getTermLength();
        const ca_value = await confirmPremiumPage.getCoverageAmountValue();
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
        await personalStatementPage.clickAgreeBtn();

        const beneficiaryPage = new BeneficiaryPage(page);
        await beneficiaryPage.checkWithoutBenCheckbox();
        await beneficiaryPage.clickConitnueBtn();
        
        const confirmIdentityPage = new ConfirmIdentityPage(page);
        const confirm_term = await confirmIdentityPage.getTermOfferValue();
        const confirm_coverage = await confirmIdentityPage.getCoverageOfferValue();
        const monthly_premium = await confirmIdentityPage.getMonthlyPremiumValue();
        expect(confirm_term).toEqual(tl_value);
        expect(confirm_coverage).toEqual(ca_value);
        expect(monthly_premium).toEqual(pa_value);
    });

    test('BL-T39: User shall have 2 options (CC & ACH) to pay the policy premium on payment page.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
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
        await personalStatementPage.clickAgreeBtn();

        const beneficiaryPage = new BeneficiaryPage(page);
        await beneficiaryPage.checkWithoutBenCheckbox();
        await beneficiaryPage.clickConitnueBtn();
        
        const confirmIdentityPage = new ConfirmIdentityPage(page);
        await confirmIdentityPage.goToPaymentPageWithHealthCard(userData.healthNo);

        const paymentPage = new PaymentPage(page);
        expect(await paymentPage.checkCCPaymentOption()).toBeTruthy();
        expect(await paymentPage.checkACHPaymentOption()).toBeTruthy();
    });

    test('BL-T40: Purchased policy details shall be displayed properly on congratulations screen.', async ({ page }) => {
        test.setTimeout(120000);
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
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
        await personalStatementPage.clickAgreeBtn();

        const beneficiaryPage = new BeneficiaryPage(page);
        await beneficiaryPage.checkWithoutBenCheckbox();
        await beneficiaryPage.clickConitnueBtn();
        
        const confirmIdentityPage = new ConfirmIdentityPage(page);
        const totalPremiumDue = await confirmIdentityPage.getMonthlyPremiumWithFeeValue();        
        await confirmIdentityPage.goToPaymentPageWithLicense(userData.licenseNo);

        const paymentPage = new PaymentPage(page);
        await paymentPage.clickBillingAddressCheckBox();
        await paymentPage.purchasePolicyWithCC(userData.cardName, userData.cardNo, userData.expiryDate, userData.cvv);
        
        const congratulationsPage = new CongratulationsPage(page);
        expect(await congratulationsPage.getPolicyInfoHeaders()).toContainEqual(' Provider ' , ' Effective Date ' , ' Payment ' , ' Policy No. ');
        expect(await congratulationsPage.getProviderName()).toEqual('Blanket Life underwritten by Humania Assurance Inc.');
        const todays_date = new Date().toISOString().slice(0, 10);
        expect (await congratulationsPage.getEffectiveDate()).toEqual(todays_date);
        expect(await congratulationsPage.getPaymentValue()).toContain(totalPremiumDue);
    });

    test('BL-T43: Premium rates should be different for smoker & non smokers users.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(userData.income, userData.saving, userData.mortgageBal, userData.debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        const non_smoker_quote = await confirmPremiumPage.getQuoteValue();
        await confirmPremiumPage.clickBackBtn();
        await needsAssessmentPage.clickBackBtn();
        await preApplicationPage.clickBackToQuoteBtn();
        
        await premiumQuotePage.getQuoteValueAsSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();
        
        await preApplicationPage.fillPreApplicationFormPage(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        await needsAssessmentPage.enterGrossIncome(userData.income, userData.saving, userData.mortgageBal, userData.debt);
        await needsAssessmentPage.clickContinueBtn();
        
        const smoker_quote = await confirmPremiumPage.getQuoteValue();
        expect(smoker_quote).not.toBe(non_smoker_quote);
    });

    test('BL-T53: After hours message shall be displayed if user access the application in odd hours.', async ({ page }) => {
        const CurrentTimeEst = await page.evaluate(() => {
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'America/New_York', 
                hour: '2-digit',
                hour12: false,
            });
                return formatter.format(new Date());
        });
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        if (CurrentTimeEst > 21 || CurrentTimeEst < 9) {
            expect(await preApplicationPage.getAfterHoursTitle()).toEqual('After hours');
            expect(await preApplicationPage.getAfterHoursMsg()).toEqual("Should you require assistance during your application, our agents are available between 9:00 AM and 9:00 PM EST.");
        }
        else {
            expect(await preApplicationPage.checkAfterHoursDialogIsVisible()).toBeFalsy();
        }
    });

    test('BL-T55: User shall able to purchase policy using ACH payment method successfully.', async ({ page }) => {
        test.setTimeout(120000);
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueWithMetric(userData.genderFemale, userData.date, userData.centi, userData.weightKG);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(userData.income, userData.saving, userData.mortgageBal, userData.debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.changeTermLength("15");
        const premium_rate_value = await confirmPremiumPage.getQuoteValueWithFee();
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
        await personalStatementPage.clickAgreeBtn();

        const beneficiaryPage = new BeneficiaryPage(page);
        await beneficiaryPage.enterLegalBeneficiaryDetails(userData.benFirstName, userData.benLastName, userData.benCompany, userData.benShare);
        await beneficiaryPage.clickConitnueBtn();
        
        const confirmIdentityPage = new ConfirmIdentityPage(page);
        await confirmIdentityPage.goToPaymentPageWithLicense(userData.licenseNo);

        const paymentPage = new PaymentPage(page);
        await paymentPage.clickBillingAddressCheckBox();
        expect(await paymentPage.getTotalAmountDue()).toEqual(premium_rate_value);
        await paymentPage.purchasePolicyWithACH(userData.accountHolderName, userData.transitNo, userData.institutionNo, userData.accountNo, userData.bankName);

        const congratulationsPage = new CongratulationsPage(page);
        expect(await congratulationsPage.getThanksMsg()).toEqual('Thank you for your purchase! Your policy documents will be sent to you by email. You can view your policy  here.');
    }); 
    
    test('BL-T91: An info icon & helper image for some fields shall be displayed to user on payment screen.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
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
        await personalStatementPage.clickAgreeBtn();

        const beneficiaryPage = new BeneficiaryPage(page);
        await beneficiaryPage.checkWithoutBenCheckbox();
        await beneficiaryPage.clickConitnueBtn();

        const confirmIdentityPage = new ConfirmIdentityPage(page);
        await confirmIdentityPage.goToPaymentPageWithPassport(userData.passportNo);

        const paymentPage = new PaymentPage(page);
        await paymentPage.clickBillingAddressCheckBox();
        await paymentPage.selectACHOption();
        expect(await paymentPage.checkIconTransitNumber()).toBeTruthy;
        expect(await paymentPage.checkIconRoutingNumber()).toBeTruthy;
        expect(await paymentPage.checkIconAccountNumber()).toBeTruthy;
    });

    test('BL-T97: Application shall display a warning message on changing language if user is on term life policy form.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, "01/01/1990", "5", "8", "220");
        await premiumQuotePage.clickContinueBtn();
      
        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.acceptPopWindow();
        await preApplicationPage.selectLanguage("FR");
        expect(await preApplicationPage.getLanguageChangeWarningMsg()).toEqual("Please note that changing the language will reload the page and your information will be lost.");
        await preApplicationPage.clickDialogOkayBtn();
        expect(await premiumQuotePage.checkCurrentLanguageSelected()).toEqual('fr');  
        await premiumQuotePage.selectLanguage("EN");
        await page.waitForTimeout(4000);
        expect(await premiumQuotePage.checkCurrentLanguageSelected()).toEqual('en');  
    });
    
    test('BL-T103: Application shall display a special statement for Quebec residents on personal statement page if user is filling form in EN.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(userData.firstName, userData.lastName, "990-450 Boul Poliquin", userData.phoneNumber, userData.optionNo); 
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
        expect(await personalStatementPage.getQuebecProvinceStatement()).toEqual("Confirm that I completed my insurance application in English and that I chose this language for my insurance policy and any further communications unless otherwise advised.");
    });

    test('BL-T107: User shall be allowed to review & modify answers before confirmation page.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
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
        await reviewYourAnswersPage.clickEditBtn("Medical1")
        expect(await medicalQuestionnaire1Page.getMedicalQuestionsPageHeader()).toEqual("Medical Questionnaire");
    });

    test('BL-T109: Application shall display a pop-up message if user selects any province other than AB, BC, ON & QC.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.acceptPopWindow();
        expect(await preApplicationPage.getProductNotAvailableMsg("Manitoba")).toEqual("This product is unavailable in your province at this time. Please contact us for an alternative that meets your needs.");
        expect(await preApplicationPage.getProductNotAvailableMsg("New Brunswick")).toEqual("This product is unavailable in your province at this time. Please contact us for an alternative that meets your needs.");
        expect(await preApplicationPage.getProductNotAvailableMsg("Newfoundland and Labrador")).toEqual("This product is unavailable in your province at this time. Please contact us for an alternative that meets your needs.");
        expect(await preApplicationPage.getProductNotAvailableMsg("Nova Scotia")).toEqual("This product is unavailable in your province at this time. Please contact us for an alternative that meets your needs.");
        expect(await preApplicationPage.getProductNotAvailableMsg("Prince Edward Island")).toEqual("This product is unavailable in your province at this time. Please contact us for an alternative that meets your needs.");
        expect(await preApplicationPage.getProductNotAvailableMsg("Saskatchewan")).toEqual("This product is unavailable in your province at this time. Please contact us for an alternative that meets your needs.");
    });

    test('BL-T112: User shall be able to continue CA term flow where has left off.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
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

        const dashboardPage = new DashboardPage(page);
        await dashboardPage.goToMyApplicationsPage();

        const myApplicationsPage = new MyApplicationsPage(page);
        await myApplicationsPage.clickEditBtnFirstApplication();
        
        expect(await lifestyleQuestionnairePage.getLifestylePageHeader()).toEqual("Lifestyle Questionnaire")
    });

    test('BL-T118: User information filled on quote page shall be pre filled on pre application page.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
        const input_DOB = await premiumQuotePage.getInputDOBValue();
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.acceptPopWindow();
        expect(await preApplicationPage.verifyDOBHasValue()).toEqual(input_DOB);
        expect(await preApplicationPage.verifyIsCanadianTrue()).toBeTruthy();
        expect(await preApplicationPage.verifyIsNonSmokerTrue()).toBeTruthy(); 
    });

    test('BL-T119: User shall be directed to Pre application page directly from quote page if user is logged in already.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        expect(await preApplicationPage.getPreApplicationPageHeader()).toEqual('Pre Application');
    });

    test('BL-T127: DOB field shall not accept invalid date on quote & beneficiary page.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        expect(await premiumQuotePage.getIncorrectDateErrorMsg(userData.genderFemale, "13/01/2000")).toEqual("Date of birth is not a valid date");
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
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
        await personalStatementPage.clickAgreeBtn();

        const beneficiaryPage = new BeneficiaryPage(page);
        expect(await beneficiaryPage.getIncorrectDateError("13/01/2000")).toEqual("Date of birth is not a valid date");
    });

    test('BL-T139: Application shall display address options to select from to auto complete address after user enters 3 or more characters in address field.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.acceptPopWindow();
        expect(await preApplicationPage.verifyAddressOptionsAreVisible("12")).toBeFalsy();
        expect(await preApplicationPage.verifyAddressOptionsAreVisible("123")).toBeTruthy();
    });

    test('BL-T140: User shall be allowed to enter address manually and application shall not validate address on continue button of pre application page.', async ({ page }) => {
        test.setTimeout(120000);
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueAsSmoker(userData.genderMale, userData.date, "5", "11", userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillformAndEnterAddressManually("Test", "Manual Address", "Dummy Address", "Dummy", "A1A 1A1", userData.phoneNumber, userData.optionNo); 
        await preApplicationPage.clickConitnueBtn();  
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(userData.income, userData.saving, userData.mortgageBal, userData.debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.changeTermLength("20");
        await confirmPremiumPage.changeCoverageAmount("$100K");
        const premium_rate_value = await confirmPremiumPage.getQuoteValueWithFee();
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
        await personalStatementPage.clickAgreeBtn();

        const beneficiaryPage = new BeneficiaryPage(page);
        await beneficiaryPage.checkWithoutBenCheckbox();
        await beneficiaryPage.clickConitnueBtn();

        const confirmIdentityPage = new ConfirmIdentityPage(page);
        await confirmIdentityPage.goToPaymentPageWithPassport(userData.passportNo);

        const paymentPage = new PaymentPage(page);
        await paymentPage.clickBillingAddressCheckBox();
        expect(await paymentPage.getTotalAmountDue()).toEqual(premium_rate_value);
        await paymentPage.purchasePolicyWithCC(userData.cardName, userData.cardNo, userData.expiryDate, userData.cvv);

        const congratulationsPage = new CongratulationsPage(page);
        expect(await congratulationsPage.getThanksMsg()).toEqual('Thank you for your purchase! Your policy documents will be sent to you by email. You can view your policy  here.');    
    });

    test('BL-T147: The completed sections shall be checked and uncompleted sections shall be greyed out in CA term policy form progress bar in web view.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
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

        const progressBar = new ProgressBar(page);
        expect(await progressBar.getCompletedStep1Locator()).toBeTruthy();
        expect(await progressBar.getCompletedStep2Locator()).toBeTruthy();
        expect(await progressBar.getInActiveStep4Locator()).toBeTruthy();
        expect(await progressBar.getInActiveStep5Locator()).toBeTruthy();
        expect(await progressBar.getInActiveStep6Locator()).toBeTruthy();
        expect(await progressBar.getInActiveStep7Locator()).toBeTruthy();
    });

    test('BL-T152: User email address shall be pre populated in email field on pre application page of CA term policy form.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.acceptPopWindow();
        expect(await preApplicationPage.verifyEmailValue()).toEqual(loginData.validUser.username);
    });

    test('BL-T153: User shall not be knocked out if answers drinks question < or = to 7 & selects YES for Sleep Apnea additional question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
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
        await lifestyleQuestionnairePage.answerLifestyleQuestions(userData.optionNo, "7");
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
        await personalStatementPage.clickAgreeBtn();

        await page.waitForTimeout(2000);
        expect(page.url()).toContain("beneficiary");

    });

    test('BL-T171: Application shall show the current step name in URL as user proceed with CA term life policy form.', async ({ page }) => {
        await page.waitForTimeout(2000);
        expect(page.url()).toContain("quote");
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueAsSmoker(userData.genderMale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        await page.waitForTimeout(1000);  
        expect(page.url()).toContain("pre-application");
        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        await page.waitForTimeout(5000);
        expect(page.url()).toContain("policy-options");
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(userData.income, userData.saving, userData.mortgageBal, userData.debt);
        await needsAssessmentPage.clickContinueBtn();

        await page.waitForTimeout(1000);
        expect(page.url()).toContain("policy-options");
        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn();
        
        await page.waitForTimeout(1000);
        expect(page.url()).toContain("underwritting");
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(userData.optionNo, userData.drinks);
        await lifestyleQuestionnairePage.clickContinueBtn();
        
        await page.waitForTimeout(1000);
        expect(page.url()).toContain("underwritting");
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(userData.optionNo);
        await medicalQuestionnaire1Page.clickConitnueBtn();

        await page.waitForTimeout(1000);
        expect(page.url()).toContain("underwritting");
        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2(userData.optionNo);
        await medicalQuestionnaire2Page.clickConitnueBtn();

        await page.waitForTimeout(1000);
        expect(page.url()).toContain("underwritting");
        const reviewYourAnswersPage = new ReviewYourAnswersPage(page);
        await reviewYourAnswersPage.clickConitnueBtn();

        await page.waitForTimeout(1000);
        expect(page.url()).toContain("personal-statements");
        const personalStatementPage = new PersonalStatementPage(page);
        await personalStatementPage.clickCheckboxes();
        await personalStatementPage.clickAgreeBtn();

        await page.waitForTimeout(2000);
        expect(page.url()).toContain("beneficiary");
        const beneficiaryPage = new BeneficiaryPage(page);
        await beneficiaryPage.checkWithoutBenCheckbox();
        await beneficiaryPage.clickConitnueBtn();

        await page.waitForTimeout(2000);
        expect(page.url()).toContain("your-policy");
        const confirmIdentityPage = new ConfirmIdentityPage(page);
        await confirmIdentityPage.goToPaymentPageWithPassport(userData.passportNo);

        await page.waitForTimeout(2000);
        expect(page.url()).toContain("payment");
    });

    test('BL-T181: User shall be allowed to purchase policy on answering YES to replacement question on Pre Application page.', async ({ page }) => {
        test.setTimeout(120000);
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderMale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillUserInfoWithReplacePolicyAsYes(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome("1000", userData.saving, userData.mortgageBal, userData.debt);
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
        await personalStatementPage.clickAgreeBtn();

        const beneficiaryPage = new BeneficiaryPage(page);  
        await beneficiaryPage.checkWithoutBenCheckbox();
        await beneficiaryPage.clickConitnueBtn();

        const confirmIdentityPage = new ConfirmIdentityPage(page);
        await confirmIdentityPage.selectAnnualPremiumOption();
        await confirmIdentityPage.goToPaymentPageWithPassport(userData.passportNo);

        const paymentPage = new PaymentPage(page);
        await paymentPage.clickBillingAddressCheckBox();
        expect(await paymentPage.getPaymentFrequency()).toEqual('Payment Frequency: $ Paid Annually');
        await paymentPage.purchasePolicyWithACH(userData.accountHolderName, userData.transitNo, userData.institutionNo, userData.accountNo, userData.bankName);
        
        const congratulationsPage = new CongratulationsPage(page);
        expect(await congratulationsPage.getThanksMsg()).toEqual('Thank you for your purchase! Your policy documents will be sent to you by email. You can view your policy  here.');    
    });

    test('BL-T187: User shall be able to fill different billing address on payment screen.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
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
        await personalStatementPage.clickAgreeBtn();

        const beneficiaryPage = new BeneficiaryPage(page);
        await beneficiaryPage.checkWithoutBenCheckbox();
        await beneficiaryPage.clickConitnueBtn();

        const confirmIdentityPage = new ConfirmIdentityPage(page);
        await confirmIdentityPage.goToPaymentPageWithPassport(userData.passportNo);

        const paymentPage = new PaymentPage(page);
        expect(await paymentPage.verifyBillingAddressIsEmpty()).toEqual('');
        await paymentPage.enterBillingAddress("Test", "User", "15 Filton Rd", "Caledon East", "L7C 1R5");
        expect(await paymentPage.getPaymentFrequency()).toEqual('Payment Frequency: $ Paid Monthly');
    });

    test('BL-T193: Premium rate selected on "Get quote" page shall be displayed same on "Confirm premium" page.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
        const premiumrate_quotepage = await premiumQuotePage.getQuotePremiumRateValue();
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(userData.income, userData.saving, userData.mortgageBal, userData.debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        expect(await confirmPremiumPage.getQuoteValue()).toEqual(premiumrate_quotepage);
    });

    test('BL-T194: User shall not be allowed to change values in gender , DOB & Smoke status questions on pre application page.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.acceptPopWindow();
        expect( await preApplicationPage.verifyGenderFieldIsDisabled()).toBeTruthy();
        expect( await preApplicationPage.verifyDOBFieldIsDisabled()).toBeTruthy();
        expect( await preApplicationPage.verifySmokerQuestionIsDisabled()).toBeTruthy();
    });

    test('BL-T195: User shall have option to go back to "Get TL Premium Quote" page from pre application page.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.acceptPopWindow();
        await preApplicationPage.clickBackToQuoteBtn();
        expect( await premiumQuotePage.getPremiumQuotePageHeader()).toEqual('Term Life Insurance Premium Quote');
    });

    test('BL-T196: Existing application shall be closed if user goes back to Get quote page from pre application.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo); 
        await preApplicationPage.clickConitnueBtn();
        await page.waitForTimeout(2000);
        const preapp_url = page.url();

        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.clickBackBtn();

        await page.waitForTimeout(2000);
        await preApplicationPage.clickBackToQuoteBtn();
        expect(page.url()).not.toEqual(preapp_url);
    });

    test("BL-T198: Premium rate shall be increased by 1.5 times if user's bmi is in between 32.1 and 35.", async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
        const premiumrate_bmi_less32 = await premiumQuotePage.getNumericPremiumRateValue();
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, "5", "8", "220");
        await page.waitForTimeout(2000);
        const new_premiumrate_bmi_more32 = await premiumQuotePage.getNumericPremiumRateValue();
        const exp_premiumrate_bmi_more32 = premiumrate_bmi_less32 * 1.5;
        expect(new_premiumrate_bmi_more32).toBe(exp_premiumrate_bmi_more32);
        const premiumrate_bmi_more32 = await premiumQuotePage.getQuotePremiumRateValue();
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(userData.income, userData.saving, userData.mortgageBal, userData.debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        expect(await confirmPremiumPage.getQuoteValue()).toEqual(premiumrate_bmi_more32);
    });

    test("BL-T199: Premium rate shall not be increased by 1.5 if user's bmi is 32.", async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, userData.feet, userData.inches, userData.weight);
        const premiumrate_bmi_less32 = await premiumQuotePage.getNumericPremiumRateValue();
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderFemale, userData.date, "5", "7", "204");
        await page.waitForTimeout(2000);
        const new_premiumrate_bmi_32 = await premiumQuotePage.getNumericPremiumRateValue();
        expect(new_premiumrate_bmi_32).toBe(premiumrate_bmi_less32);
        const premiumrate_bmi_32 = await premiumQuotePage.getQuotePremiumRateValue();
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo); 
        await preApplicationPage.clickConitnueBtn();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(userData.income, userData.saving, userData.mortgageBal, userData.debt);
        await needsAssessmentPage.clickContinueBtn();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        expect(await confirmPremiumPage.getQuoteValue()).toEqual(premiumrate_bmi_32);
    });
 
}); 
    test("BL-T238: Application shall fetch info like DOB, height, weight & address from user profile and pre populate in CA TL form." , async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('/pages/login', "gagandeep.singla+qa_filled@trantorinc.com", "Test@123");

        const dashboardPage = new DashboardPage(page); 
        await dashboardPage.navigateToCATLProduct();

        const landingpage = new TLProductLandingPage(page);
        await landingpage.clickApplyNowBtn();
        
        const premiumQuotePage = new PremiumQuotePage(page);
        expect(await premiumQuotePage.verifyDOBFieldValue()).toEqual("01/10/2000");
        expect(await premiumQuotePage.verifyHeightFieldValue()).toEqual("6.1");
        expect(await premiumQuotePage.verifyWeightFieldValue()).toEqual("190");
        await premiumQuotePage.navigateToPreAppPageWithPreFilledValues();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.acceptPopWindow();
        expect(await preApplicationPage.verifyDOBHasValue()).toEqual("01/10/2000");
        expect(await preApplicationPage.verifyAddressValue()).toEqual("Test Address");
        expect(await preApplicationPage.verifyCityValue()).toEqual("Test City");
        expect(await preApplicationPage.verifyProvinceValue()).toEqual("Ontario");
    }); 