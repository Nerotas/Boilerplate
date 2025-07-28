import store from '../store';
import {
    openSuccessGlobalSnackbar,
    openErrorGlobalSnackbar,
    openInfoGlobalSnackbar,
    openWarningGlobalSnackbar,
    closeGlobalSnackbar,
} from '../globalSnackbar/actions';
describe('Global snackbar reducers', () => {
    test('Default closed', async () => {
        expect(store.getState().GlobalSnackbar).toEqual({
            open: false,
            message: '',
            severity: 'info',
            title: '',
            autohideDuration: 5000,
        });
    });

    test('Open Success', async () => {
        (store.dispatch as any)(openSuccessGlobalSnackbar({ message: 'success' }));
        expect(store.getState().GlobalSnackbar).toEqual({
            open: true,
            message: 'success',
            severity: 'success',
            title: '',
            autohideDuration: 5000,
        });
    });

    test('Open info', async () => {
        (store.dispatch as any)(openInfoGlobalSnackbar({ message: 'info', title: 'info' }));
        expect(store.getState().GlobalSnackbar).toEqual({
            open: true,
            message: 'info',
            severity: 'info',
            title: 'info',
            autohideDuration: 5000,
        });
    });

    test('Open error', async () => {
        (store.dispatch as any)(openErrorGlobalSnackbar({ message: 'error', title: 'error' }));
        expect(store.getState().GlobalSnackbar).toEqual({
            open: true,
            message: 'error',
            severity: 'error',
            title: 'error',
            autohideDuration: null,
        });
    });

    test('Open warning', async () => {
        (store.dispatch as any)(openWarningGlobalSnackbar({ message: 'warning', title: 'warning' }));
        expect(store.getState().GlobalSnackbar).toEqual({
            open: true,
            message: 'warning',
            severity: 'warning',
            title: 'warning',
            autohideDuration: null,
        });
    });

    test('Close snackbar', async () => {
        (store.dispatch as any)(closeGlobalSnackbar());

        expect(store.getState().GlobalSnackbar).toEqual({
            open: false,
            message: '',
            severity: 'info',
            title: '',
            autohideDuration: null,
        });
    });
});
