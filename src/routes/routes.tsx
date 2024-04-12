import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { UnprotectedPageLayout, ProtectedPageLayout } from '../layouts'

const Routes = () => {
  const routesForPublic = [
    {
      path: '/',
      element: <UnprotectedPageLayout />,
      children: [],
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
