export class ProgressBar {

    constructor(page) {
        this.page = page;
        this.completedStep1 = page.locator("//div[@class='v-stepper__step cursor-enabled scrollbar-item v-stepper__step--complete']//div[text()=' Initial Info ']");        
        this.competedStep2 = page.locator("//div[@class='v-stepper__step cursor-enabled scrollbar-item v-stepper__step--complete']//div[text()=' Policy Options ']");
        this.inActiveStep4 = page.locator("//div[@class='v-stepper__step cursor-enabled scrollbar-item v-stepper__step--inactive']//div[text()=' Personal Statement ']");
        this.inActiveStep5 = page.locator("//div[@class='v-stepper__step cursor-enabled scrollbar-item v-stepper__step--inactive']//div[text()=' Beneficiary ']");
        this.inActiveStep6 = page.locator("//div[@class='v-stepper__step cursor-enabled scrollbar-item v-stepper__step--inactive']//div[text()=' Your Policy ']");
        this.inActiveStep7 = page.locator("//div[@class='v-stepper__step cursor-enabled scrollbar-item v-stepper__step--inactive']//div[text()=' Payment ']");
    }

    async getCompletedStep1Locator() {
        return this.completedStep1.isVisible();
    }

    async getCompletedStep2Locator() {
        return this.competedStep2.isVisible();
    }

    async getInActiveStep4Locator() {
        return this.inActiveStep4.isVisible();
    }

    async getInActiveStep5Locator() {
        return this.inActiveStep5.isVisible();
    }

    async getInActiveStep6Locator() {
        return this.inActiveStep6.isVisible();
    }

    async getInActiveStep7Locator() {
        return this.inActiveStep7.isVisible();
    } 
    

}
