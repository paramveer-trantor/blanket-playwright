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
    await paymentypage.purchasePolicyWithCC(cardname, cardnumber, expirydate, cvv);
}

async function verifyPurchasePolicyWithAch(page,accountholdername, transitnumber, institutionnumber, accountnumber, bankname) {
    const pomanager = new POManager(page);
    const paymentypage = pomanager.getPaymentPage();
    await paymentypage.purchasePolicyWithACH(accountholdername, transitnumber, institutionnumber, accountnumber, bankname);
}

module.exports = { verifyPaymentPageHeader, verifyAmountDue, verifyPurchasePolicyWithCC, verifyPurchasePolicyWithAch };