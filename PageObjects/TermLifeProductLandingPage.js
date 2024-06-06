const { expect } = require("@playwright/test");

exports.TermLifeProductLandingPage = class TermLifeProductLandingPage {

    constructor(page){
        this.page = page;
        this.headerText = page.locator('.section2-header');
        this.applyNowBtn = page.getByRole('link', { name: 'Apply Now' });
    }

    async getHeaderText(tagline){
       //const textContent = await this.headerText.first().textContent();
       //console.log(textContent);
       await expect(this.headerText.first()).toContainText(tagline);
    }

    async clickApplyNowBtn(){
        await this.page.waitForLoadState('domcontentloaded');
        await this.applyNowBtn.click();

    }

}

