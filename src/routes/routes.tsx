import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import { UnprotectedPageLayout, ProtectedPageLayout } from '../layouts'
import { MainLayout } from '../layouts/main-layout'
import { MainPage } from '../pages'
import { RestaurantOrders } from '../pages/restaurant-orders'
import { RestaurantSettings } from '../pages/restaurant-settings'
import { RestaurantMenuSettings } from '../pages/restaurant-menu-settings'

const Routes = () => {
  const routesForPublic = [
    {
      path: '/',
      element: <UnprotectedPageLayout />,
      children: [
        {
          path: '/',
          element: <MainLayout />,
          children: [
            {
              path: '/',
              element: <MainPage />,
            },
          ],
        },
        {
          path: '/*',
          element: <Navigate to="/" />,
        },
      ],
    },
  ]

  const routesForAuthenticatedOnly = [
    {
      path: '/',
      element: <ProtectedPageLayout />,
      children: [
        {
          path: 'orders',
          element: <RestaurantOrders />,
        },
        {
          path: 'settings',
          element: <RestaurantSettings />,
        },
        {
          path: 'menu',
          element: <RestaurantMenuSettings />,
        },
      ],
    },
  ]

  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
  ])

  return <RouterProvider router={router} />
}

export default Routes
