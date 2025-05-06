import { BasePage } from "./BasePage";

export class PreApplicationPage extends BasePage {

    constructor(page) {
        super(page);
        this.header = page.getByText(' Pre Application ', { exact: true });
        this.dialogBox = page.getByRole('dialog');
        this.dialogContinueBtn = this.dialogBox.getByRole('button', { name: 'Continue' });
        this.dialogContinueBtn_Fr = this.dialogBox.getByRole('button', { name: 'Continuer' });
        this.dialogCloseBtn = this.dialogBox.getByRole('button', { name: ' Close ' });
        this.afterHoursMsg = this.dialogBox.locator('.v-card__title');
        this.firstName = page.getByTestId('firstname');
        this.lastName = page.getByTestId('lastname');
        this.genderFemale = page.getByLabel('Female');
        this.dateOfBirth = page.getByLabel('MM/DD/YYYY');
        this.dob = page.locator("[name='dob']");
        this.errorMsgs = page.getByTestId('preApplicationForm').locator('.v-messages__message');
        this.address = page.getByTestId('preApplicationForm').getByLabel('Address', { exact: true });
        this.address_Fr = page.getByTestId('preApplicationForm').getByLabel('Adresse', { exact: true });
        this.addressList = page.locator(".address-list");
        this.selectAddress = page.locator(".address-item");
        this.city = page.getByTestId('preApplicationForm').getByLabel('City', { exact: true });
        this.province = page.getByTestId('preApplicationForm').getByLabel('Province', { exact: true });
        this.selectProvinceBC = page.getByRole('listbox').getByRole('option').filter({ hasText: 'British Columbia' });
        this.selectProvinceMN = page.getByRole('listbox').getByRole('option');
        this.selectProvinceNB = page.getByRole('listbox').getByRole('option');
        this.selectProvinceNL = page.getByRole('listbox').getByRole('option');
        this.selectProvinceNS = page.getByRole('listbox').getByRole('option');
        this.selectProvinceON = page.getByRole('listbox').getByRole('option');
        this.selectProvincePE = page.getByRole('listbox').getByRole('option');
        this.selectProvinceSW = page.getByRole('listbox').getByRole('option');
        this.zipcode = page.getByTestId('preApplicationForm').getByLabel('Postal code', { exact: true });
        this.notAvailableMsg = this.dialogBox.locator("//p[@class='font-weight-bold text-center']");
        this.email = page.locator("[name='emailAddress']");
        this.phoneNumber = page.locator("[name = 'phoneNumber']");
        this.optionYes = page.getByText('Yes', { exact: true });
        this.optionYes_Fr = page.getByText('Oui', { exact: true });
        this.optionNo = page.getByText('No', { exact: true });
        this.optionNo_Fr = page.getByText('Non', { exact: true });
        this.questionSurvey = page.locator("//input[@name='survey 0']/following-sibling::div[1]");
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
        this.continueBtn_Fr = page.getByRole('button', { name: ' Continuer ' });
        this.warningMsgText = page.locator("//div[@class='v-dialog v-dialog--active']/div/div/div/div[@class='col']");
        this.closeBtn = page.getByRole('button', { name: ' Close '});
        this.addressvalidate = this.dialogBox.locator('.col');
        this.backToQuoteBtn = page.getByRole('button', { name: ' Back to quote ' }); 
        this.dobValue = page.locator("[name='dob']");
        this.canadianValue = page.locator("[name='isCanadian0']");
        this.nonSmokerValue = page.locator("[name='tobaccoFor12Month1']");
    }

    async getPreApplicationPageHeader() {
        return (await this.header.textContent()).trim();
    }

    async acceptPopWindow() {
        if (await this.dialogBox.isVisible()) {
            await this.dialogContinueBtn.click();
        }
    }
    
    async checkAfterHoursDialogIsVisible() {
        const status_afterhours = await this.dialogBox.isVisible();
        return status_afterhours;
    }

    async getAfterHoursMsg() {
        return (await this.afterHoursMsg.textContent()).trim();  
    }

    async verifyGenderFieldIsDisabled(){
        return await this.genderFemale.isDisabled();
    }

    async verifyDOBFieldIsDisabled(){
        return await this.dob.isDisabled();
    }

