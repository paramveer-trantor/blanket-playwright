const { expect, request } = require("@playwright/test");

class PaymentPage {

    constructor(page) {
        this.page = page;
        this.header = page.locator("(//div[text()=' Payment '])[2]");
        this.amountdue = page.locator("//div[@class='row d-flex justify-center']/div[@class='text-center text-h3 primary--text font-weight-bold col']");
        this.creditCard = page.locator("[name='creditcard']");
        this.cardName = page.getByLabel('Name on Card', { exact: true });
        this.cardNumber = page.getByLabel('Card Number', { exact: true });
        this.expiryDate = page.getByLabel('Expiration Date (MM/YYYY)', { exact: true });
        this.cvv = page.getByLabel('CVV', { exact: true });
        this.payNowBtn = page.getByRole('button', { name: ' Pay now ' });
        this.ach = page.getByText('Pre-Authorized Debit');
        this.accountHoldername = page.getByLabel('Account Holder', { exact: true });
        this.accountType = page.getByLabel('Account Type', { exact: true });
        this.selectAccountType = page.getByText('Savings', { exact: true });
        this.transitNumber = page.getByLabel('Transit Number', { exact: true }); 
        this.institutionNumber = page.getByLabel('Institution Number', { exact: true }); 
        this.accountNumber = page.getByLabel('Account Number', { exact: true });
        this.bankName = page.getByLabel('Bank Name', { exact: true });
        this.confirmAndPayBtn = page.getByRole('button', { name: ' Confirm and submit payment ' });
        this.iconTransitNumber = page.locator("//button[@aria-label='Transit Number appended action']");
        this.iconRoutingNumber = page.locator("//button[@aria-label='Institution Number appended action']");
        this.iconAccountNumber = page.locator("//button[@aria-label='Account Number appended action']");
        this.checkBox = page.getByLabel('Billing Info Same as Mailing Info', { exact: true });
        this.firstName = page.getByLabel('First name', { exact: true });
        this.lastName = page.getByLabel('Last name', { exact: true }); 
        this.address = page.getByLabel('Address', { exact: true }); 
        this.city = page.getByLabel('City', { exact: true }); 
        this.postalCode = page.getByLabel('Postal code', { exact: true }); 
        this.province = page.getByLabel('Province', { exact: true });
        this.selectProvinceON = page.getByRole('listbox').getByRole('option').filter({ hasText: 'Ontario' });
    }

    async getPaymentPageHeader() {
        return (await this.header.textContent()).trim();
    }

    async getTotalAmountDue() {
        //return (await this.amountdue.textContent()).trim();
        const premium_value = (await this.amountdue.textContent()).trim();
        const match = premium_value.match(/(\d+\.\d+)/);
        const amountdue = parseFloat(match[1]);
        return amountdue;  
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
    }

    async checkIconTransitNumber() {
        await this.ach.click();
        const status_tn = await this.iconTransitNumber.isVisible();
        await this.iconTransitNumber.click();
        return status_tn;
    }

    async checkIconRoutingNumber() {
        const status_rn = await this.iconRoutingNumber.isVisible();
        await this.iconRoutingNumber.click();
        return status_rn;
    }

    async checkIconAccountNumber() {
        const status_an = await this.iconAccountNumber.isVisible();
        await this.iconAccountNumber.click();
        return status_an;
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

    async clickBillingAddressCheckBox() {
        await this.checkBox.click();
    }

    async enterAddressDetails(firstname, lastname, address, city, postal) {
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname); 
        await this.address.fill(address); 
        await this.city.fill(city); 
        await this.postalCode.fill(postal); 
        await this.province.fill();
        await this.selectProvinceON.fill();
    }

}

module.exports = { PaymentPage };