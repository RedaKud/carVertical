import { Page } from "@playwright/test"

export class LandingPage {

    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    /**
     * Enter VIN code and press "Get report" button
     * @param {string} vin 
     */
    async enterVINCode(vin: string){
        const firstVINCodeField = '#identifier.IdentifierInput_input__gfgg0'
        await this.page.fill(firstVINCodeField, vin);
        await this.page.getByText('Get report').first().click()
    }
}