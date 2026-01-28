export class ContactUsPage {

    constructor(page) {
        this.page = page;
        this.contactHeadingText = page.locator('.title-txt-mobile');
    }

    async getNewsPageHeader(){
        await this.page.waitForLoadState('domcontentloaded');
        return (await this.contactHeadingText.textContent()).trim();
    }


}