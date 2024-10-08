import { POManager } from '../PageObjects/POManager';

async function sendFakeStatusCodeToApI(page, fakestatus) {
    const pomanager = new POManager(page);
    const api_inter = pomanager.getApiInterceptorFunction();
    await api_inter.sendFakeStatusCodeToApiResponse(fakestatus);
}

async function getAPIResponseStatus(page, endpoint) {
    const pomanager = new POManager(page);
    const api_inter = pomanager.getApiInterceptorFunction();
    const status = await api_inter.readApiResponse(endpoint);
    return status;
}

async function verifyErrorMessage(page) {
    const pomanager = new POManager(page);
    const api_inter = pomanager.getApiInterceptorFunction();
    const error_msg = await api_inter.getErrorMessage();
    return error_msg;
}

module.exports = { sendFakeStatusCodeToApI, getAPIResponseStatus, verifyErrorMessage };