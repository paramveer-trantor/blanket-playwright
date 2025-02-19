export class LoginPage {
    
    constructor(page) {
        this.page = page;
        this.email = page.locator("[name='email']");
        this.password = page.locator("[name='password']");
        this.loginBtn = page.locator('.login-btn');
        this.dialogBox = page.getByRole('dialog');
        this.loginError = this.dialogBox.getByTestId('globalErrorMessage');
        this.errorPopUp = page.getByTestId('globalErrorMessage');
        this.closeBtnPopUp = page.getByTestId('globalErrorCloseBtn');
        this.forgotPassword =  page.locator(".signup-text").first();
        this.emailForgotPage = page.getByLabel('Email');
        this.adminEmail = page.locator("//input[@type='email']");
        this.adminPassword = page.locator("//input[@type='password']");
        this.adminLoginBtn = page.getByRole('button', { name: ' Log in ' });
    }

    async userLogin(username, password) {
        await this.email.fill(username);  
        await this.password.fill(password);
        await this.loginBtn.click();
    }
 
    async login(url, username, password) {
        await this.page.goto(url);
        await this.email.fill(username);  
        await this.password.fill(password);
        await this.loginBtn.click();
    }

    async loginIntoAdminPortal(url, username, password) {
        await this.page.goto(url);
        await this.adminEmail.fill(username);  
        await this.adminPassword.fill(password);
        //await this.adminLoginBtn.click();
    }

    async fillLoginDetails(url, username, password) {
        await this.page.goto(url);
        await this.email.fill(username);  
        await this.password.fill(password);
    }  

    async clickLoginBtn() {
        await this.loginBtn.click();
    }

    async goToForgotPasswordPage(url) {
        await this.page.goto(url);
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
 