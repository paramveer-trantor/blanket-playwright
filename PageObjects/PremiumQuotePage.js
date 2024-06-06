exports.PremiumQuotePage = class PremiumQuotePage {

    constructor(page){

        this.genderMale = page.getByText('Male', { exact: true });
        this.genderFemale = page.getByText('Female', { exact: true });
        this.dateOfBirth = page.getByLabel('MM/DD/YYYY');
        this.canadianCitizen = page.getByText('Yes');
        this.nonSmoker = page.getByText('No');
        this.getQuoteBtn = page.getByRole('button', {name: ' GET QUOTE '});
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
    }

    async selectGender(gender){
        if(gender == "Male"){
            await this.genderMale.first().click();
        }
        else
        {
            await this.genderFemale.first().click();
        }
        
    }

    async enterDOB(date){
        await this.dateOfBirth.click();
        await this.dateOfBirth.fill(date);
    }

    async selectCadianCitizen(){
        await this.canadianCitizen.first().click();
    }

    async selectNonSmoker(){
        await this.nonSmoker.nth(1).click();
    }

    async clickGetQuoteBtn(){
        await this.getQuoteBtn.click();
    }

    async clickContinueBtn(){
        /* // Intercept the API request
        await this.page.route('**', (route) => {
            const request = route.request();
            //const reponse = route.response();
            expect(request.method()).toBe('POST');
            expect(reponse.status()).toContain('200');
            route.continue(); 
      }); */
        await this.continueBtn.click();
    }
}



