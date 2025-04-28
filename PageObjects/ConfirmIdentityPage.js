export class ConfirmIdentityPage {

    constructor(page) { 
        this.header = page.locator(".estimate-title.primary--text.mb-12");
        this.openIDType = page.getByLabel('Please select an ID type', { exact: true });
        this.openIDType_Fr = page.getByLabel('Veuillez choisir un type de document', { exact: true });
        this.listBox = page.getByRole('listbox');
        this.selectPassport = this.listBox.getByText('Passport', { exact: true });
        this.selectPassport_Fr = this.listBox.getByText('Passeport', { exact: true });
        this.selectHealthCard = this.listBox.getByText('Provincial health card', { exact: true }); 
        this.selectDriverLicense = this.listBox.getByText("Driver's licence", { exact: true });
        this.passportInputField = page.getByLabel('Passport number', { exact: true });
        this.passportInputField_Fr = page.getByLabel('Numéro de passeport', { exact: true });
        this.provinceList = page.getByLabel('Select province', { exact: true });
        this.selectProvince = page.getByRole('listbox').getByText('Alberta', { exact: true }); 
        this.healthCardInputField = page.getByLabel('Health number', { exact: true });
        this.licenseInputField = page.getByLabel("Driver's licence  number", { exact: true });
        this.errorMsg = page.getByRole('alert').locator('.v-messages__message');
        this.agreeCheckBox = page.locator("//input[@name='payAgree']/following-sibling::div[1]");
        this.acceptAndPayBtn = page.getByRole('button', { name: ' Accept and pay ' }); 
        this.acceptAndPayBtn_Fr = page.getByRole('button', { name: ' Accepter et payer ' }); 
        this.options = page.getByRole('option');
        this.monthlyPremium = page.locator('.offer-monthly-premium');
        this.monthlyPremiumWithFee = page.locator("(//div[@class='d-flex align-start']/p//span[2])[1]");
        this.selectAnnualPremium = page.locator("//input[@value='annual']/following-sibling::div[1]");
        this.annualPremium = page.locator("//div[@class='d-flex align-start'][2]/p/span[@class='font-weight-bold']");
        this.termOffer = page.locator('.offer-term');
        this.coverageOffer = page.locator('.offer-coverage');
    }
   
    async getConfirmIdentityPageHeader() {   
        return (await this.header.last().textContent()).trim();  
    }

    async getTermOfferValue() {
        return await this.termOffer.textContent();
    }

    async getCoverageOfferValue() {
        return await this.coverageOffer.textContent();
    }
  
    async getMonthlyPremiumValue() {
        return await this.monthlyPremium.textContent(); 
    }

    async getMonthlyPremiumWithFeeValue() {
        const monthly_due = await this.monthlyPremiumWithFee.textContent();
        const monthly_amountdue = (monthly_due.replace("Total Monthly Payment:", "")).trim();
        return monthly_amountdue; 
    }

    async selectAnnualPremiumOption() {
        await this.selectAnnualPremium.click();
    }

    async getAnnualPremiumWithFeeValue() {
        return await this.annualPremium.last().textContent();
    }

    async getIdTypeList() {
        await this.openIDType.click();
        return await this.options.allTextContents();
    }

    async checkPassportInputFieldVisible() {  
        await this.openIDType.click();
        await this.selectPassport.click();
        return await this.passportInputField.isVisible();
    }

    async checkHealthCardInputFieldVisible() {
        await this.openIDType.click();
        await this.selectHealthCard.click();
        await this.provinceList.click();
        await this.selectProvince.click();
        return await this.healthCardInputField.isVisible();
    }

    async checkLicenseInputFieldVisible() {
        await this.openIDType.click();
        await this.selectDriverLicense.click();
        await this.provinceList.click();
        await this.selectProvince.click();
        return await this.licenseInputField.isVisible();
    }

    async selectIdentityAsPassport() {
        await this.openIDType.click();
        await this.selectPassport.click();
    }

    async enterPassportNumber(passportno) {  
        await this.passportInputField.fill(passportno);
    }

    async selectIdentityAsHealthCard() {
        await this.openIDType.click();
        await this.selectHealthCard.click();
        await this.provinceList.click();
        await this.selectProvince.click();
    }

    async enterHealthCardNumber(healthno) {
        await this.healthCardInputField.fill(healthno);
    }
  
    async selectIdentityAsDrivingLicense() {
        await this.openIDType.click();
        await this.selectDriverLicense.click();
        await this.provinceList.click();
        await this.selectProvince.click();
    }

    async enterLicenseNumber(licenseno) {
        await this.licenseInputField.fill(licenseno);
    }

    async checkErrorIsVisible() {
        return await this.errorMsg.isVisible();
    }

    async getErrorMsg() {
        return (await this.errorMsg.textContent()).trim();
    }

    async clickAcceptandPayBtn() {
        await this.acceptAndPayBtn.click();
    }

    async goToPaymentPageWithPassport(passportno) {
        await this.openIDType.click();
        await this.selectPassport.click();
        await this.passportInputField.fill(passportno);
        await this.agreeCheckBox.click();
        await this.acceptAndPayBtn.isVisible();
        await this.acceptAndPayBtn.click();
    }

    async goToPaymentPageWithPassport_Fr(passportno) {
        await this.openIDType_Fr.click();
        await this.selectPassport_Fr.click();
        await this.passportInputField_Fr.fill(passportno);
        await this.agreeCheckBox.click();
        await this.acceptAndPayBtn_Fr.isVisible();
        await this.acceptAndPayBtn_Fr.click();
    }

    async goToPaymentPageWithLicense(licenseno) {
        await this.openIDType.click();
        await this.selectDriverLicense.click();
        await this.provinceList.click();
        await this.selectProvince.click();
        await this.licenseInputField.fill(licenseno);
        await this.agreeCheckBox.click();
        await this.acceptAndPayBtn.isVisible();
        await this.acceptAndPayBtn.click();
    }

    async goToPaymentPageWithHealthCard(healthno) {
        await this.openIDType.click();
        await this.selectHealthCard.click();
        await this.provinceList.click();
        await this.selectProvince.click();
        await this.healthCardInputField.fill(healthno);
        await this.agreeCheckBox.click();
        await this.acceptAndPayBtn.isVisible();
        await this.acceptAndPayBtn.click();
    }

}

