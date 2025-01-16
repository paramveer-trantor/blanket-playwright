export class RegisterPage {

    constructor(page) {
        this.page = page;
        this.email = page.getByLabel('Email', { exact: true });
        this.password = page.getByLabel('Password', { exact: true });
        this.confirmPassword = page.getByLabel('Confirm Password', { exact: true });
        this.createAccountBtn = page.getByRole('button', { name: ' Create Account ' });
        this.errorMessage = page.locator('.v-messages__message');
        this.errorPopUp = page.getByTestId('globalErrorMessage');
        this.closeBtnPopUp = page.getByTestId('globalErrorCloseBtn');

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
    }

    async clickCreateAccBtn() {
        await this.createAccountBtn.click();
    }
 
    async createAccount(url, username, password) {
        await this.page.goto(url);
        await this.email.fill(username);  
        await this.password.fill(password);
        await this.confirmPassword.fill(password)
        await this.createAccountBtn.click();
    }

    async getErrorMessage() {
        return (await this.errorMessage.textContent()).trim();
    }

    async getErrorPopUp() {
        return await this.errorPopUp.textContent();
    }

    async closeErrorPopUp() {
        await this.closeBtnPopUp.click();
    }

}