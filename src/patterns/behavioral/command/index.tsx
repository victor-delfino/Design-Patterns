// TextEditor.demo.tsx
import { useState, useRef } from 'react'
import { TextEditor, InsertCommand, DeleteCommand, CommandHistory } from './TextEditor'

export function TextEditorDemo() {
  const [content, setContent] = useState('')
  const [input, setInput] = useState('')
  const [deleteCount, setDeleteCount] = useState(1)
  const [history, setHistory] = useState<string[]>([])

  const editorRef = useRef(new TextEditor())
  const historyRef = useRef(new CommandHistory())

  function sync(): void {
    setContent(editorRef.current.content)
    setHistory(historyRef.current.getHistory().map(c => c.description))
  }

  function handleInsert(): void {
    if (!input.trim()) return
    const cmd = new InsertCommand(editorRef.current, input)
    historyRef.current.execute(cmd)
    setInput('')
    sync()
  }

  function handleDelete(): void {
    const cmd = new DeleteCommand(editorRef.current, deleteCount)
    historyRef.current.execute(cmd)
    sync()
  }

  function handleUndo(): void {
    historyRef.current.undo()
    sync()
  }

  function handleRedo(): void {
    historyRef.current.redo()
    sync()
  }

  return (
    <div className="bg-zinc-900 p-8 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-8 text-emerald-400">Command — Text Editor</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="cartao flex flex-col gap-4">
          <h2 className="cartao-titulo">Ações</h2>

          <div>
            <label className="rotulo">Inserir texto</label>
            <div className="flex gap-2">
              <input className="entrada" value={input} onChange={e => setInput(e.target.value)} placeholder="Digite algo..." />
              <button className="botao-primario whitespace-nowrap" onClick={handleInsert}>Inserir</button>
            </div>
          </div>

          <div>
            <label className="rotulo">Deletar caracteres</label>
            <div className="flex gap-2">
              <input className="entrada" type="number" value={deleteCount} onChange={e => setDeleteCount(Number(e.target.value))} />
              <button className="botao-secundario whitespace-nowrap" onClick={handleDelete}>Deletar</button>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="botao-secundario w-full" onClick={handleUndo}>↩ Desfazer</button>
            <button className="botao-secundario w-full" onClick={handleRedo}>↪ Refazer</button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="cartao">
            <h2 className="cartao-titulo">Conteúdo</h2>
            <pre className="terminal whitespace-pre-wrap min-h-16">
              {content || <span className="text-zinc-600">vazio...</span>}
            </pre>
          </div>

          <div className="cartao">
            <h2 className="cartao-titulo">Histórico de Comandos</h2>
            {history.length === 0 ? (
              <p className="text-zinc-500">Nenhum comando executado.</p>
            ) : (
              <ul className="terminal max-h-40 overflow-y-auto space-y-1">
                {history.map((h, i) => (
                  <li key={i} className="text-emerald-400">→ {h}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}