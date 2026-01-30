import { test, expect } from '@playwright/test';
import { MobileViewNavigation} from '../PageObjects/MobileViewNavigation';
import { BasePage } from '../PageObjects/BasePage';
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
import { OurTeamPage } from '../PageObjects/OurTeamPage';
import { NewsPage } from '../PageObjects/NewsPage';
import { ContactUsPage } from '../PageObjects/ContactUsPage';
import { userData, loginData } from '../Utils/TestData'

test.describe('[Mobile browser] CA term life', () => {

    test.beforeEach('Login and navigate user to CA Term Life Premium Quote page', async ({ page }) => {
        page.setViewportSize({
            width: 400,
            height: 700,
        });
        const basepage = new BasePage(page);
        await basepage.navigate('');
    });

    test('Term life product shall be visible under products list.', async ({ page }) => {
        const mobileview = new MobileViewNavigation(page);
        await mobileview.acceptCookies();
        expect(await mobileview.getProductsList()).toEqual(" Term Life  Renters  Covered By Blanket Brokerage ");
    });  

    test('Our team page under about us shall be loaded successfully', async ({ page }) => {
        const mobileview = new MobileViewNavigation(page);
        await mobileview.acceptCookies();
        await mobileview.navigateToOurTeamPage();
        
        const teampage = new OurTeamPage(page);
        expect(await teampage.getOurTeamPageHeader()).toEqual('Who We Are and What We’re All About.');

        await mobileview.selectFRLanguage();
        expect(await teampage.getOurTeamPageHeader()).toEqual('Qui nous sommes et ce que nous proposons.');
    });  

    test('News page under about us shall be loaded successfully', async ({ page }) => {
        const mobileview = new MobileViewNavigation(page);
        await mobileview.acceptCookies();
        await mobileview.navigateToNewsPage();

        const newspage = new NewsPage(page);
        expect(await newspage.getNewsPageHeader()).toEqual('Blanket News and Updates');

        await mobileview.selectFRLanguage();
        expect(await newspage.getNewsPageHeader()).toEqual('Nouvelles et mises à jour générales');
    });  

    test('Contact us page shall be loaded successfully', async ({ page }) => {
        const mobileview = new MobileViewNavigation(page);
        await mobileview.acceptCookies();
        await mobileview.navigateToContactUsPage();

        const contactus = new ContactUsPage(page);
        expect(await contactus.getContactPageHeader()).toEqual("Have any questions?  We've got you covered.");

        await mobileview.selectFRLanguage();
        expect(await contactus.getContactPageHeader()).toEqual("Avez-vous des questions?  Nous avons la solution de protection qu’il vous faut.");
    }); 

    test('User shall able to switch between FR & EN languages.', async ({ page }) => {
        const mobileview = new MobileViewNavigation(page);
        await mobileview.acceptCookies();
        
        await mobileview.openMenu();
        const dashboard = new DashboardPage(page);
        await dashboard.changeLanguageToFR();
        expect(await dashboard.getDashboardPageHeader()).toEqual("Toute la protection dont vous avez besoin sous une seule couverture");
        
        await mobileview.openMenu();
        await dashboard.changeLanguageToEN();
        expect(await dashboard.getDashboardPageHeader()).toEqual("All your coverage under one blanket");
    }); 

    test.skip('User shall able to purchase policy using CC payment method successfully.', async ({ page }) => {
        test.setTimeout(120000);

        const loginPage = new LoginPage(page);
        await loginPage.navigate('/pages/login');
        await loginPage.login(loginData.validUser.username, loginData.validUser.password);

        const mobileview = new MobileViewNavigation(page);
        await mobileview.acceptCookies();
        await mobileview.navigateToCATermLifePage();

        const landingpage = new TLProductLandingPage(page);
        await landingpage.clickApplyNowBtn();

        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker(userData.genderMale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage(userData.firstName, "Mobile", userData.houseAddress, userData.phoneNumber, userData.optionNo); 
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

    test.skip('User shall able to purchase policy using CC payment method successfully in FR language.', async ({ page }) => {
        test.setTimeout(120000);
        
        const loginPage = new LoginPage(page);
        await loginPage.navigate('/pages/login');
        await loginPage.login(loginData.validUser.username_Fr, loginData.validUser.password);

        const mobileview = new MobileViewNavigation(page);
        await mobileview.acceptCookies_Fr();
        await mobileview.navigateToCATermLifePage_Fr();

        const landingpage = new TLProductLandingPage(page);
        await landingpage.clickApplyNowBtn_Fr();

        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker_Fr(userData.genderMale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn_Fr();
        
        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage_Fr(userData.firstName, "Mobile", userData.houseAddress, userData.phoneNumber, userData.optionNo);
        await preApplicationPage.clickContinueBtn_Fr();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(userData.income, userData.saving, userData.mortgageBal, userData.debt);
        await needsAssessmentPage.clickContinueBtn_Fr();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn_Fr();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerLifestyleQuestions(userData.optionNo, userData.drinks);
        await lifestyleQuestionnairePage.clickContinueBtn_Fr();
        
        const medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(page);
        await medicalQuestionnaire1Page.answersMedicalQuestionsPage1(userData.optionNo);
        await medicalQuestionnaire1Page.clickContinueBtn_Fr();

        const medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(page);
        await medicalQuestionnaire2Page.answerMedcialQuestionsPage2_Fr(userData.optionNo);
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
        await confirmIdentityPage.goToPaymentPageWithPassport_Fr(userData.passportNo);;

        const paymentPage = new PaymentPage(page);
        await paymentPage.clickBillingAddressCheckBox_Fr();
        await paymentPage.purchasePolicyWithCC_Fr(userData.cardName, userData.cardNo, userData.expiryDate, userData.cvv);
        
        const congratulationsPage = new CongratulationsPage(page);
        expect(await congratulationsPage.getThanksMsg()).toEqual("Nous vous remercions de votre achat! Votre police d'assurance vous seront envoyés par courrier électronique. Vous pouvez consulter votre police  ici.");
    });

});