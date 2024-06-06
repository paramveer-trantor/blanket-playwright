exports.ReviewYourAnswersPage = class ReviewYourAnswersPage {

    constructor(page) {
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
    }

    async clickConitnueBtn() {
        await this.continueBtn.click();
    }

}

