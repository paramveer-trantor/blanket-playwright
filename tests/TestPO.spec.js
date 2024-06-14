import { test, expect,request } from '@playwright/test';
import { json } from 'stream/consumers';
import { runInContext } from 'vm';
import { POManager } from '../PageObjects/POManager';
const { username,password,tagline, date, gender, firstname, lastname, houseaddress, phonenumber, income, saving, mortgageBal, debt, quotevalue, feet, inches, weight, marijuana, drinks, drinksKnock, OptionYes, OptionNo, benfirstname, benlastname, bendob, benshare, passportno, cardname, cardnumber, expirydate, cvv, accountholdername, transitnumber, institutionnumber, accountnumber, bankname } =require('../Utils/TestData');

test.describe('Tests as per page', async () => {

    const rejectionerrors = [
        'Candidates who have been absent from work for more than 14 consecutive days are not allowed',
        'You can not buy policy to replace',
        'You have lived outside for more then 30+ days consecutive',
        'Candidates who have been absent from work for more than 14 consecutive days in the last 2 years are not allowed',
        'Candidates with risky occupations are not allowed',
        'Candidates with a criminal history are not allowed',
        'Candidates which consume alcohol 15 times or more per week are not allowed',
        'Candidates with substance history in the last 10 years are not allowed',
        'Customer BMI is 84.4. BMI > 32 is not allowed',
        'Customer height is 127. Height < 135 is not allowed',
        'Candidates whose policies have been declined / rescinded are not allowed',
        'Use of recreational drugs in the last 5 years is not allowed',
        'Candidates who use marijuana 7 or more times a week are not allowed',
        'Customers which engage in extreme sports are not allowed',
        'Cancer is not allowed',
        'Fibrosis is not allowed',
        'Sleep apnea with more than 7 drinks is not allowed',
        'Heart issues are not allowed',
        'Immunity issues are not allowed',
        'Brain disorders are not allowed',
        'Cognitive issues are not allowed',
        'Musculoskeletal issues are not allowed',
        'Psychological issues like schizophrenia are not allowed',
        'General health issues are not allowed',
        'Injuries/illness leading to extended time off work are not allowed',
        'Abnormal mamograms in the last 2 years are not allowed',
        'Uncompleted follow-ups are not allowed',
        'Unconsulted symptoms are not allowed',
        '2 or more family members diagnosed with these conditions is not allowed',
        '1 or more family members diagnosed with these conditions is not allowed'
      ];
    test.beforeEach('Base test', async ({ page }) => {
        const pomanager = new POManager(page);
        const loginpage = pomanager.getLoginPage();
        await loginpage.navigateToURL();
        await loginpage.login(username, password);
        const dashboardpage = pomanager.getDashboardPage();
        await dashboardpage.acceptCookies();
        await dashboardpage.selectCACountry();
        await dashboardpage.navigateToTermLifeCA();
        const termlifeCApage = pomanager.getTermLifeCAPage();
        await termlifeCApage.getHeaderText(tagline);
        await termlifeCApage.clickApplyNowBtn();
    });

    test('E2E Happy Flow', async ({ page }) => {
        const pomanager = new POManager(page); 
        const premiunquotepage = pomanager.getPremiumQuotePage();
        await premiunquotepage.getQuoteValue(gender, date);
        await premiunquotepage.clickContinueBtn();
        const preapplicationpage = pomanager.getPreApplicationPage();
        await preapplicationpage.acceptPopWindow();
        await preapplicationpage.enterUserName(firstname, lastname);
        await preapplicationpage.enterAddress(houseaddress);
        await preapplicationpage.enterPhoneNumber(phonenumber);
        await preapplicationpage.last3Questions(OptionNo);
        await preapplicationpage.clickConitnueBtn();
        const needsassessmentpage = pomanager.getNeedsAssessmentPage();
        await needsassessmentpage.enterGrossIncome(income,saving,mortgageBal,debt);
        await needsassessmentpage.clickContinueBtn();
        const confirmpremiumpage = pomanager.getConfirmPremiumPage();
        await confirmpremiumpage.clickContinueBtn();
        const lifestylequestionnairepage = pomanager.getLifestyleQuestionnairePage();
        await lifestylequestionnairepage.lifestyleQuestions(OptionNo, feet, inches, weight, drinks);
        await lifestylequestionnairepage.clickContinueBtn();
        const medicalquestionnaire1page = pomanager.getMedicalQuestionnaire1Page();
        await medicalquestionnaire1page.medicalQuestionsPage1(OptionNo);
        await medicalquestionnaire1page.clickConitnueBtn();
        const medicalquestionnaire2page = pomanager.getMedicalQuestionnaire2Page();
        await medicalquestionnaire2page.medcialQuestionsPage2(OptionNo);
        await medicalquestionnaire2page.clickConitnueBtn(); 
        const reviewyouranswerspage = pomanager.getReviewYourAnswersPage();
        await reviewyouranswerspage.clickConitnueBtn();
        const personalstatementpage = pomanager.getPersonalStatementPage();
        await personalstatementpage.clickCheckboxes();
        await personalstatementpage.clickAgreeBtn();
        const beneficiarypage = pomanager.getBeneficiaryPage();
        await beneficiarypage.clickAddBeneficiryBtn();
        await beneficiarypage.enterBeneficiary(benfirstname, benlastname, bendob, benshare);
        await beneficiarypage.clickConitnueBtn();
        const confirmidentitypage = pomanager.getConfirmIdentityPage();
        await confirmidentitypage.enterIdentificationDetails(passportno);
        await confirmidentitypage.clickCheckBox();
        await confirmidentitypage.clickAcceptandPayBtn();
        const paymentpage = pomanager.getPaymentPage();
        //await paymentpage.purchasePolicyWithACH(accountholdername, transitnumber, institutionnumber, accountnumber, bankname);
        await paymentpage.purchasePolicyWithCC(cardname, cardnumber, expirydate, cvv);
        console.log (await page.locator(".title-subtext").textContent());

    });

    test.only('Customer Knockout Flow', async ({ page }) => {
        const pomanager = new POManager(page); 
        const premiunquotepage = pomanager.getPremiumQuotePage();
        await premiunquotepage.getQuoteValue(gender, date);
        await premiunquotepage.clickContinueBtn();
        const preapplicationpage = pomanager.getPreApplicationPage();
        await preapplicationpage.acceptPopWindow();
        await preapplicationpage.enterUserName(firstname, lastname);
        await preapplicationpage.enterAddress(houseaddress);
        await preapplicationpage.enterPhoneNumber(phonenumber);
        await preapplicationpage.last3Questions(OptionYes);
        await preapplicationpage.clickConitnueBtn();
        const needsassessmentpage = pomanager.getNeedsAssessmentPage();
        await needsassessmentpage.enterGrossIncome(income,saving,mortgageBal,debt);
        await needsassessmentpage.clickContinueBtn();
        const confirmpremiumpage = pomanager.getConfirmPremiumPage();
        await confirmpremiumpage.clickContinueBtn();
        const lifestylequestionnairepage = pomanager.getLifestyleQuestionnairePage();
        await lifestylequestionnairepage.lifestyleQuestions(OptionYes, "4", "2", "300", "15", "7");
        await lifestylequestionnairepage.clickContinueBtn();
        const medicalquestionnaire1page = pomanager.getMedicalQuestionnaire1Page();
        await medicalquestionnaire1page.medicalQuestionsPage1(OptionYes);
        await medicalquestionnaire1page.clickConitnueBtn();
        const medicalquestionnaire2page = pomanager.getMedicalQuestionnaire2Page();
        await medicalquestionnaire2page.medcialQuestionsPage2(OptionYes);
        await medicalquestionnaire2page.clickConitnueBtn(); 
        const reviewyouranswerspage = pomanager.getReviewYourAnswersPage();
        await reviewyouranswerspage.clickConitnueBtn();
        const personalstatementpage = pomanager.getPersonalStatementPage();
        await personalstatementpage.clickCheckboxes();
        const res = await personalstatementpage.clickAgreeBtn();
        expect(await personalstatementpage.getKnockoutMsg()).toContain("A licensed insurance agent will contact you shortly.");
        expect(rejectionerrors.length).toBe(res.result.response.errors.length);
}); 


});


