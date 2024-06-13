const{ expect, request } = require("@playwright/test");

class ReviewYourAnswersPage {

    constructor(page) {
        this.header = page.locator("(//div[text()=' Review Your Answers '])[2]");
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
    }

    async getReviewPageHeader() {
        return await this.header.textContent();
    }

    async clickConitnueBtn() {
        await this.continueBtn.click();
    }

}

module.exports = { ReviewYourAnswersPage };

