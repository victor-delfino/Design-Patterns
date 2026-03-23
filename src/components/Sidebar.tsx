import { NavLink } from "react-router-dom"

const navigation = [
    {
        group: 'Creational',
        items: [
            {label: 'Singleton', path: '/singleton'},
            {label: 'Factory Method', path: '/factory'},
            {label: 'Builder', path: '/builder'},
        ]
    },
    {
        group: 'Structural',
        items: [
            {label: 'Adapter', path: '/adapter'},
            {label: 'Facade', path: '/facade'},
            {label: 'Decorator', path: '/decorator'},
        ]
    },
    {
        group: 'Behavioral',
        items: [
            {label: 'Strategy', path: '/strategy'},
            {label: 'Observer', path: '/observer'},
            {label: 'Command', path: '/command'},
        ]

    },
    {
        group: 'React-Specific',
        items: [
            {label: 'Higher-Order Components', path: '/hoc'},
            {label: 'Render Props', path: '/render-props'},
            { label: 'Compound Components', path: '/compound' },
        ]
    }
]

export function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-800 p-6 border-r border-zinc-700 rounded-xl min-h-screen">
      {navigation.map(group => (
        <div key={group.group}>
          <span className="text-zinc-500 text-xs uppercase tracking-widest mb-2 mt-6 block">
            {group.group}
          </span>
          <ul>
            {group.items.map(item => (
              <li className="mb-1" key={item.path}>
                <NavLink
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'text-emerald-400 bg-zinc-700'
                        : 'text-zinc-400 hover:text-emerald-400 hover:bg-zinc-700'
                    }`
                  }
                  to={item.path}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  )
}