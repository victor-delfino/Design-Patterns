import { createContext, useContext, useState, type ReactNode } from 'react'

interface AccordionContextType {
  openItem: string | null
  toggle: (id: string) => void
}

const AccordionContext = createContext<AccordionContextType | null>(null)

function useAccordion() {
  const ctx = useContext(AccordionContext)
  if (!ctx) throw new Error('useAccordion deve ser usado dentro de Accordion')
  return ctx
}

function Accordion({ children }: { children: ReactNode }) {
  const [openItem, setOpenItem] = useState<string | null>(null)

  function toggle(id: string): void {
    setOpenItem(prev => prev === id ? null : id)
  }

  return (
    <AccordionContext.Provider value={{ openItem, toggle }}>
      <div className="flex flex-col gap-2">{children}</div>
    </AccordionContext.Provider>
  )
}

function AccordionItem({ id, title, children }: { id: string, title: string, children: ReactNode }) {
  const { openItem, toggle } = useAccordion()
  const isOpen = openItem === id

  return (
    <div className="cartao">
      <button
        className="w-full flex justify-between items-center text-left cursor-pointer"
        onClick={() => toggle(id)}
      >
        <span className="text-zinc-100 font-medium">{title}</span>
        <span className={`text-emerald-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-zinc-700 text-zinc-400 text-sm">
          {children}
        </div>
      )}
    </div>
  )
}

Accordion.Item = AccordionItem
export { Accordion }