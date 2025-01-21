const { expect } = require("@playwright/test");

export class AdminPartnershipsPage{

    constructor(page){
        this.page = page;
        this.newPartnerBtn = page.getByRole('button', {name: ' New Partner '});
        this.dialogBox =  page.getByRole('dialog');
        this.errorMsg =  this.dialogBox.locator('.v-messages__message');
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
        this.uploadCSV = page.locator("//input[@data-testid='bulkUploadFile']");
        this.uploadBtn = page.locator("//div[@data-testid='bulkUploadDialog']//div[3]/button[2]");
        this.bulkUploadError = page.locator('.v-alert__content');
        this.checkBoxBulkSelect = page.locator('.v-input--selection-controls__ripple');
        this.deletePartnerBtn = page.getByRole('button', {name: ' Delete Partner '});
        this.okBtn = page.locator("//div[@class='v-card__actions']//button[2]");
        this.partnerIdLatest = page.locator("//div[@class='v-data-table__wrapper']/table/tbody/tr[1]/td[4]");
        this.duplicateRecordHighlight = page.locator("//div[@data-testid='bulkUploadTable']/div/table/colgroup");
        this.duplicateRecord = page.locator('.duplicate');
        this.clickCancelBtn = page.getByRole('dialog').getByRole('button', {name: ' Cancel '});
        this.editFirstRow = page.locator("//div[@class='v-data-table__wrapper']/table/tbody/tr[1]/td[11]//button[1]");
        this.firstRowEmailId = page.locator("//div[@class='v-data-table__wrapper']/table/tbody/tr[1]/td[8]");
        this.deleteBtnFirstRow = page.locator("//div[@class='v-data-table__wrapper']/table/tbody/tr[1]/td[11]//button[2]");
        this.confirmDelete = this.dialogBox.getByRole('button', { name: ' OK ' });
        this.successMsg = page.getByRole('status');
    }

    async addNewPartnerManually(partnername, companyname, companywebsite, phone, email, type) {
        await this.newPartnerBtn.click();
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

    async getPartnerIdLatest() {
        return (await this.partnerIdLatest.textContent()).trim();
    }

    async getPartnerStatusLatest() {
        return await this.partnerStatusLatest.textContent();
    }

    async approveNewPartner(type) {
        await this.editFirstRow.click();
        await this.type.fill(type);
        await this.status.click();
        await this.approveStatus.click();
        await this.saveBtn.last().click();
    }

    async addNewPartnerWithoutMandatoryFields(partnername, companywebsite, phone, email, type) {
        await this.newPartnerBtn.click();
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

    async getErrorMsg() {
        return (await this.errorMsg.textContent()).trim();
    }

    async getTotalPartnersCount() {
        await this.page.waitForTimeout(2000);
        const count_partners = await this.pagination.textContent();
        const arr_openApp = count_partners.trim().split(" ");
        return Number(arr_openApp[2]);
    }
    
    async bulkUploadCSV(filePath) {
        const emailfirstrow = await this.firstRowEmailId.textContent();
        if (emailfirstrow == "partnerbulkauto@test.com") {
            await this.deleteBtnFirstRow.click();
            await this.confirmDelete.click();
        }
        await this.bulkUploadBtn.click();
        await this.uploadCSV.setInputFiles(filePath);  
    }

    async deleteFirstRowPartner() {
        await this.deleteBtnFirstRow.click();
        await this.confirmDelete.click();
    }

    async clickUploadBtn() {
        await this.uploadBtn.click();
    }

    async verifySuccessMsgIsVisible() {
        await this.page.waitForTimeout(4000);
        return  await this.successMsg.isVisible();
    }

    async closebulkUploadWindow() {
        await this.clickCancelBtn.click();
    }

    async getBulkUploadError() {
        return (await this.bulkUploadError.textContent()).trim();
    }

    async bulkDeletePartners() {
        await this.checkBoxBulkSelect.nth(1).click();
        await this.checkBoxBulkSelect.nth(2).click();
        await this.deletePartnerBtn.click();
        await this.okBtn.click();
    }

    async verifyDuplicateRecords() {
        await this.duplicateRecordHighlight.isVisible();
        return await this.duplicateRecord.first().isVisible();
    }

}

