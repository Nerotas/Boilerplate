import { Action, configureStore, Dispatch } from '@reduxjs/toolkit';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import thunk, { ThunkAction } from 'redux-thunk';
import type { TypedUseSelectorHook } from 'react-redux';
import rootReducer from './root-reducer';

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: `${process.env.REACT_APP_ENV_NAME}` === 'development',
});

//Setup for Typescript
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const useDispatch: () => Dispatch<any> = () => useReduxDispatch<AppDispatch>();

export default store;
