export interface ShippingStrategy {
  calculate(weight: number, distance: number): number
  name: string
}

export class CorreiosStrategy implements ShippingStrategy {
  name = 'Correios'

  calculate(weight: number, distance: number): number {
    return weight * 1.5 + distance * 0.05
  }
}

export class TransportadoraStrategy implements ShippingStrategy {
  name = 'Transportadora'

  calculate(weight: number, distance: number): number {
    return weight * 2 + distance * 0.08
  }
}

export class RetiradaStrategy implements ShippingStrategy {
  name = 'Retirada na Loja'

  calculate(_weight: number, _distance: number): number {
    return 0
  }
}

export class ShippingCalculator {
  constructor(private strategy: ShippingStrategy) {}

  setStrategy(strategy: ShippingStrategy): void {
    this.strategy = strategy
  }

  calculate(weight: number, distance: number): number {
    return this.strategy.calculate(weight, distance)
  }

  getStrategyName(): string {
    return this.strategy.name
  }
}