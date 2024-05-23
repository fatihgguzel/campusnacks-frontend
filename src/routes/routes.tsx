import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import {
  UnprotectedPageLayout,
  ProtectedPageLayout,
  MainLayout,
  RestaurantPageLayout,
} from '../layouts'
import { MainPage, RestaurantPage } from '../pages'

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
      children: [],
    },
  ]

  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
  ])

  return <RouterProvider router={router} />
}

export default Routes
