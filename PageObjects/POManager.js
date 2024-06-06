import { LoginPage } from '../PageObjects/LoginPage';
import { DashboardPage } from '../PageObjects/DashboardPage';
import { TermLifeProductLandingPage } from '../PageObjects/TermLifeProductLandingPage';
import { PremiumQuotePage } from '../PageObjects/PremiumQuotePage';
import { PreApplicationPage } from '../PageObjects/PreApplicationPage';
import { NeedsAssessmentPage } from '../PageObjects/NeedsAssessmentPage';
import { ConfirmPremiumPage } from '../PageObjects/ConfirmPremiumPage';
import { LifestyleQuestionnairePage } from '../PageObjects/LifestyleQuestionnairePage';
import { MedicalQuestionnaire1Page } from '../PageObjects/MedialQuestionnaire1Page';
import { MedicalQuestionnaire2Page } from '../PageObjects/MedialQuestionnaire2Page';
import { ReviewYourAnswersPage } from '../PageObjects/ReviewYourAnswersPage';
import { PersonalStatementPage } from '../PageObjects/PersonalStatemenPage';

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

}

module.exports = { POManager };
