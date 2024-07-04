import { POManager } from '../PageObjects/POManager';

async function verifyProductPageHeader(page) {

    const pomanager = new POManager(page);
    const termlifeCApage = pomanager.getTermLifeCAPage();
    return await termlifeCApage.getHeaderText();

}

async function navigateToPolicyForm(page) {

    const pomanager = new POManager(page);
    const termlifeCApage = pomanager.getTermLifeCAPage();
    await termlifeCApage.clickApplyNowBtn();

}

module.exports = { verifyProductPageHeader, navigateToPolicyForm };