import { test, expect, request } from '@playwright/test';
import { login } from '../PageTests/LoginPageTest';
import { sendFakeStatusCodeToApI, getAPIResponseStatus, verifyErrorMessage } from '../PageTests/CallAPI_Interceptor';
const { username, password, firstname, lastname, phonenumber, cardname, cardnumber, expirydate, cvv } = require('../Utils/TestData');

test.describe('US Travel TCs', async () => {

    //prod parameters = (page, "https://www.blanket.com/pages/login", "tester@blanket.com", "123456");

    test('BL-T65: Application shall throw an error if US Travel Get Premium Quote API response is not 200 or 201', async ({ page }) => {
        await page.goto('');
        await page.getByRole('button', {name: ' Allow all cookies '}).first().click();
        await page.locator(".v-btn__content").filter({ hasText: ' Products ' }).click();
        await page.getByRole('menu').getByRole('menuitem', { name: 'Travel', exact: true  }).click();
        await page.locator('.v-btn__content').filter({ hasText: ' Apply Now '}).first().click();
        await page.getByLabel("I'm going to").click();
        await page.getByRole('listbox').getByRole('option', { name: 'Åland Islands', exact: true }).click();
        await page.getByLabel('To', { exact: true }).click();
        await page.locator("//div[@class='v-picker v-card v-picker--date theme--light']/div[2]/div/div/button[2]").click();
        await page.locator("//div[@class='v-date-picker-table v-date-picker-table--date theme--light']/table/tbody/tr[1]/td[7]/button").first().click();
        await page.locator("//div[@role='dialog']/div/div/div[3]/button[2]").click();
        await page.getByLabel("Trip Type").click();
        await page.getByRole('listbox').getByRole('option', { name: 'Air Only', exact: true }).click();
        await page.getByLabel("Travelers to insure").click();
        await page.getByRole('listbox').getByRole('option', { name: '1', exact: true }).click();
        await page.getByLabel("Living in").click();
        await page.getByRole('listbox').getByRole('option', { name: 'Alabama', exact: true }).click();
        await page.getByLabel("Primary Traveler Age").fill("40");
        await page.getByLabel("Primary Traveler Trip Cost").fill("2000");
        const codes = [400, 403, 408, 429, 500, 503, 504];
        let message = "Oops! Something went wrong. Please try again or contact us for assistance.";
        for(let i = 0; i < codes.length; i++) {
                await sendFakeStatusCodeToApI(page, codes[i]);
                await page.getByRole('button', {name: ' Get A Quote '}).click();
                
                expect(await verifyErrorMessage(page)).toEqual(message);  
                await page.getByTestId('globalErrorCloseBtn').click();
        }
    });

    test('BL-T65(1): Application shall throw an error if US Travel purchase policy API response is not 200 or 201', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await page.getByRole('button', {name: ' Allow all cookies '}).first().click();
        await page.locator(".v-btn__content").filter({ hasText: ' Products ' }).click();
        await page.getByRole('menu').getByRole('menuitem', { name: 'Travel', exact: true  }).click();
        await page.locator('.v-btn__content').filter({ hasText: ' Apply Now '}).first().click();
        await page.getByLabel("I'm going to").click();
        await page.getByRole('listbox').getByRole('option', { name: 'Åland Islands', exact: true }).click();
        await page.getByLabel('To', { exact: true }).click();
        await page.locator("//div[@class='v-picker v-card v-picker--date theme--light']/div[2]/div/div/button[2]").click();
        await page.locator("//div[@class='v-date-picker-table v-date-picker-table--date theme--light']/table/tbody/tr[1]/td[7]/button").first().click();
        await page.locator("//div[@role='dialog']/div/div/div[3]/button[2]").click();
        await page.getByLabel("Trip Type").click();
        await page.getByRole('listbox').getByRole('option', { name: 'Air Only', exact: true }).click();
        await page.getByLabel("Travelers to insure").click();
        await page.getByRole('listbox').getByRole('option', { name: '1', exact: true }).click();
        await page.getByLabel("Living in").click();
        await page.getByRole('listbox').getByRole('option', { name: 'Alabama', exact: true }).click();
        await page.getByLabel("Primary Traveler Age").fill("40");
        await page.getByLabel("Primary Traveler Trip Cost").fill("2000");
        await page.getByRole('button', {name: ' Get A Quote '}).click();
        await page.locator(".d-flex .pa-4").first().click();
        await page.locator(".d-flex .pa-4").nth(3).click();
        await page.getByLabel("First Name").fill(firstname);
        await page.getByLabel("Last Name").fill(lastname);
        await page.getByLabel("Address").fill("Test address");
        await page.getByLabel("City").fill("New York");
        await page.getByLabel("State").fill("NY");
        await page.getByLabel("Zip Code").fill("123412");
        await page.getByLabel("Phone Number").fill(phonenumber);
        await page.getByLabel("Email").fill("testuser@test.com");
        await page.getByLabel("Cardholder Name").fill(cardname);
        await page.getByLabel("Card Number (no spaces)").fill(cardnumber);
        await page.getByLabel("Exp Month (MM)").fill("07");
        await page.getByLabel("Exp Year (YY)").fill("29");
        await page.getByLabel("Security Code CVV").fill(cvv);
        await page.getByRole('button', {name: ' Purchase Policy '}).isEnabled();
        const codes = [400, 403, 408, 429, 500, 503, 504];
        let message = "Oops! Something went wrong. Please try again or contact us for assistance.";
        for(let i = 0; i < codes.length; i++) {
                await sendFakeStatusCodeToApI(page, codes[i]);
                await page.getByRole('button', {name: ' Purchase Policy '}).click();
                expect(await verifyErrorMessage(page)).toEqual(message);  
                await page.getByTestId('globalErrorCloseBtn').click();
        }
    });

    test('BL-T83: User shall able to purchase US travel policy successfully', async ({ page }) => {
        await page.goto('/pages/login');
        await login(page, username, password);
        await page.getByRole('button', {name: ' Allow all cookies '}).first().click();
        await page.locator(".v-btn__content").filter({ hasText: ' Products ' }).click();
        await page.getByRole('menu').getByRole('menuitem', { name: 'Travel', exact: true  }).click();
        await page.locator('.v-btn__content').filter({ hasText: ' Apply Now '}).first().click();
        await page.getByLabel("I'm going to").click();
        await page.getByRole('listbox').getByRole('option', { name: 'Åland Islands', exact: true }).click();
        await page.getByLabel('To', { exact: true }).click();
        await page.locator("//div[@class='v-picker v-card v-picker--date theme--light']/div[2]/div/div/button[2]").click();
        await page.locator("//div[@class='v-date-picker-table v-date-picker-table--date theme--light']/table/tbody/tr[1]/td[7]/button").first().click();
        await page.locator("//div[@role='dialog']/div/div/div[3]/button[2]").click();
        await page.getByLabel("Trip Type").click();
        await page.getByRole('listbox').getByRole('option', { name: 'Air Only', exact: true }).click();
        await page.getByLabel("Travelers to insure").click();
        await page.getByRole('listbox').getByRole('option', { name: '1', exact: true }).click();
        await page.getByLabel("Living in").click();
        await page.getByRole('listbox').getByRole('option', { name: 'Alabama', exact: true }).click();
        await page.getByLabel("Primary Traveler Age").fill("40");
        await page.getByLabel("Primary Traveler Trip Cost").fill("2000");
        await page.getByRole('button', {name: ' Get A Quote '}).click();
        await page.locator(".d-flex .pa-4").first().click();
        await page.locator(".d-flex .pa-4").nth(3).click();
        await page.getByLabel("First Name").fill(firstname);
        await page.getByLabel("Last Name").fill(lastname);
        await page.getByLabel("Address").fill("Test address");
        await page.getByLabel("City").fill("New York");
        await page.getByLabel("State").fill("NY");
        await page.getByLabel("Zip Code").fill("123412");
        await page.getByLabel("Phone Number").fill(phonenumber);
        await page.getByLabel("Email").fill("testuser@test.com");
        await page.getByLabel("Cardholder Name").fill(cardname);
        await page.getByLabel("Card Number (no spaces)").fill(cardnumber);
        await page.getByLabel("Exp Month (MM)").fill("07");
        await page.getByLabel("Exp Year (YY)").fill("29");
        await page.getByLabel("Security Code CVV").fill(cvv);
        await page.getByRole('button', {name: ' Purchase Policy '}).isEnabled();
        await page.getByRole('button', {name: ' Purchase Policy '}).click();
        expect(await page.locator('.title-subtext').textContent()).toEqual(" Thank you for your purchase. ");
    });

});