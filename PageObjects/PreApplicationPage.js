const { expect, request } = require("@playwright/test");

class PreApplicationPage {

    constructor(page) {
        this.page = page;
        this.header = page.getByText(' Pre Application ', { exact: true });
        this.addressList = page.locator(".address-list");
        this.dialogBox = page.getByRole('dialog');
        this.dialogContinueBtn = page.getByRole('dialog').getByRole('button', { name: 'Continue' });
        this.firstName = page.getByLabel('First name', { exact: true });
        this.lastName = page.getByLabel('Last name', { exact: true });
        this.dateOfBirth = page.getByLabel('MM/DD/YYYY');
        this.errorMsgs = page.locator('.v-messages__message');
        this.address = page.getByLabel('Address', { exact: true });
        this.selectAddress = page.locator(".address-item");
        this.phoneNumber = page.getByLabel('Phone number', { exact: true });
        this.optionYes = page.getByText('Yes', { exact: true });
        this.optionNo = page.getByText('No', { exact: true });
        this.questionSurvey = page.locator("//input[@name='survey 0']/following-sibling::div[1]");
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
    }

    async getPreApplicationPageHeader() {
        return await this.header.textContent();
    }

    async acceptPopWindow() {
        if (await this.dialogBox.isVisible()) {
            await this.dialogContinueBtn.click();
        }
    }

    async enterUserName(firstname, lastname) {
        await this.firstName.click();
        await this.firstName.fill(firstname);
        await this.lastName.click();
        await this.lastName.fill(lastname);
    }

    async getIncorrectDateErrorMsg(date) {
        await this.page.locator("[name='dob']").click();
        await this.page.locator("//button[@aria-label='Clear MM/DD/YYYY']").click();
        await this.dateOfBirth.fill(date);
        const errorMsg = await this.errorMsgs.textContent();
        return errorMsg;
    }

    async enterAddress(houseaddress) {
        await this.address.pressSequentially(houseaddress);
        await this.addressList.waitFor();
        await this.selectAddress.first().click();
    }

    async enterPhoneNumber(phonenumber) {
        await this.phoneNumber.fill(phonenumber);
    }

    async getIncorrectPhoneErrorMsg(phonenumber) {
        await this.phoneNumber.fill(phonenumber);
        const errorMsg = await this.errorMsgs.textContent();
        return errorMsg;
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
}

module.exports = { PreApplicationPage };
