import { test, expect, request } from '@playwright/test';
import { login } from '../PageTests/LoginPageTest';
import { logoutFromApplication, acceptCookiesWindow, goToMyApplicationsPage, navigateToAdminPartnershipPage, navigateToPartnershipsPage, navigateToAdminReportsPage, verifyWarningMsgOnLangChangeInForm, verifyIfNotificationMsgForOpenApplication, verifyTLProductIsVisible, verifyCookieBannerIsVisible, verifyMyPoliciesInMenu, navigateToProductPage, navigateToMyPoliciesPage, navigateToTermLifeByLifeBanner, navigateToMyApplicationsPage, navigateToManageUsersPage } from '../PageTests/DashboardTest';
import { addNewPartnerManually, approvePartnerRequest, verifyPartnerNameLatestAdded, verifyPartnerStatusLatestAdded, verifyErrorMessageWhileAddingPartner, verifyTotalPartnersCount, bulkUploadPartners, verifyBulkUploadError, deletePartnersInBulk } from '../PageTests/PP_DashboadPageTest';
import { navigateToReportsTab, verifyReportTypeOptionsList, verifyPopUpMessage, downloadCATermSalesReport, downloadUSTravelSalesReport, downloadUserKnockoutReport, downloadCATermUserJourneyReport, downloadCSTPartnerReport, downloadGGAPartnerReport, downloadALLPartnerReport, downloadConfidentialSalesReport, verifyNoDataMessage } from '../PageTests/PP_ReportsPageTest'; 
import { applyForPartnership } from '../PageTests/PartnershipsPageTest';
import { searchAndSelectUser, verifySelectUserEmail, verifySuperAdminLogout } from '../PageTests/ManageUserPageTest';
const { superadminuser, superadminpass, adminuser, adminpass, cookiestext, tagline, date, gender, firstname, lastname, houseaddress, phonenumber, income, saving, mortgageBal, debt, quotevalue, feet, inches, weight, marijuana, drinks, drinksKnock, OptionYes, OptionNo, benfirstname, benlastname, bendob, benshare, passportno, healthno, licenseno, cardname, cardnumber, expirydate, cvv, accountholdername, transitnumber, institutionnumber, accountnumber, bankname } = require('../Utils/TestData');

