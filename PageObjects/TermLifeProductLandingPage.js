const { expect } = require("@playwright/test");

class TermLifeProductLandingPage {

    constructor(page){
        this.page = page;
        this.headerText = page.locator('.section2-header');
        this.applyNowBtn = page.getByRole('link', { name: 'Apply Now' });
    }

    async getHeaderText(tagline){
        return await this.headerText.first().textContent();
    }

    async clickApplyNowBtn(){
        await this.page.waitForLoadState('domcontentloaded');
        await this.applyNowBtn.click();
    }

}

module.exports = { TermLifeProductLandingPage };

