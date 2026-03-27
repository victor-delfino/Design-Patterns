interface PaymentAdapter {
    charge(amount: number, currency: string): Promise<string>
}

export class StripeAdapter implements PaymentAdapter {

    async charge(amount: number, currency: string): Promise<string> {
        console.log(`Cobrança de ${amount} ${currency} processada via Stripe.`)
        return `stripe_${Date.now()}`
    }

}

export class PayPalAdapter implements PaymentAdapter {

    async charge(amount: number, currency: string): Promise<string> {
        console.log(`Cobrança de ${amount} ${currency} processada via PayPal.`)
        return `paypal_${Date.now()}`
    }
}