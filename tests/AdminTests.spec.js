import { test, expect } from '@playwright/test';
import { LoginPage } from '../PageObjects/LoginPage';
import { DashboardPage } from '../PageObjects/DashboardPage';
import { PartnershipsPage } from '../PageObjects/PartnershipsPage';
import { AdminPartnershipsPage } from '../PageObjects/AdminPartnershipsPage';
import { AdminReportsPage } from '../PageObjects/AdminReportsPage';
import { ManageUserPage } from '../PageObjects/ManageUserPage';
const { superadminuser, superadminpass, adminuser, adminpass } = require('../Utils/TestData');

test.afterEach('Close the browser', async ({ page }) => {
    await page.close(); 
});
test.describe('Admin Reports Page test cases', async () => {
    
    test.beforeEach('Run flow till TL landing page', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('/pages/login', adminuser, adminpass);

        const dashboardPage = new DashboardPage(page);
        await dashboardPage.acceptCookies();
        await dashboardPage.goToAdminReportsPage();
    }); 

    test('BL-T156: Admin shall have ability to download the CA term life policy sales report.', async ({ page }) => {
        const adminReportsPage = new AdminReportsPage(page);
        await adminReportsPage.goToReportsTab();
        expect(await adminReportsPage.getReportTypeOptionsList()).toContainEqual("Ca Term Life Sales Report");
        await adminReportsPage.downloadCATermSalesReport();
        expect(await adminReportsPage.getPopUpMessageText()).toMatch(/File downloaded successfully|No data found for selected date/);
    });

    test('BL-T157: Application shall throw an error message if admin tries to download any report for dates which have no data.', async ({ page }) => {
        const adminReportsPage = new AdminReportsPage(page);
        await adminReportsPage.goToReportsTab();
        expect(await adminReportsPage.verifyNoDataFoundError()).toEqual("No data found for selected date");
    });

    test('BL-T163: Admin shall have ability to download the users knockout report.', async ({ page }) => {
        const adminReportsPage = new AdminReportsPage(page);
        await adminReportsPage.goToReportsTab();
        expect(await adminReportsPage.getReportTypeOptionsList()).toContainEqual("Knockout Users Report");
        await adminReportsPage.downloadUsersKnockoutReport();
        expect(await adminReportsPage.getPopUpMessageText()).toMatch(/File downloaded successfully|No data found for selected date/);
    });

    test('BL-T165: Admin shall have ability to download the US travel policy sales report.', async ({ page }) => {
        const adminReportsPage = new AdminReportsPage(page);
        await adminReportsPage.goToReportsTab();
        expect(await adminReportsPage.getReportTypeOptionsList()).toContainEqual("US Travel Sales Report");
        await adminReportsPage.downloadUSTravelSalesReport();
        expect(await adminReportsPage.getPopUpMessageText()).toMatch(/File downloaded successfully|No data found for selected date/);
    });

    test('BL-T169: Admin shall have ability to download the partners (CST, GGA & All) report.', async ({ page }) => {
        const adminReportsPage = new AdminReportsPage(page);
        await adminReportsPage.goToReportsTab();
        expect(await adminReportsPage.getReportTypeOptionsList()).toContainEqual("CST Partner Report");
        await adminReportsPage.downloadCSTPartnerReport();
        expect(await adminReportsPage.getPopUpMessageText()).toMatch(/File downloaded successfully|No data found for selected date/);
    });

    test('BL-T169(1): Admin shall have ability to download the partners (CST, GGA & All) report.', async ({ page }) => {
        const adminReportsPage = new AdminReportsPage(page);
        await adminReportsPage.goToReportsTab();
        expect(await adminReportsPage.getReportTypeOptionsList()).toContainEqual("GGA Partner Report");
        await adminReportsPage.downloadGGAPartnerReport();
        expect(await adminReportsPage.getPopUpMessageText()).toMatch(/File downloaded successfully|No data found for selected date/);
    });

    test('BL-T169(2): Admin shall have ability to download the partners (CST, GGA & All) report.', async ({ page }) => {
        const adminReportsPage = new AdminReportsPage(page);
        await adminReportsPage.goToReportsTab();
        expect(await adminReportsPage.getReportTypeOptionsList()).toContainEqual("All Partner Report");
        await adminReportsPage.downloadALLPartnerReport();
        expect(await adminReportsPage.getPopUpMessageText()).toMatch(/File downloaded successfully|No data found for selected date/);
    });

    test('BL-T170: Admin shall have ability to download the CA Term User Journey Report.', async ({ page }) => {
        const adminReportsPage = new AdminReportsPage(page);
        await adminReportsPage.goToReportsTab();
        expect(await adminReportsPage.getReportTypeOptionsList()).toContainEqual("CA Term User Journey Report");
        await adminReportsPage.downloadCATermUserJourneyReport();
        expect(await adminReportsPage.getPopUpMessageText()).toMatch(/File downloaded successfully|No data found for selected date/);
    });

    test('BL-T180: Admin shall have ability to download the Confidential Sales Report (Customer Name).', async ({ page }) => {
        const adminReportsPage = new AdminReportsPage(page);
        await adminReportsPage.goToReportsTab();
        expect(await adminReportsPage.getReportTypeOptionsList()).toContainEqual("Confidential Sales Report (Customer Name)");
        await adminReportsPage.downloadCATermConfidentialSales();
        expect(await adminReportsPage.getPopUpMessageText()).toMatch(/File downloaded successfully|No data found for selected date/);
    });

    test('BL-T197: Admin shall have ability to generate and download the "Humania data feed" report. ', async ({ page }) => {
        const adminReportsPage = new AdminReportsPage(page);
        await adminReportsPage.goToHumaniaDataFeedTab();
        await adminReportsPage.generateHumaniaReport();
        expect(await adminReportsPage.getHumaniaReportGeneratedSuccessMsg()).toEqual('Report Generated Successfully!');
    });

});

