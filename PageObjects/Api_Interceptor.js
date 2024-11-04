class Api_Interceptor {

    constructor(page) {
        this.page = page;
        this.error = page.getByTestId('globalErrorMessage');
    }

    //dev api call URL = https://us-central1-blanket-production.cloudfunctions.net/getUSATravelQuote
    //prod api call URL = https://us-central1-blanket-development.cloudfunctions.net/getCATermPremium

    async sendFakeStatusCodeToApiResponse(fakestatus) {
        await this.page.route("https://us-central1-blanket-development.cloudfunctions.net/**", (route) => {
            // Here you can define the fake response
            const fakeResponse = {
                status: fakestatus,
            }
            // Respond with the fake status code
            route.fulfill({
                status: fakeResponse.status,
            });
        });
    }

    async readApiResponse() {
        const promise =  this.page.waitForResponse("https://us-central1-blanket-development.cloudfunctions.net/getCATermPremium", async route => {
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

module.exports = { Api_Interceptor };

















