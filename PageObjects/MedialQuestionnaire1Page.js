class MedicalQuestionnaire1Page {

    constructor(page) {
        //this.optionNo = page.getByRole('radio').filter().getByLabel('No', { exact: true });
        //this.optionNo = page.locator('.p-style > div > span > .v-input > .v-input__control > .v-input__slot > .v-input--radio-group__input > div:nth-child(2)');
        this.questionCancerOptionYes = page.locator("[name='cancer0'] + div.v-input--selection-controls__ripple");
        this.questionCancerOptionNo = page.locator("[name='cancer1'] + div.v-input--selection-controls__ripple");
        this.questionHeartAttackOptionYes = page.locator("[name='heart0'] + div.v-input--selection-controls__ripple");
        this.questionHeartAttackOptionNo = page.locator("[name='heart1'] + div.v-input--selection-controls__ripple");
        this.questionFibrosisOptionYes = page.locator("[name='fibrosis0'] + div.v-input--selection-controls__ripple");
        this.questionFibrosisOptionNo = page.locator("[name='fibrosis1'] + div.v-input--selection-controls__ripple");
        this.questionSleepApneaOptionYes = page.locator("[name='sleepApnea0'] + div.v-input--selection-controls__ripple");
        this.questionSleepApneaOptionNo = page.locator("[name='sleepApnea1'] + div.v-input--selection-controls__ripple");
        this.questionSleepApneaAdditionalOptionYes = page.locator("[name='healthConditional0'] + div.v-input--selection-controls__ripple");
        this.questionSleepApneaAdditionalOptionNo = page.locator("[name='healthConditional1'] + div.v-input--selection-controls__ripple");
        this.questionAIDSHIVOptionYes = page.locator("[name='immunity0'] + div.v-input--selection-controls__ripple");
        this.questionAIDSHIVOptionNo = page.locator("[name='immunity1'] + div.v-input--selection-controls__ripple");
        this.questionBrainDisorderOptionYes = page.locator("[name='brainDisorder0'] + div.v-input--selection-controls__ripple");
        this.questionBrainDisorderOptionNo = page.locator("[name='brainDisorder1'] + div.v-input--selection-controls__ripple");
        this.questionMemoryDisorderOptionYes = page.locator("[name='cognitiveImpairment0'] + div.v-input--selection-controls__ripple");
        this.questionMemoryDisorderOptionNo = page.locator("[name='cognitiveImpairment1'] + div.v-input--selection-controls__ripple");
        this.questionRheumatoidArthritisOptionYes = page.locator("[name='musculoskeletal0'] + div.v-input--selection-controls__ripple");
        this.questionRheumatoidArthritisOptionNo = page.locator("[name='musculoskeletal1'] + div.v-input--selection-controls__ripple");
        this.questionSchizophreniaOptionYes = page.locator("[name='schizophrenia0'] + div.v-input--selection-controls__ripple");
        this.questionSchizophreniaOptionNo = page.locator("[name='schizophrenia1'] + div.v-input--selection-controls__ripple");
        this.questionDepressionOptionYes = page.locator("[name='depression0'] + div.v-input--selection-controls__ripple");
        this.questionDepressionOptionNo = page.locator("[name='depression1'] + div.v-input--selection-controls__ripple");
        this.questionAnxietyOptionYes = page.locator("[name='anxiety0'] + div.v-input--selection-controls__ripple");
        this.questionAnxietyOptionNo = page.locator("[name='anxiety1'] + div.v-input--selection-controls__ripple");
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
    }

    async medicalQuestionsPage1(option) {
        if (option == "Yes") {
            await this.page.waitForSelector(this.page.locator(".v-stepper__items"));
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
            //await this.page.waitForSelector(this.page.locator('.v-stepper__items'));
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
