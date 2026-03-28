export interface Observer {
  update(stock: string, price: number): void
}

export interface Observable {
  subscribe(observer: Observer): void
  unsubscribe(observer: Observer): void
  notify(stock: string, price: number): void
}

export class StockMarket implements Observable {
  private observers: Observer[] = []
  private prices: Map<string, number> = new Map()

  subscribe(observer: Observer): void {
    this.observers.push(observer)
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter(o => o !== observer)
  }

  notify(stock: string, price: number): void {
    this.observers.forEach(o => o.update(stock, price))
  }

  setPrice(stock: string, price: number): void {
    this.prices.set(stock, price)
    this.notify(stock, price)
  }
}

export class LoggerObserver implements Observer {
  logs: string[] = []

  update(stock: string, price: number): void {
    this.logs.push(`[LOG] ${stock}: R$${price.toFixed(2)}`)
  }
}

export class PriceAlertObserver implements Observer {
  alerts: string[] = []

  constructor(private threshold: number) {}

  update(stock: string, price: number): void {
    if (price > this.threshold) {
      this.alerts.push(`[ALERTA] ${stock} acima de R$${this.threshold}: R$${price.toFixed(2)}`)
    }
  }
}

export class PortfolioObserver implements Observer {
  history: { stock: string, price: number }[] = []

  update(stock: string, price: number): void {
    this.history.push({ stock, price })
  }
}