import { Page, expect } from '@playwright/test'
import { General } from './general'
import { LandingPage } from './landingPage'
import { CheckoutPage } from './checkoutPage'
import { LoginPage } from './LoginPage'
import { PrecheckPage } from './precheckPage'

export class PageManager{

    private readonly page: Page
    private readonly general: General
    private readonly landingPage: LandingPage
    private readonly checkoutPage: CheckoutPage
    private readonly loginPage: LoginPage
    private readonly precheckPage: PrecheckPage

    constructor(page: Page){
        this. page = page
        this.general = new General(this.page)
        this.landingPage = new LandingPage(this.page)
        this.checkoutPage = new CheckoutPage(this.page)
        this.loginPage = new LoginPage(this.page)
        this.precheckPage = new PrecheckPage(this.page)
    }

    onGeneral(){
        return this.general
    }

    onLandingPage(){
        return this.landingPage
    }

    onCheckoutPage(){
        return this.checkoutPage
    }

    onLoginPage(){
        return this.loginPage
    }

    onPrecheckPage(){
        return this.precheckPage
    }

}