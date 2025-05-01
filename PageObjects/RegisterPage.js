export class RegisterPage {

    constructor(page) {
        this.page = page;
        this.email = page.getByLabel('Email', { exact: true });
        this.password = page.getByLabel('Password', { exact: true });
        this.confirmPassword = page.getByLabel('Confirm Password', { exact: true });
        this.preferredLanguage = page.getByLabel('Preferred Language', { exact: true });
        this.languageEn = page.getByRole('listbox').getByText('EN', { exact: true });
        this.languageFR = page.getByRole('listbox').getByText('FR', { exact: true });
        this.createAccountBtn = page.getByRole('button', { name: ' Create Account ' });
        this.errorMessage = page.locator('.v-messages__message');
        this.errorPopUp = page.getByTestId('globalErrorMessage');
        this.closeBtnPopUp = page.getByTestId('globalErrorCloseBtn');
        this.dialogBox =  page.getByRole('dialog');
        this.OTPWindowTitle = this.dialogBox.locator(".v-card__title"); 
        this.OTPWindowEnterOTP = this.dialogBox.getByLabel('Enter OTP', { exact: true });
        this.OTPWindowVerifyBtn = this.dialogBox.getByRole('button', { name: ' Verify ' });
        this.OTPWindowIncorrectOTPMsg = this.dialogBox.locator(".col")
    }

    async goToRegisterPage(url) {
        await this.page.goto(url);
    }
 
    async enterEmail(username) {
        await this.email.fill(username); 
    }

    async enterUserDetails(username, password) {
        await this.email.fill(username);  
        await this.password.fill(password);
        await this.confirmPassword.fill(password)
        await this.preferredLanguage.click();
        await this.languageEn.click();
    }

    async clickCreateAccBtn() {
        await this.createAccountBtn.click();  
    }

    async clickCreateAccBtnAndGetAPIStatus() {
        const promise = this.page.waitForResponse("**/sendOtp", async route => {
            const res = await this.page.request.fetch(route.request());
        });
        await this.createAccountBtn.click();
        const response = await promise;
        const responseStatus = await response.status();
        return responseStatus;  
    }
 
    async createAccount(url, username, password) {
        await this.page.goto(url);
        await this.email.fill(username);  
        await this.password.fill(password);
        await this.confirmPassword.fill(password);
        await this.preferredLanguage.click();
        await this.languageEn.click();
        await this.createAccountBtn.click();
    }

    async getErrorMessage() {
        return (await this.errorMessage.textContent()).trim();
    }

    async getErrorPopUp() {
        return await this.errorPopUp.textContent();
    }

    async getOTPSentMsg() {
        return (await this.OTPWindowTitle.textContent()).trim();
    }

    async getIncorrectOTPMsg() {
        await this.OTPWindowEnterOTP.fill("111111");
        await this.OTPWindowVerifyBtn.click();
        return (await this.OTPWindowIncorrectOTPMsg.first().textContent()).trim();
    }

    async closeErrorPopUp() {
        await this.closeBtnPopUp.click();
    }

}