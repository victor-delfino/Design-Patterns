import { Accordion } from './Accordion'

export function AccordionDemo() {
  return (
    <div className="bg-zinc-900 p-8 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-8 text-emerald-400">Compound Components — Accordion</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="cartao flex flex-col gap-4">
          <h2 className="cartao-titulo">Como funciona</h2>
          <div className="terminal text-sm space-y-2">
            <p className="text-zinc-500">O pai compartilha estado via Context:</p>
            <p>→ <span className="text-emerald-400">Accordion</span> — guarda qual item está aberto</p>
            <p>→ <span className="text-emerald-400">Accordion.Item</span> — consome o context</p>
            <p className="text-zinc-500 mt-2">Nenhuma prop é passada explicitamente entre pai e filho.</p>
          </div>
        </div>

        <div>
          <Accordion>
            <Accordion.Item id="singleton" title="Singleton">
              Garante uma única instância de uma classe. Útil para conexões de banco, configs globais.
            </Accordion.Item>
            <Accordion.Item id="factory" title="Factory Method">
              Delega a criação de objetos para subclasses. Útil quando o tipo do objeto depende do contexto.
            </Accordion.Item>
            <Accordion.Item id="observer" title="Observer">
              Define uma dependência um-para-muitos. Quando um objeto muda, todos os dependentes são notificados.
            </Accordion.Item>
            <Accordion.Item id="compound" title="Compound Components">
              Compartilha estado entre componentes via Context sem props drilling.
            </Accordion.Item>
          </Accordion>
        </div>

      </div>
    </div>
  )
}