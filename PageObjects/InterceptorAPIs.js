const url_prod = "https://us-central1-blanket-production.cloudfunctions.net/**"
//const url_dev = "https://us-central1-blanket-development.cloudfunctions.net/**";
const url_dev = "https://api-staging.blanket.com/api/**";

export class InterceptorAPIs {
 
    constructor(page) {
        this.page = page;
        this.error = page.getByTestId('globalErrorMessage');
    }

    async sendFakeStatusCodeToApiResponse(fakestatus) {
        await this.page.route(url_dev, (route) => {
            const fakeResponse = {
                status: fakestatus,
            }
            route.fulfill({
                status: fakeResponse.status,
            });
        });
    }

    async readApiResponse() {
        const promise =  this.page.waitForResponse("url_dev", async route => {
            const res = await this.page.request.fetch(route.request());
        });
        const response = await promise;
        const response_status = await response.status();
        return response_status; 
    }

    async getErrorMessage() {
        return (await this.error.textContent()).trim();
    }

}


















