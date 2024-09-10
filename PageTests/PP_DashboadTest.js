import { POManager } from '../PageObjects/POManager';

async function addNewPartnerManually(page, partnername, companyname, companywebsite, phone, email, type) {
    const pomanager = new POManager(page);
    const partnerdashboard = pomanager.getPPDashboardPage();
    await partnerdashboard.clickAddNewPartnerBtn();
    await partnerdashboard.addNewPartnerManually(partnername, companyname, companywebsite, phone, email, type);
}

async function verifyErrorMessageWhileAddingPartner(page, partnername, companywebsite, phone, email, type) {
    const pomanager = new POManager(page);
    const partnerdashboard = pomanager.getPPDashboardPage();
    await partnerdashboard.clickAddNewPartnerBtn();
    await partnerdashboard.addNewPartnerWithoutMandatoryFields(partnername, companywebsite, phone, email, type);
}

async function verifyPartnerNameLatestAdded(page) {
    const pomanager = new POManager(page);
    const partnerdashboard = pomanager.getPPDashboardPage();
    const partnername_latest = await partnerdashboard.getPartnerNameLatest();
    return partnername_latest;
}

async function verifyPartnerStatusLatestAdded(page) {
    const pomanager = new POManager(page);
    const partnerdashboard = pomanager.getPPDashboardPage();
    const partnerstatus_latest = await partnerdashboard.getPartnerStatusLatest();
    return partnerstatus_latest;
}

async function approvePartnerRequest(page, type) {
    const pomanager = new POManager(page);
    const partnerdashboard = pomanager.getPPDashboardPage();
    await partnerdashboard.clickStatusandApprove(type);
}

async function verifyTotalPartnersCount(page) {
    const pomanager = new POManager(page);
    const partnerdashboard = pomanager.getPPDashboardPage();
    const partner_count = await partnerdashboard.getTotalPartnersCount();
    return partner_count;
}

async function bulkUploadPartners(page, filePath) {
    const pomanager = new POManager(page);
    const partnerdashboard = pomanager.getPPDashboardPage();
    await partnerdashboard.bulkUploadCSV(filePath);
}

async function verifyBulkUploadError(page) {
    const pomanager = new POManager(page);
    const partnerdashboard = pomanager.getPPDashboardPage();
    const error_bulkupload = await partnerdashboard.getBulkUploadCSVError();
    return error_bulkupload;
}


module.exports = { addNewPartnerManually, approvePartnerRequest, verifyPartnerNameLatestAdded, verifyPartnerStatusLatestAdded, verifyErrorMessageWhileAddingPartner, verifyTotalPartnersCount, bulkUploadPartners, verifyBulkUploadError }; 