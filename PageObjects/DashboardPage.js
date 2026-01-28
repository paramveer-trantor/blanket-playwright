export class DashboardPage{
 
    constructor(page){
        this.page = page;
        this.cookieBanner = page.locator('.v-banner__text .text-content')
        this.acceptCookiesBtn = page.getByRole('button', {name: ' Allow all cookies '});    
        this.acceptCookiesBtn_Fr = page.getByRole('button', {name: ' Accepter tout '});   
        this.countryBtn = page.locator('.v-btn__content .mr-3');
        this.CABtn = page.locator('.v-list-item__icon');
        this.langBtn = page.locator('.v-btn__content .currentLang');
        this.dialogBox =  page.getByRole('dialog');  
        this.menuOptions = page.locator("//div[@class='row d-flex justify-end pt-3']/div");
        this.productsBtn = page.getByRole('button', {name: ' Products '});
        this.productsBtn_Fr = page.getByRole('button', {name: ' Produits '});
        this.partnershipBtn = page.getByRole('menu').getByRole('menuitem', { name: ' Partnerships ' });
        this.myPoliciesBtn = page.locator("//span[text()=' My Policies ']");
        this.productList = page.locator("//a[@role='option']");
        this.termlifeBtn = page.getByText('Term Life');
        this.termlifeBtn_Fr = page.getByText('Assurance vie temporaire');
        //this.termlifeBtn = page.getByRole('listbox').getByRole('option', { name: 'Term Life' });
        //this.termlifeBtn_Fr = page.getByRole('listbox').getByRole('option', { name: 'Assurance vie temporaire' });
        this.lifebanner = page.locator("//div[@class='d-inline-flex col col-10']//div[@class='prd-card-title col']").filter({ hasText: ' Life ' });
        this.myProfileBtn = page.locator("//div[@class='v-toolbar__content']/button[2]");
        this.myApplicationsBtn = page.getByRole('menuitem', { name: 'My Applications' }); 
        this.profileOptions = page.getByRole('menuitem');
        this.myPolicies = page.getByText('My Policies');
        this.openApplicationMsg = page.getByRole('status');
        this.langBtn = page.locator('.v-btn__content .currentLang');
        this.langFR = page.getByRole('menuitem');
        this.dialogBox =  page.getByRole('dialog');
        this.langChangeWarningMsg = this.dialogBox.locator("//div[@class='v-dialog v-dialog--active v-dialog--persistent']//p");
        this.aboutUsBtn = page.getByRole('button', {name: ' About Us '});    
        this.adminPartnershipsBtn = page.getByRole('menu').getByRole('menuitem', { name: 'Admin Partnerships' });
        this.adminReportsBtn = page.getByRole('menu').getByRole('menuitem', { name: 'Admin Reports' });
        this.manageUsersBtn = page.getByRole('menu').getByRole('menuitem', { name: 'Manage Users' });
    }
    
    async getCookieBannerHeading() {    
        return (await this.cookieBanner.textContent()).trim();
    }

    async acceptCookies(){
        if(this.page.getByText(' We value your privacy ').isVisible()) {
            await this.acceptCookiesBtn.first().isVisible();
            await this.acceptCookiesBtn.first().click();
        }
    }

    async navigateToCATLProduct() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.productsBtn.click();
        await this.termlifeBtn.isVisible();
        await this.termlifeBtn.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async navigateToCATLProduct_FR() {
        // await this.page.waitForLoadState('domcontentloaded');
        if(this.page.getByText(' Respect de votre vie privée ').isVisible()) {
            await this.acceptCookiesBtn_Fr.first().isVisible();
            await this.acceptCookiesBtn_Fr.first().click();
        }
        await this.productsBtn_Fr.click();
        await this.termlifeBtn_Fr.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async selectCACountry(){
        await this.countryBtn.click();
        await this.CABtn.last().click();
    }

    async selectFRLang(){
        await this.langBtn.click();
        await this.langFR.last().click();
    }

    async getLangChangeWarningMsg() {
        return (await this.langChangeWarningMsg.textContent()).trim();
    }

    async getMenuOptions(){
        return await this.menuOptions.allTextContents();
    }

    async openTermLifeCAProduct(){
        await this.productsBtn.click();
        await this.termlifeBtn.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async getTLProductName() {
        await this.productsBtn.click();
        const list_products = await this.productList.allTextContents();
        return list_products[0];
    }

    async getTLProductName_Fr() {
        await this.productsBtn_Fr.click();
        const list_products = await this.productList.allTextContents();
        return list_products[0];
    }

    async clickLifeBanner() {
        await this.lifebanner.isVisible();    
        await this.lifebanner.click();
    }

    async goToPartnershipsPage() {
        await this.aboutUsBtn.first().click();
        await this.partnershipBtn.click();
    }

    async goToMyPoliciesPage() {  
        await this.myProfileBtn.click();
        await this.myPolicies.click();
    }

    async goToMyProfilePage() {  
        await this.myProfileBtn.click();
        await this.profileOptions.first().click();
    }
    
    async selectFRLangInForm() {
        await this.langBtn.click();
        await this.langFR.last().click();
    }
    
    async clickMyProfileBtn() {
        await this.myProfileBtn.click();
    }

    async clickAndVerifyOpenApplicationsMsg() {
        await this.openApplicationMsg.isVisible();
        const msg_openapps = (await this.openApplicationMsg.textContent()).trim();
        await this.openApplicationMsg.click();
        return msg_openapps;
    }

    async goToMyApplicationsPage() {
        await this.myProfileBtn.click();
        await this.myApplicationsBtn.click();
    }

    async goToAdminPartnershipsPage() {
        await this.aboutUsBtn.last().click();
        await this.adminPartnershipsBtn.click();
    }

    async goToAdminReportsPage() {
        await this.aboutUsBtn.last().click();
        await this.adminReportsBtn.click();
    }

    async goToManageUsersPage() {
        await this.aboutUsBtn.last().click();
        await this.manageUsersBtn.click();
    }

    async clickLogoutBtn() {
        await this.myProfileBtn.click();
        await this.profileOptions.last().click();
    }

}

