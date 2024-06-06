exports.ConfirmPremiumPage = class ConfirmPremiumPage {

    constructor(page) {
        this.page = page;
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
        this.quoteValue = page.locator('.estimate-subtitle .font-weight-bold');
    }

    async comfirmQuoteValue() {
        await this.quoteValue.waitFor();
        const quotevalue = await this.quoteValue.textContent();
        //console.log(quotevalue);
        return quotevalue;
    }

    async clickContinueBtn() {
        await this.continueBtn.click();        
        await this.page.waitForLoadState('domcontentloaded');
    }
    
}


