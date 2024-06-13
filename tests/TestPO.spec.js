import { test, expect,request } from '@playwright/test';
import { json } from 'stream/consumers';
import { runInContext } from 'vm';
import { POManager } from '../PageObjects/POManager';
const { username,password,tagline, date, gender, firstname, lastname, houseaddress, phonenumber, income, saving, mortgageBal, debt, quotevalue, feet, inches, weight, marijuana, drinks, drinksKnock, OptionYes, OptionNo, benfirstname, benlastname, bendob, benshare, passportno, cardname, cardnumber, expirydate, cvv, accountholdername, transitnumber, institutionnumber, accountnumber, bankname } =require('../Utils/TestData');

test.describe('Tests as per page', async () => {

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
        await reviewyouranswerspage.verifyReviewPageHeader();
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
        await lifestylequestionnairepage.lifestyleQuestions(OptionYes, "4", "2", "83", "15", "7");
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
        await personalstatementpage.clickAgreeBtn();
        await personalstatementpage.verifyKnockoutMsg();


    //     const promise =  page.waitForResponse("https://us-central1-blanket-development.cloudfunctions.net/getCATermDecision", async route => {
    //         expect(await route.request().method()).toBe('POST');
    //         const response = await page.request.fetch(route.request());
    //         expect(await response.status()).toBe(200);
    //     });
    //    await this.agreeBtn.click();
    //    const response = await promise;
    //    expect(response.status()).toBe(200);
    //    console.log(response.json());
  


}); 


});


