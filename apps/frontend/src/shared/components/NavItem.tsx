import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface NavItemProps {
  href: string
  label: string
}

export default function NavItem({ href, label }: NavItemProps) {
  return (
    <NavLink to={href} className={({ isActive }) => cn('nav-link', isActive ? 'nav-link-active' : 'nav-link-inactive')}>
      {label}
    </NavLink>
  )
}
