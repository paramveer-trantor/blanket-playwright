import { POManager } from '../PageObjects/POManager';

async function searchAndSelectUser(page,useremail){
    const pomanager = new POManager(page);
    const manageuserpage = pomanager.getManageUserPage();
    await manageuserpage.searchUser(useremail);
    await manageuserpage.selectUser();
}

async function verifySelectUserEmail(page){
    const pomanager = new POManager(page);
    const manageuserpage = pomanager.getManageUserPage();
    const email = await manageuserpage.getSelectedUserEmail();
    return email;  
}

async function verifySuperAdminLogout(page){
    const pomanager = new POManager(page);
    const manageuserpage = pomanager.getManageUserPage();
    const email = await manageuserpage.logoutSelectedUser();
    return email;  
}

module.exports = { searchAndSelectUser, verifySelectUserEmail, verifySuperAdminLogout }