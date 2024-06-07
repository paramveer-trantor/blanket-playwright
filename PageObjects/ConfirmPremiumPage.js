class ConfirmPremiumPage {

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

//         await page.route("*getCATermPremium", async route =>  
// {
// 	const response = await page.request.fetch(route.request()); 
	
// });

    const response = await this.page.request.post('https://us-central1-blanket-development.cloudfunctions.net/getCATermPremium',
        {
            
        }
    );
        const resp = await response.json();
        console.log(resp);
        await this.continueBtn.click();        
        await this.page.waitForLoadState('domcontentloaded');
    }
    
}

module.exports = { ConfirmPremiumPage };


