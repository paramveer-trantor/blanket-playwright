class PreApplicationPage {

    constructor(page) {
        this.addressList = page.locator(".address-list");
        this.dialogBox = page.getByRole('dialog');
        this.dialogContinueBtn = page.getByRole('dialog').getByRole('button', { name: 'Continue' });
        this.firstName = page.getByLabel('First name', { exact: true });
        this.lastName = page.getByLabel('Last name', { exact: true });
        this.address = page.getByLabel('Address', { exact: true });
        this.selectAddress = page.locator(".address-item");
        this.phoneNumber = page.getByLabel('Phone number', { exact: true });
        this.optionNo = page.getByText('No', { exact: true });
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
    }

    async acceptPopWindow() {
        if (await this.dialogBox.isVisible()) {
            //await this.dialogContinueBtn.IsEnabled();
            await this.dialogContinueBtn.click();
        }
    }

    async enterUserName(firstname, lastname) {
        await this.firstName.click();
        await this.firstName.fill(firstname);
        await this.lastName.click();
        await this.lastName.fill(lastname);
    }

    async enterAddress(houseaddress) {
        await this.address.pressSequentially(houseaddress);
        await this.addressList.waitFor();
        await this.selectAddress.first().click();
    }

    async enterPhoneNumber(phonenumber) {
        await this.phoneNumber.fill(phonenumber);
    }

    async selectAnswerForQuestion3() {
        await this.optionNo.nth(2).click();
    }

    async selectAnswerForQuestion4() {
        await this.optionNo.nth(3).click();
    }

    async selectAnswerForQuestion5() {
        await this.optionNo.nth(4).click();
    }

    async clickConitnueBtn() {
        await this.continueBtn.click();
    }
}

module.exports = { PreApplicationPage };