test.describe('Admin Partnerships Page test cases', async () => {
    
    test.beforeEach('Run flow till TL landing page', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('/pages/login', adminuser, adminpass);

        const dashboardPage = new DashboardPage(page);
        await dashboardPage.acceptCookies();
        await dashboardPage.goToAdminPartnershipsPage();
    }); 

    test('BL-T124: Admin shall have ability to add partner manually from partner portal dashboard page.', async ({ page }) => {
        const adminPartnershipsPage = new AdminPartnershipsPage(page);
        await adminPartnershipsPage.addNewPartnerManually("Manual Partner Added", "Company", "testcompany.com", "2222222222", "test@testing.com", "CST");
        expect(await adminPartnershipsPage.getPartnerNameLatest()).toEqual("Manual Partner Added");    
    });

    test('BL-T125: Partner user is landing on CA term product page after hitting the partner link.', async ({ page }) => {
        const adminPartnershipsPage = new AdminPartnershipsPage(page);
        const url_part1 = "https://blanket-development.web.app/canadianterm/partner/";
        const url_part2 = await adminPartnershipsPage.getPartnerIdLatest();
        const partner_url = url_part1.concat(url_part2);  
        const newPage = await page.context().newPage();
        await newPage.goto(partner_url);
        expect(newPage).toHaveURL(partner_url);
    });

    test('BL-T164: All duplicate email ids in csv file shall get highlighted in red color and display on top while bulk uploading partners through csv.', async ({ page }) => {
        const adminPartnershipsPage = new AdminPartnershipsPage(page);
        await adminPartnershipsPage.bulkUploadCSV('/opt/files/DuplicatePartnersEmailids.csv');
        //await adminPartnershipsPage.bulkUploadCSV('C:/Users/gagandeep.singla/Downloads/DuplicatePartnersEmailids.csv');
        expect (await adminPartnershipsPage.verifyDuplicateRecords()).toBeTruthy();
    });
    
    test('BL-T166: Application shall not allow user to upload more than 300 partners in one go.', async ({ page }) => {
        const adminPartnershipsPage = new AdminPartnershipsPage(page);
        //await adminPartnershipsPage.bulkUploadCSV('C:/Users/gagandeep.singla/Downloads/LimitCross300partners.csv');
        await adminPartnershipsPage.bulkUploadCSV('/opt/files/LimitCross300partners.csv');
        expect(await adminPartnershipsPage.getBulkUploadError()).toEqual("Max limit is 300");
    });

    test('BL-T167: Application shall not allow user to upload the partners with csv having wrong template or duplicate data.', async ({ page }) => {
        const adminPartnershipsPage = new AdminPartnershipsPage(page);
        //await adminPartnershipsPage.bulkUploadCSV('C:/Users/gagandeep.singla/Downloads/IncorrectColumnPartners.csv');
        await adminPartnershipsPage.bulkUploadCSV('/opt/files/IncorrectColumnPartners.csv');
        expect(await adminPartnershipsPage.getBulkUploadError()).toEqual("CSV file contains incorrect or missing headers.");
        await adminPartnershipsPage.closebulkUploadWindow();
        //await adminPartnershipsPage.bulkUploadCSV('C:/Users/gagandeep.singla/Downloads/PartnersWithSameEmailOfExistingPartners.csv');
        await adminPartnershipsPage.bulkUploadCSV('/opt/files/PartnersWithSameEmailOfExistingPartners.csv');
        expect(await adminPartnershipsPage.getBulkUploadError()).toContain("Duplicate emails found");
    });

    test('BL-T168: Admin shall not be allowed to add partner manually without adding mandatory partner info.', async ({ page }) => {
        const adminPartnershipsPage = new AdminPartnershipsPage(page);
        await adminPartnershipsPage.addNewPartnerWithoutMandatoryFields("Manual Partner Added", "testcompany.com", "2222222222", "test@testing.com", "CST");
        expect( await adminPartnershipsPage.getErrorMsg()).toEqual("Company Name is required");
    });

    test('BL-T174: Admin shall have ability to bulk delete partners from partner portal dashboard page.', async ({ page }) => {
        const adminPartnershipsPage = new AdminPartnershipsPage(page);
        const totalPartners_beforeDelete = await adminPartnershipsPage.getTotalPartnersCount();
        await adminPartnershipsPage.bulkDeletePartners();
        await page.waitForTimeout(4000);
        expect(await adminPartnershipsPage.verifySuccessMsgIsVisible()).toBeTruthy();
        const totalPartners_afterDelete = await adminPartnershipsPage.getTotalPartnersCount();
        expect(totalPartners_beforeDelete).not.toBe(totalPartners_afterDelete);
    }); 

    test('BL-T177: User shall able to upload partners in bulk through csv file using bulk upload.', async ({ page }) => {
        const adminPartnershipsPage = new AdminPartnershipsPage(page);
        //await adminPartnershipsPage.bulkUploadCSV('C:/Users/gagandeep.singla/Downloads/ValidPartners.csv');
        await adminPartnershipsPage.bulkUploadCSV('/opt/files/ValidPartners.csv');
        await adminPartnershipsPage.clickUploadBtn();
        expect(await adminPartnershipsPage.verifySuccessMsgIsVisible()).toBeTruthy();
        expect(await adminPartnershipsPage.getPartnerNameLatest()).toEqual("Bulk Partner 1 Auto");   
        expect(await adminPartnershipsPage.getPartnerStatusLatest()).toEqual(" APPROVED ");
        await adminPartnershipsPage.deleteFirstRowPartner();
    });

});

