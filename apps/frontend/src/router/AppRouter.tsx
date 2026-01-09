import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import DefaultLayout from '@/layouts/DefaultLayout'
import DashboardPage from '@/pages/dashboard/DashboardPage'
import CustomerPage from '@/pages/customer/CustomerPage'
import NotFoundPage from '@/pages/not-found/NotFoundPage'

const router = createBrowserRouter([
  {
    Component: DefaultLayout,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        Component: DashboardPage,
      },
      {
        path: 'customers',
        Component: CustomerPage,
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
