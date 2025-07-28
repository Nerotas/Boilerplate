import { AppThunk } from 'redux-state/store';
import sliceOAuth from './reducers';
// Function for making post request to /auth/user/login

export const login =
    (): AppThunk =>
    async (dispatch): Promise<void> => {
        dispatch(sliceOAuth.actions.loginSuccess());
    };

export const loginRequested =
    (): AppThunk =>
    async (dispatch): Promise<void> => {
        dispatch(sliceOAuth.actions.loginRequested());
    };

export const resetLoginState =
    (): AppThunk =>
    async (dispatch): Promise<void> => {
        dispatch(sliceOAuth.actions.resetLogin());
    };

export const setRole =
    (role: string[]): AppThunk =>
    async (dispatch): Promise<void> => {
        dispatch(sliceOAuth.actions.setRole(role));
    };
