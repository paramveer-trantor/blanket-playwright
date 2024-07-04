const { expect, request } = require("@playwright/test");

class PaymentPage {

    constructor(page) {
        this.page = page;
        this.header = page.locator("(//div[text()=' Payment '])[2]");
        this.amountdue = page.locator("//div[@class='row d-flex justify-center']/div[@class='text-center text-h3 primary--text font-weight-bold col']");
        this.creditCard = page.locator("[name='creditcard']");
        this.cardName = page.locator("[name='cardName']");
        this.cardNumber = page.locator("[name='cardNumber']");
        this.expiryDate = page.getByLabel('Expiration Date (MM/YYYY)', { exact: true });
        this.cvv = page.getByLabel('CVV', { exact: true });
        this.payNowBtn = page.getByRole('button', { name: ' Pay now ' });
        this.ach = page.locator("[name='ach']");
        this.accountHoldername = page.locator("[name='accountHolder']");
        this.accountType = page.getByLabel('Account Type', { exact: true });
        this.selectAccountType = page.getByText('Savings', { exact: true });
        this.transitNumber = page.locator("[name='transitNumber']");
        this.institutionNumber = page.locator("[name='institutionNumber']");
        this.accountNumber = page.locator("[name='accountNumber']");
        this.bankName = page.locator("[name='bankName']");
        this.confirmAndPayBtn = page.getByRole('button', { name: ' Confirm and submit payment ' });
    }

    async getPaymentPageHeader() {
        return await this.header.textContent();
    }

    async getTotalAmountDue() {
        return await this.amountdue.textContent();
    }

    async purchasePolicyWithCC(cardname, cardnumber, expirydate, cvv) {
        await this.cardName.click();
        await this.cardName.fill(cardname);
        await this.cardNumber.click();
        await this.cardNumber.fill(cardnumber);
        await this.expiryDate.click();
        await this.expiryDate.fill(expirydate);
        await this.cvv.click();
        await this.cvv.fill(cvv);
        await this.payNowBtn.isVisible();
        await this.payNowBtn.click();

        // const promise_CustormerAPI =  this.page.waitForResponse("**createCATermCustomer", async route => {
        //      expect(await route.request().method()).toBe('POST');
        //      const response = await this.page.request.fetch(route.request());
        //      expect(await response.status()).toBe(200);
        //  });
        // const response_CustormerAPI = await promise_CustormerAPI;
        // expect(response_CustormerAPI.status()).toBe(200);

        // const promise_StoreCCAPI = this.page.waitForResponse("**storeCATermCreditCard", async route => {
        //     expect(await route.request().method()).toBe('POST');
        //     const response = await this.page.request.fetch(route.request());
        //     expect(await response.status()).toBe(200);
        // });
        // const response_StoreCCAPI = await promise_StoreCCAPI;
        // expect(response_StoreCCAPI.status()).toBe(200);

        // const promise_SubscribeAPI = this.page.waitForResponse("**subscribeCATerm", async route => {
        //     expect(await route.request().method()).toBe('POST');
        //     const response = await this.page.request.fetch(route.request());
        //     expect(await response.status()).toBe(200);
        // });
        // const response_SubscribeAPI = await promise_SubscribeAPI;
        // expect(response_SubscribeAPI.status()).toBe(200);

        // const promise_BindPolicyAPI = this.page.waitForResponse("**CATermBindPolicy", async route => {
        //     console.log(route.request());
        //     expect(await route.request().method()).toBe('POST');
        //     const response = await this.page.request.fetch(route.request());
        //     console.log(route.request().postDataJSON());
        //     const response_BindPolicyAPI = await promise_BindPolicyAPI;
        //     expect(response_BindPolicyAPI.status()).toBe(200);
        // });

        // const promise_SendPolicyAPI = this.page.waitForResponse("**sendCATermPolicyPdf", async route => {
        //     expect(await route.request().method()).toBe('POST');
        //     const response = await this.page.request.fetch(route.request());
        //     expect(await response.status()).toBe(200);
        // });
        // const response_SendPolicyAPI = await promise_SendPolicyAPI;
        // expect(response_SendPolicyAPI.status()).toBe(200);
    }

    async purchasePolicyWithACH(accountholdername, transitnumber, institutionnumber, accountnumber, bankname) {
        await this.ach.click();
        await this.accountHoldername.click();
        await this.accountHoldername.fill(accountholdername);
        await this.accountType.click();
        await this.selectAccountType.click();
        await this.transitNumber.click();
        await this.transitNumber.fill(transitnumber);
        await this.institutionNumber.click();
        await this.institutionNumber.fill(institutionnumber);
        await this.accountNumber.click();
        await this.accountNumber.fill(accountnumber);
        await this.bankName.click();
        await this.bankName.fill(bankname);
        await this.confirmAndPayBtn.click();
    }


}

module.exports = { PaymentPage };