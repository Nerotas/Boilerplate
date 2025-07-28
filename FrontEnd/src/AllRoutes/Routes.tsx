import { lazy } from 'react';
import Loadable from './Loadable';
import { Navigate, Outlet, RouteObject, createBrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { RoutePaths } from './RoutePaths';
import App from 'App';

//Initalize
const Login = Loadable(lazy(() => import('../containers/Login')));

//Errors
const NotFound = Loadable(lazy(() => import('../components/404NotFound')));
const NotPermitted = Loadable(lazy(() => import('../components/401NoPermission')));
const BadRequest = Loadable(lazy(() => import('../components/400BadRequest')));
const ErrorBoundaryPage = Loadable(lazy(() => import('../components/ErrorBoundaryPage')));

//Tables
const Products = Loadable(lazy(() => import('../containers/Products')));
const BulkAddProductContainer = Loadable(lazy(() => import('../containers/Products/BulkAdd')));

const ErrorBoundaryLayout = () => (
    <ErrorBoundary FallbackComponent={ErrorBoundaryPage}>
        <Outlet />
    </ErrorBoundary>
);

export const routes: RouteObject[] = [
    {
        element: <ErrorBoundaryLayout />,
        children: [
            {
                path: 'login',
                errorElement: <ErrorBoundaryPage />,
                element: <Login />,
            },
            {
                path: '404',
                element: <NotFound />,
            },
            {
                path: '401',
                element: <NotPermitted />,
            },
            {
                path: '400',
                element: <BadRequest />,
            },
            {
                path: '',
                element: <App />,
                errorElement: <ErrorBoundaryPage />,
                children: [
                    {
                        path: '',
                        element: <Navigate replace to={RoutePaths.Products} />,
                    },
                    {
                        path: RoutePaths.NotFound,
                        element: <NotFound />,
                    },
                    {
                        path: RoutePaths.Products,
                        element: <Products />,
                    },
                    {
                        path: `${RoutePaths.Products}/${RoutePaths.Bulk}`,
                        element: <BulkAddProductContainer />,
                    },
                ],
            },
        ],
    },
];

const Router = createBrowserRouter(routes);

export default Router;
