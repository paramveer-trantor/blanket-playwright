class PP_ReportsPage {

    constructor(page){
        this.page = page;
        this.reportsTab = page.locator("[name='Reports']");
        this.reportType = page.locator('.v-select__selection').filter({ hasText: 'Ca Term Life Sales Report' });
        this.reportTypeOptions = page.getByRole('option');
        this.startDate = page.locator("//input[@placeholder='Start Date']");
        this.endDate = page.locator("//input[@placeholder='End Date']");
        this.downloadBtn = page.getByRole('button', { name: ' Download csv ' });
        this.dialogBox =  page.getByRole('dialog');
        this.popUpMsg = this.dialogBox.locator('.v-card .col');
    }
    
    async clickReportsTab() {
        await this.reportsTab.click();
    }

    async openReportTypeList() {
        await this.reportType.click(); 
    }

    async selectReportAsCATermSales() {
        await this.reportTypeOptions.first().click();
    }

    async selectReportAsUSTravelSales() {
        await this.reportTypeOptions.nth(1).click();
    }

    async selectReportAsKnockoutUser() {
        await this.reportTypeOptions.nth(2).click();
    }

    async selectReportAsCATermUserJourney() {
        await this.reportTypeOptions.nth(3).click();
    }

    async selectReportAsCSTPartner() {
        await this.reportTypeOptions.nth(4).click();
    }

    async selectReportAsGGAPartner() {
        await this.reportTypeOptions.nth(5).click();
    }

    async selectReportAsConfidentialSales() {
        await this.reportTypeOptions.nth(6).click();
    }

    async selectReportAsALLPartner() {
        await this.reportTypeOptions.nth(7).click();
    }

    async getReportTypeOptionsList() {  
        let reportOptionsList = [];
        reportOptionsList[0] = await this.reportTypeOptions.first().textContent();
        for(let i=1; i <= 6; i++) {
            reportOptionsList[i] = await this.reportTypeOptions.nth(i).textContent();
        }
        return reportOptionsList;
    }

    async selectStartDate() {
        await this.startDate.click();
        await this.page.locator("//div[@class='v-picker v-card v-picker--date theme--light']/div[2]/div/div/button[1]").click();
        await this.page.locator("//div[@class='v-date-picker-table v-date-picker-table--date theme--light']/table/tbody/tr[1]/td[7]/button").first().click();
        await this.page.locator("//div[@class='v-picker__actions v-card__actions']/div/button[2]").click();
    }

    async selectEndDate() {
        await this.endDate.click();
    }

    async clickDownloadCSVBtn() {
        await this.downloadBtn.click();
    }

    async getPopUpMessageText() {
        return await this.popUpMsg.first().textContent();
    }

}

module.exports = { PP_ReportsPage };