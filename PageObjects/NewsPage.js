export class NewsPage {

    constructor(page) {
        this.page = page;
        this.newsHeadingText = page.locator('.sora.white--text')
    }

    async getNewsPageHeader(){
        await this.page.waitForLoadState('domcontentloaded');
        return (await this.newsHeadingText.textContent()).trim();
    }


}