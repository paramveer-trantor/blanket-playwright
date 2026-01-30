export class OurTeamPage {

    constructor(page) {
        this.page = page;
        this.ourTeamheading = page.locator('.hero_ourteam:visible')
    }

    async getOurTeamPageHeader(){
        await this.page.waitForLoadState('domcontentloaded');
        return (await this.ourTeamheading.textContent()).trim();
    }

}