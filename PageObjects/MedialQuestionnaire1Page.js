const{ expect, request } = require("@playwright/test");

class MedicalQuestionnaire1Page {

    constructor(page) {
        //this.optionNo = page.getByRole('radio').filter().getByLabel('No', { exact: true });
        //this.optionNo = page.locator('.p-style > div > span > .v-input > .v-input__control > .v-input__slot > .v-input--radio-group__input > div:nth-child(2)');
        this.questionCancerOptionYes = page.locator("//input[@name='cancer0']/following-sibling::div[1]");
        this.questionCancerOptionNo = page.locator("//input[@name='cancer1']/following-sibling::div[1]");
        this.questionHeartAttackOptionYes = page.locator("//input[@name='heart0']/following-sibling::div[1]");
        this.questionHeartAttackOptionNo = page.locator("//input[@name='heart1']/following-sibling::div[1]");
        this.questionFibrosisOptionYes = page.locator("//input[@name='fibrosis0']/following-sibling::div[1]");
        this.questionFibrosisOptionNo = page.locator("//input[@name='fibrosis1']/following-sibling::div[1]");
        this.questionSleepApneaOptionYes = page.locator("//input[@name='sleepApnea0']/following-sibling::div[1]");
        this.questionSleepApneaOptionNo = page.locator("//input[@name='sleepApnea1']/following-sibling::div[1]");
        this.questionSleepApneaAdditionalOptionYes = page.locator("//input[@name='healthConditional0']/following-sibling::div[1]");
        this.questionSleepApneaAdditionalOptionNo = page.locator("//input[@name='healthConditional1']/following-sibling::div[1]");
        this.questionAIDSHIVOptionYes = page.locator("//input[@name='immunity0']/following-sibling::div[1]");
        this.questionAIDSHIVOptionNo = page.locator("//input[@name='immunity1']/following-sibling::div[1]");
        this.questionBrainDisorderOptionYes = page.locator("//input[@name='brainDisorder0']/following-sibling::div[1]");
        this.questionBrainDisorderOptionNo = page.locator("//input[@name='brainDisorder1']/following-sibling::div[1]");
        this.questionMemoryDisorderOptionYes = page.locator("//input[@name='cognitiveImpairment0']/following-sibling::div[1]");
        this.questionMemoryDisorderOptionNo = page.locator("//input[@name='cognitiveImpairment1']/following-sibling::div[1]");
        this.questionRheumatoidArthritisOptionYes = page.locator("//input[@name='musculoskeletal0']/following-sibling::div[1]");
        this.questionRheumatoidArthritisOptionNo = page.locator("//input[@name='musculoskeletal1']/following-sibling::div[1]");
        this.questionSchizophreniaOptionYes = page.locator("//input[@name='schizophrenia0']/following-sibling::div[1]");
        this.questionSchizophreniaOptionNo = page.locator("//input[@name='schizophrenia1']/following-sibling::div[1]");
        this.questionDepressionOptionYes = page.locator("//input[@name='depression0']/following-sibling::div[1]");
        this.questionDepressionOptionNo = page.locator("//input[@name='depression1']/following-sibling::div[1]");
        this.questionAnxietyOptionYes = page.locator("//input[@name='anxiety0']/following-sibling::div[1]");
        this.questionAnxietyOptionNo = page.locator("//input[@name='anxiety1']/following-sibling::div[1]");
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
    }

    async medicalQuestionsPage1(option) {
        if (option == "Yes") {
            await this.questionCancerOptionYes.click();
            await this.questionHeartAttackOptionYes.click();
            await this.questionFibrosisOptionYes.click();
            await this.questionSleepApneaOptionYes.click();
            await this.questionSleepApneaAdditionalOptionYes.click();
            await this.questionAIDSHIVOptionYes.click();
            await this.questionBrainDisorderOptionYes.click();
            await this.questionMemoryDisorderOptionYes.click();
            await this.questionRheumatoidArthritisOptionYes.click();
            await this.questionSchizophreniaOptionYes.click();
            await this.questionDepressionOptionYes.click();
            await this.questionAnxietyOptionYes.click();
        }
        else {
            await this.questionCancerOptionNo.click();
            await this.questionHeartAttackOptionNo.click();
            await this.questionFibrosisOptionNo.click();
            await this.questionSleepApneaOptionNo.click();
            await this.questionAIDSHIVOptionNo.click();
            await this.questionBrainDisorderOptionNo.click();
            await this.questionMemoryDisorderOptionNo.click();
            await this.questionRheumatoidArthritisOptionNo.click();
            await this.questionSchizophreniaOptionNo.click();
            await this.questionDepressionOptionNo.click();
            await this.questionAnxietyOptionNo.click();
        }
    }
   
    async clickConitnueBtn() {
        await this.continueBtn.isEnabled();
        await this.continueBtn.click();
    }

}

module.exports = { MedicalQuestionnaire1Page };
