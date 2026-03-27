import { useState } from "react";
import { DatabaseConnection } from "./AppConfig";

const QUERIES = [
  "SELECT * FROM users",
  "SELECT * FROM products",
  "DELETE FROM sessions WHERE expired = true",
];

interface SessionProps {
  label: string;
  isConnected: boolean;
  setIsConnected: (isConnected: boolean) => void;
}

function Session({ label, isConnected, setIsConnected }: SessionProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [selectedQuery, setSelectedQuery] = useState(QUERIES[0]);

  function handleConnect(): void {
    const db = DatabaseConnection.getInstance();
    db.connect();
    setIsConnected(db.isConnected);
    setLogs((prev) => [...prev, "conexão realizada"]);
  }

  function handleQuery(): void {
    const db = DatabaseConnection.getInstance();
    db.query(selectedQuery);
    setLogs((prev) => [...prev, `query executada: ${selectedQuery}`]);
  }

  return (
    <div className="cartao">
      <h2 className="cartao-titulo">{label}</h2>
      <div className="flex flex-col gap-3 mb-6">
        <button className="botao-primario" onClick={handleConnect}>
          Conectar
        </button>
        <select
          className="entrada"
          value={selectedQuery}
          onChange={(e) => setSelectedQuery(e.target.value)}
        >
          {QUERIES.map((q) => (
            <option key={q}>{q}</option>
          ))}
        </select>
        <button className="botao-secundario" onClick={handleQuery}>
          Executar Query
        </button>
      </div>
      <div className="flex items-center gap-2 bg-zinc-900 rounded-lg px-4 py-2 mb-6">
        <span
          className={`w-2 h-2 rounded-full ${isConnected ? "bg-emerald-500" : "bg-red-500"}`}
        ></span>
        <span className="text-zinc-400 text-sm">
          {isConnected ? "Conectado" : "Desconectado"}
        </span>
      </div>
      <ul className="terminal max-h-40 overflow-y-auto">
        {logs.map((log, index) => (
          <li key={index} className="mb-1">
            → {log}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DatabaseConnectionDemo() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="bg-zinc-900 p-8 min-h-screen mx-auto flex flex-col">
      <h1 className="text-2xl font-bold mb-8 text-emerald-400">Singleton</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Session
          label="Sessão A"
          isConnected={isConnected}
          setIsConnected={setIsConnected}
        />
        <Session
          label="Sessão B"
          isConnected={isConnected}
          setIsConnected={setIsConnected}
        />
      </div>
    </div>
  );
}
