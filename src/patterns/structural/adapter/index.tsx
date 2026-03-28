import { useState } from 'react'
import { StripeAdapter, PayPalAdapter, type PaymentAdapter } from './ApiAdapter'

type Provider = 'stripe' | 'paypal'

export function PaymentAdapterDemo() {
  const [provider, setProvider] = useState<Provider>('stripe')
  const [amount, setAmount] = useState<number>(100)
  const [currency, setCurrency] = useState<string>('USD')
  const [transactionId, setTransactionId] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  async function handleCharge(): Promise<void> {
    const adapter: PaymentAdapter = provider === 'stripe' ? new StripeAdapter() : new PayPalAdapter()
    
    setLoading(true)
    const id = await adapter.charge(amount, currency)
    setTransactionId(prev => [...prev, `[${provider.toUpperCase()}] Transação: ${id}`])
    setLoading(false)
  }
  
  return (
        <div className="bg-zinc-900 p-8 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-8 text-emerald-400">Adapter — Payment Gateway</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="cartao flex flex-col gap-4">
          <h2 className="cartao-titulo">Configuração</h2>

          <div>
            <label className="rotulo">Provider</label>
            <select className="entrada" value={provider} onChange={e => setProvider(e.target.value as Provider)}>
              <option value="stripe">Stripe</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          <div>
            <label className="rotulo">Valor</label>
            <input className="entrada" type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} />
          </div>

          <div>
            <label className="rotulo">Moeda</label>
            <input className="entrada" value={currency} onChange={e => setCurrency(e.target.value)} />
          </div>

          <button
            className="botao-primario"
            onClick={handleCharge}
            disabled={loading}
          >
            {loading ? 'Processando...' : 'Processar Pagamento'}
          </button>
        </div>

        <div className="cartao">
          <h2 className="cartao-titulo">Log de Transações</h2>
          {transactionId.length === 0 ? (
            <p className="text-zinc-500">Nenhuma transação ainda.</p>
          ) : (
            <ul className="terminal max-h-80 overflow-y-auto space-y-2">
              {transactionId.map((log, i) => (
                <li key={i} className="text-emerald-400">→ {log}</li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  )
}

