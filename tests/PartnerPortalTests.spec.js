import { test, expect, request } from '@playwright/test';
import { loginIntoApp, loginWithValidUser } from '../PageTests/LoginPageTest';
import { logoutFromApplication, goToMyApplicationsPage, navigateToAdminPartnershipPage, navigateToPartnershipsPage, navigateToAdminReportsPage, verifyWarningMsgOnLangChangeInForm, verifyIfNotificationMsgForOpenApplication, verifyTLProductIsVisible, verifyCookieBannerIsVisible, verifyMyPoliciesInMenu, navigateToProductPage, navigateToMyPoliciesPage, navigateToTermLifeByLifeBanner, navigateToMyApplicationsPage } from '../PageTests/DashboardTest';
import { addNewPartnerManually, approvePartnerRequest, verifyPartnerNameLatestAdded, verifyPartnerStatusLatestAdded, verifyErrorMessageWhileAddingPartner, verifyTotalPartnersCount, bulkUploadPartners, verifyBulkUploadError, deletePartnersInBulk } from '../PageTests/PP_DashboadPageTest';
import { navigateToReportsTab, verifyReportTypeOptionsList, verifyPopUpMessage, downloadCATermSalesReport, downloadUSTravelSalesReport, downloadUserKnockoutReport, downloadCATermUserJourneyReport, downloadCSTPartnerReport, downloadGGAPartnerReport, downloadALLPartnerReport, verifyNoDataMessage } from '../PageTests/PP_ReportsPageTest'; 
import { verifyProductPageHeader, verifyGetYourTLQuoteBtnIsVisible, navigateToPolicyForm } from '../PageTests/TLProductPageTest';
import { applyForPartnership } from '../PageTests/PartnershipsPageTest';
const { url, urlLogin, urlRegister, username, password, adminuser, adminpass, cookiestext, tagline, date, gender, firstname, lastname, houseaddress, phonenumber, income, saving, mortgageBal, debt, quotevalue, feet, inches, weight, marijuana, drinks, drinksKnock, OptionYes, OptionNo, benfirstname, benlastname, bendob, benshare, passportno, healthno, licenseno, cardname, cardnumber, expirydate, cvv, accountholdername, transitnumber, institutionnumber, accountnumber, bankname } = require('../Utils/TestData');