    async verifySmokerQuestionIsDisabled(){
        return await this.nonSmokerValue.isDisabled();
    }

    async verifyDOBHasValue() {
        return await this.dobValue.inputValue();   
    }

    async verifyIsCanadianTrue() {
        return await this.canadianValue.isChecked();   
    }

    async verifyIsNonSmokerTrue() {
        return await this.nonSmokerValue.isChecked();   
    }

    async verifyAddressOptionsAreVisible(houseaddress) {
        await this.address.pressSequentially(houseaddress);
        await this.page.waitForTimeout(4000);
        return await this.addressList.isVisible();
    }

    async fillPreApplicationFormPage(firstname, lastname, houseaddress, phonenumber, option) {
        if (await this.dialogBox.isVisible()) {
            await this.dialogContinueBtn.click();
        }  
        await this.firstName.click();
        await this.firstName.fill(firstname);
        await this.lastName.click();
        await this.lastName.fill(lastname);
        await this.address.pressSequentially(houseaddress);
        await this.addressList.waitFor();
        await this.selectAddress.first().click();
        await this.phoneNumber.click();
        await this.phoneNumber.fill(phonenumber);
        if (option == 'Yes') {
            await this.optionYes.nth(2).click();
            await this.optionYes.nth(3).click();
            await this.optionYes.nth(4).click();
            await this.questionSurvey.click();
        }
        else {
            await this.optionNo.nth(2).click();
            await this.optionNo.nth(3).click();
            await this.optionNo.nth(4).click();
        }
    }

    async fillPreApplicationFormPage_Fr(firstname, lastname, houseaddress, phonenumber, option) {
        if (await this.dialogBox.isVisible()) {
            await this.dialogContinueBtn_Fr.click();
        }  
        await this.firstName.click();
        await this.firstName.fill(firstname);
        await this.lastName.click();
        await this.lastName.fill(lastname);
        await this.address_Fr.pressSequentially(houseaddress);
        await this.addressList.waitFor();
        await this.selectAddress.first().click();
        await this.phoneNumber.click();
        await this.phoneNumber.fill(phonenumber);
        if (option == 'Yes') {
            await this.optionYes_Fr.nth(2).click();
            await this.optionYes_Fr.nth(3).click();
            await this.optionYes_Fr.nth(4).click();
            await this.questionSurvey.click();
        }
        else {
            await this.optionNo_Fr.nth(2).click();
            await this.optionNo_Fr.nth(3).click();
            await this.optionNo_Fr.nth(4).click();
        }
    }

    async fillformAndEnterAddressManually(firstname, lastname, houseaddress, city, zipcode, phonenumber, option) {
        if (await this.dialogBox.isVisible()) {
            await this.dialogContinueBtn.click();
        }
        await this.firstName.click();
        await this.firstName.fill(firstname);
        await this.lastName.click();
        await this.lastName.fill(lastname);
        await this.address.fill(houseaddress);
        await this.city.click();
        await this.city.fill(city);
        await  this.province.click();
        await this.selectProvinceON.nth(6).click();
        await this.zipcode.click();
        await this.zipcode.fill(zipcode);
        await this.phoneNumber.click();
        await this.phoneNumber.fill(phonenumber);
        if (option == 'Yes') {
            await this.optionYes.nth(2).click();
            await this.optionYes.nth(3).click();
            await this.optionYes.nth(4).click();
            await this.questionSurvey.click();
        }
        else {
            await this.optionNo.nth(2).click();
            await this.optionNo.nth(3).click();
            await this.optionNo.nth(4).click();
        }
    }

