const{ expect, request } = require("@playwright/test");

class TLFormLoginPage {

    constructor(page) {
        this.page = page;
        this.header = page.locator("//div[@class='d-flex justify-center text-h3 text-center primary--text mb-6 mt-6 col']");
    }

    async getInFormLoginPageHeder() {
        return await this.header.innerText();
    }

}

module.exports = { TLFormLoginPage };