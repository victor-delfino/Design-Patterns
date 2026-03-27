import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export function Layout() {
  const [sidebarAberta, setSidebarAberta] = useState(false)

  return (
<div className="flex min-h-screen bg-zinc-900 flex-col lg:flex-row">

  <header className="lg:hidden flex items-center px-4 py-3 bg-zinc-800 border-b border-zinc-700">
    <button
      className="text-zinc-100 p-2 rounded-lg hover:bg-zinc-700"
      onClick={() => setSidebarAberta(true)}
    >
      ☰
    </button>
    <span className="ml-3 text-emerald-400 font-bold">Design Patterns</span>
  </header>

  <div className="flex flex-1">

    {sidebarAberta && (
      <div
        className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        onClick={() => setSidebarAberta(false)}
      />
    )}

    <div className={`
      fixed lg:relative inset-y-0 left-0 z-40
      transition-transform duration-300
      ${sidebarAberta ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <Sidebar onFechar={() => setSidebarAberta(false)} />
    </div>

    <main className="flex-1 p-4 lg:p-8">
      <Outlet />
    </main>
  </div>

</div>
  )
}