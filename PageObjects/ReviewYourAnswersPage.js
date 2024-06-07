const{ expect, request } = require("@playwright/test");

class ReviewYourAnswersPage {

    constructor(page) {
        this.header = page.locator("(//div[text()=' Review Your Answers '])[2]");
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
    }

    async verifyReviewPageHeader() {
        expect(await this.header.textContent()).toContain('Review Your Answers');
    }

    async clickConitnueBtn() {
        await this.continueBtn.click();
    }

}

module.exports = { ReviewYourAnswersPage };

