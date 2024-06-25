import { POManager } from '../PageObjects/POManager';

async function verifyReviewPageHeader(page) {
    const pomanager = new POManager(page);
    const reviewpage = pomanager.getReviewYourAnswersPage();
    const header_review = await reviewpage.getReviewPageHeader();
    return header_review;
}

async function navigateToPersonalStatementPage(page) {
    const pomanager = new POManager(page);
    const reviewpage = pomanager.getReviewYourAnswersPage();
    await reviewpage.clickConitnueBtn();
}

module.exports = { verifyReviewPageHeader, navigateToPersonalStatementPage };