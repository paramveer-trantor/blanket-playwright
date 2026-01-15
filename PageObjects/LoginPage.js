import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    
    constructor(page) {
        super(page);
        this.username = page.locator("[name='email']");
        this.password = page.locator("[name='password']");
        this.loginBtn = page.locator('.login-btn');
        this.dialogBox = page.getByRole('dialog');
        this.loginError = this.dialogBox.getByTestId('globalErrorMessage');
        this.errorPopUp = page.getByTestId('globalErrorMessage');
        this.closeBtnPopUp = page.getByTestId('globalErrorCloseBtn');
        this.forgotPassword =  page.locator(".signup-text").first();
        this.emailForgotPage = page.getByLabel('Email');
    }
 
    async login(username, password) {
        await this.username.fill(username);  
        await this.password.fill(password);
        await this.loginBtn.click();
    }

    async enterCredentials(username, password) {
        await this.username.fill(username);  
        await this.password.fill(password);
    }  

    async clickLoginBtn() {
        await this.loginBtn.click();
    }

    async goToForgotPasswordPage() {
        await this.forgotPassword.click();
    }

    async fillEmailForgotPassword(username) {
        await this.emailForgotPage.fill(username);
    }

    async getErrorMessage() {
        return (await this.loginError.textContent()).trim();
    } 

    async getErrorPopUp() {
        return await this.errorPopUp.textContent();
    }

    async closeErrorPopUp() {
        await this.closeBtnPopUp.click();
    }
    
}
 