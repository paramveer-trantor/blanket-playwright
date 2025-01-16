export class BeneficiaryPage {

    constructor(page) {
        this.page = page;
        this.header = page.locator("div[text=' Beneficiaries ']");
        this.addBeneficiryBtn = page.getByRole('button', {name: ' Add beneficiary '}); 
        this.dialogBox =  page.getByRole('dialog');
        this.openBeneficiariesTypes = this.dialogBox.getByLabel('My Beneficiaries', { exact: true });
        this.selectIndividual = this.dialogBox.getByText('Individual', { exact: true });
        this.benFirstName = this.dialogBox.getByLabel('First name', { exact: true });
        this.benLastName = this.dialogBox.getByLabel('Last name', { exact: true }); 
        this.openRelationshipDropDown = this.dialogBox.getByLabel('Relationship to policy owner', { exact: true });
        this.selectRelationshipOption = this.dialogBox.getByText('Brother', { exact: true });
        this.openBeneficiaryType = this.dialogBox.getByLabel('Beneficiary type', { exact: true });
        this.selectBeneficiryType = this.dialogBox.getByText('Revocable', { exact: true });
        this.dateOfBirth = this.dialogBox.getByLabel('MM/DD/YYYY', { exact: true });
        this.percentage = this.dialogBox.getByLabel('% Share', { exact: true });
        this.saveBtn = this.dialogBox.getByRole('button', { name: ' Save ' });
        this.errorMsg = page.locator('.red--text.font-weight-bold');
        this.noBen = page.getByText('Proceed without adding a beneficiary');
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
        this.addedbendetails = page.locator("//div[@class ='v-data-table__wrapper']/table/tbody/tr/td");
        this.errorMsgs = this.dialogBox.locator('.v-messages__message');
    }

    async getBenecificaryPageHeader() {
        return (await this.header.textContent()).trim();
    }

    async enterBeneficiaryDetails(benfirstname, benlastname, bendob, benshare) {
        await this.addBeneficiryBtn.click();
        await this.openBeneficiariesTypes.click();
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

    async getIncorrectDateError(bendob) {
        await this.addBeneficiryBtn.click();
        await this.openBeneficiariesTypes.click();
        await this.selectIndividual.click();
        await this.dateOfBirth.click();
        await this.dateOfBirth.fill(bendob);
        return (await this.errorMsgs.textContent()).trim();
    }

}

