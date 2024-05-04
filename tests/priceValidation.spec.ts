import { expect, test } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'

test.beforeEach(async({page}) => {
    const pm = new PageManager(page)
    await pm.onGeneral().goToLandingPage()
    await pm.onGeneral().acceptAllCookies()
})

test('validate if total price after applying coupon is correct', async({page}) => {
    const pm = new PageManager(page)

    // Enter VIN code in the landing page
    await pm.onLandingPage().enterVINCode('SALLAAA146A396339')

    // Select why do you need a report
    await pm.onPrecheckPage().selectReasonForReport("Other")

    // Select three car package and go to next step
    await pm.onPrecheckPage().selectThreeCarPackage()

    // Country optimization selection
    await pm.onPrecheckPage().countryOptimizationSelection('Stay in US')

    // Enter Precheck email, agree terms and condition and continua
    await pm.onPrecheckPage().enterEmailForReport('febis14932@agafx.com')

    // Login to account 
    await pm.onLoginPage().loginToAccount('febis14932@agafx.com', 'Test123?')

    // Get price without coupon
    const priceWithoutCoupon = await pm.onCheckoutPage().getPriceForReports()

    // Apply coupon
    await pm.onCheckoutPage().applyCoupon("qahomework")

    // Correct amount with coupon applied
    const correctAmountWithCoupon = await pm.onCheckoutPage().countPriceWithCoupon((await pm.onCheckoutPage().getDiscountAmount()), priceWithoutCoupon)

    // Price shown in the page
    const priceAfterCouponApplied = await pm.onCheckoutPage().getPriceForReports()

    // Assert if prices match
    expect(correctAmountWithCoupon).toEqual(priceAfterCouponApplied)
})