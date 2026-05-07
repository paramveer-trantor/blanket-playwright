import { BasePage } from "./BasePage";

export class PremiumQuotePage extends BasePage {

    constructor(page) {
        super(page);
        this.header = page.locator("//div[text()=' Premium Quote ']");
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
        this.continueBtn_Fr = page.getByRole('button', { name: ' Continuer ' });
        this.quoteValue = page.locator('.quote-breakdown .quote-line .primary--text');
        this.yourQuote = page.locator('.quote-breakdown');
        this.policyOptions = page.locator('.chip-text');
        this.list = page.locator("//div[@class='v-menu__content theme--light menuable__content__active']/div/div");
        this.term = page.locator("//label[text()='Term']");
        this.term_Fr = page.locator("//label[text()='Terme']");
        this.coverage = page.locator("//label[text()='Coverage amount']");
        this.backBtn = page.getByRole('button', { name: ' Back ' });
    }

    async getPremiumQuotePageHeader() {
        retun(await this.header.textContent()).trim();
    }

    async getQuoteValue() {
        await this.quoteValue.first().waitFor();
        const quote = await this.quoteValue.first().textContent();
        const quote_value = quote.match(/\d+(\.\d+)?/)[0];
        return quote_value;
    }

    async getQuoteValueWithFee() {
        await this.quoteValue.last().waitFor();
        const quotewithfee = await this.quoteValue.last().textContent();
        const quotewithfee_value = quotewithfee.match(/\d+(\.\d+)?/)[0];
        return quotewithfee_value;
    }

    async getTermsOptions() {
        await this.term.click();
        let termsOptions = [];

        const menuContentElement = await this.page.waitForSelector("//div[@class='v-menu__content theme--light menuable__content__active']");
        const count_terms = await menuContentElement.$$eval('div[role="option"]', options => options.length);
        termsOptions[0] = await this.list.first().textContent();
        for (let i = 1; i <= (count_terms - 1); i++) {
            termsOptions[i] = await this.list.nth(i).textContent();
        }
        return termsOptions;
    }

    async getQuoteOnTermSelected(termvalue) {
        await this.term.click();
        if (termvalue == 10) {
            await this.page.getByRole('listbox').getByRole('option').first().click();
            const quotevalue_10 = await this.quoteValue.last().textContent();
            const quote_value = quotevalue_10.match(/\d+(\.\d+)?/)[0];
            return quote_value;
        }
        if (termvalue == 15) {
            await this.page.getByRole('listbox').getByRole('option').nth(1).click();
            const quotevalue_15 = await this.quoteValue.last().textContent();
            const quote_value = quotevalue_15.match(/\d+(\.\d+)?/)[0];
            return quote_value;
        }
        if (termvalue == 20) {
            await this.page.getByRole('listbox').getByRole('option').nth(2).click();
            const quotevalue_20 = await this.quoteValue.last().textContent();
            const quote_value = quotevalue_20.match(/\d+(\.\d+)?/)[0];
            return quote_value;
        }
        if (termvalue == 30) {
            await this.page.getByRole('listbox').getByRole('option').last().click();
            const quotevalue_30 = await this.quoteValue.last().textContent();
            const quote_value = quotevalue_30.match(/\d+(\.\d+)?/)[0];
            return quote_value;
        }
    }

    async getCoverageAmountOptions() {
        await this.coverage.click();
        let coverageOptions = [];
        const menuContentElement = await this.page.waitForSelector("//div[@class='v-menu__content theme--light menuable__content__active']");
        const count_coverage = await menuContentElement.$$eval('div[role="option"]', options => options.length);
        coverageOptions[0] = await this.list.first().textContent();
        for (let i = 1; i <= (count_coverage - 1); i++) {
            coverageOptions[i] = await this.list.nth(i).textContent();
        }
        return coverageOptions;
    }

    async getQuoteOnCoverageAmountSelected(coveragevalue) {
        await this.coverage.click();
        if (coveragevalue == "$100K") {
            await this.page.getByRole('listbox').getByRole('option').first().click();
            const quotevalue_100k = await this.quoteValue.last().textContent();
            const quote_value = quotevalue_100k.match(/\d+(\.\d+)?/)[0];
            return quote_value;
        }
        if (coveragevalue == "$500K") {
            await this.page.getByRole('listbox').getByRole('option').nth(3).click();
            const quotevalue_500k = await this.quoteValue.last().textContent();
            const quote_value = quotevalue_500k.match(/\d+(\.\d+)?/)[0];
            return quote_value;
        }
        if (coveragevalue == "$1M") {
            await this.page.getByRole('listbox').getByRole('option').last().click();
            const quotevalue_1M = await this.quoteValue.last().textContent();
            const quote_value = quotevalue_1M.match(/\d+(\.\d+)?/)[0];
            return quote_value;
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
        await this.term.waitFor();
        await this.term.click();
        await this.page.getByRole('listbox').getByRole('option', { name: length }).click();
    }

    async changeTermLength_Fr(length) {
        await this.term_Fr.waitFor();
        await this.term_Fr.click();
        await this.page.getByRole('listbox').getByRole('option', { name: length }).click();
    }

    async changeCoverageAmount(amount) {
        await this.coverage.waitFor();
        await this.coverage.click();
        await this.page.getByRole('listbox').getByRole('option', { name: amount }).click();
    }

    async clickContinueBtn() {
        await this.yourQuote.first().waitFor();
        await this.continueBtn.click();
    }

    async clickContinueBtn_Fr() {
        await this.yourQuote.waitFor();
        await this.continueBtn_Fr.click();
    }

    async clickBackBtn() {
        await this.backBtn.click();
    }

}



