/* eslint-disable n/no-callback-literal */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RoleProvider from '../wrappers/RoleProvider';
import PermissionGuard from '../wrappers/PermissionGuard';

// --- Mocks for RoleProvider ---
jest.mock('hooks', () => ({
    useGet: jest.fn(),
}));
jest.mock('react-redux', () => ({
    useDispatch: () => jest.fn(),
}));
jest.mock('@azure/msal-react', () => ({
    useMsal: () => ({ instance: { logoutRedirect: jest.fn() } }),
}));
jest.mock('redux-state/oauth', () => ({
    setRole: jest.fn(),
    resetLoginState: jest.fn(),
}));
jest.mock('redux-state/globalSnackbar/actions', () => ({
    openWarningGlobalSnackbar: jest.fn(),
}));
jest.mock('components/common/Loader', () => () => <div data-testid="loader" />);

// --- Mocks for PermissionGuard ---
jest.mock('helpers/permissionChecker', () => jest.fn());
jest.mock('redux-state/store', () => ({
    useSelector: jest.fn(),
}));

const mockUseGet = require('hooks').useGet;
const mockPermissionChecker = require('helpers/permissionChecker');
const mockUseSelector = require('redux-state/store').useSelector;

describe('RoleProvider', () => {
    it('renders children when roles are present', () => {
        mockUseGet.mockReturnValue({
            data: ['admin'],
            isError: false,
            isFetching: false,
            isLoading: false,
        });

        render(
            <RoleProvider>
                <div data-testid="role-content">Role Content</div>
            </RoleProvider>
        );
        waitFor(() => {
            expect(screen.getByTestId('role-content')).toBeInTheDocument();
        });
    });

    it('renders Loader when loading', () => {
        mockUseGet.mockReturnValue({
            data: [],
            isError: false,
            isFetching: true,
            isLoading: true,
        });

        render(
            <RoleProvider>
                <div data-testid="role-content">Role Content</div>
            </RoleProvider>
        );
        waitFor(() => expect(screen.getByTestId('loader')).toBeInTheDocument());
    });

    it('renders children when isError is true', () => {
        mockUseGet.mockReturnValue({
            data: [],
            isError: true,
            isFetching: false,
            isLoading: false,
        });

        render(
            <RoleProvider>
                <div data-testid="role-content">Role Content</div>
            </RoleProvider>
        );
        waitFor(() => {
            expect(screen.getByTestId('role-content')).toBeInTheDocument();
        });
    });
});

describe('PermissionGuard', () => {
    beforeEach(() => {
        mockUseSelector.mockImplementation((cb: (arg0: { oauth: { roles: string[] } }) => any) => cb({ oauth: { roles: ['admin'] } }));
    });

    it('renders children if permissionChecker returns true', () => {
        mockPermissionChecker.mockReturnValue(true);

        render(
            <PermissionGuard permission="admin">
                <div data-testid="perm-content">Perm Content</div>
            </PermissionGuard>
        );
        waitFor(() => {
            expect(screen.getByTestId('perm-content')).toBeInTheDocument();
        });
    });

    it('renders nothing if permissionChecker returns false', () => {
        mockPermissionChecker.mockReturnValue(false);

        render(
            <PermissionGuard permission="user">
                <div data-testid="perm-content">Perm Content</div>
            </PermissionGuard>
        );
        waitFor(() => {
            expect(screen.queryByTestId('perm-content')).toBeNull();
        });
    });
});