    async getProductNotAvailableMsg(province) {  
        if(province = "Manitoba"){
            await this.province.click();
            await this.selectProvinceMN.nth(2).click();  
            const message_product = (await this.notAvailableMsg.last().textContent()).trim();
            await this.dialogCloseBtn.click();
            return message_product;
        }

        if(province = "New Brunswick"){
            await this.province.click();
            await this.selectProvinceNB.nth(3).click();  
            const message_product = (await this.notAvailableMsg.last().textContent()).trim();
            await this.dialogCloseBtn.click();
            return message_product;
        }

        if(province = "Newfoundland and Labrador"){
            await this.province.click();
            await this.selectProvinceNL.nth(4).click();  
            const message_product = (await this.notAvailableMsg.last().textContent()).trim();
            await this.dialogCloseBtn.click();
            return message_product;
        }

        if(province = "Nova Scotia"){
            await this.province.click();
            await this.selectProvinceNS.nth(5).click();  
            const message_product = (await this.notAvailableMsg.last().textContent()).trim();
            await this.dialogCloseBtn.click();
            return message_product;
        }

        if(province = "Prince Edward Island"){
            await this.province.click();
            await this.selectProvincePE.nth(7).click();  
            const message_product = (await this.notAvailableMsg.last().textContent()).trim();
            await this.dialogCloseBtn.click();
            return message_product;
        }

        if(province = "Saskatchewan"){
            await this.province.click();
            await this.selectProvinceSW.last().click();  
            const message_product = (await this.notAvailableMsg.last().textContent()).trim();
            await this.dialogCloseBtn.click();
            return message_product;
        }

    }

    async verifyEmailValue() {
        return await this.email.inputValue();;   
    }

    async getIncorrectPhoneErrorMsg(phonenumber) {
        await this.phoneNumber.fill(phonenumber);
        return (await this.errorMsgs.textContent()).trim();
    }

    async getIncorrectPhoneErrorMsg_Fr(phonenumber) {
        if (await this.dialogBox.isVisible()) {
            await this.dialogContinueBtn_Fr.click();
        }
        await this.phoneNumber.fill(phonenumber);
        return (await this.errorMsgs.textContent()).trim();
    }

    async getAddressValidateFailureErrorMsg() {
        return (await this.addressvalidate.first().textContent()).trim();
    }

    async fillUserInfoWithReplacePolicyAsYes(firstname, lastname, houseaddress, phonenumber) {
        if (await this.dialogBox.isVisible()) {
            await this.dialogContinueBtn.click();
        }
        await this.firstName.click();
        await this.firstName.fill(firstname);
        await this.lastName.click();
        await this.lastName.fill(lastname);
        await this.address.pressSequentially(houseaddress);
        await this.addressList.waitFor();
        await this.selectAddress.first().click();
        await this.phoneNumber.click();
        await this.phoneNumber.fill(phonenumber);
        await this.optionYes.nth(2).click();
        await this.optionNo.nth(3).click();
        await this.optionNo.nth(4).click();
    }

    async fillUserInfoWithCurrentlyAbsentFromWorkAsYes(firstname, lastname, houseaddress, phonenumber) {
        if (await this.dialogBox.isVisible()) {
            await this.dialogContinueBtn.click();
        }
        await this.firstName.click();
        await this.firstName.fill(firstname);
        await this.lastName.click();
        await this.lastName.fill(lastname);
        await this.address.pressSequentially(houseaddress);
        await this.addressList.waitFor();
        await this.selectAddress.first().click();
        await this.phoneNumber.click();
        await this.phoneNumber.fill(phonenumber);
        await this.optionNo.nth(2).click();
        await this.optionYes.nth(3).click();
        await this.optionNo.nth(4).click();  
    }

    async fillUserInfoWithPastAbsentFromWorkAsYes(firstname, lastname, houseaddress, phonenumber) {
        if (await this.dialogBox.isVisible()) {
            await this.dialogContinueBtn.click();
        }
        await this.firstName.click();
        await this.firstName.fill(firstname);
        await this.lastName.click();
        await this.lastName.fill(lastname);
        await this.address.pressSequentially(houseaddress);
        await this.addressList.waitFor();
        await this.selectAddress.first().click();
        await this.phoneNumber.click();
        await this.phoneNumber.fill(phonenumber);
        await this.optionNo.nth(2).click();
        await this.optionNo.nth(3).click();
        await this.optionYes.nth(4).click();
        await this.questionSurvey.click();
    }

    async clickConitnueBtn() {
        await this.continueBtn.click();
    }

    async clickContinueBtn_Fr() {
        await this.continueBtn_Fr.click();
    }

    async clickBackToQuoteBtn() {
        await this.page.waitForTimeout(1000);
        await this.backToQuoteBtn.isVisible();
        await this.backToQuoteBtn.click();
    }

}

