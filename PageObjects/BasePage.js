export class BasePage {

    constructor(page) {
        this.page = page;
        this.langBtn = page.locator('.v-btn__content .currentLang');
        this.lang = page.locator('.v-list-item__title');
        this.currentLang = page.locator('.currentLang');
        this.langChangeMsg = page.locator("//div[@class='v-dialog__content v-dialog__content--active']//p");
        this.dialogBox = page.getByRole('dialog');
        this.dialogCancelBtn = this.dialogBox.getByRole('button', { name: ' Cancel ' });
        this.dialogOkayBtn = this.dialogBox.getByRole('button', { name: ' Okay ' });
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async selectLanguage(lang) {
        await this.langBtn.click();
        if(lang === "EN"){
            await this.lang.first().click();
        }
        else {
            await this.lang.last().click();
        }
    }

    async getLanguageChangeWarningMsg() {
        return (await this.langChangeMsg.textContent()).trim();
    }

    async checkCurrentLanguageSelected() {
        return (await this.currentLang.textContent()).trim();
    }

    async clickDialogOkayBtn() {
        await this.dialogOkayBtn.click();
    }

}