export class BeneficiaryPage {

    constructor(page) {
        this.page = page;
        this.header = page.locator("div[text=' Beneficiaries ']");
        this.addBeneficiryBtn = page.getByRole('button', {name: ' Add beneficiary '}); 
        this.addBeneficiryBtn_Fr = page.getByRole('button', {name: ' Ajouter bénéficiaire '}); 
        this.dialogBox =  page.getByRole('dialog');
        this.openBeneficiariesTypes = this.dialogBox.getByLabel('My Beneficiaries', { exact: true });
        this.openBeneficiariesTypes_Fr = this.dialogBox.getByLabel('Mes bénéficiaires', { exact: true });
        this.selectIndividual = this.dialogBox.getByText('Individual', { exact: true });
        this.selectIndividual_Fr = this.dialogBox.getByText('Personne physique', { exact: true });
        this.selectLegal = this.dialogBox.getByText('Legal entity', { exact: true });
        this.selectLegal_Fr = this.dialogBox.getByText('Personne légale', { exact: true });
        this.benFirstName = this.dialogBox.getByLabel('First name', { exact: true });
        this.benFirstName_Fr = this.dialogBox.getByLabel('Prénom', { exact: true });
        this.benLastName = this.dialogBox.getByLabel('Last name', { exact: true }); 
        this.benLastName_Fr = this.dialogBox.getByLabel('Nom de Famille', { exact: true });
        this.firstName = this.dialogBox.getByLabel('First name', { exact: true });
        this.lastName = this.dialogBox.getByLabel('Last name', { exact: true }); 
        this.openRelationshipDropDown = this.dialogBox.getByLabel('Relationship to policy owner', { exact: true });
        this.openRelationshipDropDown_Fr = this.dialogBox.getByLabel('Lien avec le titulaire', { exact: true });
        this.selectRelationshipOption = this.dialogBox.getByText('Brother', { exact: true });
        this.selectIndividualRelationshipOption_Fr = this.dialogBox.getByText('Ami', { exact: true });
        this.selectLegalRelationshipOption = this.dialogBox.getByText('Partner', { exact: true });
        this.selectRelationshipOption_Fr = this.dialogBox.getByText('Actionnaire', { exact: true });
        this.companyName = this.dialogBox.getByLabel('Company Name', { exact: true });
        this.companyName_Fr = this.dialogBox.getByLabel('Nom de la compagnie', { exact: true });
        this.openBeneficiaryType = this.dialogBox.getByLabel('Beneficiary type', { exact: true });
        this.openBeneficiaryType_Fr = this.dialogBox.getByLabel('Type de bénéficiaire', { exact: true });
        this.selectBeneficiryType = this.dialogBox.getByText('Revocable', { exact: true });
        this.selectBeneficiryType_Fr = this.dialogBox.getByText('Révocable', { exact: true });
        this.dateOfBirth = this.dialogBox.getByLabel('Date of Birth', { exact: true });
        this.dateOfBirth_Fr = this.dialogBox.getByLabel('Date de naissance', { exact: true });
        this.percentage = this.dialogBox.getByLabel('% Share', { exact: true });
        this.percentage_Fr = this.dialogBox.getByLabel('% partage', { exact: true });
        this.saveBtn = this.dialogBox.getByRole('button', { name: ' Save ' });
        this.saveBtn_Fr = this.dialogBox.getByRole('button', { name: ' Sauvegarder ' });
        this.errorMsg = page.locator('.red--text.font-weight-bold');
        this.noBen = page.getByText('Proceed without adding a beneficiary');
        this.noBen_Fr = page.getByText('Poursuivre sans nommer de bénéficiaire');
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
        this.continueBtn_Fr = page.getByRole('button', { name: ' Continuer ' });
        this.addedbendetails = page.locator("//div[@class ='v-data-table__wrapper']/table/tbody/tr/td");
        this.trusteeHeader = this.dialogBox.getByRole('heading', { name: 'Trustee Information' });
        //this.trusteeHeader = this.dialogBox.getByText('Trustee Information');
        this.trusteeRel = this.dialogBox.getByLabel('Relationship to minor beneficary');
        this.errorMsgs = this.dialogBox.locator('.v-messages__message');
    }

