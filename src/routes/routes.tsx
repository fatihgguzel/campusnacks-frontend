import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import { UnprotectedPageLayout, ProtectedPageLayout } from '../layouts'
import { MainLayout } from '../layouts/main-layout'

const Routes = () => {
  const routesForPublic = [
    {
      path: '/',
      element: <UnprotectedPageLayout />,
      children: [
        {
          path: '/',
          element: <MainLayout />,
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