test.describe('Partner Portal TCs', async () => {

    test('BL-T124: Admin shall have ability to add partner manually from partner portal dashboard page.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, adminuser, adminpass);
        await acceptCookiesWindow(page);
        await navigateToAdminPartnershipPage(page);
        await addNewPartnerManually(page, "Manual Partner Added", "Company", "testcompany.com", "2222222222", "test@testing.com", "CST");
        expect(await verifyPartnerNameLatestAdded(page)).toEqual("Manual Partner Added");    
    });

    test('BL-T125: Partner user is landing on CA term product page after hitting the partner link.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, adminuser, adminpass);
        await acceptCookiesWindow(page);
        await navigateToAdminPartnershipPage(page);
        const url_part1 = "https://blanket-development.web.app/canadianterm/partner/";
        const url_part2 = (await page.locator("//div[@class='v-data-table__wrapper']/table/tbody/tr[1]/td[4]").textContent()).trim();
        const partner_url = url_part1.concat(url_part2);
        const newPage = await page.context().newPage();
        await newPage.goto(partner_url);
        expect(newPage.getByText(" We’ve got what matters most covered. ").first()).toBeVisible();
    });

    test('BL-T156: Admin shall have ability to download the CA term life policy sales report.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, adminuser, adminpass);
        await acceptCookiesWindow(page);
        await navigateToAdminReportsPage(page);
        await navigateToReportsTab(page);
        expect(await verifyReportTypeOptionsList(page)).toContainEqual("Ca Term Life Sales Report");
        await downloadCATermSalesReport(page);
        expect(await verifyPopUpMessage(page)).toMatch(/File downloaded successfully|No data found for selected date/);
    });

    test('BL-T157: Application shall throw an error message if admin tries to download any report for dates which have no data.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, adminuser, adminpass);
        await acceptCookiesWindow(page);
        await navigateToAdminReportsPage(page);
        await navigateToReportsTab(page);
        expect(await verifyNoDataMessage(page)).toEqual("No data found for selected date");
    });
    
    test('BL-T160: Request for partnership shall be visible to admin on partner portal dashboard screen with status as New.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, adminuser, adminpass);
        await acceptCookiesWindow(page);
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
        await page.goto('/pages/login');
        await login(page, adminuser, adminpass);
        await acceptCookiesWindow(page);
        await navigateToAdminReportsPage(page);
        await navigateToReportsTab(page);
        expect(await verifyReportTypeOptionsList(page)).toContainEqual("Knockout Users Report");
        await downloadUserKnockoutReport(page);
        expect(await verifyPopUpMessage(page)).toMatch(/File downloaded successfully|No data found for selected date/);
    });

    test('BL-T164: All duplicate email ids in csv file shall get highlighted in red color and display on top while bulk uploading partners through csv.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, adminuser, adminpass);
        await acceptCookiesWindow(page);
        await navigateToAdminPartnershipPage(page);
        //await bulkUploadPartners(page, 'C:/Users/gagandeep.singla/Downloads/DuplicatePartnersEmailids.csv');
        await bulkUploadPartners(page, '/opt/files/DuplicatePartnersEmailids.csv');
        await expect(page.locator("//div[@data-testid='bulkUploadTable']/div/table/colgroup")).toBeVisible();
        await expect(page.locator("//tr[1][@class='duplicate']")).toBeVisible();
    });

    test('BL-T165: Admin shall have ability to download the US travel policy sales report.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, adminuser, adminpass);
        await acceptCookiesWindow(page);
        await navigateToAdminReportsPage(page);
        await navigateToReportsTab(page);
        expect(await verifyReportTypeOptionsList(page)).toContainEqual("US Travel Sales Report");
        await downloadUSTravelSalesReport(page);
        expect(await verifyPopUpMessage(page)).toMatch(/File downloaded successfully|No data found for selected date/);
    });
    
    test('BL-T166: Application shall not allow user to upload more than 300 partners in one go.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, adminuser, adminpass);
        await acceptCookiesWindow(page);
        await navigateToAdminPartnershipPage(page);
        //await bulkUploadPartners(page, 'C:/Users/gagandeep.singla/Downloads/LimitCross300partners.csv');
        await bulkUploadPartners(page, '/opt/files/LimitCross300partners.csv');
        expect(await verifyBulkUploadError(page)).toEqual("Max limit is 300");
    });

    test('BL-T167: Application shall not allow user to upload the partners with csv having wrong template or duplicate data.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, adminuser, adminpass);
        await acceptCookiesWindow(page);
        await navigateToAdminPartnershipPage(page);
        //await bulkUploadPartners(page, 'C:/Users/gagandeep.singla/Downloads/IncorrectColumnPartners.csv');
        await bulkUploadPartners(page, '/opt/files/IncorrectColumnPartners.csv');
        expect(await verifyBulkUploadError(page)).toEqual("CSV file contains incorrect or missing headers.");
        await page.getByRole('dialog').getByRole('button', {name: ' Cancel '}).click();
        //await bulkUploadPartners(page, 'C:/Users/gagandeep.singla/Downloads/PartnersWithSameEmailOfExistingPartners.csv');
        await bulkUploadPartners(page, '/opt/files/PartnersWithSameEmailOfExistingPartners.csv');
        expect(await verifyBulkUploadError(page)).toContain("Duplicate emails found");
    });

    test('BL-T168: Admin shall not be allowed to add partner manually without adding mandatory partner info.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, adminuser, adminpass);
        await acceptCookiesWindow(page);
        await navigateToAdminPartnershipPage(page);
        await verifyErrorMessageWhileAddingPartner(page, "Manual Partner Added", "testcompany.com", "2222222222", "test@testing.com", "CST");
        expect(page.getByRole('dialog').getByText("Company Name is required")).toBeVisible();
    });

    test('BL-T169: Admin shall have ability to download the partners (CST, GGA & All) report.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, adminuser, adminpass);
        await acceptCookiesWindow(page);
        await navigateToAdminReportsPage(page);
        await navigateToReportsTab(page);
        expect(await verifyReportTypeOptionsList(page)).toContainEqual("CST Partner Report","GGA Partner Report","All Partner Report");
        await downloadCSTPartnerReport(page);
        expect(await verifyPopUpMessage(page)).toMatch(/File downloaded successfully|No data found for selected date/);
    });

    test('BL-T169(1): Admin shall have ability to download the partners (CST, GGA & All) report.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, adminuser, adminpass);
        await acceptCookiesWindow(page);
        await navigateToAdminReportsPage(page);
        await navigateToReportsTab(page);
        expect(await verifyReportTypeOptionsList(page)).toContainEqual("CST Partner Report","GGA Partner Report","All Partner Report");
        await downloadGGAPartnerReport(page);
        expect(await verifyPopUpMessage(page)).toMatch(/File downloaded successfully|No data found for selected date/);
    });

    test('BL-T169(2): Admin shall have ability to download the partners (CST, GGA & All) report.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, adminuser, adminpass);
        await acceptCookiesWindow(page);
        await navigateToAdminReportsPage(page);
        await navigateToReportsTab(page);
        expect(await verifyReportTypeOptionsList(page)).toContainEqual("CST Partner Report","GGA Partner Report","All Partner Report");
        await downloadALLPartnerReport(page);
        expect(await verifyPopUpMessage(page)).toMatch(/File downloaded successfully|No data found for selected date/);
    });

    test('BL-T170: Admin shall have ability to download the CA Term User Journey Report.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, adminuser, adminpass);
        await acceptCookiesWindow(page);
        await navigateToAdminReportsPage(page);
        await navigateToReportsTab(page);
        expect(await verifyReportTypeOptionsList(page)).toContainEqual("CA Term User Journey Report");
        await downloadCATermUserJourneyReport(page);
        expect(await verifyPopUpMessage(page)).toMatch(/File downloaded successfully|No data found for selected date/);
    });

    test('BL-T174: Admin shall have ability to bulk delete partners from partner portal dashboard page.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, adminuser, adminpass);
        await acceptCookiesWindow(page);
        await navigateToAdminPartnershipPage(page);
        const totalPartners_beforeDelete = await verifyTotalPartnersCount(page);
        await deletePartnersInBulk(page);
        const totalPartners_afterDelete = await verifyTotalPartnersCount(page);
        await expect(page.getByRole('status')).toBeVisible();
        expect(totalPartners_beforeDelete).not.toBe(totalPartners_afterDelete);
    });

    test('BL-T177: User shall able to upload partners in bulk through csv file using bulk upload.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, adminuser, adminpass);
        await acceptCookiesWindow(page);
        await navigateToAdminPartnershipPage(page);
        const emailfirstrow = await page.locator("//div[@class='v-data-table__wrapper']/table/tbody/tr[1]/td[8]").textContent();
        if (emailfirstrow == "partnerbulkauto@test.com") {
            await page.locator("//div[@class='v-data-table__wrapper']/table/tbody/tr[1]/td[11]//button[2]").click();
            await page.getByRole('dialog').getByRole('button', { name: ' OK ' }).click();
        }
        //await bulkUploadPartners(page, 'C:/Users/gagandeep.singla/Downloads/ValidPartners.csv');
        await bulkUploadPartners(page, '/opt/files/ValidPartners.csv');
        await page.locator("//div[@data-testid='bulkUploadDialog']//div[3]/button[2]").click();
        await expect(page.getByRole('status')).toBeVisible();
        expect(await verifyPartnerNameLatestAdded(page)).toEqual("Bulk Partner 1 Auto");   
        expect(await verifyPartnerStatusLatestAdded(page)).toEqual(" APPROVED ");
        await page.locator("//div[@class='v-data-table__wrapper']/table/tbody/tr[1]/td[11]//button[2]").click();
        await page.getByRole('dialog').getByRole('button', { name: ' OK ' }).click();
    });

    test('BL-T180: Admin shall have ability to download the Confidential Sales Report (Customer Name).', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, adminuser, adminpass);
        await acceptCookiesWindow(page);
        await navigateToAdminReportsPage(page);
        await navigateToReportsTab(page);
        expect(await verifyReportTypeOptionsList(page)).toContainEqual("Confidential Sales Report (Customer Name)");
        await downloadConfidentialSalesReport(page);
        expect(await verifyPopUpMessage(page)).toMatch(/File downloaded successfully|No data found for selected date/);
    });

    test('BL-T188: Super admin shall be allowed to select any user & able to purchase CA term life policy on selected user behalf.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, superadminuser, superadminpass);
        await acceptCookiesWindow(page);
        await navigateToManageUsersPage(page);
        await searchAndSelectUser(page, "gagandeep.singla+qa2@trantorinc.com");
        expect(await verifySelectUserEmail(page)).toEqual('gagandeep.singla+qa2@trantorinc.com');
        await expect(page.getByText('My Applications')).toBeVisible();
        await page.locator("//div[@class='v-data-table__wrapper']/table/tbody/tr[1]/td[5]/button[1]").click();
        await page.waitForTimeout(2000);
        expect(page.url()).toContain("canadianterm/survey");
    });

    test('BL-T189: Super admin shall be moved to his own account after logging out selected user account.', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, superadminuser, superadminpass);
        await acceptCookiesWindow(page);
        await navigateToManageUsersPage(page);
        await searchAndSelectUser(page, "gagandeep.singla+qa2@trantorinc.com");
        expect(await verifySelectUserEmail(page)).toEqual('gagandeep.singla+qa2@trantorinc.com');
        await verifySuperAdminLogout(page);
        await expect(page.locator('.row.activeUser .col')).not.toBeVisible();
    });



});