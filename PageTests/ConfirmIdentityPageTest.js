import { POManager } from '../PageObjects/POManager';

async function verifyConfirmIdentityPageHeader(page) {
    const pomanager = new POManager(page);
    const identitypage = pomanager.getConfirmIdentityPage();
    const header_identity = await identitypage.getConfirmIdentityPageHeader();
    return header_identity;
}

module.exports = { verifyConfirmIdentityPageHeader };