class InventoryService {
  checkStock(productId: string): boolean {
    console.log(`[ESTOQUE] Verificando produto ${productId}`)
    return true
  }

  reserveStock(productId: string): void {
    console.log(`[ESTOQUE] Reservando produto ${productId}`)
  }
}

class PaymentService {
  process(amount: number, method: string): string {
    console.log(`[PAGAMENTO] Processando R$${amount} via ${method}`)
    return `pay_${Date.now()}`
  }
}

class NotificationService {
  sendConfirmation(email: string, orderId: string): void {
    console.log(`[EMAIL] Confirmação enviada para ${email} — Pedido: ${orderId}`)
  }
}

export interface OrderResult {
  orderId: string
  paymentId: string
  logs: string[]
}

export class OrderFacade {
  private inventory = new InventoryService()
  private payment = new PaymentService()
  private notification = new NotificationService()

  createOrder(productId: string, amount: number, method: string, email: string): OrderResult {
    const logs: string[] = []
    const original = console.log
    console.log = (...args) => { logs.push(args.join(' ')); original(...args) }

    const inStock = this.inventory.checkStock(productId)
    if (!inStock) {
      console.log = original
      throw new Error('Produto fora de estoque')
    }

    this.inventory.reserveStock(productId)
    const paymentId = this.payment.process(amount, method)
    const orderId = `order_${Date.now()}`
    this.notification.sendConfirmation(email, orderId)

    console.log = original
    return { orderId, paymentId, logs }
  }
}