import { GlobalSnackbarInput, GlobalSnackbarSeverity } from 'models/globalSnackbar/GlobalSnackbar';
import sliceGlobalSnackbar from './reducers';
import { AppThunk } from 'redux-state/store';
import { size } from 'lodash';

export const openSuccessGlobalSnackbar =
    ({ autohideDuration = 5000, message, title = '' }: GlobalSnackbarInput): AppThunk =>
    async (dispatch): Promise<void> => {
        const severity = GlobalSnackbarSeverity.SUCCESS;
        dispatch(sliceGlobalSnackbar.actions.openSnackbar({ title, message, severity, autohideDuration }));
    };

export const openErrorGlobalSnackbar =
    ({ autohideDuration = null, message = '', title = '' }: GlobalSnackbarInput): AppThunk =>
    async (dispatch): Promise<void> => {
        const severity = GlobalSnackbarSeverity.ERROR;
        const errorMessage = size(message) > 0 ? message : 'An error as occured';
        dispatch(sliceGlobalSnackbar.actions.openSnackbar({ title, message: errorMessage, severity, autohideDuration }));
    };

export const openInfoGlobalSnackbar =
    ({ autohideDuration = 5000, message, title = '' }: GlobalSnackbarInput): AppThunk =>
    async (dispatch): Promise<void> => {
        const severity = GlobalSnackbarSeverity.INFO;
        dispatch(sliceGlobalSnackbar.actions.openSnackbar({ title, message, severity, autohideDuration }));
    };

export const openWarningGlobalSnackbar =
    ({ autohideDuration = null, message, title = '' }: GlobalSnackbarInput): AppThunk =>
    async (dispatch): Promise<void> => {
        const severity = GlobalSnackbarSeverity.WARNING;
        dispatch(sliceGlobalSnackbar.actions.openSnackbar({ title, message, severity, autohideDuration }));
    };

export const closeGlobalSnackbar =
    (): AppThunk =>
    async (dispatch): Promise<void> => {
        dispatch(sliceGlobalSnackbar.actions.removeSnackbar());
    };
