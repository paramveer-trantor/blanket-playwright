import { POManager } from '../PageObjects/POManager';

async function verifyThankYouMsg(page) {
    const pomanager = new POManager(page);
    const congratulationspage = pomanager.getCongratulationsPage();
    const thanks_msg = await congratulationspage.getThanksMsg();
    return thanks_msg; 
} 

async function verifyPolicyInfoColumns(page) {
    const pomanager = new POManager(page);
    const congratulationspage = pomanager.getCongratulationsPage();
    const policy_columns = await congratulationspage.getPolicyInfoHeaders();
    return policy_columns; 
}

async function verifyProviderName(page) {
    const pomanager = new POManager(page);
    const congratulationspage = pomanager.getCongratulationsPage();
    const provider = congratulationspage.getProviderName();
    return provider;
}

async function verifyEffectiveDate(page) {
    const pomanager = new POManager(page);
    const congratulationspage = pomanager.getCongratulationsPage();
    const effective_date = congratulationspage.getEffectiveDate();
    return effective_date;
}

async function verifyPolicyNumber(page) {
    const pomanager = new POManager(page);
    const congratulationspage = pomanager.getCongratulationsPage();
    const policy_no = congratulationspage.getPolicyNumber();
    return policy_no;
}

async function verifyPayment(page) {
    const pomanager = new POManager(page);
    const congratulationspage = pomanager.getCongratulationsPage();
    const payment = congratulationspage.getPaymentValue();
    return payment;
}



module.exports = { verifyPolicyInfoColumns, verifyProviderName, verifyEffectiveDate, verifyPolicyNumber, verifyPayment, verifyThankYouMsg };