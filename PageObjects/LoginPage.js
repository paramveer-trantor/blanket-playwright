const{ expect, request } = require("@playwright/test");

class LoginPage {

    constructor(page) {
        this.page = page;
        this.email = page.locator("[name='email']");
        this.password = page.locator("[name='password']");
        this.loginBtn = page.locator('.login-btn')
    }

    async navigateToURL() {
        await this.page.goto("https://blanket-development.web.app/pages/login");
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

}

module.exports = { LoginPage };
