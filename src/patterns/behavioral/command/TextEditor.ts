export interface Command {
  execute(): void
  undo(): void
  description: string
}

export class TextEditor {
  content: string = ''

  insert(text: string): void {
    this.content += text
  }

  delete(length: number): void {
    this.content = this.content.slice(0, -length)
  }
}

export class InsertCommand implements Command {
  description: string

  constructor(private editor: TextEditor, private text: string) {
    this.description = `Inserir "${text}"`
  }

  execute(): void {
    this.editor.insert(this.text)
  }

  undo(): void {
    this.editor.delete(this.text.length)
  }
}

export class DeleteCommand implements Command {
  description: string
  private deleted: string = ''

  constructor(private editor: TextEditor, private length: number) {
    this.description = `Deletar ${length} caracteres`
  }

  execute(): void {
    this.deleted = this.editor.content.slice(-this.length)
    this.editor.delete(this.length)
  }

  undo(): void {
    this.editor.insert(this.deleted)
  }
}

export class CommandHistory {
  private history: Command[] = []
  private redoStack: Command[] = []

  execute(command: Command): void {
    command.execute()
    this.history.push(command)
    this.redoStack = [] // limpa o redo ao executar novo comando
  }

  undo(): Command | null {
    const command = this.history.pop()
    if (command) {
      command.undo()
      this.redoStack.push(command)
    }
    return command ?? null
  }

  redo(): Command | null {
    const command = this.redoStack.pop()
    if (command) {
      command.execute()
      this.history.push(command)
    }
    return command ?? null
  }

  getHistory(): Command[] {
    return [...this.history]
  }
}