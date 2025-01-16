export class PartnershipsPage{

    constructor(page){
        this.page = page;
        this.yourName = page.getByLabel('Your Name', { exact: true }); 
        this.companyName = page.getByLabel('Company Name', { exact: true }); 
        this.companyWebsite = page.getByLabel('Company Website', { exact: true }); 
        this.phoneNumber = page.getByLabel('Phone Number', { exact: true }); 
        this.email = page.getByLabel('E-mail', { exact: true }); 
        this.industry = page.getByLabel('Industry', { exact: true }); 
        this.lifeIndustry = page.getByRole('listbox').getByRole('option').filter({ hasText: 'Life Insurance' });
        this.message = page.getByLabel('Your Message', { exact: true });
        this.applyBtn = page.getByTestId('singlePartnerSaveButton');
        this.blankSpace = page.locator('.v-messages');        
    }

    async enterPartnerDetails(partnername, companyname, companywebsite, phone, email) {
        await this.yourName.scrollIntoViewIfNeeded();
        await this.yourName.fill(partnername);
        await this.companyName.fill(companyname + " " + Math.floor(Math.random() * 900));
        await this.companyWebsite.fill(companywebsite);
        await this.phoneNumber.fill(phone);
        await this.email.fill(email);
        await this.industry.click();
        await this.lifeIndustry.click();
        await this.blankSpace.first().click();
        await this.applyBtn.click();
    }

}

