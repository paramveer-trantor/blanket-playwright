export class CongratulationsPage {

    constructor(page) {
        this.page = page;
        this.thanksMsg = page.locator('.title-subtext');
        this.policyInfoHeaders = page.locator("//div[@class='row grey-background grey-outline table-fields']/div");
        this.policyRelatedInfo = page.locator("//div[@class='row grey-outline table-fields']/div");
    }

    async getThanksMsg() {
        await this.thanksMsg.isVisible();
        return (await this.thanksMsg.textContent()).trim();
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
        return (await this.policyRelatedInfo.first().textContent()).trim();
    }

    async getEffectiveDate() {
        return (await this.policyRelatedInfo.nth(1).textContent()).trim();
    }

    async getPaymentValue() {
        return (await this.policyRelatedInfo.nth(2).textContent()).trim();
    }

    async getPolicyNumber() {
        return (await this.policyRelatedInfo.last().textContent()).trim();
    }

}


