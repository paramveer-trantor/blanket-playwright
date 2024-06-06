exports.PreApplicationPage = class PreApplicationPage {

    constructor(page) {
        this.addressList = page.locator(".address-list");
        this.dialog = page.getByRole('dialog').getByRole('button', { name: 'Continue' });
        this.firstName = page.getByLabel('First name', { exact: true });
        this.lastName = page.getByLabel('Last name', { exact: true });
        this.address = page.getByLabel('Address', { exact: true });
        this.selectAddress = page.locator(".address-item");
        this.phoneNumber = page.getByLabel('Phone number', { exact: true });
        this.optionNo = page.getByText('No', { exact: true });
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
    }

    async acceptPopWindow() {
        await this?.dialog?.click();
    }

    async enterFirstName(firstname) {
        await this.firstName.fill(firstname);
    }


    async enterLastName(lastname) {
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
