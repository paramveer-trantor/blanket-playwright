export class LoginPageInTLForm {

    constructor(page) {
        this.page = page;
        this.header = page.locator("//div[@class='d-flex justify-center text-h3 text-center primary--text mb-6 mt-6 col']");
        this.email = page.getByLabel('Email');
        this.password = page.locator("[name='password']");
        this.loginBtn = page.getByRole('button', { name: 'Log In' });
        this.registerBtn = page.getByRole('button', { name: ' Register ' });
        this.preferredLanguage = page.getByLabel('Preferred Language', { exact: true });
        this.languageEn = page.getByRole('listbox').getByText('EN', { exact: true });
        this.languageFR = page.getByRole('listbox').getByText('FR', { exact: true });
        this.createAccountBtn = page.getByRole('button', { name: ' Create Account ' });
        this.dialogBox =  page.getByRole('dialog');
        this.OTPWindow = this.dialogBox.locator(".v-card__title"); 
    }

    async getInFormLoginPageHeder() {
        return (await this.header.innerText()).trim();   
    }

    async loginIntoAccount(username,password) {
        await this.email.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();  
    }

    async createAccount(username,password) {
        await this.registerBtn.click(); 
        await this.email.fill(username);
        await this.password.fill(password);
        await this.preferredLanguage.click();
        await this.languageEn.click();
        const promise = this.page.waitForResponse("**/auth/register", async route => {
            const res = await this.page.request.fetch(route.request());
        });
        await this.createAccountBtn.click();
        const response = await promise;
        const responseStatus = await response.status();
        return responseStatus; 
    }

    async getOTPSentMsg() {
        return (await this.OTPWindow.textContent()).trim();
    }


}

