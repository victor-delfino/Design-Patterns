import { useState, useEffect, startTransition } from 'react'

export interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface DataFetcherProps<T> {
  url: string
  render: (state: FetchState<T>) => React.ReactNode
}

export function DataFetcher<T>({ url, render }: DataFetcherProps<T>) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null
  })

useEffect(() => {
  startTransition(() => {
    setState({ data: null, loading: true, error: null })
  })

  const timeout = setTimeout(() => {
    if (url.includes('error')) {
      setState({ data: null, loading: false, error: 'Erro ao buscar dados.' })
    } else {
      setState({ data: { result: `Dados de ${url}` } as T, loading: false, error: null })
    }
  }, 1000)

  return () => clearTimeout(timeout)
}, [url])

  return <>{render(state)}</>
}
