const{ expect, request } = require("@playwright/test");

class ReviewYourAnswersPage {

    constructor(page) {
        this.header = page.locator("(//div[text()=' Review Your Answers '])[2]");
        this.makeAnEditBtn = page.getByRole('button', {name: ' Make an edit '});   
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
    }

    async getReviewPageHeader() {
        return (await this.header.textContent()).trim();
    }

    async clickEditBtn(pagename) {
        if (pagename == "Pre Application") {
            await this.makeAnEditBtn.first().click();
        }

        if (pagename == "LifeStype") {
            await this.makeAnEditBtn.nth(1).click();
        }

        if (pagename == "Medical1") {
            await this.makeAnEditBtn.nth(2).click();
        }

        if (pagename == "Medical2") {
            await this.makeAnEditBtn.last().click();
        }

    }

    async clickConitnueBtn() {
        await this.continueBtn.click();
    }

}

module.exports = { ReviewYourAnswersPage };

