exports.MedicalQuestionnaire1Page = class MedicalQuestionnaire1Page {

    constructor(page) {
        //this.optionNo = page.getByRole('radio').filter().getByLabel('No', { exact: true });
        //this.optionNo = page.locator('.p-style > div > span > .v-input > .v-input__control > .v-input__slot > .v-input--radio-group__input > div:nth-child(2)');
        this.questionCancerOptionYes = page.locator("[name='cancer0']");
        this.questionCancerOptionNo = page.locator("[name='cancer1']");
        this.questionHeartAttackOptionYes = page.locator("[name='heart0']");
        this.questionHeartAttackOptionNo = page.locator("[name='heart1']");
        this.questionFibrosisOptionYes = page.locator("[name='fibrosis0']");
        this.questionFibrosisOptionNo = page.locator("[name='fibrosis1']");
        this.questionSleepApneaOptionYes = page.locator("[name='sleepApnea0']");
        this.questionSleepApneaOptionNo = page.locator("[name='sleepApnea1']");
        this.questionSleepApneaAdditionalOptionYes = page.locator("[name='healthConditional0']");
        this.questionSleepApneaAdditionalOptionNo = page.locator("[name='healthConditional1']");
        this.questionAIDSHIVOptionYes = page.locator("[name='immunity0']");
        this.questionAIDSHIVOptionNo = page.locator("[name='immunity1']");
        this.questionBrainDisorderOptionYes = page.locator("[name='brainDisorder0']");
        this.questionBrainDisorderOptionNo = page.locator("[name='brainDisorder1']");
        this.questionMemoryDisorderOptionYes = page.locator("[name='cognitiveImpairment0']");
        this.questionMemoryDisorderOptionNo = page.locator("[name='cognitiveImpairment1']");
        this.questionRheumatoidArthritisOptionYes = page.locator("[name='musculoskeletal0']");
        this.questionRheumatoidArthritisOptionNo = page.locator("[name='musculoskeletal1']");
        this.questionSchizophreniaOptionYes = page.locator("[name='schizophrenia0']");
        this.questionSchizophreniaOptionNo = page.locator("[name='schizophrenia1']");
        this.questionDepressionOptionYes = page.locator("[name='depression0']");
        this.questionDepressionOptionNo = page.locator("[name='depression1']");
        this.questionAnxietyOptionYes = page.locator("[name='anxiety0']");
        this.questionAnxietyOptionNo = page.locator("[name='anxiety1']");
        this.continueBtn = page.getByRole('button', { name: ' Continue ' });
    }

    async questionCancer(option) {
        if (option == "Yes") {
            await this.questionCancerOptionYes.click();
        }
        else {
            await this.questionCancerOptionNo.click();
        }
    }

    async questionHeartAttack(option) {
        if (option == "Yes") {
            await this.questionHeartAttackOptionYes.click();
        }
        else {
            await this.questionHeartAttackOptionNo.click();
        }
    }

    async questionFibrosis(option) {
        if (option == "Yes") {
            await this.questionFibrosisOptionYes.click();
        }
        else {
            await this.questionFibrosisOptionNo.click();
        }
    }

    async questionSleepApnea(option) {
        if (option == "Yes") {
            await this.questionSleepApneaOptionYes.click();
        }
        else {
            await this.questionSleepApneaOptionNo.click();
        }
    }

    async questionSleepApneaAdditional(option) {
        if (option == "Yes") {
            await this.questionSleepApneaAdditionalOptionYes.click();
        }
        else {
            await this.questionSleepApneaAdditionalOptionNo.click();
        }
    }

    async questionAIDSHIV(option) {
        if (option == "Yes") {
            await this.questionAIDSHIVOptionYes.click();
        }
        else {
            await this.questionAIDSHIVOptionNo.click();
        }
    }

    async questionBrainDisorder(option) {
        if (option == "Yes") {
            await this.questionBrainDisorderOptionYes.click();
        }
        else {
            await this.questionBrainDisorderOptionNo.click();
        }
    }

    async questionMemoryDisorder(option) {
        if (option == "Yes") {
            await this.questionMemoryDisorderOptionYes.click();
        }
        else {
            await this.questionMemoryDisorderOptionNo.click();
        }
    }

    async questionRheumatoidArthritis(option) {
        if (option == "Yes") {
            await this.questionRheumatoidArthritisOptionYes.click();
        }
        else {
            await this.questionRheumatoidArthritisOptionNo.click();
        }
    }

    async questionSchizophrenia(option) {
        if (option == "Yes") {
            await this.questionSchizophreniaOptionYes.click();
        }
        else {
            await this.questionSchizophreniaOptionNo.click();
        }
    }

    async questionDepression(option) {
        if (option == "Yes") {
            await this.questionDepressionOptionYes.click();
        }
        else {
            await this.questionDepressionOptionNo.click();
        }
    }

    async questionAnxiety(option) {
        if (option == "Yes") {
            await this.questionAnxietyOptionYes.click();
        }
        else {
            await this.questionAnxietyOptionNo.click();
        }
    }

    async clickConitnueBtn() {
        await this.continueBtn.click();
    }

}

