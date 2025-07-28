import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OAuth } from 'models/oauth';

const initialState: OAuth = {
    isLoggingIn: false,
    isLogInSuccess: false,
    isLoginFailure: false,
    roles: [],
    isLogoutInProgress: false,
};

const oauthSlice = createSlice({
    name: 'oauth',
    initialState,
    reducers: {
        loginSuccess(state: OAuth): void {
            state.isLoggingIn = false;
            state.isLoginFailure = false;
            state.isLogInSuccess = true;
        },
        loginRequested(state: OAuth): void {
            state.isLogInSuccess = false;
            state.isLoginFailure = false;
            state.isLoggingIn = true;
        },
        loginFailed(state: OAuth): void {
            state.isLoggingIn = false;
            state.isLogInSuccess = false;
            state.isLoginFailure = true;
        },
        resetLogin(state: OAuth): void {
            state.isLogInSuccess = false;
            state.isLoginFailure = false;
            state.isLoggingIn = false;
            state.roles = [];
        },
        setRole(state: OAuth, action: PayloadAction<string[]>): void {
            state.roles = action.payload;
        },
    },
});

export const { reducer } = oauthSlice;

export default oauthSlice;
