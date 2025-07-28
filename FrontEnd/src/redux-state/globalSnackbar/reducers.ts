import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GlobalSnackbar, GlobalSnackbarProps, GlobalSnackbarSeverity } from 'models/globalSnackbar/GlobalSnackbar';

const initialState: GlobalSnackbar = {
    open: false,
    message: '',
    severity: GlobalSnackbarSeverity.INFO,
    title: '',
    autohideDuration: 5000,
};

const sliceGlobalSnackbar = createSlice({
    name: 'GlobalSnackbar',
    initialState,
    reducers: {
        openSnackbar(state: GlobalSnackbar, action: PayloadAction<GlobalSnackbarProps>): void {
            state.open = true;
            state.message = action.payload.message;
            state.title = action.payload.title;
            state.severity = action.payload.severity;
            state.autohideDuration = action.payload.autohideDuration;
        },
        removeSnackbar(state) {
            state.open = false;
            state.message = '';
            state.title = '';
            state.severity = GlobalSnackbarSeverity.INFO;
        },
    },
});

export const { reducer } = sliceGlobalSnackbar;

export default sliceGlobalSnackbar;
