const{ expect, request } = require("@playwright/test");

class TLFormLoginPage {

    constructor(page) {
        this.page = page;
        this.header = page.locator("//div[text()=' In order to continue with the application, please log in or create a Blanket account. ']");
    }

    async getPageHeder() {
        const Login_header = await this.header.textContent();
        //console.log(Login_url);
        return Login_header;
    }

}

module.exports = { TLFormLoginPage };