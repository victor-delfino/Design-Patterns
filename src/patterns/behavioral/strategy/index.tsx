import { useState } from 'react'
import {
  ShippingCalculator,
  CorreiosStrategy,
  TransportadoraStrategy,
  RetiradaStrategy,
  type ShippingStrategy
} from './ShippingStrategy'

const STRATEGIES: { label: string, strategy: ShippingStrategy }[] = [
  { label: 'Correios', strategy: new CorreiosStrategy() },
  { label: 'Transportadora', strategy: new TransportadoraStrategy() },
  { label: 'Retirada na Loja', strategy: new RetiradaStrategy() },
]

export function ShippingStrategyDemo() {
  const [weight, setWeight] = useState(5)
  const [distance, setDistance] = useState(100)
  const [selectedStrategy, setSelectedStrategy] = useState(0)
  const [results, setResults] = useState<{ name: string, value: number }[]>([])

  function handleCalculate(): void {
    const calculator = new ShippingCalculator(STRATEGIES[selectedStrategy].strategy)
    const value = calculator.calculate(weight, distance)
    setResults(prev => [...prev, {
      name: calculator.getStrategyName(),
      value
    }])
  }

  return (
    <div className="bg-zinc-900 p-8 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-8 text-emerald-400">Strategy — Shipping Calculator</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="cartao flex flex-col gap-4">
          <h2 className="cartao-titulo">Configuração</h2>

          <div>
            <label className="rotulo">Estratégia</label>
            <select className="entrada" value={selectedStrategy} onChange={e => setSelectedStrategy(Number(e.target.value))}>
              {STRATEGIES.map((s, i) => (
                <option key={s.label} value={i}>{s.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="rotulo">Peso (kg)</label>
            <input className="entrada" type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} />
          </div>
          <div>
            <label className="rotulo">Distância (km)</label>
            <input className="entrada" type="number" value={distance} onChange={e => setDistance(Number(e.target.value))} />
          </div>

          <button className="botao-primario" onClick={handleCalculate}>
            Calcular Frete
          </button>
        </div>

        <div className="cartao">
          <h2 className="cartao-titulo">Resultados</h2>
          {results.length === 0 ? (
            <p className="text-zinc-500">Nenhum cálculo ainda.</p>
          ) : (
            <ul className="space-y-2">
              {results.map((r, i) => (
                <li key={i} className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 flex justify-between items-center">
                  <span className="text-zinc-300">{r.name}</span>
                  <span className="text-emerald-400 font-mono font-bold">
                    {r.value === 0 ? 'Grátis' : `R$ ${r.value.toFixed(2)}`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  )
}