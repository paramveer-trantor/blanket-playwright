const{ expect, request } = require("@playwright/test");

class PersonalStatementPage {

    constructor(page) {
        this.page = page;
        this.header = page.locator("//div[text()=' Personal statement ']");
        this.checkbox1= page.locator("[name='termCheckbox0'] + div.v-input--selection-controls__ripple");
        this.checkbox2= page.locator("[name='termCheckbox1'] + div.v-input--selection-controls__ripple");
        this.checkbox3= page.locator("[name='termCheckbox2'] + div.v-input--selection-controls__ripple");
        this.checkbox4= page.locator("[name='termCheckbox3'] + div.v-input--selection-controls__ripple");
        this.checkbox5= page.locator("[name='termCheckbox4'] + div.v-input--selection-controls__ripple");
        this.checkbox6= page.locator("[name='termCheckbox5'] + div.v-input--selection-controls__ripple");
        this.checkbox7= page.locator("[name='termCheckbox6'] + div.v-input--selection-controls__ripple");
        this.checkbox8= page.locator("[name='termCheckbox7'] + div.v-input--selection-controls__ripple");
        this.checkbox9= page.locator("[name='termCheckbox8'] + div.v-input--selection-controls__ripple");
        this.checkbox10= page.locator("[name='termCheckbox9'] + div.v-input--selection-controls__ripple");
        this.agreeBtn = page.getByRole('button', { name: ' I Agree ' });
        this.knockOutMsg = page.locator("//p[@class='font-weight-bold text-center']//span[1]");
    }

    async verifyPersonalStatementPageHeader() {
        expect(await this.header.textContent()).toContain('Personal statement');
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

        const promise =  this.page.waitForResponse("https://us-central1-blanket-development.cloudfunctions.net/getCATermDecision", async route => {
             expect(await route.request().method()).toBe('POST');
             const res = await this.page.request.fetch(route.request());
             //expect(await response.status()).toBe(200);
             //console.log(res.text());
         });
        await this.agreeBtn.click();
        const response = await promise;
        expect(response.status()).toBe(200);

     }

    async verifyKnockoutMsg() {
       const msg = await this.knockOutMsg.textContent();
       expect(msg).toContain("A licensed insurance agent will contact you shortly.");
    }

}

module.exports = { PersonalStatementPage};

