import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const HomePage = lazy(() => import('./pages/index'));
const PreviewPage = lazy(() => import('./pages/preview'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/preview',
    element: <PreviewPage />
  }
]);

const App: React.FC = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <RouterProvider router={router} />
  </Suspense>
);

export default App;
