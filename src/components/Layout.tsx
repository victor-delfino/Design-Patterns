import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export function Layout() {
    return (
        <div className="flex min-h-screen bg-zinc-900">
           <Sidebar />
            <main className="flex-1 p-8">
                <Outlet />
            </main>
        </div>
    )
}