export class MyPoliciesPage {

    constructor(page){
        this.page = page;
        this.header = page.locator("//div[@class='d-flex justify-center col']/div[1]");
        this.eyeBtn = page.locator("//div[@class='v-data-table__wrapper']//tbody/tr/td[5]/button");
        this.emailPolicyBtn = page.getByRole('button', { name: ' Email Policy ' }); 
        this.policyDetails = page.locator("//ul[@class='text-h4 pa-2']/li");
        this.dialogBox =  page.getByRole('dialog');
        this.successMsg = this.dialogBox.locator(".v-card__title");
        this.successPopUpClose = page.locator('.pa-0').filter({ hasText: ' Success! ' }).getByRole('button', { name: ' Close ' });
        this.errorPopUp = page.getByTestId('globalErrorMessage');
        this.closeBtnPopUp = page.getByTestId('globalErrorCloseBtn');
    }

    async getMyPoliciesPageHeader() {  
        return (await this.header.textContent()).trim();
    }
 
    async clickEyeBtn() {
        await this.eyeBtn.first().click();
    }

    async clickEmailPolicyBtn() {
        await this.emailPolicyBtn.click();
    }

    async getPolicyDetails() {
        //let policydetailsrows = [];
        //policydetailsrows[0] = await this.policyDetails.first().textContent();
        //policydetailsrows[1] = await this.policyDetails.nth(1).textContent();
        //policydetailsrows[2] = await this.policyDetails.nth(2).textContent();
        //policydetailsrows[3] = await this.policyDetails.nth(3).textContent();
        //policydetailsrows[4] = await this.policyDetails.nth(4).textContent();
        //policydetailsrows[5] = await this.policyDetails.last().textContent();
        return (await this.policyDetails.nth(4).textContent()).trim();
    }

    async getSuccessMsg() {
        return (await this.successMsg.textContent()).trim();
    }

    async closeEmailSuccessPopUp() {
        await this.successPopUpClose.click();
    }

    async getErrorPopUp() {
        return await this.errorPopUp.textContent();
    }

    async closeErrorPopUp() {
        await this.closeBtnPopUp.click();
    }

}

