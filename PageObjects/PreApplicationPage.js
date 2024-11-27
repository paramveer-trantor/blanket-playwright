const { expect, request } = require("@playwright/test");

class PreApplicationPage {

    constructor(page) {
        this.page = page;
        this.header = page.getByText(' Pre Application ', { exact: true });
        this.addressList = page.locator(".address-list");
        this.dialogBox = page.getByRole('dialog');
        this.dialogContinueBtn = this.dialogBox.getByRole('button', { name: 'Continue' });
        this.afterHoursMsg = this.dialogBox.locator('.v-card__title');
        this.firstName = page.getByLabel('First name', { exact: true });
        this.lastName = page.getByLabel('Last name', { exact: true });
        this.dateOfBirth = page.getByLabel('MM/DD/YYYY');
        this.dob = page.locator("[name='dob']");
        this.errorMsgs = page.locator('.v-messages__message');
        this.address = page.getByLabel('Address', { exact: true });
        this.city = page.getByLabel('City', { exact: true });
        this.province = page.getByLabel('Province', { exact: true });
        this.selectProvinceMN = page.getByRole('listbox').getByRole('option').filter({ hasText: 'Manitoba' });
        this.selectProvinceON = page.getByRole('listbox').getByRole('option').filter({ hasText: 'Ontario' });
        this.zipcode = page.getByLabel('Postal code', { exact: true });
        this.notAvailableMsg = this.dialogBox.locator("//p[@class='font-weight-bold text-center']");
        this.selectAddress = page.locator(".address-item");
        this.phoneNumber = page.getByLabel('Phone number', { exact: true });
        this.optionYes = page.getByText('Yes', { exact: true });
        this.optionNo = page.getByText('No', { exact: true });
        this.questionSurvey = page.locator("//input[@name='survey 0']/following-sibling::div[1]");
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
        this.warningMsgText = page.locator("//div[@class='v-dialog v-dialog--active']/div/div/div/div[@class='col']");
        this.closeBtn = page.getByRole('button', { name: ' Close '});
        this.addressvalidate = this.dialogBox.locator('.col');
        this.backToQuoteBtn = page.getByRole('button', { name: ' Back to quote ' }); 
    }

    async getPreApplicationPageHeader() {
        return (await this.header.textContent()).trim();
    }

    async acceptPopWindow() {
        if (await this.dialogBox.isVisible()) {
            await this.dialogContinueBtn.click();
        }
    }  

    async getAfterHoursMsg() {
        return (await this.afterHoursMsg.textContent()).trim();  
    }

    async enterUserName(firstname, lastname) {
        await this.firstName.click();
        await this.firstName.fill(firstname);
        await this.lastName.click();
        await this.lastName.fill(lastname);
    }

    async enterDOB(date) {
        await this.page.locator("//button[@aria-label='Clear MM/DD/YYYY']").click();
        await this.dateOfBirth.fill(date);
    }

    async getIncorrectDateErrorMsg(date) {
        await this.page.locator("[name='dob']").click();
        await this.page.locator("//button[@aria-label='Clear MM/DD/YYYY']").click();
        await this.dateOfBirth.fill(date);
        return await this.errorMsgs.textContent();
    }

    async enterAddress(houseaddress) {
        await this.address.pressSequentially(houseaddress);
        await this.addressList.waitFor();
        await this.selectAddress.first().click();
    }

    async enterAddressManually(houseaddress, city, zipcode) {
        await this.address.fill(houseaddress);
        await this.city.click();
        await this.city.fill(city);
        await  this.province.click();
        await this.selectProvinceON.click();
        await this.zipcode.click();
        await this.zipcode.fill(zipcode);
    }

    async getProductNotAvailableMsg() {  
        await  this.province.click();
        await this.selectProvinceMN.click();   
        return (await this.notAvailableMsg.last().textContent()).trim();
    }

    async enterPhoneNumber(phonenumber) {
        await this.phoneNumber.click();
        await this.phoneNumber.fill(phonenumber);
    }

    async getIncorrectPhoneErrorMsg(phonenumber) {
        await this.phoneNumber.fill(phonenumber);
        return (await this.errorMsgs.textContent()).trim();
    }

    async last3Questions(option) {
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

    async clickConitnueBtn() {
        await this.continueBtn.click();
    }

    async getNonCandianWarningMsg() {
        await this.optionNo.first().click();
        const msg_warning = (await this.warningMsgText.textContent()).trim();
        await this.closeBtn.click();
        await this.optionYes.first().click();
        return msg_warning;  
    }

    async getAddressValidateFailureErrorMsg() {
        return (await this.addressvalidate.first().textContent()).trim();
    }

    async answerReplacePolicyAsYes() {
        await this.optionYes.nth(2).click();
        await this.optionNo.nth(3).click();
        await this.optionNo.nth(4).click();
    }

    async answerCurrentAbsentFromWorkAsYes() {
        await this.optionNo.nth(2).click();
        await this.optionYes.nth(3).click();
        await this.optionNo.nth(4).click();  
    }

    async answerPastAbsentFromWorkAsYes() {
        await this.optionNo.nth(2).click();
        await this.optionNo.nth(3).click();
        await this.optionYes.nth(4).click();
        await this.questionSurvey.click();
    }

    async clickBackToQuoteBtn() {
        await this.backToQuoteBtn.isVisible();
        await this.backToQuoteBtn.click();
    }

}

module.exports = { PreApplicationPage };
