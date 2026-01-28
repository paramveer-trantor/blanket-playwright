export class TLProductLandingPage {

    constructor(page){
        this.page = page;
        this.headerText = page.locator(".section2-header");
        this.applyNowBtn = page.getByRole('button', { name: 'Apply Now' });
        this.applyNowFrBtn = page.getByRole('button', { name: ' Souscrivez maintenant ' });
    }

    async getHeaderText(){
        await this.page.waitForLoadState('domcontentloaded');
        return (await this.headerText.first().textContent()).trim();
    }

    async clickApplyNowBtn(){
        await this.page.waitForLoadState('domcontentloaded');
        await this.applyNowBtn.click();
    }

    async clickApplyNowBtn_Fr(){
        await this.page.waitForLoadState('domcontentloaded');
        await this.applyNowFrBtn.click();
    }

}


