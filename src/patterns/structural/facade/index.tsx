// OrderFacade.demo.tsx
import { useState } from 'react'
import { OrderFacade, type OrderResult } from './OrderFacade'

export function OrderFacadeDemo() {
  const [productId, setProductId] = useState('prod_001')
  const [amount, setAmount] = useState(299)
  const [method, setMethod] = useState('cartão')
  const [email, setEmail] = useState('cliente@email.com')
  const [result, setResult] = useState<OrderResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleOrder(): void {
    try {
      const facade = new OrderFacade()
      const res = facade.createOrder(productId, amount, method, email)
      setResult(res)
      setError(null)
    } catch (e) {
      setError((e as Error).message)
      setResult(null)
    }
  }

  return (
    <div className="bg-zinc-900 p-8 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-8 text-emerald-400">Facade — Order System</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="cartao flex flex-col gap-4">
          <h2 className="cartao-titulo">Novo Pedido</h2>

          <div>
            <label className="rotulo">Produto ID</label>
            <input className="entrada" value={productId} onChange={e => setProductId(e.target.value)} />
          </div>
          <div>
            <label className="rotulo">Valor (R$)</label>
            <input className="entrada" type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} />
          </div>
          <div>
            <label className="rotulo">Método de Pagamento</label>
            <select className="entrada" value={method} onChange={e => setMethod(e.target.value)}>
              <option value="cartão">Cartão</option>
              <option value="pix">PIX</option>
              <option value="boleto">Boleto</option>
            </select>
          </div>
          <div>
            <label className="rotulo">Email</label>
            <input className="entrada" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <button className="botao-primario" onClick={handleOrder}>
            Criar Pedido
          </button>
        </div>

        <div className="cartao">
          <h2 className="cartao-titulo">Resultado</h2>

          {!result && !error && (
            <p className="text-zinc-500">Nenhum pedido criado ainda.</p>
          )}

          {error && (
            <p className="text-red-400">✗ {error}</p>
          )}

          {result && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-zinc-500 text-xs uppercase tracking-widest">Pedido</span>
                <span className="text-emerald-400 font-mono">{result.orderId}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-zinc-500 text-xs uppercase tracking-widest">Pagamento</span>
                <span className="text-emerald-400 font-mono">{result.paymentId}</span>
              </div>
              <div>
                <span className="text-zinc-500 text-xs uppercase tracking-widest">Log interno</span>
                <ul className="terminal mt-2 space-y-1">
                  {result.logs.map((log, i) => (
                    <li key={i} className="text-emerald-400">→ {log}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}