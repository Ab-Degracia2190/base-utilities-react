import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PrimaryLoader from '@/components/partials/loaders/primary';
import Layout from '@/components/pages/layouts';

// lazy load pages so Suspense can show PrimaryLoader while loading
const Home = lazy(() => import('@/components/pages/contents/home'));
const Buttons = lazy(() => import('@/components/pages/contents/buttons'));
const Loaders = lazy(() => import('@/components/pages/contents/loaders'));
const Formatters = lazy(() => import('@/components/pages/contents/formatters'));
const Inputs = lazy(() => import('@/components/pages/contents/inputs'));
const NotFound = lazy(() => import('@/components/pages/errors/404'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PrimaryLoader overlay />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'buttons',
        element: (
          <Suspense fallback={<PrimaryLoader overlay />}>
            <Buttons />
          </Suspense>
        ),
      },
      {
        path: 'loaders',
        element: (
          <Suspense fallback={<PrimaryLoader overlay />}>
            <Loaders />
          </Suspense>
        ),
      },
      {
        path: 'formatters',
        element: (
          <Suspense fallback={<PrimaryLoader overlay />}>
            <Formatters />
          </Suspense>
        ),
      },
      {
        path: 'inputs',
        element: (
          <Suspense fallback={<PrimaryLoader overlay />}>
            <Inputs />
          </Suspense>
        ),
      },
      {
        path: 'not-found',
        element: (
          <Suspense fallback={<PrimaryLoader overlay />}>
            <NotFound />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<PrimaryLoader overlay />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
export { router };