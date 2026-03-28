export interface Http {
  request(url: string): string
}

export class HttpClient implements Http {
  request(url: string): string {
    return `Resposta de ${url}`
  }
}

export class HttpDecorator implements Http {
  constructor(protected client: Http) {}

  request(url: string): string {
    return this.client.request(url)
  }
}

export class LoggerDecorator extends HttpDecorator {
  request(url: string): string {
    console.log(`[LOG] Requisição para: ${url}`)
    const result = super.request(url)
    console.log(`[LOG] Resposta: ${result}`)
    return result
  }
}
export class CacheDecorator extends HttpDecorator {
  private cache: Map<string, string> = new Map()

  request(url: string): string {
    if (this.cache.has(url)) {
      console.log(`[CACHE] Hit para: ${url}`)
      return this.cache.get(url)!
    }
    const result = super.request(url)
    this.cache.set(url, result)
    return result
  }
}


export class AuthDecorator extends HttpDecorator {
  constructor(client: Http, private token: string) {
    super(client)
  }

  request(url: string): string {
    console.log(`[AUTH] Token: ${this.token}`)
    return super.request(url)
  }
}