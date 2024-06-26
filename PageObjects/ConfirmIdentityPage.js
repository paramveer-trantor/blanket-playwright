const{ expect, request } = require("@playwright/test");

class ConfirmIdentityPage {

    constructor(page) {
        this.header = page.locator("(//div[contains(@class,'estimate-title primary--text')])[2]");
        this.openIDType = page.getByLabel('Please select an ID type', { exact: true });
        this.selectPassport = page.getByText('Passport', { exact: true });
        this.selectHealthCard = page.getByText('Provincial health card', { exact: true }); 
        this.selectDriverLicense = page.getByText("Driver's licence", { exact: true });
        this.passportInputField = page.getByLabel('Passport number', { exact: true });
        this.provinceList = page.getByLabel('Select province', { exact: true });
        this.selectProvince = page.getByRole('listbox').getByText('Alberta', { exact: true }); 
        this.healthCardInputField = page.getByLabel('Health number', { exact: true });
        this.licenseInputField = page.getByLabel("Driver's licence  number", { exact: true });
        this.errorMsg = page.locator(".v-messages__message");
        this.agreeCheckBox = page.locator("//input[@name='payAgree']/following-sibling::div[1]");
        this.acceptAndPayBtn = page.getByRole('button', { name: ' Accept and pay ' }); 
        this.options = page.getByRole('option');
    }

    async getConfirmIdentityPageHeader() {
        return await this.header.textContent();
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

    async getErrorMsg() {
        return await this.errorMsg.textContent();
    }
    
    async enterIdentificationDetailsWithPassport(passportno) {
        await this.openIDType.click();
        await this.selectPassport.click();
        await this.passportInputField.click();
        await this.passportInputField.fill(passportno);
    }

    async enterIdentificationDetailsWithHealth(healthno) {
        await this.openIDType.click();
        await this.selectHealthCard.click();
        await this.provinceList.click();
        await this.selectProvince.click();
        await this.healthCardInputField.fill(healthno);
    }

    async enterIdentificationDetailsWithLicense(licenseno) {
        await this.openIDType.click();
        await this.selectDriverLicense.click();
        await this.provinceList.click();
        await this.selectProvince.click();
        await this.licenseInputField.fill(licenseno);
    }

    async clickCheckBox() {
        await this.agreeCheckBox.click();
    }

    async clickAcceptandPayBtn() {
        await this.acceptAndPayBtn.isVisible();
        await this.acceptAndPayBtn.click();
    }

    async getIdTypeList() {
        await this.openIDType.click();
        return await this.options.allTextContents();
    }
}

module.exports = { ConfirmIdentityPage };