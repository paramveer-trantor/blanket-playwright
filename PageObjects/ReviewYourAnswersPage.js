const{ expect, request } = require("@playwright/test");

class ReviewYourAnswersPage {

    constructor(page) {
        this.header = page.locator("(//div[text()=' Review Your Answers '])[2]");
        this.preAppPageQuesEditBtn = page.locator("//div[@btnname='summaryBtn1']//button[1]");
        this.lifestylePageQuesEditBtn = page.locator("//div[@btnname='summaryBtn2']//button[1]");
        this.MedPage1QuesEditBtn = page.locator("//div[@btnname='summaryBtn3']//button[1]");
        this.MedPage2QuesEditBtn = page.locator("//div[@btnname='summaryBtn4']//button[1]");
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
    }

    async getReviewPageHeader() {
        return (await this.header.textContent()).trim();
    }

    async clickEditBtn(pagename) {
        if (pagename == "Pre Application") {
            await this.preAppPageQuesEditBtn.click();
        }

        if (pagename == "LifeStype") {
            await this.lifestylePageQuesEditBtn.click();
        }

        if (pagename == "Medical1") {
            await this.MedPage1QuesEditBtn.click();
        }

        if (pagename == "Medical2") {
            await this.MedPage2QuesEditBtn.click();
        }

    }

    async clickConitnueBtn() {
        await this.continueBtn.click();
    }

}

module.exports = { ReviewYourAnswersPage };

