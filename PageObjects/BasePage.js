export class BasePage {

    constructor(page) {
        this.page = page;
        this.langChangeMsg = page.locator("//div[@class='v-dialog__content v-dialog__content--active']//p");
        this.dialogBox = page.getByRole('dialog');
        this.dialogCancelBtn = this.dialogBox.getByRole('button', { name: ' Cancel ' });
        this.dialogOkayBtn = this.dialogBox.getByRole('button', { name: ' Okay ' });
        this.languageBtn = page.locator('.currentLang');
        this.EnLangBtn = page.getByText('EN', { exact: true });
        this.FrLangBtn = page.getByText('FR', { exact: true });
        this.initialInfo = page.getByText('Initial Info', { exact: true });
        this.personalStatement = page.locator('.v-stepper__label').filter({ hasText: 'Personal Statement' });
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async changeLanguageToEN() {
        await this.languageBtn.click();
        await this.EnLangBtn.click();
    }

    async changeLanguageToFR() {
        await this.languageBtn.click();
        await this.FrLangBtn.click();
    }

    async getLanguageChangeWarningMsg() {
        return (await this.langChangeMsg.textContent()).trim();
    }

    async checkCurrentLanguageSelected() {
        return (await this.languageBtn.textContent()).trim();
    }

    async clickDialogOkayBtn() {
        await this.dialogOkayBtn.click();
    }

    async goBackToStep1() {
        await this.initialInfo.click();
    }

    async goToStep4() {
        await this.personalStatement.click();
    }

}