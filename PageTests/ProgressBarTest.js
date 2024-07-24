import { POManager } from '../PageObjects/POManager';

async function verifyStep1IsCompleted(page) {
    const pomanager = new POManager(page);
    const progressbar = pomanager.getProgressBar();
    const completed_step1 = await progressbar.getCompletedStep1Locator();
    return completed_step1;
}

async function verifyStep2IsCompleted(page) {
    const pomanager = new POManager(page);
    const progressbar = pomanager.getProgressBar();
    const completed_step2 = await progressbar.getCompletedStep2Locator();
    return completed_step2;
}

async function verifyStep4IsInactive(page) {
    const pomanager = new POManager(page);
    const progressbar = pomanager.getProgressBar();
    const Inactive_step4 = await progressbar.getInActiveStep4Locator();
    return Inactive_step4;
}

async function verifyStep5IsInactive(page) {
    const pomanager = new POManager(page);
    const progressbar = pomanager.getProgressBar();
    const Inactive_step5 = await progressbar.getInActiveStep5Locator();
    return Inactive_step5;
}

async function verifyStep6IsInactive(page) {
    const pomanager = new POManager(page);
    const progressbar = pomanager.getProgressBar();
    const Inactive_step6 = await progressbar.getInActiveStep6Locator();
    return Inactive_step6;
}

async function verifyStep7IsInactive(page) {
    const pomanager = new POManager(page);
    const progressbar = pomanager.getProgressBar();
    const Inactive_step7 = await progressbar.getInActiveStep7Locator();
    return Inactive_step7;
}

module.exports = { verifyStep1IsCompleted, verifyStep2IsCompleted, verifyStep4IsInactive, verifyStep5IsInactive, verifyStep6IsInactive, verifyStep7IsInactive };