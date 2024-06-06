const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {

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
        /* // Intercept the API request
        await this.page.route('**', (route) => {
            const request = route.request();
            //const response = route.fulfill();
            //const result =  response.json();
            expect(request.method()).toBe('POST');
            expect(request.postDataJSON()).toEqual({ key: 'value' });
            //expect(response.status().toContain('200'));
            route.continue();
      }); */

        await this.loginBtn.click();
        await this.page.waitForLoadState('domcontentloaded');
        //assertion as in message
    }

}
