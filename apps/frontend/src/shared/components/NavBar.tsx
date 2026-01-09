import { Link } from 'react-router-dom'
import NavItem from '@/shared/components/NavItem'

interface NavConfig {
  label: string
  href: string
}

const NAV_ITEMS: NavConfig[] = [
  { label: '대시보드', href: '/dashboard' },
  { label: '고객 목록', href: '/customers' },
]

export default function NavBar() {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-md bg-white/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-blue-200 shadow-md group-hover:bg-blue-700 transition-colors">
                D
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                Datarize
              </span>
            </Link>

            <div className="hidden sm:flex sm:space-x-1">
              {NAV_ITEMS.map((item) => (
                <NavItem key={item.href} href={item.href} label={item.label} />
              ))}
            </div>
          </div>

          <div className="flex items-center">
            {/* Future: User Profile or Settings */}
            <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200" />
          </div>
        </div>
      </div>
    </nav>
  )
}
