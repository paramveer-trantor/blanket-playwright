import { POManager } from '../PageObjects/POManager';

async function verifyReviewPageHeader(page) {
    const pomanager = new POManager(page);
    const reviewpage = pomanager.getReviewYourAnswersPage();
    const header_review = await reviewpage.getReviewPageHeader();
    return header_review;
}

async function clickMakeAnEditButton(page, pagename) {
    const pomanager = new POManager(page);
    const reviewpage = pomanager.getReviewYourAnswersPage();

    if (pagename == "Pre Application") {
        await reviewpage.clickEditBtn(pagename);
    }

    if (pagename == "LifeStype") {
        await reviewpage.clickEditBtn(pagename);
    }

    if (pagename == "Medical1") {
        await reviewpage.clickEditBtn(pagename);
    }

    if (pagename == "Medical2") {
        await reviewpage.clickEditBtn(pagename);
    }

}

async function navigateToPersonalStatementPage(page) {
    const pomanager = new POManager(page);
    const reviewpage = pomanager.getReviewYourAnswersPage();
    await reviewpage.clickConitnueBtn();
}

module.exports = { verifyReviewPageHeader, clickMakeAnEditButton, navigateToPersonalStatementPage };