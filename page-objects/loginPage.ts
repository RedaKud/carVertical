import { Page } from "@playwright/test"

export class LoginPage {

    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    /**
     * Login to the account by entering email and password
     * @param {string} email 
     * @param {string} password 
     */
    async loginToAccount(email: string, password: string){
        await this.page.fill('#email', email)
        await this.page.fill('#password', password)

        await this.page.locator('button._root_6rw67_1._root_vlyqs_1._yellow_vlyqs_36._l_vlyqs_44._fullWidth_vlyqs_154').click()
    }
}