const { expect } = require("@playwright/test");

class MyApplicationsPage{

    constructor(page){
        this.page = page;
        this.header = page.getByText(' My Applications ');
        this.editBtn = page.locator("//div[@class='v-data-table__wrapper']/table/tbody/tr[1]/td[5]/button[1]");
    }

    async getMyAppPageHeader() {  
        return (await this.header.textContent()).trim();
    } 

    async clickEditBtnFirstApp() {
        await this.editBtn.click();
    }

}

module.exports = { MyApplicationsPage };