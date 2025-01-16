export class ManageUserPage{

    constructor(page){
        this.page = page;
        this.searchBtn = page.getByTestId('userSearch');
        this.selectUserBtn = page.getByRole('button', { name: ' Select User ' });
        this.selectedUserEmail = page.locator('.row.activeUser .col');
        this.selectedUserLogoutBtn = page.getByRole('button', { name: ' Log Out ' });
        this.pageHeader = page.getByText('My Applications');
        this.editBtnFirstRow = page.locator("//div[@class='v-data-table__wrapper']/table/tbody/tr[1]/td[5]/button[1]");
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

    async goToCATLForm() {
        await this.pageHeader.isVisible();
        await this.editBtnFirstRow.click();
    }

    async logoutSelectedUser() {
        await this.selectedUserLogoutBtn.click();
    }    

    async verifySuperAdminIsLoggedOut() {
        return this.selectedUserEmail;
    }

}

