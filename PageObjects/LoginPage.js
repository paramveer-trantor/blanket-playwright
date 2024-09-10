const{ expect } = require("@playwright/test");

class LoginPage {

    constructor(page) {
        this.page = page;
        this.email = page.locator("[name='email']");
        this.password = page.locator("[name='password']");
        this.loginBtn = page.locator('.login-btn')
    }

    async navigateToURL(urlLogin) {
        await this.page.goto(urlLogin);
    }

    async login(username, password) {
        await this.email.fill(username);
        await this.password.fill(password);
        const promise =  this.page.waitForResponse("https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=*", async route => {
            expect(await route.request().method()).toBe('POST');
        });

       await this.loginBtn.click();
       const response = await promise;
       expect(response.status()).toBe(200);
    }

    async enterLoginDetails(username, password) {
        await this.email.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }

}

module.exports = { LoginPage };
