class BeneficiaryPage {

    constructor(page) {
        this.page = page;
        this.addBeneficiryBtn = page.getByRole('button', { name: '  Add beneficiary ' });
        this.openMyBeneficiaries = page.getByRole('dialog').getByLabel('My Beneficiaries', { exact: true });
        this.selectIndividual = this.openMyBeneficiaries.getByText('Individual', { exact: true });
        this.benFirstName = this.openMyBeneficiaries.locator("[name='benFirstName']");
        this.benLastName = this.openMyBeneficiaries.locator("[name='benLastName']");
        this.openRelationshipDropDown = this.openMyBeneficiaries.getByLabel('Relationship to policy owner', { exact: true });
        this.selectRelationshipOption = this.openMyBeneficiaries.getByText('Brother', { exact: true });
        this.openBeneficiaryType = this.openMyBeneficiaries.getByLabel('Beneficiary type', { exact: true });
        this.selectBeneficiryType = this.openMyBeneficiaries.getByText('Revocable', { exact: true });
        this.dateOfBirth = this.openMyBeneficiaries.getByLabel('MM/DD/YYYY', { exact: true });
        this.percentage = this.openMyBeneficiaries.locator("[name='percentage']");
        this.saveBtn = this.openMyBeneficiaries.getByRole('button', { name: ' Save ' });
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
    }

    async clickAddBeneficiryBtn() {
        await this.page.waitForResponse('*CATermDecission');
        await this.page.waitForLoadState('networkidle');
        await this.addBeneficiryBtn.click();
    }

    async enterBeneficiary(benfirstname, benlastname, bendob, benshare) {
        await this.openBeneficiaryType.click();
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