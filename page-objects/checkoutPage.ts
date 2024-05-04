import { Page } from "@playwright/test"

export class CheckoutPage {
    readonly page: Page
    
    constructor(page: Page){
        this.page = page
    }

    /**
     * Gets price from checkout report and return it when all other symbols are removed
     * @returns 
     */
    async getPriceForReports(){
        const priceSelector = 'p[data-testid="Checkout-ReportAmount"] > span'
        await this.page.waitForSelector(priceSelector, { state: 'visible'})
        const priceText = await this.page.innerText(priceSelector)
        const priceWithoutDollar = parseFloat(priceText.replace('$', ''))
        return priceWithoutDollar
    }

    /**
     * Pass coupon code and apply it in checkout
     * @param {string} coupon 
     */
    async applyCoupon(coupon: string){
        await this.page.locator('button._root_6rw67_1._root_vlyqs_1._outlined_vlyqs_105._s_vlyqs_136').click()
        await this.page.fill('#coupon', coupon)
        await this.page.getByText('Apply').click()
    }

    /**
     * Gets the discount percentage
     * @returns 
     */
    async getDiscountAmount(){
        await this.page.waitForSelector('button[data-testid="Checkout-VoucherRemoveButton"] span', { state: 'visible' })
        const discountText = await this.page.getByTestId('Checkout-VoucherRemoveButton').innerText()
        const cleanedDiscount = parseFloat(discountText.replace('-', '').replace('%', ''))
        return cleanedDiscount
    }

    /**
     * Counts the price with applied coupon percentage amount
     * @param discount 
     * @param price 
     * @returns 
     */
    async countPriceWithCoupon(discount: number, price: number){
        let countTheDedaction = price * (discount / 100)
        let finalAmount = parseFloat((price - countTheDedaction).toFixed(2))
        return finalAmount
    }
}