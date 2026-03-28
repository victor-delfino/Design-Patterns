import { useState, useRef, useEffect } from 'react'
import { StockMarket, LoggerObserver, PriceAlertObserver, PortfolioObserver } from './StockMarket'

const STOCKS = ['PETR4', 'VALE3', 'ITUB4', 'MGLU3']

export function StockMarketDemo() {
  const [stock, setStock] = useState(STOCKS[0])
  const [price, setPrice] = useState(50)
  const [threshold, setThreshold] = useState(60)
  const [logs, setLogs] = useState<string[]>([])
  const [alerts, setAlerts] = useState<string[]>([])
  const [history, setHistory] = useState<{ stock: string, price: number }[]>([])

  const marketRef = useRef(new StockMarket())
  const loggerRef = useRef(new LoggerObserver())
  const alertRef = useRef(new PriceAlertObserver(threshold))
  const portfolioRef = useRef(new PortfolioObserver())

  useEffect(() => {
    marketRef.current.subscribe(loggerRef.current)
    marketRef.current.subscribe(alertRef.current)
    marketRef.current.subscribe(portfolioRef.current)
  }, [])

  useEffect(() => {
  marketRef.current.unsubscribe(alertRef.current)
  alertRef.current = new PriceAlertObserver(threshold)
  marketRef.current.subscribe(alertRef.current)
}, [threshold])

  function handleSetPrice(): void {
    marketRef.current.setPrice(stock, price)
    setLogs([...loggerRef.current.logs])
    setAlerts([...alertRef.current.alerts])
    setHistory([...portfolioRef.current.history])
  }

  return (
    <div className="bg-zinc-900 p-8 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-8 text-emerald-400">Observer — Stock Market</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="cartao flex flex-col gap-4">
          <h2 className="cartao-titulo">Emitir Preço</h2>

          <div>
            <label className="rotulo">Ativo</label>
            <select className="entrada" value={stock} onChange={e => setStock(e.target.value)}>
              {STOCKS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="rotulo">Preço (R$)</label>
            <input className="entrada" type="number" value={price} onChange={e => setPrice(Number(e.target.value))} />
          </div>
          <div>
            <label className="rotulo">Threshold de alerta (R$)</label>
            <input className="entrada" type="number" value={threshold} onChange={e => setThreshold(Number(e.target.value))} />
          </div>

          <button className="botao-primario" onClick={handleSetPrice}>
            Publicar Preço
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="cartao">
            <h2 className="cartao-titulo">Logger</h2>
            <ul className="terminal max-h-32 overflow-y-auto space-y-1">
              {logs.length === 0
                ? <li className="text-zinc-500">Sem logs.</li>
                : logs.map((l, i) => <li key={i} className="text-emerald-400">→ {l}</li>)
              }
            </ul>
          </div>

          <div className="cartao">
            <h2 className="cartao-titulo">Alertas</h2>
            <ul className="terminal max-h-32 overflow-y-auto space-y-1">
              {alerts.length === 0
                ? <li className="text-zinc-500">Sem alertas.</li>
                : alerts.map((a, i) => <li key={i} className="text-red-400">⚠ {a}</li>)
              }
            </ul>
          </div>

          <div className="cartao">
            <h2 className="cartao-titulo">Histórico</h2>
            <ul className="terminal max-h-32 overflow-y-auto space-y-1">
              {history.length === 0
                ? <li className="text-zinc-500">Sem histórico.</li>
                : history.map((h, i) => (
                  <li key={i} className="text-zinc-300">
                    {h.stock} — <span className="text-emerald-400">R${h.price.toFixed(2)}</span>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}