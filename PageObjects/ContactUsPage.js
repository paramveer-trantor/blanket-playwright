export class ContactUsPage {

    constructor(page) {
        this.page = page;
        this.contactHeadingText = page.locator('.hero_contactus h1');
    }

    async getContactPageHeader(){
        await this.page.waitForLoadState('domcontentloaded');
        return (await this.contactHeadingText.textContent()).trim();
    }


}