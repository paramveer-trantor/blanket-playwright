class MyPoliciesPage{

    constructor(page){
        this.page = page;
        this.header = page.locator("//div[@class='d-flex justify-center col']/div[1]");
        this.eyeBtn = page.locator("//div[@class='v-data-table__wrapper']//tbody/tr/td[5]/button");
        this.emailPolicyBtn = page.getByRole('button', { name: ' Email Policy ' }); 
        this.policyDetails = page.locator("//ul[@class='text-h4 pa-2']/li");
        this.dialogBox =  page.getByRole('dialog');
        this.successMsg = this.dialogBox.locator(".v-card__title");
    }

    async getMyPoliciesPageHeader() {  
        return await this.header.textContent();
    }

    async clickEyeBtn() {
        await this.eyeBtn.click();
    }

    async clickEmailPolicyBtn() {
        await this.emailPolicyBtn.click();
    }

    async getPolicyDetails() {
        let policydetailsrows = [];
        policydetailsrows = await this.policyDetails.first().textContent();
        for(let i=1; i <=5; i++) {
            policydetailsrows[i] = await this.policyDetails.nth(i).textContent();
        }
        return policydetailsrows;
    }

    async getSuccessMsg() {
        await this.successMsg.textContent();
    }

}

module.exports = { MyPoliciesPage };