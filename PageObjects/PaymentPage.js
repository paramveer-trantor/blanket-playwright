class PaymentPage {

    constructor(page) {
        this.creditCard = page.locator("[name='creditcard']");
        this.nameOnCard = page.locator("[name='cardName']");
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

    async purchasePolicyWithCC(cardname, cardnumber, expirydate, cvv) {
        this.nameOnCard.click();
        this.nameOnCard.fill(cardname);
        this.cardNumber.click();
        this.cardNumber.fill(cardnumber);
        this.expiryDate.click();
        this.expiryDate.fill(expirydate);
        this.cvv.click();
        this.cvv.fill(cvv);
        this.payNowBtn.isVisible();
        this.payNowBtn.click();
    }

    async purchasePolicyWithACH(accountholdername, transitnumber, institutionnumber, accountnumber, bankname) {
        this.ach.click();
        this.accountHoldername.click();
        this.accountHoldername.fill(accountholdername);
        this.accountType.click();
        this.selectAccountType.click();
        this.transitNumber.click();
        this.transitNumber.fill(transitnumber);
        this.institutionNumber.click();
        this.institutionNumber.fill(institutionnumber);
        this.accountNumber.click();
        this.accountNumber.fill(accountnumber);
        this.bankName.click();
        this.bankName.fill(bankname);
        this.confirmAndPayBtn.click();
    }

}

module.exports = { PaymentPage };