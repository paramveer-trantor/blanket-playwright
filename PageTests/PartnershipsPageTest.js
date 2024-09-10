import { POManager } from '../PageObjects/POManager';

async function applyForPartnership(page, partnername, companyname, companywebsite, phone, email) {
    const pomanager = new POManager(page);
    const partneships = pomanager.getPartnershipsPage();
    await partneships.enterPartnerDetails(partnername, companyname, companywebsite, phone, email);
}

module.exports = { applyForPartnership };