import { Outlet } from 'react-router-dom'
import NavBar from '@/shared/components/NavBar'

export default function DefaultLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      <main className="flex-1 max-w-7xl w-full mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}
