const{ expect, request } = require("@playwright/test");

class BeneficiaryPage {

    constructor(page) {
        this.page = page;
        this.header = page.locator("//div[text()=' Beneficiaries ']");
        this.addBeneficiryBtn = page.locator("[name='addBeneficiary']"); 
        this.dialogBox =  page.getByRole('dialog');
        this.openMyBeneficiaries = page.getByRole('dialog').getByLabel('My Beneficiaries', { exact: true });
        this.selectIndividual = this.dialogBox.getByText('Individual', { exact: true });
        this.benFirstName = this.dialogBox.locator("[name='benFirstName']");
        this.benLastName = this.dialogBox.locator("[name='benLastName']");
        this.openRelationshipDropDown = this.dialogBox.getByLabel('Relationship to policy owner', { exact: true });
        this.selectRelationshipOption = this.dialogBox.getByText('Brother', { exact: true });
        this.openBeneficiaryType = this.dialogBox.getByLabel('Beneficiary type', { exact: true });
        this.selectBeneficiryType = this.dialogBox.getByText('Revocable', { exact: true });
        this.dateOfBirth = this.dialogBox.getByLabel('MM/DD/YYYY', { exact: true });
        this.percentage = this.dialogBox.locator("[name='percentage']");
        this.saveBtn = this.dialogBox.getByRole('button', { name: ' Save ' });
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
    }

    async verifyBenecificaryPageHeader() {
        expect(await this.header.textContent()).toContain('Beneficiaries');
    }

    async clickAddBeneficiryBtn() {
        //await this.page.waitForLoadState('networkidle');
        await this.addBeneficiryBtn.click();
    }

    async enterBeneficiary(benfirstname, benlastname, bendob, benshare) {
        await this.openMyBeneficiaries.click();
        await this.selectIndividual.click();
        await this.benFirstName.click();
        await this.benFirstName.fill(benfirstname);
        await this.benLastName.click();
        await this.benLastName.fill(benlastname);
        await this.openRelationshipDropDown.click();
        await this.selectRelationshipOption.click();
        await this.openBeneficiaryType.click();
        await this.selectBeneficiryType.click();
        await this.dateOfBirth.click();
        await this.dateOfBirth.fill(bendob);
        await this.percentage.click();
        await this.percentage.fill(benshare);
        await this.saveBtn.isEnabled();
        await this.saveBtn.click();
    }

    async clickConitnueBtn() {
        await this.continueBtn.isEnabled();
        await this.continueBtn.click();
    }

}

module.exports = { BeneficiaryPage }; 