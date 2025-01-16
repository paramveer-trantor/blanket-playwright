export class PersonalStatementPage {

    constructor(page) {
        this.page = page;
        this.header = page.locator("//div[text()=' Personal statement ']");
        this.username = page.locator("//div[contains(@class,'text-h4 ma-2')]");
        this.checkbox1 = page.locator("[name='termCheckbox0'] + div.v-input--selection-controls__ripple");
        this.checkbox2 = page.locator("[name='termCheckbox1'] + div.v-input--selection-controls__ripple");
        this.checkbox3 = page.locator("[name='termCheckbox2'] + div.v-input--selection-controls__ripple");
        this.checkbox4 = page.locator("[name='termCheckbox3'] + div.v-input--selection-controls__ripple");
        this.checkbox5 = page.locator("[name='termCheckbox4'] + div.v-input--selection-controls__ripple");
        this.checkbox6 = page.locator("[name='termCheckbox5'] + div.v-input--selection-controls__ripple");
        this.checkbox7 = page.locator("[name='termCheckbox6'] + div.v-input--selection-controls__ripple");
        this.checkbox8 = page.locator("[name='termCheckbox7'] + div.v-input--selection-controls__ripple");
        this.checkbox9 = page.locator("[name='termCheckbox8'] + div.v-input--selection-controls__ripple");
        this.checkbox10 = page.locator("[name='termCheckbox9'] + div.v-input--selection-controls__ripple");
        this.quebecStatement = page.locator("//div[@class='pa-4 v-card v-sheet theme--light elevation-6']/div[2]//div[10]//label");
        this.agreeBtn = page.getByRole('button', { name: ' I Agree ' });
        this.dialogBox = page.getByRole('dialog');
        this.knockOutMsg = this.dialogBox.locator("//p[@class='font-weight-bold text-center']//span[1]");  
        this.errorPopUp = page.getByTestId('globalErrorMessage');
        this.closeBtnPopUp = page.getByTestId('globalErrorCloseBtn');
    }

    async getPersonalStatementPageHeader() {
        return (await this.header.textContent()).trim();
    }

    async getUsername() {
        return (await this.username.textContent()).trim();
    }

    async clickCheckboxes() {
        await this.checkbox1.click();
        await this.checkbox2.click();
        await this.checkbox3.click();
        await this.checkbox4.click();
        await this.checkbox5.click();
        await this.checkbox6.click();
        await this.checkbox7.click();
        await this.checkbox8.click();
        await this.checkbox9.click();
        if (await this.checkbox10.isVisible()) {
            await this.checkbox10.click();
        }
    }

    async agreeBtnClick() {
        await this.agreeBtn.click();
    }

    async clickAgreeBtn() {
        const promise =  this.page.waitForResponse("**/getCATermDecision", async route => {
             const res = await this.page.request.fetch(route.request());
         });
        await this.agreeBtn.click();
        const response = await promise;
        const responseBody = await response.json();
        const errors = responseBody.result.response.errors;
        const error_string = [errors].toString();
        return error_string; 
     }

    async getKnockoutMsg() {
       return (await this.knockOutMsg.textContent()).trim();
    }

    async getQuebecProvinceStatement() {
        return (await this.quebecStatement.textContent()).trim();
     }

    async getErrorPopUp() {
        return await this.errorPopUp.textContent();
    }

    async closeErrorPopUp() {
        await this.closeBtnPopUp.click();
    }

}


