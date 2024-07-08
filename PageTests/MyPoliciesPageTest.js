import { POManager } from '../PageObjects/POManager';

async function verifyMyPoliciesPageHeader(page){
    const pomanager = new POManager(page);
    const mypoliciespage = pomanager.getMyPoliciesPage();
    const mypolicies_header = await mypoliciespage.getMyPoliciesPageHeader();
    return mypolicies_header;
}

async function verifyPolicySendingOverEmail(page){
    const pomanager = new POManager(page);
    const mypoliciespage = pomanager.getMyPoliciesPage();
    await mypoliciespage.clickEyeBtn();
    await mypoliciespage.clickEmailPolicyBtn();
    const success_msg = await mypoliciespage.getSuccessMsg();
    return success_msg;
}

async function verifyPoliciesDetails(page){
    const pomanager = new POManager(page);
    const mypoliciespage = pomanager.getMyPoliciesPage();
    await mypoliciespage.clickEyeBtn();
    const policy_details = await mypoliciespage.getPolicyDetails();
    return policy_details;
}


module.exports = { verifyMyPoliciesPageHeader, verifyPolicySendingOverEmail, verifyPoliciesDetails };