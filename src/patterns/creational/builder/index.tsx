import { useState } from "react";
import { QueryBuilder } from "./FormBuilder";

export function QueryBuilderDemo() {
    const [selectColumns, setSelectColumns] = useState<string>('')
    const [fromTable, setFromTable] = useState<string>('')
    const [whereCondition, setWhereCondition] = useState<string>('')
    const [orderByColumn, setOrderByColumn] = useState<string>('')
    const [limitValue, setLimitValue] = useState<number>(0)
    const [query, setQuery] = useState<string>('')

    function handleBuild(): void {
        const builder = new QueryBuilder()
        .select(...selectColumns.split(',').map(c => c.trim()))
        .from(fromTable)
        
        if(whereCondition) builder.where(whereCondition)
        if(orderByColumn) builder.orderBy(orderByColumn)
        if(limitValue > 0) builder.limit(limitValue)
        
        setQuery(builder.build())
    }
    return (
        <div className="bg-zinc-900 p-8 min-h-screen flex flex-col">
            <h1 className="text-2xl font-bold mb-8 text-emerald-400">Builder</h1>
            <div className="grid grid-cols-2 gap-6">
                <form className="bg-zinc-800 border border-zinc-700 p-6 rounded-xl flex flex-col gap-4"
                onSubmit={e => {
                    e.preventDefault()
                    handleBuild()
                 }
                }
                >
                <div>
                 <label className="block mb-1 text-sm text-zinc-400">SELECT {selectColumns ?  <span className="text-emerald-500">✓</span> : <span className="text-red-500">✗</span>}
                 </label>
                </div>

                <input className="bg-zinc-900 border border-zinc-600 text-zinc-100 px-4 py-2 rounded-lg w-full"
                placeholder="id, nome, email"
                value={selectColumns}
                onChange={e => setSelectColumns(e.target.value)} 
                />
                <div>
                    <label className="block mb-1 text-sm text-zinc-400">FROM {fromTable ?  <span className="text-emerald-500">✓</span> : <span className="text-red-500">✗</span>}
                    </label>
                </div>
                <div className="flex items-center gap-2 mb-4">
                    <input className="bg-zinc-900 border border-zinc-600 text-zinc-100 px-4 py-2 rounded-lg w-full"
                    placeholder="tabela"
                    value={fromTable}
                    onChange={e => setFromTable(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm text-zinc-400">WHERE {whereCondition ?  <span className="text-emerald-500">✓</span> : <span className="text-red-500">✗</span>}
                    </label>
                </div>
                <input className="bg-zinc-900 border border-zinc-600 text-zinc-100 px-4 py-2 rounded-lg w-full"
                placeholder="condição"
                value={whereCondition}
                onChange={e => setWhereCondition(e.target.value)}
                />
                <div>
                    <label className="block mb-1 text-sm text-zinc-400">ORDER BY {orderByColumn ?  <span className="text-emerald-500">✓</span> : <span className="text-red-500">✗</span>}
                    </label>
                </div>
                <input className="bg-zinc-900 border border-zinc-600 text-zinc-100 px-4 py-2 rounded-lg w-full"
                placeholder="coluna"
                value={orderByColumn}
                onChange={e => setOrderByColumn(e.target.value)}
                />
                <div>
                    <label className="block mb-1 text-sm text-zinc-400">LIMIT {limitValue > 0 ?  <span className="text-emerald-500">✓</span> : <span className="text-red-500">✗</span>}
                    </label>
                </div>
                <input className="bg-zinc-900 border border-zinc-600 text-zinc-100 px-4 py-2 rounded-lg w-full"
                placeholder="valor"
                type="number"
                value={limitValue}
                onChange={e => setLimitValue(Number(e.target.value))}
                    />
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-500 cursor-pointer" type="submit">
                    Gerar Query
                </button>
                 </form>

                 <div className="bg-zinc-800 border border-zinc-700 p-6 rounded-xl">
                    <h2 className="text-xl font-bold mb-4 border-b border-zinc-700 pb-4 text-emerald-400"> Resultado</h2>
                    <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg font-mono text-sm">
                        {query || 'A query SQL construída aparecerá aqui.'}
                    </pre>
                    
                 </div>
            </div>
        </div>
        )
    }