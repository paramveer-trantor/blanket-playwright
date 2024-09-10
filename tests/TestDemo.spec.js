import { test, expect, request } from '@playwright/test';
import { loginIntoApp } from '../PageTests/LoginPageTest';
import { verifyTLProductIsVisible, verifyCookieBannerIsVisible, verifyMyPoliciesInMenu, navigateToProductPage, navigateToTermLifeByLifeBanner, navigateToMyPoliciesPage, verifyWarningMsgOnLangChangeInForm } from '../PageTests/DashboardTest';
const { url, urlLogin, urlRegister, username, password, cookiestext, tagline, date, gender, firstname, lastname, houseaddress, phonenumber, income, saving, mortgageBal, debt, quotevalue, feet, inches, weight, marijuana, drinks, drinksKnock, OptionYes, OptionNo, benfirstname, benlastname, bendob, benshare, passportno, healthno, licenseno, cardname, cardnumber, expirydate, cvv, accountholdername, transitnumber, institutionnumber, accountnumber, bankname } = require('../Utils/TestData');

test.describe('Product Visibility TC', async () => {

    test('BL-T1: Product Term life shall be visible under CA products list.', async ({ page }) => {
        await page.goto(url);
        expect(await verifyTLProductIsVisible(page)).toEqual('Term Life');
    });

});