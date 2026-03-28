import { useState } from 'react'
import { HttpClient, LoggerDecorator, CacheDecorator, AuthDecorator, type Http } from './HttpDecorator'

export function HttpDecoratorDemo() {
  const [useLogger, setUseLogger] = useState(false)
  const [useCache, setUseCache] = useState(false)
  const [useAuth, setUseAuth] = useState(false)
  const [url, setUrl] = useState('/api/users')
  const [logs, setLogs] = useState<string[]>([])

  function handleRequest(): void {
    const captured: string[] = []

    const original = console.log
    console.log = (...args) => {
      captured.push(args.join(' '))
      original(...args)
    }

    let client: Http = new HttpClient()
    if (useLogger) client = new LoggerDecorator(client)
    if (useCache) client = new CacheDecorator(client)
    if (useAuth) client = new AuthDecorator(client, 'Bearer token-123')

    const result = client.request(url)
    captured.push(`✓ ${result}`)

    console.log = original
    setLogs(prev => [...prev, '---', ...captured])
  }

  return (
    <div className="bg-zinc-900 p-8 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-8 text-emerald-400">Decorator — HTTP Client</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="cartao flex flex-col gap-4">
          <h2 className="cartao-titulo">Configuração</h2>

          <div>
            <label className="rotulo">URL</label>
            <input className="entrada" value={url} onChange={e => setUrl(e.target.value)} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="rotulo">Decorators ativos</label>
            {[
              { label: 'Logger', value: useLogger, set: setUseLogger },
              { label: 'Cache', value: useCache, set: setUseCache },
              { label: 'Auth', value: useAuth, set: setUseAuth },
            ].map(({ label, value, set }) => (
              <label key={label} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={e => set(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500"
                />
                <span className="text-zinc-300 text-sm">{label}</span>
              </label>
            ))}
          </div>

          <button className="botao-primario" onClick={handleRequest}>
            Executar Requisição
          </button>
        </div>

        <div className="cartao">
          <h2 className="cartao-titulo">Log de Execução</h2>
          {logs.length === 0 ? (
            <p className="text-zinc-500">Nenhuma requisição ainda.</p>
          ) : (
            <ul className="terminal max-h-80 overflow-y-auto space-y-1">
              {logs.map((log, i) => (
                <li key={i} className={log === '---' ? 'border-t border-zinc-700 my-2' : 'text-emerald-400'}>
                  {log !== '---' && `→ ${log}`}
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  )
}