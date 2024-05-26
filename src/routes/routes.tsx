import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import {
  UnprotectedPageLayout,
  ProtectedPageLayout,
  MainLayout,
  RestaurantPageLayout,
  RestaurantLayout,
  AccountPageLayout,
} from '../layouts'
import { MainPage, RestaurantPage } from '../pages'
import { RestaurantOrdersPage } from 'src/pages/restaurant-orders-page'
import { VendorPage } from 'src/pages/vendor-page'
import { UserAccountPage } from 'src/pages/user-account-page'
import { VendorAccountPage } from 'src/pages/vendor-account-page'

const Routes = () => {
  const routesForPublicAndUsers = [
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
          path: '/restaurant',
          element: <RestaurantPageLayout />,
          children: [
            {
              path: '/restaurant/:id',
              element: <RestaurantPage />,
            },
          ],
        },
        {
          path: '/',
          element: <AccountPageLayout />,
          children: [
            {
              path: '/account',
              element: <UserAccountPage />,
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

  const routesForRestaurants = [
    {
      path: '/',
      element: <ProtectedPageLayout />,
      children: [
        {
          path: '/vendor',
          element: <RestaurantLayout />,
          children: [
            {
              path: '/vendor/orders',
              element: <RestaurantOrdersPage />,
            },
            {
              path: '',
              element: <Navigate to="/vendor/orders" replace />,
            },
            {
              path: '/vendor/items',
              element: <VendorPage />,
            },
            {
              path: '/vendor/account',
              element: <VendorAccountPage />,
            },
          ],
        },
      ],
    },
  ]

  const router = createBrowserRouter([
    ...routesForPublicAndUsers,
    ...routesForRestaurants,
  ])

  return <RouterProvider router={router} />
}

export default Routes
