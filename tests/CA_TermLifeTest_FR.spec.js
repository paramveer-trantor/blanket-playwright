import { test, expect } from '@playwright/test';
import { InterceptorAPIs } from '../Utils/InterceptorAPIs';
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
import { userData, loginData } from '../Utils/TestData'

    test('BL-T1_FR: Product Term life shall be visible under CA products list.', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate('/pages/login');
        await loginPage.login(loginData.validUser.username_Fr, loginData.validUser.password);

        const dashboardPage = new DashboardPage(page);
        expect(await dashboardPage.getTLProductName_Fr()).toEqual('Assurance vie temporaire');
    });  
    
test.describe('CA Term Life Test Cases in FR Language', () => { 
    
    test.beforeEach('Login and navigate user to CA Term Life Premium Quote page', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate('/pages/login');
        await loginPage.login(loginData.validUser.username_Fr, loginData.validUser.password);

        const dashboardPage = new DashboardPage(page); 
        await dashboardPage.navigateToCATLProduct_FR();

        const landingpage = new TLProductLandingPage(page);
        await landingpage.clickApplyNowBtn_Fr();
    }); 

    test('BL-T4_FR: User shall able to purchase policy using CC payment method successfully in FR language.', async ({ page }) => {
        test.setTimeout(120000);
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker_Fr(userData.genderMale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn_Fr();
        
        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage_Fr(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo);
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

    test('BL-T4_FR: User shall able to purchase policy using ACH payment method successfully in FR language.', async ({ page }) => {
        test.setTimeout(120000);
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker_Fr(userData.genderMale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn_Fr();
        
        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage_Fr(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo);
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
        await paymentPage.purchasePolicyWithACH_Fr(userData.accountHolderName, userData.transitNo, userData.institutionNo, userData.accountNo, userData.bankName);
        
        const congratulationsPage = new CongratulationsPage(page);
        expect(await congratulationsPage.getThanksMsg()).toEqual("Nous vous remercions de votre achat! Votre police d'assurance vous seront envoyés par courrier électronique. Vous pouvez consulter votre police  ici.");
    });

    test('BL-T7_FR: Application shall throw an error message if user enters invalid phone number.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker_Fr(userData.genderMale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn_Fr();
        
        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.acceptPopWindow();
        expect(await preApplicationPage.getIncorrectPhoneErrorMsg("33333")).toEqual('Le format du champ est invalide.');
    });

    test('BL-T18_FR: App shall display a message if recommended coverage amount is more than maximum face amount.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker_Fr(userData.genderMale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn_Fr();

        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage_Fr(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo);
        await preApplicationPage.clickContinueBtn_Fr();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome("40000", userData.saving, userData.mortgageBal, userData.debt);
        const total = await needsAssessmentPage.getTotalValue();
        const message = await needsAssessmentPage.getCoverageAmountMoreMessage();
        expect(message).toContain("les informations fournies, votre besoin en assurance vie semble");
    });

    test('BL-T21_FR:Verify knockout with Company Declined lifestyle question.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker_Fr(userData.genderMale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn_Fr();
        
        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage_Fr(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo);
        await preApplicationPage.clickContinueBtn_Fr();
        
        const needsAssessmentPage = new NeedsAssessmentPage(page);
        await needsAssessmentPage.enterGrossIncome(userData.income, userData.saving, userData.mortgageBal, userData.debt);
        await needsAssessmentPage.clickContinueBtn_Fr();

        const confirmPremiumPage = new ConfirmPremiumPage(page);
        await confirmPremiumPage.clickContinueBtn_Fr();
        
        const lifestyleQuestionnairePage = new LifestyleQuestionnairePage(page);
        await lifestyleQuestionnairePage.answerCompanyDeclinedAsYesandRestNo(userData.drinks);
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
        expect(await personalStatementPage.clickAgreeBtn_Fr()).toContain('Candidates whose policies were declined or rescinded are not allowed');
        expect(await personalStatementPage.getKnockoutMsg()).toEqual("Un agent d'assurance vous contactera sous peu.")
    });  

    test('BL-T25_Fr: Total share of beneficiaries shall not increase by 100%.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker_Fr(userData.genderMale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn_Fr();
        
        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage_Fr(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo);
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
        await beneficiaryPage.enterIndividualBeneficiaryDetails_Fr(userData.benFirstName, userData.benLastName, userData.benDob, userData.benShare); 
        await beneficiaryPage.enterLegalBeneficiaryDetails_Fr(userData.benFirstName, userData.benLastName, userData.benCompany, userData.benShare);
        expect(await beneficiaryPage.getErrorMessage()).toEqual("Le pourcentage total des bénéficiaires doit être de 100.");
    });

    test('BL-T30: Application shall throw an error message if user enters invalid passport number.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker_Fr(userData.genderMale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn_Fr();
        
        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage_Fr(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo);
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
        await confirmIdentityPage.selectIdentityAsPassport_Fr();
        await confirmIdentityPage.enterPassportNumber_Fr("a123456b");
        expect(await confirmIdentityPage.getErrorMsg()).toEqual('Numéro de passeport invalide. Il doit commencer par deux lettres et se terminer par six chiffres. Veuillez supprimer tout espace ou caractère spécial (-, *).');
    });

    test('BL-T33_Fr: Application shall throw an error message if user enters invalid DL number.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker_Fr(userData.genderMale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn_Fr();
        
        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage_Fr(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo);
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
        await confirmIdentityPage.selectIdentityAsDrivingLicense_Fr();
        await confirmIdentityPage.enterLicenseNumber_Fr("AAA123");
        expect(await confirmIdentityPage.getErrorMsg()).toEqual("Format de permis de conduire invalide. Veuillez supprimer tout espace ou caractère spécial (-, *).");
    });

    test('BL-T36_Fr: Application shall throw an error message if user enters invalid health card number.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker_Fr(userData.genderMale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn_Fr();
        
        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.fillPreApplicationFormPage_Fr(userData.firstName, userData.lastName, userData.houseAddress, userData.phoneNumber, userData.optionNo);
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
        await confirmIdentityPage.selectIdentityAsHealthCard_Fr();
        await confirmIdentityPage.enterHealthCardNumber_Fr("123456");
        expect(await confirmIdentityPage.getErrorMsg()).toEqual('Format de carte santé invalide. Veuillez supprimer tout espace ou caractère spécial (-, *).');
    });

    test('BL-T53_Fr: After hours message shall be displayed if user access the application in odd hours.', async ({ page }) => {
        const CurrentTimeEst = await page.evaluate(() => {
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'America/New_York', 
                hour: '2-digit',
                hour12: false,
            });
                return formatter.format(new Date());
        });
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker_Fr(userData.genderMale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn_Fr();

        const preApplicationPage = new PreApplicationPage(page);
        if (CurrentTimeEst > 21 || CurrentTimeEst < 9) {
            expect(await preApplicationPage.getAfterHoursTitle()).toEqual('Heures de bureau');
            expect(await preApplicationPage.getAfterHoursMsg()).toEqual("Si vous avez besoin d'aide lors de votre demande d'assurance, nos agents sont disponibles entre 9 h et 21 h (HNE).");
        }
        else {
            expect(await preApplicationPage.checkAfterHoursDialogIsVisible()).toBeFalsy();
        }
    });

    test('BL-T109_Fr: Application shall display a pop-up message if user selects any province other than AB, BC, ON & QC.', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.getQuoteValueNonSmoker_Fr(userData.genderMale, userData.date, userData.feet, userData.inches, userData.weight);
        await premiumQuotePage.clickContinueBtn_Fr();
        
        const preApplicationPage = new PreApplicationPage(page);
        await preApplicationPage.acceptPopWindow_Fr();
        expect(await preApplicationPage.getProductNotAvailableMsg_Fr("Manitoba")).toEqual("Ce produit n'est pas disponible dans votre province pour le moment. Veuillez nous contacter pour une alternative qui répond à vos besoins.");
        expect(await preApplicationPage.getProductNotAvailableMsg_Fr("New Brunswick")).toEqual("Ce produit n'est pas disponible dans votre province pour le moment. Veuillez nous contacter pour une alternative qui répond à vos besoins.");
        expect(await preApplicationPage.getProductNotAvailableMsg_Fr("Newfoundland and Labrador")).toEqual("Ce produit n'est pas disponible dans votre province pour le moment. Veuillez nous contacter pour une alternative qui répond à vos besoins.");
        expect(await preApplicationPage.getProductNotAvailableMsg_Fr("Nova Scotia")).toEqual("Ce produit n'est pas disponible dans votre province pour le moment. Veuillez nous contacter pour une alternative qui répond à vos besoins.");
        expect(await preApplicationPage.getProductNotAvailableMsg_Fr("Prince Edward Island")).toEqual("Ce produit n'est pas disponible dans votre province pour le moment. Veuillez nous contacter pour une alternative qui répond à vos besoins.");
        expect(await preApplicationPage.getProductNotAvailableMsg_Fr("Saskatchewan")).toEqual("Ce produit n'est pas disponible dans votre province pour le moment. Veuillez nous contacter pour une alternative qui répond à vos besoins.");
    });

    test('BL-T186_Fr: Application shall throw an error if CA Term Get Premium Quote API response is not 200 or 201', async ({ page }) => {
        const premiumQuotePage = new PremiumQuotePage(page);
        await premiumQuotePage.fillQuotePage_Fr(userData.genderMale, userData.date, userData.feet, userData.inches, userData.weight);
        const codes = [400, 403, 408, 429, 500, 503, 504];
        let message = "Un problème s'est produit. Veuillez réessayer ou nous contacter pour obtenir de l'aide.";
        for(let i = 0; i < codes.length; i++) {
            const interceptorAPIs = new InterceptorAPIs(page);
            await interceptorAPIs.sendFakeStatusCodeToApiResponse(codes[i]);
            await premiumQuotePage.clickGetQuoteBtn_Fr();  
            expect(await premiumQuotePage.getErrorPopUp()).toEqual(message);  
            await premiumQuotePage.closeErrorPopUp();
        }
    });
    
});   