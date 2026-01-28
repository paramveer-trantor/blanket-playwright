export class OurTeamPage {

    constructor(page) {
        this.page = page;
        this.ourTeamheading = page.locator('.sora.white--text')
    }

    async getOurTeamPageHeader(){
        await this.page.waitForLoadState('domcontentloaded');
        return (await this.ourTeamheading.textContent()).trim();
    }

}