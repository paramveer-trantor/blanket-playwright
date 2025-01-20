export class AdminReportsPage {

    constructor(page){
        this.page = page;
        this.dialogBox =  page.getByRole('dialog');
        this.reportsTab = page.locator("[name='Reports']");
        this.HumaniaDataFeeTab = page.locator("[name='Humania Data Feed']");
        this.generateReport = page.getByRole('button', { name: ' Generate ' });
        this.reportType = page.locator('.v-select__selection').filter({ hasText: 'Ca Term Life Sales Report' });
        this.reportType1 = page.locator('.v-select__selection').filter({ hasText: 'CST Partner Report' });
        this.reportType2 = page.locator('.v-select__selection').filter({ hasText: 'GGA Partner Report' });
        this.reportTypeOptions = page.getByRole('option');
        this.startDate = page.locator("//input[@placeholder='Start Date']");
        this.calendarBackBtn = page.locator("//button[@aria-label='Previous month']");
        this.selectDate = this.dialogBox.locator("//div[@class='v-date-picker-table v-date-picker-table--date theme--light']/table/tbody/tr[1]/td[7]");
        this.calendarOkBtn = page.locator("//div[@class='v-picker__actions v-card__actions']/div/button[2]");
        this.endDate = page.locator("//input[@placeholder='End Date']");
        this.downloadBtn = page.getByRole('button', { name: ' Download csv ' });
        this.popUpMsg = this.dialogBox.getByTestId('globalErrorMessage');
        this.dialogCloseBtn = page.getByTestId('globalErrorCloseBtn');
        this.humaniaDownloadBtn = page.locator('.v-btn__content').filter({ hasText: ' Download ' });
        this.humaniaSuccessMsg = this.dialogBox.getByTestId('successMessage');
    }
    
    async goToReportsTab() {
        await this.reportsTab.click();
    }

    async goToHumaniaDataFeedTab() {
        await this.HumaniaDataFeeTab.click();
    }

    async generateHumaniaReport() {
        await this.generateReport.click();
    }

    async getHumaniaSuccessMsg() {
        return (await this.humaniaSuccessMsg.textContent()).trim();
    }

    async clickHumaniaDownloadBtn() {
        await this.humaniaDownloadBtn.first().click();
    }

    async getReportTypeOptionsList() {  
        await this.reportType.click(); 
        let reportOptionsList = [];
        reportOptionsList[0] = await this.reportTypeOptions.first().textContent();
        for(let i=1; i <= 7; i++) {
            reportOptionsList[i] = await this.reportTypeOptions.nth(i).textContent();
        }
        return reportOptionsList;
    }

    async downloadCATermSalesReport() {
        await this.reportTypeOptions.first().click();
        await this.startDate.click();
        await this.calendarBackBtn.first().click();
        await this.selectDate.first().click();
        await this.calendarOkBtn.click();
        await this.downloadBtn.click();
    }

    async downloadUsersKnockoutReport() {
        await this.reportTypeOptions.nth(2).click();
        await this.startDate.click();
        await this.calendarBackBtn.first().click();
        await this.selectDate.first().click();
        await this.calendarOkBtn.click();
        await this.downloadBtn.click();
    }

    async downloadUSTravelSalesReport() {
        await this.reportTypeOptions.nth(1).click();
        await this.startDate.click();
        await this.calendarBackBtn.first().click();
        await this.selectDate.first().click();
        await this.calendarOkBtn.click();
        await this.downloadBtn.click();
    }

    async downloadCSTPartnerReport() {
        await this.reportTypeOptions.nth(4).click();
        await this.startDate.click();
        await this.calendarBackBtn.first().click();
        await this.selectDate.first().click();
        await this.calendarOkBtn.click();
        await this.downloadBtn.click();
    }

    async downloadGGAPartnerReport() {
        await this.reportTypeOptions.nth(5).click();
        await this.startDate.click();
        await this.calendarBackBtn.first().click();
        await this.selectDate.first().click();
        await this.calendarOkBtn.click();
        await this.downloadBtn.click();
    }

    async downloadALLPartnerReport() {
        await this.reportTypeOptions.nth(7).click();
        await this.startDate.click();
        await this.calendarBackBtn.first().click();
        await this.selectDate.first().click();
        await this.calendarOkBtn.click();
        await this.downloadBtn.click();
    }

    async downloadCATermUserJourneyReport() {
        await this.reportTypeOptions.nth(3).click();
        await this.startDate.click();
        await this.calendarBackBtn.first().click();
        await this.selectDate.first().click();
        await this.calendarOkBtn.click();
        await this.downloadBtn.click();
    }

    async downloadCATermConfidentialSales() {
        await this.reportTypeOptions.nth(6).click();
        await this.startDate.click();
        await this.calendarBackBtn.first().click();
        await this.selectDate.first().click();
        await this.calendarOkBtn.click();
        await this.downloadBtn.click();
    }

    async verifyNoDataFoundError() {
        await this.reportType.click(); 
        await this.reportTypeOptions.nth(1).click();
        await this.downloadBtn.click();
        return await this.popUpMsg.textContent();
    }
    
    async selectEndDate() {
        await this.endDate.click();
    }

    async getPopUpMessageText() {
        return await this.popUpMsg.textContent();
    }

    async closeDialog() {
        return await this.dialogCloseBtn.click();;
    }

}
