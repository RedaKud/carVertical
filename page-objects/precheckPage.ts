import { Page } from "@playwright/test"

export class PrecheckPage {

    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    /**
     * Selects the three car package and clicks on "Get report" button
     */

    async selectThreeCarPackage(){
        await this.page.locator('text="Check 3 cars"').click({ force: true })
        await this.page.getByText('Get report').click()
    }

    /**
     * Selection for purchase report optimization country
     * @param {string} buttonText - should be one of: "Stay in US" or "Switch to Lithuania"
     */

    async countryOptimizationSelection(buttonText: string) {
        await this.page.getByText(buttonText).click()
    }

    /**
     * Enter email for precheck form, press on I agree to the terms and conditions and continue button
     * @param {string} email
     */
    async enterEmailForReport(email: string){
        await this.page.fill('#email', email);
        await this.page.locator('[class="_selectionBackground_1cw1k_77"]').click({ force: true })
        await this.page.getByText('Continue').click()
    }

    /**
     * Select a reason for why you need history from one of the options, and press continue
     * @param reason - should be one of: "Buying a car", "Selling a car", "Checking my car" or "Other"
     */
    async selectReasonForReport(reason: string){
        await this.page.waitForSelector('div.ReportLoadingSection_titleWithIcon__XMF_p', { state: 'visible' });

        await this.page.locator(`span:text("${reason}")`).click();

        await this.page.getByText('Continue').click()
    }
}