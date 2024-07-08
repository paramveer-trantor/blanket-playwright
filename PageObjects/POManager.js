const { LoginPage } = require('../PageObjects/LoginPage');
const { DashboardPage } = require('../PageObjects/DashboardPage');
const { TermLifeProductLandingPage } = require('../PageObjects/TermLifeProductLandingPage');
const { PremiumQuotePage } = require('../PageObjects/PremiumQuotePage');
const { PreApplicationPage } = require('../PageObjects/PreApplicationPage');
const { NeedsAssessmentPage } = require('../PageObjects/NeedsAssessmentPage');
const { ConfirmPremiumPage } = require('../PageObjects/ConfirmPremiumPage');
const { LifestyleQuestionnairePage } = require('../PageObjects/LifestyleQuestionnairePage');
const { MedicalQuestionnaire1Page } = require('../PageObjects/MedialQuestionnaire1Page');
const { MedicalQuestionnaire2Page } = require('../PageObjects/MedialQuestionnaire2Page');
const { ReviewYourAnswersPage } = require('../PageObjects/ReviewYourAnswersPage');
const { PersonalStatementPage } = require('../PageObjects/PersonalStatemenPage');
const { BeneficiaryPage } = require('../PageObjects/BeneficiaryPage');
const { ConfirmIdentityPage } = require('../PageObjects/ConfirmIdentityPage');
const { PaymentPage } = require('../PageObjects/PaymentPage');
const { TLFormLoginPage } = require('../PageObjects/TLFormLoginPage');
const { CongratulationsPage } = require('../PageObjects/CongratulationsPage');
const { MyPoliciesPage } = require('../PageObjects/MyPoliciesPage');

class POManager {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.termLifeProductLandingPage = new TermLifeProductLandingPage(this.page);
        this.premiumQuotePage = new PremiumQuotePage(this.page);
        this.preApplicationPage = new PreApplicationPage(this.page);
        this.needsAssessmentPage = new NeedsAssessmentPage(this.page);
        this.confirmPremiumPage = new ConfirmPremiumPage(this.page);
        this.lifestyleQuestionnairePage = new LifestyleQuestionnairePage(this.page);
        this.medicalQuestionnaire1Page = new MedicalQuestionnaire1Page(this.page);
        this.medicalQuestionnaire2Page = new MedicalQuestionnaire2Page(this.page);
        this.reviewYourAnswersPage = new ReviewYourAnswersPage(this.page);
        this.personalStatementPage = new PersonalStatementPage(this.page);
        this.beneficiaryPage = new BeneficiaryPage(this.page);
        this.confirmIdentityPage = new ConfirmIdentityPage(this.page);
        this.paymentPage = new PaymentPage(this.page);
        this.termLifeLoginPage = new TLFormLoginPage(this.page);
        this.congratulationsPage = new CongratulationsPage(this.page);
        this.myPoliciesPage = new MyPoliciesPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getTermLifeCAPage() {
        return this.termLifeProductLandingPage;
    }

    getPremiumQuotePage() {
        return this.premiumQuotePage;
    }

    getPreApplicationPage() {
        return this.preApplicationPage;
    }

    getNeedsAssessmentPage() {
        return this.needsAssessmentPage;
    }

    getConfirmPremiumPage() {
        return this.confirmPremiumPage;
    }

    getLifestyleQuestionnairePage() {
        return this.lifestyleQuestionnairePage;
    }

    getMedicalQuestionnaire1Page() {
        return this.medicalQuestionnaire1Page;
    }

    getMedicalQuestionnaire2Page() {
        return this.medicalQuestionnaire2Page;
    }

    getReviewYourAnswersPage() {
        return this.reviewYourAnswersPage;
    }

    getPersonalStatementPage() {
        return this.personalStatementPage;
    }

    getBeneficiaryPage() {
        return this.beneficiaryPage;
    }

    getConfirmIdentityPage() {
        return this.confirmIdentityPage;
    }

    getPaymentPage() {
        return this.paymentPage;
    }

    getTermLifeLoginPage() {
        return this.termLifeLoginPage;
    }

    getCongratulationsPage() {
        return this.congratulationsPage;
    }

    getMyPoliciesPage() {
        return this.myPoliciesPage;
    }

}

module.exports = { POManager };
