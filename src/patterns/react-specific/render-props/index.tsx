import { useState } from 'react'
import { DataFetcher, type FetchState } from './DataFetcher'

export function DataFetcherDemo() {
  const [url, setUrl] = useState('/api/users')

  return (
    <div className="bg-zinc-900 p-8 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-8 text-emerald-400">Render Props — DataFetcher</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="cartao flex flex-col gap-4">
          <h2 className="cartao-titulo">Configuração</h2>
          <div>
            <label className="rotulo">URL</label>
            <input className="entrada" value={url} onChange={e => setUrl(e.target.value)} />
          </div>
          <div className="terminal text-sm text-zinc-400 space-y-1">
            <p className="text-zinc-500">Dicas:</p>
            <p>→ <span className="text-emerald-400">/api/users</span> — sucesso</p>
            <p>→ <span className="text-red-400">/api/error</span> — erro</p>
          </div>
        </div>

        <div className="cartao">
          <h2 className="cartao-titulo">Resultado</h2>
          <DataFetcher
            url={url}
            render={(state: FetchState<{ result: string }>) => {
              if (state.loading) return <p className="text-zinc-400 animate-pulse">Carregando...</p>
              if (state.error) return <p className="text-red-400">✗ {state.error}</p>
              return (
                <div className="terminal">
                  <p className="text-emerald-400">✓ Sucesso</p>
                  <p className="text-zinc-300 mt-2">{state.data?.result}</p>
                </div>
              )
            }}
          />
        </div>

      </div>
    </div>
  )
}