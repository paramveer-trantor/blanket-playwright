export class ConfirmPremiumPage {

    constructor(page) {
        this.page = page;
        this.header = page.locator("//div[text()=' Premium Quote ']");
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
        this.continueBtn_Fr = page.getByRole('button', { name: ' Continuer ' });
        this.quoteValue = page.locator('.chip-text');
        this.quoteValueMob = page.locator('chip-text-mobile');
        this.policyOptions = page.locator('.chip-text');
        this.list = page.locator("//div[@class='v-menu__content theme--light menuable__content__active']/div/div");
        this.term = page.locator("//label[text()='Term']");
        this.coverage = page.locator("//label[text()='Coverage Amount']");
        this.backBtn = page.getByRole('button', { name: ' Back ' });
    }

    async getConfirmPremiumPageHeader() {
        retun (await this.header.textContent()).trim();
    }

    async getQuoteValue() {
        await this.quoteValue.first().waitFor();
        return (await this.quoteValue.first().textContent()).replace('$', '');
    }

    async getQuoteValueWithFee() {
        await this.quoteValue.first().waitFor();
        const premiumrate_value = await this.quoteValue.first().textContent();
        const numericValue = parseFloat(premiumrate_value.replace('$', ''));
        const addedValue = numericValue + 2.70;
        const premiumrate = parseFloat(addedValue).toFixed(2);
        return premiumrate;  
    }

    async getTermsOptions() {
        await this.page.locator("//label[text()='Term']").click();
        let termsOptions = [];
    
        const menuContentElement = await this.page.waitForSelector("//div[@class='v-menu__content theme--light menuable__content__active']");
        const count_terms = await menuContentElement.$$eval('div[role="option"]', options => options.length);
        termsOptions[0] = await this.list.first().textContent();
        for (let i = 1; i <= (count_terms-1); i++) {
            termsOptions[i] = await this.list.nth(i).textContent();
        }
        return termsOptions;
    }

    async getQuoteOnTermSelected(termvalue) {
        await this.page.locator("//label[text()='Term']").click();
        if (termvalue == 10) {
            await this.page.getByRole('listbox').getByRole('option').first().click();
            const quotevalue_10 = (await this.quoteValue.first().textContent()).trim();
            return (quotevalue_10).replace('$', ''); 
        }
        if (termvalue == 15) {
            await this.page.getByRole('listbox').getByRole('option').nth(1).click();
            const quotevalue_15 = (await this.quoteValue.first().textContent()).trim();
            return (quotevalue_15).replace('$', ''); 
        }
        if (termvalue == 20) {
            await this.page.getByRole('listbox').getByRole('option').last().click();
            const quotevalue_20 = (await this.quoteValue.first().textContent()).trim();
            return (quotevalue_20).replace('$', ''); 
        }
    }

    async getCoverageAmountOptions() {
        await this.page.locator("//label[text()='Coverage Amount']").click();
        let coverageOptions = [];
        const menuContentElement = await this.page.waitForSelector("//div[@class='v-menu__content theme--light menuable__content__active']");
        const count_coverage = await menuContentElement.$$eval('div[role="option"]', options => options.length);
        coverageOptions[0] = await this.list.first().textContent();
        for (let i = 1; i <= (count_coverage-1); i++) {
            coverageOptions[i] = await this.list.nth(i).textContent();
        }
        return coverageOptions;
    }

    async getQuoteOnCoverageAmountSelected(coveragevalue) {
        await this.page.locator("//label[text()='Coverage Amount']").click();
        if (coveragevalue == "$100K") {
            await this.page.getByRole('listbox').getByRole('option').first().click();
            const quotevalue_100k = (await this.quoteValue.first().textContent()).trim();
            return (quotevalue_100k).replace('$', '');  
        }
        if (coveragevalue == "$500K") {
            await this.page.getByRole('listbox').getByRole('option').nth(3).click();
            const quotevalue_500k = (await this.quoteValue.first().textContent()).trim();
            return (quotevalue_500k).replace('$', '');  
        }
        if (coveragevalue == "$1M") {
            await this.page.getByRole('listbox').getByRole('option').last().click();
            const quotevalue_1M = (await this.quoteValue.first().textContent()).trim();
            return (quotevalue_1M).replace('$', '');
        }
    }

    async getPremiumValue() {
        return (await this.policyOptions.first().textContent()).trim();
    }

    async getTermLength() {
        return (await this.policyOptions.nth(1).textContent()).trim();  
    }

    async getCoverageAmountValue() {
        return (await this.policyOptions.last().textContent()).trim();
    }

    async changeTermLength(length) {
        await this.term.click();
        await this.page.getByRole('listbox').getByRole('option', { name: length }).click();
    }

    async changeCoverageAmount(amount) { 
        await this.coverage.click();
        await this.page.getByRole('listbox').getByRole('option', { name: amount }).click();
    }

    async clickContinueBtn() {
        await this.quoteValue.first().waitFor();
        await this.continueBtn.click();     
    }

    async clickContinueBtn_Fr() {
        await this.quoteValue.first().waitFor();
        await this.continueBtn_Fr.click();
    }

    async clickBackBtn() {
        await this.backBtn.click();     
    }

}



