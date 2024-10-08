import { POManager } from '../PageObjects/POManager';

async function navigateToReportsTab(page) {
    const pomanager = new POManager(page);
    const partnereport = pomanager.getPPReportsPage();
    await partnereport.clickReportsTab();
}

async function verifyReportTypeOptionsList(page) {
    const pomanager = new POManager(page);
    const partnereport = pomanager.getPPReportsPage();
    await partnereport.openReportTypeList();
    return partnereport.getReportTypeOptionsList();
}

async function downloadCATermSalesReport(page) {
    const pomanager = new POManager(page);
    const partnereport = pomanager.getPPReportsPage();
    await partnereport.selectReportAsCATermSales();
    await partnereport.selectStartDate();
    await partnereport.clickDownloadCSVBtn();
}

async function downloadUSTravelSalesReport(page) {
    const pomanager = new POManager(page);
    const partnereport = pomanager.getPPReportsPage();
    await partnereport.selectReportAsUSTravelSales();
    await partnereport.selectStartDate();
    await partnereport.clickDownloadCSVBtn();
}

async function downloadUserKnockoutReport(page) {
    const pomanager = new POManager(page);
    const partnereport = pomanager.getPPReportsPage();
    await partnereport.selectReportAsKnockoutUser();
    await partnereport.selectStartDate();
    await partnereport.clickDownloadCSVBtn();
}

async function downloadCATermUserJourneyReport(page) {
    const pomanager = new POManager(page);
    const partnereport = pomanager.getPPReportsPage();
    await partnereport.selectReportAsCATermUserJourney();
    await partnereport.selectStartDate();
    await partnereport.clickDownloadCSVBtn();
}

async function downloadCSTPartnerReport(page) {
    const pomanager = new POManager(page);
    const partnereport = pomanager.getPPReportsPage();
    await partnereport.selectReportAsCSTPartner();
    await partnereport.selectStartDate();
    await partnereport.clickDownloadCSVBtn();
}

async function downloadGGAPartnerReport(page) {
    const pomanager = new POManager(page);
    const partnereport = pomanager.getPPReportsPage();
    await partnereport.selectReportAsGGAPartner();
    await partnereport.selectStartDate();
    await partnereport.clickDownloadCSVBtn();
}

async function downloadConfidentialSalesReport(page) {
    const pomanager = new POManager(page);
    const partnereport = pomanager.getPPReportsPage();
    await partnereport.selectReportAsConfidentialSales();
    await partnereport.selectStartDate();
    await partnereport.clickDownloadCSVBtn();
}

async function downloadALLPartnerReport(page) {
    const pomanager = new POManager(page);
    const partnereport = pomanager.getPPReportsPage();
    await partnereport.selectReportAsALLPartner();
    await partnereport.selectStartDate();
    await partnereport.clickDownloadCSVBtn();
}

async function verifyPopUpMessage(page) {
    const pomanager = new POManager(page);
    const partnereport = pomanager.getPPReportsPage();
    return await partnereport.getPopUpMessageText();
}

async function verifyNoDataMessage(page) {
    const pomanager = new POManager(page);
    const partnereport = pomanager.getPPReportsPage();
    await partnereport.openReportTypeList();
    await partnereport.selectReportAsUSTravelSales();
    await partnereport.clickDownloadCSVBtn();
    return await partnereport.getPopUpMessageText();
}

module.exports = { navigateToReportsTab, verifyReportTypeOptionsList, verifyPopUpMessage, downloadCATermSalesReport, downloadUSTravelSalesReport, downloadUserKnockoutReport, downloadCATermUserJourneyReport, downloadCSTPartnerReport, downloadGGAPartnerReport, downloadALLPartnerReport, verifyNoDataMessage, downloadConfidentialSalesReport }; 