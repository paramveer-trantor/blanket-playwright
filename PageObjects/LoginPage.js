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
        
        // await this.page.route("https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=*", async route => {
        //     expect(await route.request().method()).toBe('POST');
        //     const response = await this.page.request.fetch(route.request());  
        //     expect(await response.status()).toBe(200);
        // });

        await this.loginBtn.click();
        //await this.page.waitForLoadState('domcontentloaded');
    }

}

module.exports = { LoginPage };
