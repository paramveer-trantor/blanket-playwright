import { POManager } from '../PageObjects/POManager';

async function verifyPaymentPageHeader(page) {
    const pomanager = new POManager(page);
    const paymentypage = pomanager.getPaymentPage();
    const header_payment = await paymentypage.getPaymentPageHeader();
    return header_payment;
}

async function verifyAmountDue(page) {
    const pomanager = new POManager(page);
    const paymentypage = pomanager.getPaymentPage();
    const amount_due = await paymentypage.getTotalAmountDue();
    return amount_due;
}

async function verifyPurchasePolicyWithCC(page,cardname, cardnumber, expirydate, cvv) {
    const pomanager = new POManager(page);
    const paymentypage = pomanager.getPaymentPage();
    await paymentypage.clickBillingAddressCheckBox();
    await paymentypage.purchasePolicyWithCC(cardname, cardnumber, expirydate, cvv);
}

async function verifyPurchasePolicyWithAch(page,accountholdername, transitnumber, institutionnumber, accountnumber, bankname) {
    const pomanager = new POManager(page);
    const paymentypage = pomanager.getPaymentPage();
    await paymentypage.clickBillingAddressCheckBox();
    await paymentypage.purchasePolicyWithACH(accountholdername, transitnumber, institutionnumber, accountnumber, bankname);
}

async function verifyIconTransitNumberIsVisible(page) {
    const pomanager = new POManager(page);
    const paymentypage = pomanager.getPaymentPage();
    const tn_status = await paymentypage.checkIconTransitNumber();
    return tn_status;
}

async function verifyIconRoutingNumberIsVisible(page) {
    const pomanager = new POManager(page);
    const paymentypage = pomanager.getPaymentPage();
    const rn_status = await paymentypage.checkIconRoutingNumber();
    return rn_status;
}

async function verifyIconAccountNumberIsVisible(page) {
    const pomanager = new POManager(page);
    const paymentypage = pomanager.getPaymentPage();
    const an_status = await paymentypage.checkIconAccountNumber();
    return an_status;
}

async function enterBillingAddress(page, firstname, lastname, address, city, postal) {
    const pomanager = new POManager(page);
    const paymentypage = pomanager.getPaymentPage();
    await paymentypage.enterAddressDetails(firstname, lastname, address, city, postal)
}


module.exports = { verifyPaymentPageHeader, verifyAmountDue, verifyPurchasePolicyWithCC, verifyPurchasePolicyWithAch, verifyIconTransitNumberIsVisible, verifyIconRoutingNumberIsVisible, verifyIconAccountNumberIsVisible, enterBillingAddress };