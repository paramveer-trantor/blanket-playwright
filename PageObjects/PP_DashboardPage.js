const { expect } = require("@playwright/test");

class PP_DashboardPage{

    constructor(page){
        this.page = page;
        this.newPartnerBtn = page.getByRole('button', {name: ' New Partner '});
        this.dialogBox =  page.getByRole('dialog');
        this.partnerName = this.dialogBox.getByLabel('Your Name', { exact: true });    
        this.companyName = this.dialogBox.getByLabel('Company Name', { exact: true });
        this.companyWebsite = this.dialogBox.getByLabel('Company Website', { exact: true });
        this.phoneNumber = this.dialogBox.getByLabel('Phone Number', { exact: true });
        this.email = this.dialogBox.getByLabel('E-mail', { exact: true });
        this.industry = this.dialogBox.getByLabel('Industry', { exact: true });
        this.lifeIndustry = page.getByRole('listbox').getByRole('option').filter({ hasText: 'Life Insurance' });
        this.blankSpace = this.dialogBox.locator('.v-messages');  
        this.type = this.dialogBox.getByLabel('Type', { exact: true });
        this.status = this.dialogBox.getByLabel('Status', { exact: true });
        this.approveStatus = page.locator("//div[@role='listbox']/div[2]/div[1]/div[@class='v-list-item__title']");
        this.saveBtn = this.dialogBox.locator('.v-btn__content');
        this.partnerNameLatest = page.locator("//div[@class='v-data-table__wrapper']/table/tbody/tr[1]/td[7]");
        this.partnerStatusLatest = page.locator("//div[@class='v-data-table__wrapper']/table/tbody/tr[1]/td[10]/span");
        this.pagination = page.locator('.v-data-footer__pagination');
        this.bulkUploadBtn = page.getByRole('button', {name: ' Bulk Upload '});
        this.uploadCSVBtn = page.locator("//input[@data-testid='bulkUploadFile']");
        this.bulkUploadError = page.locator('.v-alert__content');
    }

    async clickAddNewPartnerBtn() {
        await this.newPartnerBtn.click();
    }

    async addNewPartnerManually(partnername, companyname, companywebsite, phone, email, type) {
        await this.partnerName.fill(partnername);
        await this.companyName.fill(companyname + " " + Math.floor(Math.random() * 900));
        await this.companyWebsite.fill(companywebsite);
        await this.phoneNumber.fill(phone);
        await this.email.fill(email);
        await this.industry.click();
        await this.lifeIndustry.click();
        await this.blankSpace.first().click();
        await this.type.fill(type);
        await this.status.click();
        await this.approveStatus.click();
        const promise =  this.page.waitForResponse("https://us-central1-blanket-development.cloudfunctions.net/checkPartnerCompanyName", async route => {
            expect(await route.request().method()).toBe('POST');
        });
       await this.saveBtn.last().click();
       const response = await promise;
       expect(response.status()).toBe(200);        
    }

    async getPartnerNameLatest() {
        return await this.partnerNameLatest.textContent();
    }

    async getPartnerStatusLatest() {
        return await this.partnerStatusLatest.textContent();
    }

    async clickStatusandApprove(type) {
        await this.type.fill(type);
        await this.status.click();
        await this.approveStatus.click();
        await this.saveBtn.last().click();
    }

    async addNewPartnerWithoutMandatoryFields(partnername, companywebsite, phone, email, type) {
        await this.partnerName.fill(partnername);
        await this.companyWebsite.fill(companywebsite);
        await this.phoneNumber.fill(phone);
        await this.email.fill(email);
        await this.industry.click();
        await this.lifeIndustry.click();
        await this.blankSpace.first().click();
        await this.type.fill(type);
        await this.status.click();
        await this.approveStatus.click();
        await this.saveBtn.last().click();      
    }

    async getTotalPartnersCount() {
        const count_partners = await this.pagination.textContent();
        console.log(count_partners)
        return count_partners;
        //const arr_openApp = count_partners.trim().split(" ");
        //await this.page.waitForTimeout(500);
        //return Number(arr_openApp[2]);
    }
    
    async bulkUploadCSV(filePath) { 
        await this.bulkUploadBtn.click();
        await this.uploadCSVBtn.setInputFiles(filePath);
    }

    async getBulkUploadCSVError() {
        return (await this.bulkUploadError.textContent()).trim();
    }

}

module.exports = { PP_DashboardPage };