test.describe('Super Admin test cases', async () => {
    
    test.beforeEach('Run flow till TL landing page', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('/pages/login', superadminuser, superadminpass);

        const dashboardPage = new DashboardPage(page);
        await dashboardPage.acceptCookies();
        await dashboardPage.goToManageUsersPage();
    }); 
    test('BL-T188: Super admin shall be allowed to select any user & able to purchase CA term life policy on selected user behalf.', async ({ page }) => {
        const manageUserPage = new ManageUserPage(page);
        await manageUserPage.searchUser("gagandeep.singla+qa2@trantorinc.com");
        await manageUserPage.selectUser();
        expect(await manageUserPage.getSelectedUserEmail()).toEqual('gagandeep.singla+qa2@trantorinc.com');
        await manageUserPage.goToCATLForm();
        await page.waitForTimeout(2000);
        expect(page.url()).toContain("canadianterm/survey");
    });

    test('BL-T189: Super admin shall be moved to his own account after logging out selected user account.', async ({ page }) => {
        const manageUserPage = new ManageUserPage(page);
        await manageUserPage.searchUser("gagandeep.singla+qa2@trantorinc.com");
        await manageUserPage.selectUser();
        expect(await manageUserPage.getSelectedUserEmail()).toEqual('gagandeep.singla+qa2@trantorinc.com');
        await manageUserPage.logoutSelectedUser();
        expect(await manageUserPage.getPageHeader()).toEqual('User Dashboard');
    });

});

test('BL-T160: Request for partnership shall be visible to admin on partner portal dashboard screen with status as New.', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('/pages/login', adminuser, adminpass);

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.acceptCookies();
    await dashboardPage.goToPartnershipsPage();

    const partnershipsPage = new PartnershipsPage(page);
    await partnershipsPage.enterPartnerDetails("Partnership Applied","Company", "testcompany.com", "2222222222", "test@testing.com");

    await dashboardPage.goToAdminPartnershipsPage();

    const adminPartnershipsPage = new AdminPartnershipsPage(page);
    expect(await adminPartnershipsPage.getPartnerNameLatest()).toEqual("Partnership Applied");    
    expect(await adminPartnershipsPage.getPartnerStatusLatest()).toEqual(" NEW ");
    await adminPartnershipsPage.approveNewPartner("CST");
    expect(await adminPartnershipsPage.getPartnerStatusLatest()).toEqual(" APPROVED ");
});