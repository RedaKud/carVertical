import { Page } from '@playwright/test'

export class General {
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    /**
     * Press Accept All Cookies
     */
    async acceptAllCookies() {
        await this.page.locator('#bisquit-banner-accept-all').click()
    }

    async goToLandingPage() {
        await this.page.goto('https://www.carvertical.com/')
    }
    
}