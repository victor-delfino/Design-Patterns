import { type ComponentType } from 'react'

export interface User {
  name: string
  role: 'admin' | 'user'
}

export interface WithAuthProps {
  user: User
}

export function withAuth<T extends WithAuthProps>(
  WrappedComponent: ComponentType<T>,
  requiredRole?: 'admin' | 'user'
) {
  return function AuthenticatedComponent(props: Omit<T, keyof WithAuthProps> & { simulatedUser: User | null }) {
    const { simulatedUser, ...rest } = props

    if (!simulatedUser) {
      return <div className="cartao"><p className="text-red-400">✗ Acesso negado — faça login.</p></div>
    }

    if (requiredRole && simulatedUser.role !== requiredRole) {
      return <div className="cartao"><p className="text-red-400">✗ Role insuficiente — requer: {requiredRole}</p></div>
    }

    return <WrappedComponent {...(rest as T)} user={simulatedUser} />
  }
}