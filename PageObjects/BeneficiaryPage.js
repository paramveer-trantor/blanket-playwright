const{ expect, request } = require("@playwright/test");

class BeneficiaryPage {

    constructor(page) {
        this.page = page;
        this.header = page.locator("//div[text()=' Beneficiaries ']");
        this.addBeneficiryBtn = page.locator("[name='addBeneficiary']"); 
        this.dialogBox =  page.getByRole('dialog');
        this.openMyBeneficiaries = this.dialogBox.getByLabel('My Beneficiaries', { exact: true });
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
        this.errorMsg = page.locator("//div[@class='red--text font-weight-bold']");
        this.noBen = page.locator("//label[text()='Proceed without adding a beneficiary']");
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
        this.addedbendetails = page.locator("//div[@class ='v-data-table__wrapper']/table/tbody/tr/td");
    }

    async getBenecificaryPageHeader() {
        return (await this.header.textContent()).trim();
    }

    async clickAddBeneficiryBtn() {
        //await this.page.waitForLoadState('networkidle');
        await this.addBeneficiryBtn.click();
    }

    async enterBeneficiaryDetails(benfirstname, benlastname, bendob, benshare) {
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

    async getAddedBenDetails() {
        let addedBenDetails = [];
        addedBenDetails[0] = await this.addedbendetails.first().textContent();
        for(let i=1; i <= 8; i++) {
            addedBenDetails[i] = await this.addedbendetails.nth(i).textContent();
        }
        return addedBenDetails;
    }

    async clickConitnueBtn() {
        await this.continueBtn.isEnabled();
        await this.continueBtn.click();
    }

    async getErrorMessage() {
        return (await this.errorMsg.textContent()).trim();
    }

    async checkWithoutBenCheckbox() {
        await this.noBen.click();
    }

}

module.exports = { BeneficiaryPage }; 