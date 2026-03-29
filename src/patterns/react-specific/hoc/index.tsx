import { useState } from 'react'
import { withAuth, type WithAuthProps } from './withAuth'

function AdminPanel({ user }: WithAuthProps) {
  return (
    <div className="cartao">
      <h2 className="cartao-titulo">Admin Panel</h2>
      <p className="text-zinc-300">Bem-vindo, <span className="text-emerald-400">{user.name}</span></p>
      <p className="text-zinc-500 text-sm mt-1">Role: {user.role}</p>
    </div>
  )
}

function UserPanel({ user }: WithAuthProps) {
  return (
    <div className="cartao">
      <h2 className="cartao-titulo">User Panel</h2>
      <p className="text-zinc-300">Olá, <span className="text-emerald-400">{user.name}</span></p>
      <p className="text-zinc-500 text-sm mt-1">Role: {user.role}</p>
    </div>
  )
}

// aplicando o HOC
const ProtectedAdminPanel = withAuth(AdminPanel, 'admin')
const ProtectedUserPanel = withAuth(UserPanel, 'user')

export function WithAuthDemo() {
  const [simulatedRole, setSimulatedRole] = useState<'admin' | 'user' | 'none'>('admin')

    const user = simulatedRole === 'none' 
    ? null 
    : { name: simulatedRole === 'admin' ? 'Hugo' : 'Alice', role: simulatedRole as 'admin' | 'user' }

  return (
    <div className="bg-zinc-900 p-8 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-8 text-emerald-400">HOC — withAuth</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="cartao flex flex-col gap-4">
          <h2 className="cartao-titulo">Simular Usuário</h2>
          <div>
            <label className="rotulo">Role atual</label>
            <select
              className="entrada"
              value={simulatedRole}
              onChange={e => setSimulatedRole(e.target.value as 'admin' | 'user' | 'none')}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="none">Não autenticado</option>
            </select>
          </div>
          <div className="terminal text-sm text-zinc-400">
            <p>→ <span className="text-emerald-400">withAuth(AdminPanel, 'admin')</span></p>
            <p>→ <span className="text-emerald-400">withAuth(UserPanel, 'user')</span></p>
            <p className="mt-2 text-zinc-500">Os componentes não sabem que estão protegidos.</p>
          </div>
        </div>

<div className="flex flex-col gap-4">
  {simulatedRole === 'none' ? (
    <div className="cartao">
      <p className="text-red-400">✗ Não autenticado — acesso negado.</p>
    </div>
  ) : (
    <>
      {simulatedRole === 'admin' && <ProtectedAdminPanel simulatedUser={user} />}
      {simulatedRole === 'user' && <ProtectedUserPanel simulatedUser={user} />}
    </>
  )}
</div>

      </div>
    </div>
  )
}