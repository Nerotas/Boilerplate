import { cleanup } from '@testing-library/react';
import store from '../store';
import { login, loginRequested, resetLoginState, setRole } from '../oauth/actions';
describe('oauth reducers', () => {
    test('Login Request', async () => {
        (store.dispatch as any)(loginRequested());
        expect(store.getState().oauth).toEqual({
            isLogInSuccess: false,
            isLoggingIn: true,
            isLoginFailure: false,
            isLogoutInProgress: false,
            roles: [],
        });
    });
    test('Login Success', async () => {
        cleanup();

        (store.dispatch as any)(login());
        (store.dispatch as any)(setRole(['user']));

        expect(store.getState().oauth).toEqual({
            isLogInSuccess: true,
            isLoggingIn: false,
            isLoginFailure: false,
            isLogoutInProgress: false,
            roles: ['user'],
        });
    });

    test('Login Reset', async () => {
        cleanup();

        (store.dispatch as any)(resetLoginState());

        expect(store.getState().oauth).toEqual({
            isLogInSuccess: false,
            isLoggingIn: false,
            isLoginFailure: false,
            isLogoutInProgress: false,
            roles: [],
        });
    });
});
