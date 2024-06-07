class ConfirmIdentityPage {

    constructor(page) {
        this.openIDType = page.getByLabel('Please select an ID type', { exact: true });
        this.selectIDType = page.getByText('Passport', { exact: true });
        this.passportInputField = page.getByLabel('Passport number', { exact: true });
        this.agreeCheckBox = page.locator("[name='payAgree']");
        this.acceptAndPayBtn = page.getByRole('button', { name: ' Accept and pay ' }); 
    }

    async enterIdentificationDetails(passportno) {
        await this.openIDType.click();
        await this.selectIDType.click();
        await this.passportInputField.click();
        await this.passportInputField.fill(passportno);
    }

    async clickCheckBox() {
        await this.agreeCheckBox.click();
    }

    async clickAcceptandPayBtn() {
        await this.acceptAndPayBtn.isVisible();
        await this.acceptAndPayBtn.click();
    }
}

module.exports = { ConfirmIdentityPage };