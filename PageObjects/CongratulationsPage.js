const{ expect, request } = require("@playwright/test");

class CongratulationsPage {

    constructor(page) {
        this.page = page;
        this.thanksMsg = page.locator(".title-subtext");
        this.policyInfoHeaders = page.locator("//div[@class='row grey-background grey-outline table-fields']/div");
        this.policyRelatedInfo = page.locator("//div[@class='row grey-outline table-fields']/div");
    }

    async getThanksMsg() {
        return this.thanksMsg.textContent();
    }

    async getPolicyInfoHeaders() {
        let policyinfocolumns = [];
        policyinfocolumns[0] = await this.policyInfoHeaders.first().textContent();
        for(let i=1; i <=3; i++) {
            policyinfocolumns[i] = await this.policyInfoHeaders.nth(i).textContent();
        }
        return policyinfocolumns;
    }

    async getProviderName() {
        return await this.policyRelatedInfo.first().textContent();
    }

    async getEffectiveDate() {
        return await this.policyRelatedInfo.nth(1).textContent();
    }

    async getPaymentValue() {
        return await this.policyRelatedInfo.nth(2).textContent();
    }

    async getPolicyNumber() {
        return await this.policyRelatedInfo.last().textContent();
    }

}

module.exports = { CongratulationsPage };