test.describe('App Flow TCs', async () => {

    test('BL-T124: Admin shall have ability to add partner manually from partner portal dashboard page.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, adminuser, adminpass);
        await navigateToAdminPartnershipPage(page);
        await addNewPartnerManually(page, "Manual Partner Added", "Company", "testcompany.com", "2222222222", "test@testing.com", "CST");
        expect(await verifyPartnerNameLatestAdded(page)).toEqual("Manual Partner Added");    
    });

    test('BL-T125: Partner user is landing on CA term product page after hitting the partner link.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, adminuser, adminpass);
        await navigateToAdminPartnershipPage(page);
        const url_part1 = "https://blanket-development.web.app/canadianterm/partner/";
        const url_part2 = (await page.locator("//div[@class='v-data-table__wrapper']/table/tbody/tr[1]/td[4]").textContent()).trim();
        const partner_url = url_part1.concat(url_part2);
        const newPage = await page.context().newPage();
        await newPage.goto(partner_url);
        expect(newPage.getByText(" We’ve got what matters most covered. ").first()).toBeVisible();
    });

    test('BL-T156: Admin shall have ability to download the CA term life policy sales report.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, adminuser, adminpass);
        await navigateToAdminReportsPage(page);
        await navigateToReportsTab(page);
        expect(await verifyReportTypeOptionsList(page)).toContainEqual("Ca Term Life Sales Report");
        await downloadCATermSalesReport(page);
        expect(await verifyPopUpMessage(page)).toMatch(/File downloaded successfully|No data found for selected date/);
    });

    test('BL-T157: Application shall throw an error message if admin tries to download any report for dates which have no data.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, adminuser, adminpass);
        await navigateToAdminReportsPage(page);
        await navigateToReportsTab(page);
        expect(await verifyNoDataMessage(page)).toEqual("No data found for selected date");
    });
    
    test('BL-T160: Request for partnership shall be visible to admin on partner portal dashboard screen with status as New.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, adminuser, adminpass);
        await navigateToPartnershipsPage(page);
        await applyForPartnership(page, "Partnership Applied","Company", "testcompany.com", "2222222222", "test@testing.com");
        await navigateToAdminPartnershipPage(page);
        expect(await verifyPartnerNameLatestAdded(page)).toEqual("Partnership Applied");    
        expect(await verifyPartnerStatusLatestAdded(page)).toEqual(" NEW ");
        await (page.locator("//div[@class='v-data-table__wrapper']/table/tbody/tr[1]/td[11]//button[1]")).click();
        await approvePartnerRequest(page, "CST");
        expect(await verifyPartnerStatusLatestAdded(page)).toEqual(" APPROVED ");
    });

    test('BL-T163: Admin shall have ability to download the users knockout report.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, adminuser, adminpass);
        await navigateToAdminReportsPage(page);
        await navigateToReportsTab(page);
        expect(await verifyReportTypeOptionsList(page)).toContainEqual("Knockout Users Report");
        await downloadUserKnockoutReport(page);
        expect(await verifyPopUpMessage(page)).toMatch(/File downloaded successfully|No data found for selected date/);
    });

    test('BL-T164: Application shall highlight all duplicate email ids in red color and display on top while bulk uploading partners through csv.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, adminuser, adminpass);
        await navigateToAdminPartnershipPage(page);
        await bulkUploadPartners(page, 'C:/Users/gagandeep.singla/Downloads/DuplicatePartners.csv');
        await expect(page.locator("//div[@data-testid='bulkUploadTable']/div/table/colgroup")).toBeVisible();
        await expect(page.locator("//tr[1][@class='duplicate']")).toBeVisible();
    });

    test('BL-T165: Admin shall have ability to download the US travel policy sales report.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, adminuser, adminpass);
        await navigateToAdminReportsPage(page);
        await navigateToReportsTab(page);
        expect(await verifyReportTypeOptionsList(page)).toContainEqual("US Travel Sales Report");
        await downloadUSTravelSalesReport(page);
        expect(await verifyPopUpMessage(page)).toMatch(/File downloaded successfully|No data found for selected date/);
    });
    
    test('BL-T166: Application shall not allow user to upload more than 300 partners in one go.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, adminuser, adminpass);
        await navigateToAdminPartnershipPage(page);
        await bulkUploadPartners(page, 'C:/Users/gagandeep.singla/Downloads/LimitCross300partners.csv');
        expect(await verifyBulkUploadError(page)).toEqual("Max limit is 300");
    });

    test('BL-T167: Application shall not allow user to upload the partners with csv having wrong template or invalid data.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, adminuser, adminpass);
        await navigateToAdminPartnershipPage(page);
        await bulkUploadPartners(page, 'C:/Users/gagandeep.singla/Downloads/IncorrectColumnPartners.csv');
        expect(await verifyBulkUploadError(page)).toEqual("CSV file contains incorrect or missing headers.");
        await page.getByRole('dialog').getByRole('button', {name: ' Cancel '}).click();
        await bulkUploadPartners(page, 'C:/Users/gagandeep.singla/Downloads/IncorrectDataPartners.csv');
        await page.locator("//div[@data-testid='bulkUploadDialog']//div[3]/button[2]").click();
        expect(await verifyBulkUploadError(page)).toEqual("Request failed with status code 400");
    });

    test('BL-T168: Admin shall not be allowed to add partner manually without adding mandatory partner info.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, adminuser, adminpass);
        await navigateToAdminPartnershipPage(page);
        await verifyErrorMessageWhileAddingPartner(page, "Manual Partner Added", "testcompany.com", "2222222222", "test@testing.com", "CST");
        expect(page.getByRole('dialog').getByText("Company Name is required")).toBeVisible();
    });

    test('BL-T169: Admin shall have ability to download the partners (CST, GGA & All) report.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, adminuser, adminpass);
        await navigateToAdminReportsPage(page);
        await navigateToReportsTab(page);
        expect(await verifyReportTypeOptionsList(page)).toContainEqual("CST Partner Report","GGA Partner Report","All Partner Report");
        await downloadCSTPartnerReport(page);
        expect(await verifyPopUpMessage(page)).toMatch(/File downloaded successfully|No data found for selected date/);
        await page.getByRole('dialog').getByRole('button', { name: ' Close '}).click();
        await page.locator('.v-select__selection').filter({ hasText: 'CST Partner Report' }).click();
        await downloadGGAPartnerReport(page);
        expect(await verifyPopUpMessage(page)).toMatch(/File downloaded successfully|No data found for selected date/);
        await page.getByRole('dialog').getByRole('button', { name: ' Close '}).click();
        await page.locator('.v-select__selection').filter({ hasText: 'GGA Partner Report' }).click();
        await downloadALLPartnerReport(page);
        expect(await verifyPopUpMessage(page)).toMatch(/File downloaded successfully|No data found for selected date/);
    });

    test('BL-T170: Admin shall have ability to download the CA Term User Journey Report.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, adminuser, adminpass);
        await navigateToAdminReportsPage(page);
        await navigateToReportsTab(page);
        expect(await verifyReportTypeOptionsList(page)).toContainEqual("CA Term User Journey Report");
        await downloadCATermUserJourneyReport(page);
        expect(await verifyPopUpMessage(page)).toMatch(/File downloaded successfully|No data found for selected date/);
    });

    test.only('BL-T174: Admin shall have ability to bulk delete partners from partner portal dashboard page.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, adminuser, adminpass);
        await navigateToAdminPartnershipPage(page);
        const totalPartners_beforeDelete = await verifyTotalPartnersCount(page);
        await deletePartnersInBulk(page);
        const totalPartners_afterDelete = await verifyTotalPartnersCount(page);
        await expect(page.getByRole('status')).toBeVisible();
        expect(totalPartners_beforeDelete).not.toBe(totalPartners_afterDelete);
    });

    test('BL-T177: User shall able to upload partners in bulk through csv file using bulk upload.', async ({ page }) => {
        await loginIntoApp(page, urlLogin, adminuser, adminpass);
        await navigateToAdminPartnershipPage(page);
        await bulkUploadPartners(page, 'C:/Users/gagandeep.singla/Downloads/ValidPartners.csv');
        await page.locator("//div[@data-testid='bulkUploadDialog']//div[3]/button[2]").click();
        await expect(page.getByRole('status')).toBeVisible();
        expect(await verifyPartnerNameLatestAdded(page)).toEqual("Bulk Partner 1 Auto");   
        expect(await verifyPartnerStatusLatestAdded(page)).toEqual(" APPROVED ");
    });

});