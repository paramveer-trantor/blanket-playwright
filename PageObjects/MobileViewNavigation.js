export class MobileViewNavigation {

    constructor(page) {
        this.cookies = page.getByRole('button', { name: 'Allow all cookies' });
        this.cookiesBtn_Fr = page.getByRole('button', {name: ' Accepter tout '}); 
        this.menuBtn = page.locator('.humburger_menu');
        this.productsBtn = page.getByRole('button', { name: 'Products' });
        this.productsFrBtn = page.getByRole('button', { name: ' Produits ' });
        this.aboutUsBtn = page.getByRole('button', { name: 'About Us' });
        this.productsList = page.locator('.v-list-group__items');
        this.termLifeBtn = page.getByRole('link', { name: 'Term Life' });
        this.termLifeFrBtn = page.getByRole('link', { name: 'Assurance vie temporaire' });
        this.ourTeamBtn = page.getByRole('link', { name: 'Our Team' });
        this.newsBtn = page.getByRole('link', { name: 'News' });
        this.contactUsBtn = page.locator('.v-list-item__title').filter({ hasText: ' Contact Us ' });
        this.languageBtn = page.getByRole('button', { name: ' en ' });
        this.languageFRBtn = page.getByRole('button', { name: ' fr ' });
        this.EnLangBtn = page.locator('.v-list-item__title').filter({ hasText: ' EN ' });
        this.FrLangBtn = page.locator('.v-list-item__title').filter({ hasText: ' FR ' });
    }

    async acceptCookies() {
        await this.cookies.click();
    }

    async acceptCookies_Fr() {
        await this.cookiesBtn_Fr.click();
    }

    async getProductsList() {
        await this.menuBtn.click();
        await this.productsBtn.click();
        const list_products = await this.productsList.allTextContents();
        return list_products[0];
    }

    async navigateToCATermLifePage() {
        await this.menuBtn.click();
        await this.productsBtn.click();
        await this.termLifeBtn.click();
    }

    async navigateToCATermLifePage_Fr() {
        await this.menuBtn.click();
        await this.productsFrBtn.click();
        await this.termLifeFrBtn.click();
    }

    async navigateToOurTeamPage() {
        await this.menuBtn.click();
        await this.aboutUsBtn.click();
        await this.ourTeamBtn.click();
    }

    async navigateToNewsPage() {
        await this.menuBtn.click();
        await this.aboutUsBtn.click();
        await this.newsBtn.click();
    }  
    
    async navigateToContactUsPage() {
        await this.menuBtn.click();
        await this.contactUsBtn.click();
    }  

    async selectENLanguage() {
        await this.menuBtn.click();
        await this.languageFRBtn.click();
        await this.EnLangBtn.click();
    }

    async selectFRLanguage() {
        await this.menuBtn.click();
        await this.languageBtn.click();
        await this.FrLangBtn.click();
    }


}