export class NewsPage {

    constructor(page) {
        this.page = page;
        this.newsHeadingText = page.locator('.hero_news h1')
    }

    async getNewsPageHeader(){
        await this.page.waitForLoadState('domcontentloaded');
        return (await this.newsHeadingText.textContent()).trim();
    }


}