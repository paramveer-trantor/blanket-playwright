const { expect } = require("@playwright/test");

class ManageUserPage{

    constructor(page){
        this.page = page;
        this.searchBtn = page.getByTestId('userSearch');
        this.selectUserBtn = page.getByRole('button', { name: ' Select User ' });
        this.selectedUserEmail = page.locator('.row.activeUser .col');
        this.selectedUserLogoutBtn = page.getByRole('button', { name: ' Log Out ' });
    }

    async searchUser(useremail) {    
        await this.searchBtn.click();
        await this.searchBtn.fill(useremail);
    }

    async selectUser() {
        await this.selectUserBtn.click();
    }

    async getSelectedUserEmail() {
        const selecteduserinfo = (await this.selectedUserEmail.textContent()).trim();
        const email = (selecteduserinfo.split("Selected User: ")[1].split(" Log Out")[0]).trim();
        return email;
    }

    async logoutSelectedUser() {
        await this.selectedUserLogoutBtn.click();
    }    

}

module.exports = { ManageUserPage };