    async getBenecificaryPageHeader() {
        return (await this.header.textContent()).trim();
    }

    async enterIndividualBeneficiaryDetails(benfirstname, benlastname, bendob, benshare) {
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

    async enterLegalBeneficiaryDetails(benfirstname, benlastname, bencompany, benshare) {
        await this.addBeneficiryBtn.click();
        await this.openBeneficiariesTypes.click();
        await this.selectLegal.click();
        await this.benFirstName.click();
        await this.benFirstName.fill(benfirstname);
        await this.benLastName.click();
        await this.benLastName.fill(benlastname);
        await this.openRelationshipDropDown.click();
        await this.selectLegalRelationshipOption.click();
        await this.companyName.fill(bencompany);
        await this.openBeneficiaryType.click();
        await this.selectBeneficiryType.click();
        await this.percentage.click();
        await this.percentage.fill(benshare);
        await this.saveBtn.isEnabled();
        await this.saveBtn.click();
    }

    async enterIndividualBeneficiaryDetails_Fr(benfirstname, benlastname, bendob, benshare) {
        await this.addBeneficiryBtn_Fr.click();
        await this.openBeneficiariesTypes_Fr.click();
        await this.selectIndividual_Fr.click();
        await this.benFirstName_Fr.click();
        await this.benFirstName_Fr.fill(benfirstname);
        await this.benLastName_Fr.click();
        await this.benLastName_Fr.fill(benlastname);
        await this.openRelationshipDropDown_Fr.click();
        await this.selectIndividualRelationshipOption_Fr.click();
        await this.openBeneficiaryType_Fr.click();
        await this.selectBeneficiryType_Fr.click();
        await this.dateOfBirth_Fr.click();
        await this.dateOfBirth_Fr.fill(bendob);
        await this.percentage_Fr.click();
        await this.percentage_Fr.fill(benshare);
        await this.saveBtn_Fr.isEnabled();
        await this.saveBtn_Fr.click();
    }

    async enterLegalBeneficiaryDetails_Fr(benfirstname, benlastname, bencompany, benshare) {
        await this.addBeneficiryBtn_Fr.click();
        await this.openBeneficiariesTypes_Fr.click();
        await this.selectLegal_Fr.click();
        await this.benFirstName_Fr.click();
        await this.benFirstName_Fr.fill(benfirstname);
        await this.benLastName_Fr.click();
        await this.benLastName_Fr.fill(benlastname);
        await this.openRelationshipDropDown_Fr.click();
        await this.selectRelationshipOption_Fr.click();
        await this.companyName_Fr.fill(bencompany);
        await this.openBeneficiaryType_Fr.click();
        await this.selectBeneficiryType_Fr.click();
        await this.percentage_Fr.click();
        await this.percentage_Fr.fill(benshare);
        await this.saveBtn_Fr.isEnabled();
        await this.saveBtn_Fr.click();
    }

    async enterIndiBenificiaryAsMinor(benfirstname, benlastname, bendob, benshare) {
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
    }

    async checkIfTrusteeFieldsAreVisible() {
        return await this.trusteeHeader;
    }

    async enterIndividualTrusteeInfo(trusteefirstname, trusteelastname, trusteedob, trusteerel) {
        await this.firstName.last().fill(trusteefirstname);
        await this.lastName.last().fill(trusteelastname);
        await this.dateOfBirth.last().fill(trusteedob);
        await this.trusteeRel.fill(trusteerel);
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

    async checkWithoutBenCheckbox_Fr() {
        await this.noBen_Fr.click();
    }

    async getIncorrectDateError(bendob) {
        await this.addBeneficiryBtn.click();
        await this.openBeneficiariesTypes.click();
        await this.selectIndividual.click();
        await this.dateOfBirth.click();
        await this.dateOfBirth.fill(bendob);
        return (await this.errorMsgs.textContent()).trim();
    }

    async clickContinueBtn_Fr() {
        await this.continueBtn_Fr.click();
    }

}

