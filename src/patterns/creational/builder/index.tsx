import { useState } from "react";
import { QueryBuilder } from "./FormBuilder";

export function QueryBuilderDemo() {
  const [selectColumns, setSelectColumns] = useState<string>("");
  const [fromTable, setFromTable] = useState<string>("");
  const [whereCondition, setWhereCondition] = useState<string>("");
  const [orderByColumn, setOrderByColumn] = useState<string>("");
  const [limitValue, setLimitValue] = useState<number>(0);
  const [query, setQuery] = useState<string>("");

  function handleBuild(): void {
    const builder = new QueryBuilder()
      .select(...selectColumns.split(",").map((c) => c.trim()))
      .from(fromTable);

    if (whereCondition) builder.where(whereCondition);
    if (orderByColumn) builder.orderBy(orderByColumn);
    if (limitValue > 0) builder.limit(limitValue);

    setQuery(builder.build());
  }

  return (
    <div className="bg-zinc-900 p-8 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-8 text-emerald-400">
        Builder — Query Builder
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form
          className="cartao flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleBuild();
          }}
        >
          <div>
            <label className="rotulo">
              SELECT{" "}
              {selectColumns ? (
                <span className="text-emerald-500">✓</span>
              ) : (
                <span className="text-red-500">✗</span>
              )}
            </label>
            <input
              className="entrada"
              placeholder="id, nome, email"
              value={selectColumns}
              onChange={(e) => setSelectColumns(e.target.value)}
            />
          </div>
          <div>
            <label className="rotulo">
              FROM{" "}
              {fromTable ? (
                <span className="text-emerald-500">✓</span>
              ) : (
                <span className="text-red-500">✗</span>
              )}
            </label>
            <input
              className="entrada"
              placeholder="tabela"
              value={fromTable}
              onChange={(e) => setFromTable(e.target.value)}
            />
          </div>
          <div>
            <label className="rotulo">
              WHERE{" "}
              {whereCondition ? (
                <span className="text-emerald-500">✓</span>
              ) : (
                <span className="text-red-500">✗</span>
              )}
            </label>
            <input
              className="entrada"
              placeholder="condição"
              value={whereCondition}
              onChange={(e) => setWhereCondition(e.target.value)}
            />
          </div>
          <div>
            <label className="rotulo">
              ORDER BY{" "}
              {orderByColumn ? (
                <span className="text-emerald-500">✓</span>
              ) : (
                <span className="text-red-500">✗</span>
              )}
            </label>
            <input
              className="entrada"
              placeholder="coluna"
              value={orderByColumn}
              onChange={(e) => setOrderByColumn(e.target.value)}
            />
          </div>
          <div>
            <label className="rotulo">
              LIMIT{" "}
              {limitValue > 0 ? (
                <span className="text-emerald-500">✓</span>
              ) : (
                <span className="text-red-500">✗</span>
              )}
            </label>
            <input
              className="entrada"
              placeholder="valor"
              type="number"
              value={limitValue}
              onChange={(e) => setLimitValue(Number(e.target.value))}
            />
          </div>
          <button className="botao-primario" type="submit">
            Gerar Query
          </button>
        </form>

        <div className="cartao">
          <h2 className="cartao-titulo">Resultado</h2>
          <pre className="terminal whitespace-pre-wrap">
            {query || "A query SQL construída aparecerá aqui."}
          </pre>
        </div>
      </div>
    </div>
  );
}
