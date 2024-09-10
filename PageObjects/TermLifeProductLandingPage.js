const { expect } = require("@playwright/test");

class TermLifeProductLandingPage {

    constructor(page){
        this.page = page;
        this.headerText = page.getByText(' We’ve got what matters most covered. ');
        this.applyNowBtn = page.locator("(//button[contains(@class,'mint text-h4')]//span)[1]");
    }

    async getHeaderText(tagline){
        return (await this.headerText.first().textContent()).trim();
    }

    async clickApplyNowBtn(){
        await this.page.waitForLoadState('domcontentloaded');
        await this.applyNowBtn.click();
    }

}

module.exports = { TermLifeProductLandingPage };

