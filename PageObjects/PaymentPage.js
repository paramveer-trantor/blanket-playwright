import { waitForDebugger } from "inspector";

export class PaymentPage {

    constructor(page) {
        this.page = page;
        this.header = page.locator("(//div[text()=' Payment '])[2]");
        this.amountdue = page.locator('.final-premium');
        this.creditCard = page.locator("[name='creditcard']");
        this.cardName = page.getByLabel('Name on Card', { exact: true });
        this.cardName_Fr = page.getByLabel('Titulaire de la carte', { exact: true });
        this.cardNumber = page.getByLabel('Card Number', { exact: true });
        this.cardNumber_Fr = page.getByLabel('Numéro de carte', { exact: true });
        this.expiryDate = page.getByLabel('Expiration Date (MM/YYYY)', { exact: true });
        this.expiryDate_Fr = page.getByLabel("Date d'expiration (MM/AAAA)", { exact: true });
        this.cvv = page.getByLabel('CVV', { exact: true });
        this.payNowBtn = page.getByRole('button', { name: ' Pay now ' });
        this.payNowBtn_Fr = page.getByRole('button', { name: ' Payer maintenant ' });
        this.ach = page.getByText('Pre-Authorized Debit');
        this.ach_Fr = page.getByText('Débit préautorrisé');
        this.accountHoldername = page.getByLabel('Account Holder', { exact: true });
        this.accountHoldername_Fr = page.getByLabel('Titulaire du compte', { exact: true });
        this.accountType = page.getByLabel('Account Type', { exact: true });
        this.accountType_Fr = page.getByLabel('Type de compte', { exact: true });
        this.selectAccountType = page.getByText('Savings', { exact: true });
        this.selectAccountType_Fr = page.getByText('Épargne', { exact: true });
        this.transitNumber = page.getByLabel('Transit Number', { exact: true }); 
        this.transitNumber_Fr = page.getByLabel('Numéro de transit', { exact: true }); 
        this.institutionNumber = page.getByLabel('Institution Number', { exact: true }); 
        this.institutionNumber_Fr = page.getByLabel("Numéro d'institution", { exact: true }); 
        this.accountNumber = page.getByLabel('Account Number', { exact: true });
        this.accountNumber_Fr = page.getByLabel('Numéro de compte', { exact: true });
        this.bankName = page.getByLabel('Bank Name', { exact: true });
        this.bankName_Fr = page.getByLabel("Nom de l'institution financiere", { exact: true });
        this.confirmAndPayBtn = page.getByRole('button', { name: ' Confirm and submit payment ' });
        this.confirmAndPayBtn_Fr = page.getByRole('button', { name: ' Confirmer et soumettre le paiement ' });
        this.iconTransitNumber = page.locator("//button[@aria-label='Transit Number appended action']");
        this.iconRoutingNumber = page.locator("//button[@aria-label='Institution Number appended action']");
        this.iconAccountNumber = page.locator("//button[@aria-label='Account Number appended action']");
        this.billingCheckBox = page.getByText('Billing Info Same as Mailing Info', { exact: true });
        this.billingCheckBox_Fr = page.getByText("Informations de facturation identiques aux informations d'envoi", { exact: true });
        this.firstName = page.getByTestId('billing-firstname');
        this.lastName = page.getByTestId('billing-lastname');
        this.address = page.getByTestId('billing-address');
        this.city = page.getByTestId('billing-city');
        this.postalCode = page.getByTestId('billing-postalcode');
        this.province = page.getByTestId('billing-province');
        this.selectProvinceON = page.getByRole('listbox').getByRole('option').filter({ hasText: 'Ontario' });
        this.backBtn = page.locator("//div[@class='v-stepper__items']/div[6]//button");
        this.radioCreditCard =  page.getByRole('radiogroup').filter({ hasText: 'Credit Card' });
        this.radioACH = page.getByRole('radiogroup').filter({ hasText: 'Pre-Authorized Debit' });
        this.dialog = page.locator('.v-dialog__content--active');
        this.paymentFrequency = page.locator('.payment-frequency');
    }
  
    async getPaymentPageHeader() { 
        return (await this.header.textContent()).trim();
    }

    async clickBillingAddressCheckBox() {
        await this.billingCheckBox.click();
    }

    async clickBillingAddressCheckBox_Fr() {
        await this.billingCheckBox_Fr.click();
    }

    async verifyBillingAddressIsEmpty() {
        return await this.address.inputValue();;   
    }

    async enterBillingAddress(firstname, lastname, address, city, postal) {
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname); 
        await this.address.fill(address); 
        await this.city.fill(city);  
        await this.postalCode.fill(postal);   
        await this.province.click();
        await this.selectProvinceON.click();
    }

    async getTotalAmountDue() {
        const premium_value = (await this.amountdue.innerText()).trim();
        const amountdue = (premium_value.replace("Amount Due: $", "")).trim();
        return amountdue;  
    }

    async getPaymentFrequency() {
        return (await this.paymentFrequency.textContent()).trim();
    }

    async checkCCPaymentOption() {
        const status_CC = await this.radioCreditCard.isVisible();
        return status_CC;
    }

    async checkACHPaymentOption() {
        const status_ACH = await this.radioACH.isVisible();
        return status_ACH
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

    async purchasePolicyWithCC_Fr(cardname, cardnumber, expirydate, cvv) {
        await this.cardName_Fr.click();
        await this.cardName_Fr.fill(cardname);
        await this.cardNumber_Fr.click();
        await this.cardNumber_Fr.fill(cardnumber);
        await this.expiryDate_Fr.click();
        await this.expiryDate_Fr.fill(expirydate);
        await this.cvv.click();
        await this.cvv.fill(cvv);
        await this.payNowBtn_Fr.isVisible();  
        await this.payNowBtn_Fr.click();
    }

    async selectACHOption() {
        await this.ach.click();
    }

    async checkIconTransitNumber() {
        await this.ach.click();
        const status_tn = await this.iconTransitNumber.isVisible();
        await this.iconTransitNumber.click();
        await this.dialog.click();
        return status_tn;
    }

    async checkIconRoutingNumber() {
        const status_rn = await this.iconRoutingNumber.isVisible();
        await this.iconRoutingNumber.click();
        await this.dialog.click();
        return status_rn;
    }

    async checkIconAccountNumber() {
        const status_an = await this.iconAccountNumber.isVisible();
        await this.iconAccountNumber.click();
        await this.dialog.click();
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

    async purchasePolicyWithACH_Fr(accountholdername, transitnumber, institutionnumber, accountnumber, bankname) {
        await this.ach_Fr.click();
        await this.accountHoldername_Fr.click();
        await this.accountHoldername_Fr.fill(accountholdername);
        await this.accountType_Fr.click();
        await this.selectAccountType_Fr.click();
        await this.transitNumber_Fr.click();
        await this.transitNumber_Fr.fill(transitnumber);
        await this.institutionNumber_Fr.click();
        await this.institutionNumber_Fr.fill(institutionnumber);
        await this.accountNumber_Fr.click();
        await this.accountNumber_Fr.fill(accountnumber);
        await this.bankName_Fr.click();
        await this.bankName_Fr.fill(bankname);
        await this.confirmAndPayBtn_Fr.click();
    }

    async goBackToConfirmIdentityPage() {
        await this.backBtn.click();
    }
}