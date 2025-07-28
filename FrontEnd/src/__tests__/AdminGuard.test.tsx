/* eslint-disable n/no-callback-literal */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminGuard from 'AllRoutes/AdminGuard';

// Mock permissionChecker
jest.mock('helpers/permissionChecker', () => jest.fn());

// Mock 401NoPermission component
jest.mock('components/401NoPermission', () => ({
    __esModule: true,
    default: () => <div data-testid="not-permitted" />,
}));

// Mock Loadable to just return the component
jest.mock('../AllRoutes/Loadable', () => ({
    __esModule: true,
    default: (Component: any) => Component,
}));

// Mock useSelector from redux-state/store
jest.mock('redux-state/store', () => ({
    ...jest.requireActual('redux-state/store'),
    useSelector: jest.fn(),
}));

const mockUseSelector = require('redux-state/store').useSelector;
const mockPermissionChecker = require('helpers/permissionChecker');

describe('AdminGuard', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders children when user is admin', () => {
        mockUseSelector.mockImplementation((cb: (arg0: { oauth: { roles: string[] } }) => any) => cb({ oauth: { roles: ['admin'] } }));
        mockPermissionChecker.mockReturnValue(true);

        render(
            <AdminGuard>
                <div data-testid="admin-content">Admin Content</div>
            </AdminGuard>
        );
        expect(screen.getByTestId('admin-content')).toBeInTheDocument();
        expect(screen.queryByTestId('not-permitted')).toBeNull();
    });

    it('renders NotPermitted when user is not admin', () => {
        mockUseSelector.mockImplementation((cb: (arg0: { oauth: { roles: string[] } }) => any) => cb({ oauth: { roles: ['user'] } }));
        mockPermissionChecker.mockReturnValue(false);

        render(
            <AdminGuard>
                <div data-testid="admin-content">Admin Content</div>
            </AdminGuard>
        );
        waitFor(() => {
            expect(screen.getByTestId('not-permitted')).toBeInTheDocument();
            expect(screen.queryByTestId('admin-content')).toBeNull();
        });
    });

    it('renders NotPermitted when roles are empty', () => {
        mockUseSelector.mockImplementation((cb: (arg0: { oauth: { roles: never[] } }) => any) => cb({ oauth: { roles: [] } }));
        mockPermissionChecker.mockReturnValue(false);

        render(
            <AdminGuard>
                <div data-testid="admin-content">Admin Content</div>
            </AdminGuard>
        );
        expect(screen.getByTestId('not-permitted')).toBeInTheDocument();
        expect(screen.queryByTestId('admin-content')).toBeNull();
    });
});
