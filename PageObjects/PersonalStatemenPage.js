exports.PersonalStatementPage = class PersonalStatementPage {

    constructor(page) {
        this.page = page;
        this.checkbox1= page.locator("[name='termCheckbox0']");
        this.checkbox2= page.locator("[name='termCheckbox1']");
        this.checkbox3= page.locator("[name='termCheckbox2']");
        this.checkbox4= page.locator("[name='termCheckbox3']");
        this.checkbox5= page.locator("[name='termCheckbox4']");
        this.checkbox6= page.locator("[name='termCheckbox5']");
        this.checkbox7= page.locator("[name='termCheckbox6']");
        this.checkbox8= page.locator("[name='termCheckbox7']");
        this.checkbox9= page.locator("[name='termCheckbox8']");
        this.checkbox10= page.locator("[name='termCheckbox9']");
        this.agreeBtn = page.getByRole('button', { name: ' I Agree ' });
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

    async clickAgreeBtn(){
        await this.agreeBtn.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
    }

}

