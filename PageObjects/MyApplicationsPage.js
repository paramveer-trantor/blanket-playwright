export class MyApplicationsPage{

    constructor(page){
        this.page = page;
        this.header = page.getByText(' My Applications ');
        this.editBtn = page.locator("//div[@class='v-data-table__wrapper']/table/tbody/tr[1]/td[5]/button[1]");
        this.pagination = page.locator('.v-data-footer__pagination');
        this.noOpenApplicationMsg = page.getByText('No data available');
        this.firstRowDeleteBtn = page.locator("tbody > tr:first-of-type > td:nth-of-type(5) > button:nth-of-type(2)");
    }
 
    async getMyAppPageHeader() {  
        return (await this.header.textContent()).trim();
    } 

    async clickEditBtnFirstApplication() {
        await this.editBtn.click();
    }

    async getOpenApplicationsCount() {
        await this.page.waitForTimeout(2000);  
        const count_openapps = await this.pagination.textContent();
        const arr_openApp = count_openapps.trim().split(" ");
        return Number(arr_openApp[2]);
    }

    async getNoApplicationMsg() {
        return (await this.noOpenApplicationMsg.textContent()).trim();
    }

    async verifyNoApplicationMsgIsVisisble() {
        return await this.noOpenApplicationMsg;
    }

    async deleteFirstRowApplication() {
        await this.firstRowDeleteBtn.click();
    }

}

