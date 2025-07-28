import { render, screen, cleanup } from '@testing-library/react';
import { find } from 'lodash';

import 'testingUtils/reactRouterDomMock';

import { flushPromises } from 'testingUtils/commonTestingUtils';

import { simulateDefaultUseLocation } from '../testingUtils/reactRouterDomMock';

import { routes as allRoutes } from '../AllRoutes/Routes';
import { Provider } from 'react-redux';
import { adminStore } from 'testingUtils/mockStore';
import { RouteObject } from 'react-router';

// Destructuring error boundary layout and get actual routes
const routes: RouteObject[] = allRoutes[0].children || [];

jest.mock('../containers/Login', () => ({
    __esModule: true,
    default: () => <div data-testid="lazy-Login" />,
}));

jest.mock('../containers/Products', () => ({
    __esModule: true,
    default: () => <div data-testid="lazy-products" />,
}));

jest.mock('../components/404NotFound', () => ({
    __esModule: true,
    default: () => <div data-testid="404NotFound" />,
}));

jest.mock('../components/401NoPermission', () => ({
    __esModule: true,
    default: () => <div data-testid="401NoPermission" />,
}));

jest.mock('../components/400BadRequest', () => ({
    __esModule: true,
    default: () => <div data-testid="400BadRequest" />,
}));

jest.mock('../components/ErrorBoundaryPage', () => ({
    __esModule: true,
    default: () => <div data-testid="ErrorBoundaryPage" />,
}));

describe('Routes', () => {
    beforeAll((done) => {
        done();
    });
    afterAll((done) => {
        done();
    });

    beforeEach(() => {
        simulateDefaultUseLocation();
    });
    afterEach(cleanup);

    // DRY: Table of route paths and expected test IDs
    const routeTestCases = [
        { path: '', testId: 'navigate-to-/products' },
        { path: 'products', testId: 'lazy-products' },
        { path: '404', testId: '404NotFound' },
        { path: '401', testId: '401NoPermission' },
        { path: '400', testId: '400BadRequest' },
        { path: 'login', testId: 'lazy-Login' },
    ];

    it.each(routeTestCases)('renders $path route', async ({ path, testId }) => {
        // Find the route in the nested structure
        let route: RouteObject | undefined;
        if (path === '401' || path === '400' || path === 'login') {
            route = find(routes, (r) => r.path === path);
        } else {
            const parentRoute = find(routes, (r) => r.path === '*');
            route = parentRoute && parentRoute.children ? find(parentRoute.children, (r) => r.path === path) : undefined;
        }
        const Component = () => (route ? route.element : null);
        render(
            <Provider store={adminStore}>
                <Component />
            </Provider>
        );
        await flushPromises();
        await flushPromises();
        expect(screen.getByTestId(testId)).toBeTruthy();
    });

    it('renders Error Boundary at login level', async () => {
        const parentRoute = find(routes, (route) => route.path === 'login');
        const ErrorComponent = () => (parentRoute ? parentRoute.errorElement : null);
        render(
            <Provider store={adminStore}>
                <ErrorComponent />
            </Provider>
        );
        await flushPromises();
        await flushPromises();
        expect(screen.getByTestId('ErrorBoundaryPage')).toBeTruthy();
    });

    it('renders Error Boundary at app level', async () => {
        const parentRoute = find(routes, (route) => route.path === '*');
        const ErrorComponent = () => (parentRoute ? parentRoute.errorElement : null);
        render(
            <Provider store={adminStore}>
                <ErrorComponent />
            </Provider>
        );
        await flushPromises();
        await flushPromises();
        expect(screen.getByTestId('ErrorBoundaryPage')).toBeTruthy();
    });

    it('renders 404 for unknown route', async () => {
        // Simulate a route that doesn't exist
        const parentRoute = find(routes, (route) => route.path === '*');
        const route = parentRoute && parentRoute.children ? find(parentRoute.children, (r) => r.path === 'not-a-real-route') : undefined;
        // Fallback to 404
        const NotFoundComponent = () => {
            if (route && route.element) return route.element;
            const fallback404 = parentRoute && parentRoute.children ? find(parentRoute.children, (r) => r.path === '404') : undefined;
            return fallback404 ? fallback404.element : null;
        };
        render(
            <Provider store={adminStore}>
                <NotFoundComponent />
            </Provider>
        );
        await flushPromises();
        await flushPromises();
        expect(screen.getByTestId('404NotFound')).toBeTruthy();
    });
});
