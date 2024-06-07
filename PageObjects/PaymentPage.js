const{ expect, request } = require("@playwright/test");

class PaymentPage {

    constructor(page) {
        this.header = page.locator("(//div[text()=' Payment '])[2]");
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

    async verifyPaymentPageHeader() {
        expect(await this.header.textContent()).toContain('Payment');
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

        // const CustormerAPI = await this.page.waitForRequest('https://us-central1-blanket-development.cloudfunctions.net/createCATermCustomer', { timeout: 10000 });
        // await expect(CustormerAPI.method()).toBe('POST');

        // const StoreCCAPI = await this.page.waitForRequest('https://us-central1-blanket-development.cloudfunctions.net/storeCATermCreditCard', { timeout: 10000 });
        // await expect(StoreCCAPI.method()).toBe('POST');

        // const SubscribeAPI = await this.page.waitForRequest('https://us-central1-blanket-development.cloudfunctions.net/subscribeCATerm', { timeout: 10000 });
        // await expect(SubscribeAPI.method()).toBe('POST');

        // const BindPolicyAPI = await this.page.waitForRequest('https://us-central1-blanket-development.cloudfunctions.net/CATermBindPolicy', { timeout: 10000 });
        // await expect(BindPolicyAPI.method()).toBe('POST');

        // const SendPolicyAPI = await this.page.waitForRequest('https://us-central1-blanket-development.cloudfunctions.net/sendCATermPolicyPdf', { timeout: 10000 });
        // await expect(SendPolicyAPI.method()).toBe('POST');

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