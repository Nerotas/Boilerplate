import { render, waitFor, screen, cleanup } from '@testing-library/react';
import GlobalSnackbar from 'wrappers/GlobalSnackbarWrapper';
import { Provider } from 'react-redux';
import store from '../redux-state/store';
import { openSuccessGlobalSnackbar } from '../redux-state/globalSnackbar/actions';
afterEach(cleanup);
it("snackbar doesn't renders when close", async () => {
    render(
        <Provider store={store}>
            <GlobalSnackbar />
        </Provider>
    );
    await waitFor(() => {
        expect(screen.queryByTestId('globalsnackbar')).toBeNull();
    });
}, 1000);

it("snackbar renders when open snackbar doesn't renders when close", async () => {
    (store.dispatch as any)(openSuccessGlobalSnackbar({ message: 'success' }));

    render(
        <Provider store={store}>
            <GlobalSnackbar />
        </Provider>
    );
    expect(screen.getByTestId('globalsnackbar')).toBeTruthy();
    expect(screen.getByText('success')).toBeTruthy();
}, 1000);
